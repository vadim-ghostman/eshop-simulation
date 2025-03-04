import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { OrderRequest, Product } from './types';

const app = express();
const port = process.env.PORT || 8000;

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "postgres",
  password: "example",
  port: 5432,
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'smartShop API',
      version: '0.1.0',
      description: 'API documentation for simple e-shop',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ]
  },
  apis: ['./src/**/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/orders/create:
 *   post:
 *     summary: Create order
 *     description: Creates a new order with given email and products
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     count:
 *                       type: number
 *     responses:
 *       201:
 *         description: Created order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: number
 *                 email:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       count:
 *                         type: number
 *                 status:
 *                   type: string
 *                   example: ok
 *       400:
 *         description: Error in request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: ordered count out of range
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: error in `db table`
 */
app.post('/api/orders/create', async (req: Request, res: Response) => {
  const { email, products }: OrderRequest = req.body;
  if (!email) {
    res.status(400).json({ status: "error", message: "email is not provided" });
    return;
  }
  if (!products || products.length === 0) {
    res.status(400).json({ status: "error", message: "products list is not provided" })
    return;
  }

  const productsIds = products.map((product) => product.id);
  const productsIdsCount = productsIds.reduce((acc: { [key: number]: number }, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  if (productsIds.length !== Object.keys(productsIdsCount).length) {
    res.status(400).json({ status: "error", message: "duplicated products" });
    return;
  }

  const dbProducts: Product[] = (await pool.query("SELECT * FROM products")).rows;

  for (const product of products) {
    const dbProduct = dbProducts.filter((p) => p.product_id == product.id)[0];
    if (!dbProduct) {
      res.status(400).json({ status: "error", message: "non-existing product" })
      return;
    }
    if (product.count > dbProduct.left_count) {
      res.status(400).json({ status: "error", message: "ordered count out of range" })
      return;
    }
  }
  
  const result = await pool.query(`INSERT INTO orders
    VALUES (DEFAULT, '${email}')
    RETURNING order_id;`).catch((error) => { console.log(error); });

  if (!result) {
    res.status(500).json({ status: "error", message: "error in orders" });
    return;
  }

  const order_id = result.rows[0].order_id;
  let query = "INSERT INTO ordersProducts VALUES ";

  for (const product of products)
    query += `(${order_id}, ${product.id}, ${product.count}), `;

  query = query.slice(0, -2) + ";";

  const q = await pool.query(query).catch((error) => { console.log(error); });
  if (!q) {
    res.status(500).json({ status: "error", message: "error in ordersProducts" });
    return;
  }

  for (const product of products) {
    const pq = await pool.query(`\
      UPDATE products \
      SET left_count = left_count - ${product.count} \
      WHERE product_id = ${product.id}
    `).catch((error) => { console.log(error); });
    if (!pq) {
      res.status(500).json({ status: "error", message: "error in products" });
      return;
    }
  }

  res.status(201).json({ order_id, email, products, status: "ok" });
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders
 *     description: Gets orders by email
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Customer email
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   order_id:
 *                     type: number
 *                   customer_email:
 *                     type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product_id:
 *                           type: number
 *                         ordered_count:
 *                           type: number
 *                         product:
 *                           type: object
 *                           properties:
 *                             title:
 *                               type: string
 *                             description:
 *                               type: string
 *                             left_count:
 *                               type: number
 *       400:
 *         description: Email is not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: email is not provided
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: error in `db table`
 */
app.get('/api/orders', async (req: Request, res: Response) => {
  const email = req.query.email;
  if (!email) {
    res.status(400).json({ status: "error", message: "email is not provided" });
    return;
  }
  const result = await pool.query(`SELECT * FROM orders WHERE customer_email = '${email}'`);
  const orders = result.rows;
  for (let i = 0; i < orders.length; i++) {
    const order_id = orders[i].order_id;
    const products = await pool.query(`\
      SELECT product_id, ordered_count FROM ordersProducts \
      WHERE order_id = ${order_id}
    `).catch((error) => { console.log(error); });
    if (!products) {
      res.status(500).json({ status: "error", message: "error in ordersProducts" });
      return;
    }
    orders[i].products = products.rows;
  }
  for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < orders[i].products.length; j++) {
      const product_id = orders[i].products[j].product_id;
      const product = await pool.query(`\
        SELECT title, description, left_count FROM products \
        WHERE product_id = ${product_id}
      `).catch((error) => { console.log(error); });
      if (!product) {
        res.status(500).json({ status: "error", message: "error in products" });
        return;
      }
      orders[i].products[j].product = product.rows[0];
    }
  }
  res.status(200).json(orders);
});

/**
 * @swagger
 * /api/orders/delete/{id}:
 *   delete:
 *     summary: Delete order
 *     description: Deletes order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         description: Order id
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *       400:
 *         description: Order id is not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: order id is not provided
 */
app.delete('/api/orders/delete/:id', async (req: Request, res: Response) => {
  // I think products don't have to return back into storages after order deletion
  const id = req.params.id;
  if (!id || isNaN(parseInt(id))) {
    res.status(400).json({ status: "error", message: "order id is not provided" });
    return;
  }
  await pool.query(`
    DELETE FROM ordersProducts WHERE order_id = ${id};
    DELETE FROM orders WHERE order_id = ${id};
  `);
  res.status(200).json({ status: "ok" });
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products
 *     description: Gets all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product_id:
 *                     type: number
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   left_count:
 *                     type: number
 */
app.get('/api/products', async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM products");
  res.status(200).json(result.rows);
});

/** 
 * @swagger
 * /api/products/refill:
 *   put:
 *     summary: Refill products
 *     description: Refills products to their original count
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Refilled db
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
app.put('/api/products/refill', async (req: Request, res: Response) => {
  const query = " \
    UPDATE products SET left_count = 7 WHERE product_id = 1; \
    UPDATE products SET left_count = 10 WHERE product_id = 2; \
    UPDATE products SET left_count = 3 WHERE product_id = 3; \
    UPDATE products SET left_count = 5 WHERE product_id = 4;"

  await pool.query(query);
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
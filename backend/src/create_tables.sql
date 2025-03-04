-- Adminer 4.17.1 PostgreSQL 17.4 (Debian 17.4-1.pgdg120+2) dump

DROP TABLE IF EXISTS "orders";
DROP SEQUENCE IF EXISTS orders_order_id_seq;
CREATE SEQUENCE orders_order_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 2 CACHE 1;

CREATE TABLE "public"."orders" (
    "order_id" integer DEFAULT nextval('orders_order_id_seq') NOT NULL,
    "customer_email" text NOT NULL,
    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
) WITH (oids = false);

DROP TABLE IF EXISTS "ordersProducts";
CREATE TABLE "public"."ordersProducts" (
    "order_id" integer NOT NULL,
    "product_id" integer NOT NULL,
    "ordered_count" integer NOT NULL
) WITH (oids = false);

DROP TABLE IF EXISTS "products";
DROP SEQUENCE IF EXISTS products_product_id_seq;
CREATE SEQUENCE products_product_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 5 CACHE 1;

CREATE TABLE "public"."products" (
    "product_id" integer DEFAULT nextval('products_product_id_seq') NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "left_count" integer NOT NULL,
    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
) WITH (oids = false);

INSERT INTO "products" ("product_id", "title", "description", "left_count") VALUES
(1,	'nohavice',	'paradne nohavice',	7),
(2,	'tricko',	'top tricko',	10),
(3,	'mikina',	'skvela mikina',	3),
(4,	'ciapka',	'dobra ciapka',	5);

ALTER TABLE ONLY "public"."ordersProducts" ADD CONSTRAINT "ordersProducts_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(order_id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."ordersProducts" ADD CONSTRAINT "ordersProducts_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(product_id) NOT DEFERRABLE;

-- 2025-03-04 08:18:45.899618+00


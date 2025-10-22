import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function fetchProducts() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("✅ Connected successfully!");

  const [rows] = await connection.execute(`
    SELECT 
      p.ID,
      p.post_title AS product_name,
      MAX(CASE WHEN pm.meta_key = '_price' THEN pm.meta_value END) AS price,
      MAX(CASE WHEN pm.meta_key = '_regular_price' THEN pm.meta_value END) AS regular_price,
      MAX(CASE WHEN pm.meta_key = '_sale_price' THEN pm.meta_value END) AS sale_price,
      im.guid AS image_url
    FROM wpc2_posts p
    LEFT JOIN wpc2_postmeta pm ON p.ID = pm.post_id
    LEFT JOIN wpc2_postmeta pm2 ON p.ID = pm2.post_id AND pm2.meta_key = '_thumbnail_id'
    LEFT JOIN wpc2_posts im ON im.ID = pm2.meta_value
    WHERE p.post_type = 'product' AND p.post_status = 'publish'
    GROUP BY p.ID
    LIMIT 10;
  `);

  console.table(rows);
  await connection.end();
}

fetchProducts();

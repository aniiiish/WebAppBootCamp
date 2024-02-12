const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();

const config = {
  user: 'bootcamp',
  password: 'Pass@123',
  server: 'bootcampfeb5.database.windows.net',
  database: 'bootcamp',
  options: {
    encrypt: true,
    enableArithAbort: true
  }
};

app.use(cors());

app.get('/productData', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT p.Name AS ProductName, p.Color, p.Size, p.Weight
      FROM [SalesLT].[Product] AS p
      INNER JOIN [SalesLT].[ProductCategory] AS pc ON p.ProductCategoryID = pc.ProductCategoryID
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Server running on port ${port}`));

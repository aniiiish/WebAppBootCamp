const express = require('express');
const sql = require('mssql');
const cors = require('cors'); // Import CORS module

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

app.use(cors()); // Use CORS middleware

app.get('/data', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT TOP 20 * FROM [SalesLT].[Customer]');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));


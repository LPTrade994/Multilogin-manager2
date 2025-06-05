const express = require('express');
const cors = require('cors');

const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

app.use(router);

app.listen(PORT, () => {
  const provider = process.env.DB_PROVIDER || (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:') ? 'sqlite' : 'postgresql');
  console.log(`HTTP server listening on ${PORT}, provider: ${provider}`);
});

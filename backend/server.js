const express = require('express');
const cors = require('cors');

const accountsRouter = require('./routes/accounts');
const transactionsRouter = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/accounts', accountsRouter);
app.use('/transactions', transactionsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

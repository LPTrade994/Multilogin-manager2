const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const accountsRouter = require('./routes/accounts');
const transactionsRouter = require('./routes/transactions');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/accounts', accountsRouter);
app.use('/transactions', transactionsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

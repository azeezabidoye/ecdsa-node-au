const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "042c8d05e796f4aceb106a60ecd042bffecaa00a9e292be35e9b4c8e879a23830a30f759861b3b1f2aaed9c0cd7c7f2644b78f9cc02bb2e9c18885ab8420b56d58": 100,
  "04fee1f328d7473fcd510b5493faa6b92a4aad5be16780f3fc031be38a4ce964144a37f904c333b65728ff9e6b1f1f08ca79216067a9f7fa6d81717c9397f463c1": 50,
  "0x3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

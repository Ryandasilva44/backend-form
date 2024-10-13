// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

let users = [];

// Usar CORS e permitir requisições JSON
app.use(cors());
app.use(express.json());

// GET
app.get("/api/users", (req, res) => {
  res.json(users);
});

// POST
app.post("/api/users", (req, res) => {
  const newUser = req.body;

  // Verifique se o e-mail e o nome foram fornecidos
  if (!newUser.email || !newUser.name) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT
app.put("/api/users/:email", (req, res) => {
  const { email } = req.params;
  const updatedUser = req.body;

  users = users.map((user) =>
    user.email === email ? { ...user, ...updatedUser } : user
  );

  const user = users.find((user) => user.email === email);
  if (user) {
    res.json({ message: "User updated", user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE
app.delete("/api/users/:email", (req, res) => {
  const { email } = req.params;
  const userExists = users.some((user) => user.email === email);

  users = users.filter((user) => user.email !== email);

  if (userExists) {
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

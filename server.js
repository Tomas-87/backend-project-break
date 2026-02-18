require("dotenv").config();
const app = require("./index");
const dbConnection = require("./config/db");
const PORT = process.env.PORT || 3000;

dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

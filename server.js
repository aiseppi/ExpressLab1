const express = require("express");
const cors = require("cors");
const { cart } = require("./routes");
const serverPort = 3031;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", cart);
app.listen(serverPort, () => {
    console.log(`server up and listening on port ${serverPort}`);
})
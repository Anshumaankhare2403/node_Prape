const app  = require("./src/app.js");

require('dotenv').config()

const PORT = process.env.PORT;

app.listen(PORT,()=>console.log("Server Started ",PORT));



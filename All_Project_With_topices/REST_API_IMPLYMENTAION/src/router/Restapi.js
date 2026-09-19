const express = require("express");
const {handleAddUser,handleAddUserGet} =  require("../controller/DBControler.js");
const router = express.Router(); 

router
.route("/home")
.get(handleAddUserGet)
.post(handleAddUser);

module.exports = router;
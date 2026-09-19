const userdata = [];

async function handleAddUserGet(req, res) {
  try {
    return res.status(200).json({
      message: "Get data from database",
      data: userdata,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting data",
      error: error.message,
    });
  }
}

async function handleAddUser(req, res) {
  const { name, age, salary, gender } = req.body;

  try {
    const newUser = { name, age, salary, gender };

    userdata.push(newUser);

    return res.status(201).json({
      message: "User added successfully",
      data: newUser,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

module.exports = { handleAddUser, handleAddUserGet };
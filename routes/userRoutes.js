const express = require("express");
const { addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();

router.post("/add-user", addUser);
router.get("/get-all-users", getAllUsers);
router.get("/getUser/:id", getUserById);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;

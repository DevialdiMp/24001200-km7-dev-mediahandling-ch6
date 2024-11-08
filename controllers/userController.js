const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addUser = async (req, res) => {
  try {
    const { nama, bio } = req.body;
    const user = await prisma.user.create({
      data: { nama, bio },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, bio } = req.body;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { nama, bio },
    });

    res.json(user);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addUser, getAllUsers, getUserById, updateUser, deleteUser };

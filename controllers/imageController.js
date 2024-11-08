const { PrismaClient } = require("@prisma/client");
const imagekit = require("../libs/imageKit");
const prisma = new PrismaClient();

const addImage = async (req, res) => {
  try {
    const { judul, deskripsi, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID harus ditambahkan." });
    }

    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!userExists) {
      return res.status(404).json({ error: "User ID tidak ditemukan, Silahkan tambahkan User pada endpoint /user/add-user" });
    }

    const uploadResponse = await imagekit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
    });

    const image = await prisma.image.create({
      data: {
        judul,
        deskripsi,
        url: uploadResponse.url,
        userId: parseInt(userId),
      },
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await prisma.image.findMany({
      include: {
        user: {
          select: {
            nama: true,
            bio: true,
          },
        },
      },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await prisma.image.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            nama: true,
            bio: true,
          },
        },
      },
    });

    if (!image) {
      return res.status(404).json({ message: "ID dan Gambar tidak ditemukan, Sesuaikan penginputan pada ID Gambar" });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateImage = async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, imageUrl } = req.body;  // imageUrl hanya digunakan jika gambar tidak diubah atau digantikan

  try {
    let updatedUrl = imageUrl;  // ini URL default jika tidak ada gambar baru yang diganti
    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
      });

      updatedUrl = uploadResponse.url;
    }

    const imageUpdated = await prisma.image.update({
      where: { id: parseInt(id) },
      data: {
        judul,
        deskripsi,
        url: updatedUrl,
      },
    });

    res.json(imageUpdated);
  } catch (error) {
    console.error('Terjadi kesalahan saat memperbarui gambar:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui data gambar.' });
  }
};

const deleteImage = async (req, res) => {
  const { id } = req.params;
  await prisma.image.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Gambar berhasil dihapus" });
};

module.exports = { addImage, getAllImages, getImageById, updateImage, deleteImage };

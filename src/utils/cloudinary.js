const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: "deraakcuv",
  api_key: "525771487545278",
  api_secret: "h83x6CkPeZKF9asnC_2MfgYQ9dk",
});

// Configuración de Multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Obtener el folder de un campo en la solicitud o establecer uno predeterminado
    const folder = req.body.folder || "default_folder"; // Puedes reemplazar "folder" con el nombre del campo en la solicitud
    return {
      folder: folder,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
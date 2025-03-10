const cloudinaryService = require('./cloudinaryService');

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinaryService.upload(filePath);
        return {
            success: true,
            data: result
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al subir la imagen'
        };
    }
};

module.exports = {
    uploadImage,
};
const uploadImage = async (file, Id, updateImageCallback) => {
    try {
        if (!file) {
            return {
                success: false,
                message: "No se recibió ningún archivo",
                data: ''
            };
        }

        console.log(`Archivo para subir subido: ${JSON.stringify(file, null, 2)}`);

        // Suponiendo que el archivo ya ha sido subido a un servicio como Cloudinary
        // En este caso, file.path es la ruta local, y si utilizas Cloudinary o similar, puedes usar secure_url
        const imageUrl = file.path; // O aquí podrías usar result.secure_url si usas Cloudinary
        const publicId = file.filename;

        console.log(`URL pública: ${imageUrl}`);
        console.log(`Public ID: ${publicId}`);

        // Actualizamos la imagen en la base de datos usando el callback proporcionado
        const result = await updateImageCallback(Id, publicId, imageUrl);

        if (!result.success) {
            console.log(`Error al insertar la imagen en la base de datos: ${result.message}`);
            return {
                success: false,
                message: result.message,
                data: ''
            };
        }

        return {
            success: true,
            message: "Imagen subida y actualizada correctamente",
            data: {
                imageUrl,
                publicId
            }
        };
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        return {
            success: false,
            message: "Error interno del servidor",
            data: error
        };
    }
};

module.exports = { uploadImage };


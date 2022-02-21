const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/upload/contacts');
        },
        filename: (req, file, callback) => {
            callback(null, Date.now().toString() + "_" + file.originalname);
        }
    }),
    fileFilter: (req, file, callback) => {
        const extensaoImg = ['image/png', 'image/jpeg', 'image/jpg'].find(formatoAceito => (formatoAceito == file.mimetype));
        if(extensaoImg) {
            return callback(null, true);
        }
        return callback(null, false)
    }
}))
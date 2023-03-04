import multer from 'multer';
import path from "path";
const upload = (url: string) => {
    var storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, 'src/public/' + url);   // './public/images/' directory name where save the file
        },
        filename: (req, file, callBack) => {
            const ext = path.extname(file.originalname);
            const newName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
            callBack(null, newName);
        }
    })

    const upload = multer({
        storage: storage
    });
    return upload
}
export default upload




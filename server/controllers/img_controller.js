import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);


const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        const dest = path.join(dirName, '../uploads');
        console.log('Destination:', dest); 
        cb(null, dest);
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

export {upload};
import multer from "multer";

const storage = multer.diskStorage({});

export const upload = multer({ storage });

//multer setup to upload files from frontend
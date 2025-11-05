import multer from "multer";

// Store file in memory (you can configure disk storage if needed)
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;

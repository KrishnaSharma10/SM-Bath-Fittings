const multer = require("multer");

const MAX_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Keep the file in memory (never on disk) and pass it straight on to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_MB * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) return cb(null, true);
    const err = new Error("Only JPG, PNG or WebP images are allowed");
    err.code = "BAD_TYPE";
    cb(err);
  },
});

// Wraps multer so every problem comes back as a clean { message } instead of a stack trace
const uploadSingleImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (!err) return next();
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: `Image is too large (max ${MAX_MB} MB)` });
    }
    if (err.code === "BAD_TYPE") {
      return res.status(400).json({ message: err.message });
    }
    if (err.name === "MulterError") {
      return res.status(400).json({ message: "Upload failed. Please choose a single image." });
    }
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error while uploading the image" });
  });
};

module.exports = uploadSingleImage;
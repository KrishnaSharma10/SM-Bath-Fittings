const cloudinary = require("../config/cloudinary");

// POST /upload   (multipart form, field name "image")  ->  { url }
const uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image was uploaded" });

  const fail = (error) => {
    console.error("Cloudinary upload failed:", error);
    return res.status(502).json({ message: "Image upload failed. Please try again." });
  };

  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER || "sm-catalogue",
        resource_type: "image",
        // Cloudinary checks the real file contents, not just the type the browser claimed
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      },
      (error, result) => {
        if (error || !result) return fail(error);
        res.status(201).json({ url: result.secure_url });
      }
    );
    stream.end(req.file.buffer);
  } catch (error) {
    fail(error);
  }
};

module.exports = { uploadImage };
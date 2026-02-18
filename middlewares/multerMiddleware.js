const multer = require("multer");

if (process.env.NODE_ENV === "test") {
  module.exports = {
    single: () => (req, res, next) => next(),
  };
} else {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  module.exports = upload;
}

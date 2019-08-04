module.exports = function(app) {
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  const Image = require("../models/image");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "..", "..", "public", "upload");

      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const fileName = `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`;

      cb(null, fileName);
    }
  });

  const upload = multer({ storage }).single("file");

  app.post("/image", (req, res) => {
    upload(req, res, err => {
      if (err) {
        res.json(err);
      } else {
        const { filename } = req.file;
        console.log(filename);
        const image = new Image({
          fileName: filename,
          path: `/upload/${filename}`
        });
        image.save();

        res.send("image save");
      }
    });
  });

  app.get("/image", (req, res) => {
    Image.find({})
      .then(images => res.json(images))
      .catch(err => res.send(err));
  });
};

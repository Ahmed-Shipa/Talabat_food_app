import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utilities/appError.js";

export const fileUpload = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      // remove any spaces in image name before added in uploads
      let updatedOriginalName = file.originalname.replace(" ", "-");
      cb(null, uuidv4() + "-" + updatedOriginalName);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only allowed"), false);
    }
  }
  const upload = multer({ fileFilter, storage });
  return upload;
};

export const uploadSingleFile = (fieldName, folderName) => {
  return fileUpload(folderName).single(fieldName);
};

export const uploadMixOfFiles = (arrayOfFields, folderName) => {
  return fileUpload(folderName).fields(arrayOfFields);
};

const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    return error;
  }
};

const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    return error;
  }
};

const cloudinaryUploadVideo = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "video",
    });
    return data;
  } catch (error) {
    return error;
  }
};

const cloudinaryRemoveVideo = async (videoPublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(videoPublicId);
    return result;
  } catch (error) {
    return error;
  }
};

const cloudinaryUploadAudio = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "raw",
    });
    return data;
  } catch (error) {
    return error;
  }
};

const cloudinaryRemoveAudio = async (audioPublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(audioPublicId);
    return result;
  } catch (error) {
    return error;
  }
};

const cloudinaryUploadBook = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload);
    return data;
  } catch (error) {
    return error;
  }
};

const cloudinaryRemoveBook = async (bookPublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(bookPublicId);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryUploadVideo,
  cloudinaryRemoveVideo,
  cloudinaryUploadBook,
  cloudinaryRemoveBook,
};

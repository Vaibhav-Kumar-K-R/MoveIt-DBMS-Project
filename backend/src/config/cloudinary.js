import cloudinary from "cloudinary";

export const setUpCloudinary = async () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: process.env.NODE_ENV === "production",
  });
};

export const uploadImage = async (file, publicId) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  if (publicId) {
    await deleteImage(publicId);
  }

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

  return {
    secure_url: uploadResponse.secure_url,
    public_id: uploadResponse.public_id,
  };
};

export const uploadImages = async (files) => {
  const images = files;

  const uploadImagesPromise = images.map(async (image) => {
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    return {
      secure_url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    };
  });

  const uploadedImageDetails = await Promise.all(uploadImagesPromise);

  return uploadedImageDetails;
};

export const deleteImage = async (publicId) => {
  await cloudinary.v2.uploader.destroy(publicId);
};

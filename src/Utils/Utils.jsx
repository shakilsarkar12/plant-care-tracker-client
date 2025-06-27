import axios from "axios";

const generateLetterAvatar = (letter) => {
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  const context = canvas.getContext("2d");
  context.fillStyle = "#4f46e5";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = "50px sans-serif";
  context.fillStyle = "#ffffff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2);
  return canvas.toDataURL().split(",")[1];
};

const uploadImageToImgbb = async (base64Data) => {

  const formData = new FormData();
  formData.append("image", base64Data);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbApiKey}`,
      formData
    );
    console.log("ImgBB Response:", response.data);
    return response.data.data.url;
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
};


export {generateLetterAvatar, uploadImageToImgbb}
const axios = require("axios");
const sharp = require("sharp");
const PexelsAPI = require("pexels-api-wrapper");
const pexelsApiKey = '4jWu830dgkThrFWZoUHed4Ls55IctNAlizK5eT6hsSKblGycxrugX8r6';

const pexelsClient = new PexelsAPI(pexelsApiKey);

// Find Image Function
// Find Image Function
const findImage = async (query) => {
  try {
    console.log("Searching for images with keyword:", query); // Add this line to log the keyword
    const response = await pexelsClient.search({
      query,
      orientation: "landscape",
      per_page: 10,
    });
    console.log("findImage response: ", response);

    if (response.photos.length === 0) {
      console.log(`No images found for query: ${query}`);
    }

    return response.photos;
  } catch (error) {
    console.error("Error while searching photos:", error);
    return [];
  }
};



// Make Image Darken
const darkenFilter = async (image) => {
  try {
    const getImg = await axios.get(image["src"]["large"], {
      responseType: "arraybuffer",
    });

    // Process and save the image
    await sharp(getImg.data).toFile("images/testOld.jpeg");
    await sharp(getImg.data)
      .blur(0.3)
      .modulate({ brightness: 0.8, saturation: 0.5 })
      .toFile("images/test.jpeg");
    console.log("Images processed and saved.");
  } catch (error) {
    console.error("Image processing error:", error);
  }
};

// Make Image GreyScare ( Black and White )
const greyScaleFilter = async (image) => {
  try {
    const getImg = await axios.get(image["src"]["large"], {
      responseType: "arraybuffer",
    });

    // Process and save the image
    await sharp(getImg.data).toFile("images/testOld.jpeg");
    await sharp(getImg.data).greyscale().toFile("images/test.jpeg");
    console.log("Images processed and saved.");
  } catch (error) {
    console.error("Image processing error:", error);
  }
};

// Make image colorful ( different colors )
const hueFilter = async (image) => {
  try {
    const getImg = await axios.get(image["src"]["large"], {
      responseType: "arraybuffer",
    });

    // Process and save the image
    await sharp(getImg.data).toFile("images/testOld.jpeg");
    await sharp(getImg.data)
      .modulate({
        hue: 180,
      })
      .toFile("images/test.jpeg");
    console.log("Images processed and saved.");
  } catch (error) {
    console.error("Image processing error:", error);
  }
};

// Make Image Brighter
const lightenFilter = async (image) => {
  try {
    const getImg = await axios.get(image["src"]["large"], {
      responseType: "arraybuffer",
    });

    // Process and save the image
    await sharp(getImg.data).toFile("images/testOld.jpeg");
    await sharp(getImg.data)
      .modulate({
        lightness: 15,
        saturation: 0.5,
      })
      .toFile("images/test.jpeg");
    console.log("Images processed and saved.");
  } catch (error) {
    console.error("Image processing error:", error);
  }
};

// Sharpens The Image
const sharpenFilter = async (image) => {
  try {
    const getImg = await axios.get(image["src"]["large"], {
      responseType: "arraybuffer",
    });

    // Process and save the image
    await sharp(getImg.data).toFile("images/testOld.jpeg");
    await sharp(getImg.data)
      .sharpen({
        sigma: 2,
        m1: 0,
        m2: 3,
        x1: 3,
        y2: 15,
        y3: 15,
      })
      .toFile("images/test.jpeg");
    console.log("Images processed and saved.");
  } catch (error) {
    console.error("Image processing error:", error);
  }
};

// Bluring the Image
const medianFilter = async (image) => {
  try {
    const getImg = await axios.get(image["src"]["large"], {
      responseType: "arraybuffer",
    });

    // Process and save the image
    await sharp(getImg.data).toFile("images/testOld.jpeg");
    await sharp(getImg.data).gamma(3).toFile("images/test.jpeg");
    console.log("Images processed and saved.");
  } catch (error) {
    console.error("Image processing error:", error);
  }
};

// Normalise the Image, Giving it Nice Look
const normaliseFilter = async (image) => {
  try {
    const getImg = await axios.get(image["src"]["large"], {
      responseType: "arraybuffer",
    });

    // Process and save the image
    await sharp(getImg.data).toFile("images/testOld.jpeg");
    await sharp(getImg.data).normalise().toFile("images/test.jpeg");
    console.log("Images processed and saved.");
  } catch (error) {
    console.error("Image processing error:", error);
  }
};

// Linear Filter for Making Image a bit Darker and Pretty
const linearFilter = async (image) => {
  try {
    const getImg = await axios.get(image["src"]["large"], {
      responseType: "arraybuffer",
    });

    // Process and save the image
    await sharp(getImg.data).toFile("images/testOld.jpeg");
    await sharp(getImg.data).linear(0.5, 2).toFile("images/test.jpeg");
    console.log("Images processed and saved.");
  } catch (error) {
    console.error("Image processing error:", error);
  }
};

const main = async () => {
    try {
      const images = await findImage("tech");
      if (images.length === 0) {
        console.log("No images found.");
        return;
      }
  
      const randomImage = images[Math.floor(Math.random() * images.length)];
      console.log("image: ", randomImage);
  
      const filterFunctions = [
        darkenFilter,
        greyScaleFilter,
        hueFilter,
        lightenFilter,
        sharpenFilter,
        medianFilter,
        normaliseFilter
      ];
  
      const randomFilterFunction = filterFunctions[Math.floor(Math.random() * filterFunctions.length)];
      await randomFilterFunction(randomImage);
  
    } catch (error) {
      console.error("Main function error:", error);
    }
  };

// Call the main function
main();

const piece1 = "live_98p84tGkf0oSEVn2HThcx";
const piece2 = "jQ8PqfaNaDg9PlTGv9QezuKP4";
const piece3 = "E5dIvEVWUx95Swfbay";
const api_key = piece1 + piece2 + piece3;

console.log(api_key);

const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2`;
const API_URL_FAVOURITES = `https://api.thecatapi.com/v1/favourites?api_key=${api_key}`;

const loadRandomCats = async () => {
  try {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    createKitties(data);
  } catch (error) {
    console.log(error.message);
  }
};

const loadFavouritesCats = async () => {
  try {
    const response = await fetch(API_URL_FAVOURITES);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

const createKitties = (data) => {
  const img1 = document.getElementById("img1");
  img1.src = data[0].url;

  const img2 = document.getElementById("img2");
  img2.src = data[1].url;
};

loadRandomCats();
loadFavouritesCats();

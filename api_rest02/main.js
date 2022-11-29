const piece1 = "live_98p84tGkf0oSEVn2HThcx";
const piece2 = "jQ8PqfaNaDg9PlTGv9QezuKP4";
const piece3 = "E5dIvEVWUx95Swfbay";
const api_key = piece1 + piece2 + piece3;

const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2`;
const API_URL_FAVOURITES = `https://api.thecatapi.com/v1/favourites?api_key=${api_key}`;
const API_URL_FAVOURITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=${api_key}`;
const API_URL_UPLOAD = `https://api.thecatapi.com/v1/images/upload`;

const loadRandomCats = async () => {
  try {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    createKitties(data);
  } catch (error) {
    console.log(error.message);
  }
};

const loadFavouriteCats = async () => {
  try {
    const response = await fetch(API_URL_FAVOURITES);
    const data = await response.json();

    const target = document.getElementById("favs");
    target.innerHTML = "<h2>Fav Kitties</h2>";

    if (data.length === 0) {
      target.innerHTML += "<h2>You have not favourite cats yet!";
    } else {
      data?.forEach((item) => {
        const article = document.createElement("article");
        const img = document.createElement("img");
        const btn = document.createElement("button");
        const btnText = document.createTextNode("DELETE");

        btn.appendChild(btnText);
        btn.onclick = () => deleteKittie(item.id);
        img.src = item.image.url;
        img.width = "350";
        article.appendChild(img);
        article.appendChild(btn);

        target.appendChild(article);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const createKitties = (data) => {
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const buttonAddClick1 = document.getElementById("btn1");
  const buttonAddClick2 = document.getElementById("btn2");

  img1.src = data[0].url;
  img2.src = data[1].url;

  buttonAddClick1.onclick = () => saveFavouriteCats(data[0].id);
  buttonAddClick2.onclick = () => saveFavouriteCats(data[1].id);
};

const saveFavouriteCats = async (id) => {
  const res = await fetch(API_URL_FAVOURITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });

  const data = await res.json();
  console.log({ data });

  if (res.status !== 200) {
    document.querySelector("span").innerHTML =
      "Error: " + res.status + data.message;
  } else {
    loadFavouriteCats();
  }
};

const deleteKittie = async (id) => {
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.status !== 200) {
    document.querySelector("span").innerHTML =
      "Error: " + res.status + data.message;
  } else {
    loadFavouriteCats();
  }
};

const handleUpload = async () => {
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);

  const res = await fetch(API_URL_UPLOAD, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      "X-API-KEY": api_key,
    },
    body: formData,
  });
  const data = await res.json();

  if (res.status !== 201) {
    console.log(`Hubo un error al subir michi: ${res.status} ${data.message}`);
  } else {
    console.log("Foto de michi cargada :)");
    console.log({ data });
    console.log(data.url);
    saveFavouriteCats(data.id); //para agregar el michi cargado a favoritos.
  }
};

loadRandomCats();
loadFavouriteCats();

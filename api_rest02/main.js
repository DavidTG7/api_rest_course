const URL = "https://api.thecatapi.com/v1/images/search?limit=3";

const reload = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    createKitties(data);
  } catch (error) {
    console.log(error.message);
  }
};

const createKitties = (data) => {
  const img1 = document.getElementById("img1");
  img1.src = data[0].url;

  const img2 = document.getElementById("img2");
  img2.src = data[1].url;

  const img3 = document.getElementById("img3");
  img3.src = data[2].url;
};

reload();

const getCat = async () => {
  const fetchResult = await fetch(URL);
  const data = await fetchResult.json();
  target.setAttribute("src", data[0].url);
};
const URL = "https://api.thecatapi.com/v1/images/search";

const body = document.querySelector("body");
const target = document.querySelector("img");
const button = document.createElement("button");
button.innerText = "New Cat";
// button.addEventListener("click", () => {
//   getCat();
// });
button.onclick = getCat;
body.append(button);

getCat();

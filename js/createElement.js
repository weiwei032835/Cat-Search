//新增資料到畫面
export function createCard(item) {
    const card = document.createElement("div")
    card.className = "card";

    //create image
    const img = document.createElement("img");
    img.src = item.url;
    img.className = "card_img";

    //create breeds text
    const breeds = document.createElement("p")
    breeds.innerHTML = item.breeds.map(breeds => breeds.name).join(", ")

    card.appendChild(img);
    card.appendChild(breeds);
    return card;
}


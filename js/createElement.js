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

//新增性格標籤
export function createTempItem(temperament) {
    const tempItem = document.createElement("span")
    tempItem.className = "tag_list";
    tempItem.innerHTML = temperament;
    return tempItem;
}

//新增字和那條bar
export function createDrawerStatsItem(displayName, score) {
    const statsItem = document.createElement("div");
    statsItem.className = "stats_item";
    //字
    const itemTitle = document.createElement("span");
    itemTitle.className = "item__title";
    itemTitle.innerHTML = `${displayName}:`;
    //bar
    const bar = document.createElement("div");
    fill.className = "fill";
    fill.style.width = `${score * 20}%`;
    bar.appendChild(fill);
    statsItem.appendChild(itemTitle);
    statsItem.appendChild(bar);
    return statsItem;
}
import { fetchCats, fetchBreads } from "./api.js";
import {
    renderCats,
    addDropDownListener,
    addCloseDropdownListener,
    renderOptions,
    clearImages,
    addSelectOrderLIstener,
} from "./dom.js";

const pageSize = 12;//一次12筆
let order = "DESC";
let page = 1;
let selectedOptions = [];
const catList = [];


async function loadCats(limit, page, order, breedIds = []) {
    //  api抓貓資料
    const list = await fetchCats(limit, page, order, breedIds);
    //console.log(list);
    catList.push(...list);
    renderCats(list);
}
//清空和塞選資料
function handleBreedChange(e) {
    const changedOption = e.target;
    if (changedOption.checked) {
        selectedOptions.push(changedOption.value);
    } else {
        selectedOptions = selectedOptions.filter((item) => item != changedOption.value)
    }
    clearImages();
    loadCats(pageSize, page, order, selectedOptions);//重新讀取
}

//載入品種 api.js
async function loadBreed() {
    const breeds = await fetchBreads();
    renderOptions(breeds, handleBreedChange);
}

function addListeners() {
    addDropDownListener();
    addCloseDropdownListener();
    //排序順序
    addSelectOrderLIstener(e => {
        //取得下拉選項
        order = e.target.value;
        clearImages()
        loadCats(pageSize, page, order, selectedOptions);//重新讀取
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    loadBreed();// 加載品種資訊
    //異步加載資料 頁面 頁碼 排序
    await loadCats(pageSize, page, order, selectedOptions);
    addListeners();//相關元素添加事件監聽器
}); 
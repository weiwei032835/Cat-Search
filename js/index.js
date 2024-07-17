import { fetchCats, fetchBreads } from "./api.js";
import {
    renderCats,
    addDropDownListener,
    addCloseDropdownListener,
    renderOptions,
    clearImages,
    addSelectOrderLIstener,
    disableLoadMoreButton,
    addLoadMoreButtonListener,
    enableLoadMoreButton,
    addCloseDrawerListener,
} from "./dom.js";

const pageSize = 12;//一次12筆
let order = "DESC";
let page = 1;
let selectedOptions = [];
const catList = [];

//載入
async function loadCats(limit, page, order, breedIds = []) {
    //  api抓貓資料
    const list = await fetchCats(limit, page, order, breedIds);
    //console.log(list);
    catList.push(...list);
    renderCats(list);

    if (list.length < limit) {
        //limit沒有貓取消按鈕
        disableLoadMoreButton();
        return false;
    }
    return true;
}

//清空和塞選資料
async function handleBreedChange(e) {
    const changedOption = e.target;
    if (changedOption.checked) {
        selectedOptions.push(changedOption.value);
    } else {
        selectedOptions = selectedOptions.filter((item) => item != changedOption.value)
    }
    clearImages();
    disableLoadMoreButton();
    page = 1;
    const hasNextPage = await loadCats(pageSize, page, order, selectedOptions);
    if (hasNextPage) {
        page++;
    }
}

//載入品種 api.js
async function loadBreed() {
    const breeds = await fetchBreads();
    renderOptions(breeds, handleBreedChange);
}

//監聽事件
function addListeners() {
    addDropDownListener();//下拉選單
    addCloseDropdownListener();//關閉側欄
    addCloseDrawerListener();//關閉側欄

    //排序順序
    addSelectOrderLIstener(async (e) => {
        //取得下拉選項
        order = e.target.value;
        clearImages();
        enableLoadMoreButton();
        page = 1;
        const hasNextPage = await loadCats(pageSize, page, order, selectedOptions);
        if (hasNextPage) {
            page++;
        }
    });

    //更多LoadMore按鈕載入
    addLoadMoreButtonListener(async () => {
        const hasNextPage = await loadCats(pageSize, page, order, selectedOptions);
        if (hasNextPage) {
            page++;
        }
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    loadBreed();// 加載品種資訊
    //異步加載資料 頁面 頁碼 排序
    const hasNextPage = await loadCats(pageSize, page, order, selectedOptions);
    if (hasNextPage) {
        page++;
    }
    addListeners();//相關元素添加事件監聽
});


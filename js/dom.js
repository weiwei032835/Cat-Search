﻿import { createCard } from "./createElement.js";
// dom 操作
export function renderCats(catList) {
    const columns = [
        document.getElementById("col1"),
        document.getElementById("col2"),
        document.getElementById("col3"),
    ]
    for (let i = 0; i < catList.length; i++) {
        const col = i % columns.length;
        const item = catList[i];
        const card = createCard(item);
        //側邊選單
        card.addEventListener("click", e => {
            setDrawerContent(item);
            openDrawer();
        })
        columns[col].appendChild(card);
    }
}

//側邊欄滑出
export function openDrawer() {
    const drawer = document.getElementById("drawer")
    drawer.classList.add("open");
}
//點擊 更換資料
export function setDrawerContent(item) {
    const drawerImg = document.getElementById("drawer_image");
    drawerImg.src = item.url;
    const breedName = document.getElementById("")
}

/*下拉選單 顯示隱藏*/
export function addDropDownListener() {
    const dropdownButton = document.getElementById("dropdown_button");
    /*品種選項*/
    const multiSelect = document.getElementById("multi_select");

    //toggle dropdown
    dropdownButton.addEventListener("click", () => {
        multiSelect.classList.toggle("hidden");
    });
}

// 下拉選單 
export function addCloseDropdownListener() {
    document.addEventListener("click", e => {
        const multiSelect = document.getElementById("multi_select");
        const dropdownButton = document.getElementById("dropdown_button");
        const isClickedSelect = multiSelect.contains(e.target);
        const isClickedDropdownButton = dropdownButton.contains(e.target);

        if (!isClickedSelect && !isClickedDropdownButton) {
            multiSelect.classList.add("hidden")
        }
    });
}

export function renderOptions(breeds, handleBreedChange) {
    /*把品種資料 用JS跑*/
    const multiSelectContainer = document.getElementById("multi_select");
    multiSelectContainer.innerHTML = ""; // 清空現有選項
    //品種下拉選單
    breeds.forEach(breed => {
        const optionContainer = document.createElement("div");
        optionContainer.className = "options";

        //創建一個複選框元素
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `breed-${breed.name}`;
        checkbox.value = breed.name;
        checkbox.addEventListener("change", () => handleBreedChange(breed));

        //創建一個標籤元素，顯示 breed 名稱
        const label = document.createElement("label");
        label.htmlFor = `breed-${breed.name}`;
        label.textContent = breed.name;

        // 將複選框和標籤元素添加到選項容器中
        optionContainer.appendChild(checkbox);
        optionContainer.appendChild(label);

        multiSelectContainer.appendChild(optionContainer);
    });
}

//重新刷新
export function clearImages() {
    const columns = [
        document.getElementById("col1"),
        document.getElementById("col2"),
        document.getElementById("col3"),
    ];

    columns.forEach((column) => {
        column.innerHTML = "";
    })
}
//新增排序
export function addSelectOrderLIstener(handler) {
    const orderSelect = document.getElementById("order_select");
    orderSelect.addEventListener("change", handler);
}
//讀取 load 
export function addLoadMoreButtonListener(handler) {
    const loadMoreButton = document.getElementById("load_more");
    loadMoreButton.addEventListener("click", handler);
}
//將讀取關掉
export function disableLoadMoreButton() {
    const loadMoreButton = document.getElementById("load_more");
    loadMoreButton.disabled = true;
}

//將讀取啟用
export function enableLoadMoreButton() {
    const loadLoadMoreButton = document.getElementById("load_more");
    loadMoreButton.disabled = false;
}


//點擊側欄關閉畫面 點擊卡片以外
export function addCloseDrawerListener() {
    document.addEventListener("click", e => {
        const drawer = document.getElementById("drawer")
        //是否點擊側欄
        const isClickedInsideCard = e.target.closest(".card");
        const isClickedInsideDrawer = drawer.contains(e.target)

        if (!isClickedInsideDrawer && !isClickedInsideCard) {
            drawer.classList.remove("open");
        }

    })
}
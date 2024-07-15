import { createCard } from "./createElement.js";
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
        columns[col].appendChild(card);
    }
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

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `breed-${breed.name}`;
        checkbox.value = breed.name;
        checkbox.addEventListener("change", () => handleBreedChange(breed));

        const label = document.createElement("label");
        label.htmlFor = `breed-${breed.name}`;
        label.textContent = breed.name;

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
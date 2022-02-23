"use strict";

let price = 10;

const ingridList = new Map([
    ["meat", 10],
    ["cheese", 5],
    ["lettuce", 2],
    ["tomato", 2],
    ["onion", 2],
    ["pickles", 2]
]);


let addedItems = new Map([
    ["meat", 0],
    ["cheese", 0],
    ["lettuce", 0],
    ["tomato", 0],
    ["onion", 0],
    ["pickles", 0]
]);


(function addListeners() {
  const burgerMenu = document.getElementById("burger-menu");
  for (let i = 0; i < burgerMenu.childElementCount; i++) {
    const btn = burgerMenu.children[i];
    btn.children[0].addEventListener("click", remove);
    btn.children[2].addEventListener("click", add);

    btn.children[0].setAttribute("disabled", true);
  }
})();

function add(event) {
  const ingredient = event.path[1].children[1].innerText.toLowerCase();
  const button = event.path[1].children[0];
  const divGrab = document.getElementById(ingredient);
  const divToAdd = document.createElement("div");
  divToAdd.classList.add(ingredient, "toppings");
  divGrab.appendChild(divToAdd);
  button.removeAttribute("disabled");

  updatePrice(ingredient, true);
  updateListItems(ingredient, true);
}

function remove(event) {
  const ingredient = event.path[1].children[1].innerText.toLowerCase();
  const button = event.path[1].children[0];
  const divGrab = document.getElementById(ingredient);

  if (divGrab.childElementCount === 1) {
    button.setAttribute("disabled", true);
  }

  divGrab.removeChild(divGrab.lastChild);

  updatePrice(ingredient, false);
  updateListItems(ingredient, false);
}

function updatePrice(ingredient, toAdd) {
    const sign = toAdd ? 1 : -1;
    
    price += sign * ingridList.get(ingredient);

    const priceTag = document.getElementById("price-value");
    priceTag.innerText = "$ " + (price) + ".00";
}

function updateListItems(ingredient, toAdd) {
    const sign = toAdd ? 1 : -1;
    const list = document.getElementById("priceList");
    const item = document.createElement("li");
    const countItem = addedItems.get(ingredient);

    if(countItem + sign === 0) {
        list.children[getListIndex(list,ingredient)].remove();
        addedItems.set(ingredient, countItem + sign);
        return;
    }

    for (let i = 0; i < addedItems.size; i++) {
            if (addedItems.get(ingredient) > 0) {
                addedItems.set(ingredient, countItem + sign);
                item.innerText = capitalize(ingredient) + " x" + (countItem + sign) + ": $" + ingridList.get(ingredient) + ".00";
                list.children[getListIndex(list,ingredient)].innerText = item.innerText;
                return;
            }
    }
    
    addedItems.set(ingredient, countItem + sign);

    item.innerText = capitalize(ingredient) + " x" + (countItem + sign) + ": $" + ingridList.get(ingredient) + ".00";

    list.insertBefore(item, list.lastChild.previousSibling);
}

function getListIndex(list, ingredient) {
    for (let i = 0; i < list.childElementCount; i++) {
        if (list.children[i].innerText.includes(capitalize(ingredient))) {
            return i;
        }
    }
}

function capitalize(str){
    return str.charAt(0).toUpperCase()+str.slice(1);
}
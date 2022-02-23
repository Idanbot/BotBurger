"use strict";

// starts at base price ( $ 5.00 for buns only )
let price = 5;

const ingredients = {
  meat : { name : "meat", count : 0 , price : 4},
  cheese : { name : "cheese", count : 0 , price : 2},
  lettuce : { name : "lettuce", count : 0 , price : 1},
  tomato : { name : "tomato", count : 0 , price : 1},
  onion : { name : "onion", count : 0 , price : 1},
  pickles : { name : "pickles", count : 0 , price : 1},
};

const ingredientSize = Object.keys(ingredients).length;

// Adding listeners to all buttons under burger-menu div
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
  const ingredient = ingredientName(event);
  const button = buttonDiv(event);
  const divGrab = document.getElementById(ingredient);

  const divToAdd = document.createElement("div");
  divToAdd.classList.add(ingredient, "toppings");

  divGrab.appendChild(divToAdd);
  button.removeAttribute("disabled");

  updatePrice(ingredient, 1);
  updateListItems(ingredient, 1);
}

function remove(event) {
  const ingredient = ingredientName(event);
  const button = buttonDiv(event);
  const divGrab = document.getElementById(ingredient);

  if (divGrab.childElementCount === 1) {
    button.setAttribute("disabled", true);
  }

  divGrab.removeChild(divGrab.lastChild);

  updatePrice(ingredient, -1);
  updateListItems(ingredient, -1);
}


function updatePrice(ingredient, sign) {

    price += sign * ingredients[ingredient].price;

    const priceTag = document.getElementById("price-value");
    priceTag.innerText = "$ " + (price) + ".00";
}


function updateListItems(ingredient, sign) {
    const list = document.getElementById("priceList");
    const item = document.createElement("li");
    const countItem = ingredients[ingredient].count;

    if(countItem + sign === 0) {
        list.children[getListIndex(list,ingredient)].remove();
        ingredients[ingredient].count = countItem + sign;
        return;
    }

    for (let i = 0; i < ingredientSize; i++) {
            if (ingredients[ingredient].count > 0) {
                ingredients[ingredient].count = countItem + sign;
                item.innerText = invoiceFormatter(ingredient, countItem, sign);
                list.children[getListIndex(list,ingredient)].innerText = item.innerText;
                return;
            }
    }
    
    ingredients[ingredient].count = countItem + sign;

    item.innerText = invoiceFormatter(ingredient, countItem, sign);

    list.insertBefore(item, list.lastChild.previousSibling);
}


// Utility Functions

function ingredientName(event) {
    return event.path[1].children[1].innerText.toLowerCase();
}

function buttonDiv(event) {
    return event.path[1].children[0];
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

function invoiceFormatter(ingredient,countItem,sign) {
  return capitalize(ingredient) + " x" + (countItem + sign) + ": $" + (ingredients[ingredient].price * (countItem + 1)) + ".00";
}
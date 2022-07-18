const html = document.querySelector("html");
const checkbox = document.querySelector("#checkbox");
const sectionProducts = document.querySelector(".main__products");
const cart = document.querySelector(".cart__products");
const cartList = document.querySelector(".cart__list");
const cartEmpty = document.querySelector(".cart__empty");
const cartInfo = document.querySelector(".cart__info");
let arrayCart = [];

checkbox.addEventListener("change", () => {
  html.classList.toggle("dark-mode");
});

function createCardProducts(product) {
  const divBox = document.createElement("div");
  const imgBox = document.createElement("figure");
  const img = document.createElement("img");
  const divInfo = document.createElement("div");
  const category = document.createElement("span");
  const title = document.createElement("h2");
  const description = document.createElement("p");
  const price = document.createElement("span");
  const btn = document.createElement("button");

  divBox.classList.add("products__box");
  imgBox.classList.add("box__img");
  divInfo.classList.add("box__info");
  category.classList.add("info__category");
  price.classList.add("info__price");
  btn.classList.add("btn__box");

  img.src = product.img;
  img.alt = product.nameItem;
  category.innerText = product.tag;
  title.innerText = product.nameItem;
  description.innerText = product.description;
  price.innerText = `R$ ${product.value.toFixed(2)}`;
  btn.innerText = product.addCart;
  btn.setAttribute("id", product.id);

  divBox.append(imgBox, divInfo);
  imgBox.appendChild(img);
  divInfo.append(category, title, description, price, btn);

  return divBox;
}

function listProducts(list) {
  sectionProducts.innerHTML = "";

  list.forEach((item) => {
    const template = createCardProducts(item);
    sectionProducts.appendChild(template);
  });
}
listProducts(data);

function addProducts(event) {
  const button = event.target;

  if (button.tagName === "BUTTON") {
    const idProduct = button.id;
    const filter = data.find((item) => {
      return item.id == idProduct;
    });

    arrayCart.push(filter);
    listProductsCart();
    priceCart();
  }
}

function listProductsCart() {
  cartList.innerHTML = "";

  cart.classList.remove("empty");
  cartInfo.classList.remove("empty");
  cartEmpty.classList.remove("empty");

  arrayCart.forEach((item) => {
    const template = templateCart(item);

    cartList.appendChild(template);
  });
}

function templateCart(product) {
  const liProduct = document.createElement("li");
  const boxImg = document.createElement("figure");
  const img = document.createElement("img");
  const boxInfo = document.createElement("div");
  const title = document.createElement("h3");
  const price = document.createElement("span");
  const amount = document.createElement("span");
  const btn = document.createElement("button");

  liProduct.classList.add("product__card");
  btn.classList.add("btn-remove");

  img.src = product.img;
  img.alt = product.nameItem;
  title.innerText = product.nameItem;
  price.innerText = `R$ ${product.value.toFixed(2)}`;
  amount.innerText = `Quantidade: `;
  btn.innerText = "X";

  liProduct.append(boxImg, boxInfo, btn);
  boxImg.appendChild(img);
  boxInfo.append(title, price, amount);

  return liProduct;
}

function priceCart() {
  const amount = document.querySelector("#amount");
  const priceTotal = document.querySelector("#price-total");

  let total = 0;
  arrayCart.forEach((item) => {
    total += item.value;
  });

  amount.innerText = arrayCart.length;
  priceTotal.innerText = `R$ ${total.toFixed(2)}`;
}

function removeProduct(event) {
  const btnRemove = event.target;

  if (btnRemove.tagName === "BUTTON") {
    btnRemove.closest(".product__card").remove();
    arrayCart.splice(".product__card", 1);
  }

  if (cartList.innerHTML === "") {
    cart.classList.add("empty");
    cartInfo.classList.add("empty");
    cartEmpty.classList.add("empty");
  }
  priceCart();
}
sectionProducts.addEventListener("click", addProducts);
cartList.addEventListener("click", removeProduct);

const inputText = document.querySelector(".form__input");

function filterProductInput(event) {
  event.preventDefault();

  const searchUser = inputText.value;
  const result = searchProductInput(searchUser);
  let notFound = document.querySelector(".not-found");

  if (result == "") {
    notFound.classList.remove("desativo");
  } else {
    notFound.classList.add("desativo");
  }

  listProducts(result);
}

function searchProductInput(valueItem) {
  let arrayFilter = [];
  let search = valueItem.toLowerCase().trim();

  data.forEach((item) => {
    let itemFilter = item.nameItem.toLowerCase().trim();
    let itemCategory = item.tag[0].toLocaleLowerCase().trim();

    if (itemFilter.includes(search) || itemCategory.includes(search)) {
      arrayFilter.push(item);
    }

    if (search === "") {
      return data;
    }
  });
  return arrayFilter;
}
inputText.addEventListener("keyup", filterProductInput);

const links = document.querySelectorAll(".nav__menu li a");

function filterProductLink(event) {
  event.preventDefault();
  let clickEvent = event.target;
  let arrayFilter = [];

  data.forEach((item) => {
    let itemCategory = item.tag[0];

    if (clickEvent.innerText == itemCategory) {
      arrayFilter.push(item);
    }
  });
  listProducts(arrayFilter);

  if (clickEvent.innerText == "Todos") {
    listProducts(data);
  }
}

links.forEach((item) => {
  item.addEventListener("click", filterProductLink);
});

const formBtn = document.querySelector(".form__btn");
formBtn.addEventListener("click", (event) => {
  event.preventDefault();
});

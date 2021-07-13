function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  const clicked = event.target;
  clicked.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function fetchProductsInfo(ItemID) { // Requisito 2
  const productInfo = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
  const responseJson = await productInfo.json();
  const productByID = await responseJson;

  const cartList = document.querySelector('.cart__items');
  cartList.appendChild(createCartItemElement(productByID));
  // return productInfo;
  // minha função faz duas coisas: busca um objeto e adiciona o item ao carrinho.
  // separar função fetch
}

function recSku(event) {
  const actualItem = event.path[1];
  const foundSku = actualItem.querySelector('.item__sku').innerText;
  fetchProductsInfo(foundSku);
}

function addButtonEvent() { // Requisito 2
  const newButton = document.querySelectorAll('button.item__add');
  newButton.forEach((eachButton) => {
    eachButton.addEventListener('click', recSku);
  });
}

async function fetchProductsList() { // Requisito 1
  const resultsJson = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const responseJson = await resultsJson.json();
    const productList = await responseJson.results;

    productList.forEach((element) => {
    const elementActual = createProductItemElement(element);
    const sectionItems = document.querySelector('.items');
    sectionItems.appendChild(elementActual);
  });

  addButtonEvent();
}

window.onload = () => {
  fetchProductsList();
};

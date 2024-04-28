
let basket = [];
if (localStorage.getItem("basket") == null) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

const cardArea = document.querySelector(".filter__section__card__area");
const flowers = document.querySelectorAll(".flower");

fetch("http://localhost:3000/flowers")
  .then((res) => res.json())
  .then((data) => {
    
    localStorage.setItem("data", JSON.stringify(data));
    filteringCards(data);
    renderUI(data, "all");
  });

function filteringCards(data) {
  flowers.forEach((e) => {
    e.addEventListener("click", (a) => {
      let dataId = a.target.getAttribute("data-id");
      renderUI(data, dataId);
    });
  });
}

function renderUI(data, dataId) {
  innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i].type.includes(dataId)) {
      innerHTML += `
        <div class="filter__section__card__area__flow">
          <img src="${data[i].img}" alt="">
          <pre>${data[i].name}   ${data[i].price}$</pre>
          <button onclick="addBasket(${data[i].id}, ${data[i].price})">Add to Cart</button>
        </div>
      `;
    }
  }
  cardArea.innerHTML = innerHTML;
}

function addBasket(id, price) {
  let item = basket.find((e) => e.id == id);
  if (!item) {
    let info = JSON.parse(localStorage.getItem("data"));
    let target = info.find((e) => e.id == id);
    let newItem = { ...target, count: 1, totalPrice: target.price };
    basket.push(newItem);
    localStorage.setItem("basket", JSON.stringify(basket));
  } else {
    item.count++;
    item.totalPrice = item.count * price; 
    localStorage.setItem("basket", JSON.stringify(basket));
  }

  
  updateCartDisplay();
}

function updateCartDisplay() {
  let flowerCount = 0;
  let totalPrice = 0;
  basket.forEach((item) => {
    flowerCount += item.count;
    totalPrice += item.totalPrice;
  });


  document.querySelector('.flower__count').innerText = flowerCount;
  document.querySelector('.flower__price').innerText = totalPrice.toFixed(2) + "$";
}

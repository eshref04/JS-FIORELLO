
let basket = JSON.parse(localStorage.getItem("basket"));
const tableBody = document.querySelector('.tableBody');
const flowerPrice = document.querySelector('.flower__price');
const flowerCount = document.querySelector('.flower__count');

function addToTable(basket) {
    let innerHTML = "";
    let totalPrice = 0;
    let totalCount = 0;
    for (let i = 0; i < basket.length; i++) {
        innerHTML += `
            <tr>
                <td><img width="100px" src="${basket[i].img}" alt=""></td>
                <td>${basket[i].name}</td>
                <td>${basket[i].count}</td>
                <td>${basket[i].totalPrice}$</td>
                <td><i style="margin-left:6px; color:#1b1b1b;border-radius:4px; cursor:pointer;font-size:26px" onclick="removeProduct(${basket[i].id})" class="fa-solid fa-trash p-2"></i></td>
            </tr>
        `;
        totalPrice += basket[i].totalPrice;
        totalCount += basket[i].count;
    }
    tableBody.innerHTML = innerHTML;
    flowerPrice.textContent = totalPrice.toFixed(2) + "$";
    flowerCount.textContent = totalCount;
}

function removeProduct(id) {
    let target = basket.find((e) => e.id == id);
    let indexOfTarget = basket.indexOf(target);
    basket.splice(indexOfTarget, 1);
    localStorage.setItem("basket", JSON.stringify(basket));
    addToTable(basket);
}

addToTable(basket);


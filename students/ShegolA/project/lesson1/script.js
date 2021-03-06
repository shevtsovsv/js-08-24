
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// function makeGETRequest(url, callback) {
//         var xhr;

//         if (window.XMLHttpRequest) {
//             xhr = new XMLHttpRequest();
//         } else if (window.ActiveXObject) {
//             xhr = new ActiveXObject("Microsoft.XMLHTTP");
//         }

//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4) {
//             // console.log('-----------');
//             callback(xhr.responseText);
//             }
//         }

//         xhr.open('GET', url, true);
//         xhr.send();
//      }

/* Переделайте makeGETRequest() так, чтобы она использовала промисы. */

function makeGETRequest(url) {
    return new Promise(function(resolve, reject) {
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
}

class GoodsItem {
    constructor(title, price) {
        this.product_name = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = `<h2>Товары</h2> ${listHtml}`
    }

    calculateTotalCost () {
        let totalCost=0;
        this.goods.forEach((good) =>{
            console.log(good.price);
            totalCost += good.price;
        });
        console.log(totalCost);
    }
}

//---------------------------------------------------------------------------
let myGoodList = new GoodsList();

myGoodList.fetchGoods(() => {
    myGoodList.render();
});
// console.log(myGoodList);



myGoodList.calculateTotalCost()

//--------------------------------------------------------------------------
class Basket {
    constructor() {
        this.basketGoods = [];
    }
    fetchBasket(cb) {
        makeGETRequest(`${API_URL}/getBasket.json`).then((goods) => {
            this.basketGoods = JSON.parse(goods);
            console.log(this.basketGoods);
            cb();
        })
    }

    render() {
        let listHtml = '';
        this.basketGoods.contents.forEach(good => {
            const basketItem = new BasketItem(good.product_name, good.price,good.quantity);
            listHtml += basketItem.render();
        });
        document.querySelector('.goods-basket').innerHTML = `<h2>Корзина</h2> ${listHtml}`;
    }
    // addToBasket(cb) {
    //     makeGETRequest(`${API_URL}/addToBasket.json`).then()
    // }
}
class BasketItem {
    constructor(product_name, price, quantity) {
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
    }
    summ() {
        return this.price*this.quantity;
    }
    render() {
        return `<div class="basket-list"><h3>${this.product_name}</h3><p>${this.price} <b>${this.quantity} </b></p></div>`;
    }
}

let myBasket = new Basket();

myBasket.fetchBasket(() => {
    myBasket.render();
});
console.log(myBasket);
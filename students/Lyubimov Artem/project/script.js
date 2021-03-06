class GoodsItem {
    constructor({title, price}) {
        this.title = title
        this.price = price
    }

    render() {
        return `
        <div class="goods-item">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
        </div>
        `
    }
}

class GoodsList {
    constructor() {
        this.goods = []
        this.fetchGoods()
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ]
    }

    getSum() {
        const sum = this.goods.reduce((sum, good) => {
            return sum + good.price
        }, 0)
        const sumBlock = document.createElement('div')
        sumBlock.classList.add('cart-sum')
        sumBlock.innerText = `Сумма товаров в списке: ${sum}`
        console.log(sumBlock)
    }

    render() {
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item)
            return goodsItem.render()
        })
        document.querySelector('.goods-list').innerHTML = goodsList.join('')
    }
}

class CartItem {
    constructor() {

    }

    plusCartItem() {

    }

    minusCartItem() {
        
    }
}

class CartList {
    constructor() {

    }

    render() {
        
    }
}

const goodsList = new GoodsList()
goodsList.render()
goodsList.getSum()
  
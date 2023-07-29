var wcart = document.querySelector('#wcart');
var wtotal = document.querySelector('#wtotal');

// add Femalewear
function addFemalewear(wid){
    // get Femalewear name
    femalewearId = '#fem' + wid;
    var name = document.querySelector(femalewearId).innerHTML;

    // get femalewear price
    var radio = 'femalewear' + wid;
    var pri = document.getElementsByName(radio);
    var size, price;
    if (pri[0].checked) {
        price = pri[0].value;
        size = 'M';
    }
    else {
        price = pri[1].value;
        size = 'L';
    }

    var orders = JSON.parse(localStorage.getItem('orders'));
    var total = localStorage.getItem('total');
    var cartSize = orders.length;

    // saving item and total in localstorage
    orders[cartSize] = [name, size, price];
    localStorage.setItem('orders', JSON.stringify(orders));

    total = Number(total) + Number(price);
    localStorage.setItem('total', total);

    // Updating number of items in shopping Cart
    var cart = document.querySelector("#cart");
    cart.innerHTML = orders.length;

    butt = '<div class="del" onclick="removeFemalewear(' + cartSize + ')">x</div>';
    wtotal.innerHTML = 'Total: ' + total + ' $';
    wcart.innerHTML += '<li>'+ name + ' ' + size + ': ' + price + ' $' + butt + '</li>';
}

function wshoppingCart() {
    var orders = JSON.parse(localStorage.getItem('orders'));
    var total = localStorage.getItem('total');
    var cartSize = orders.length;
    wcart.innerHTML = ''
    for (let i = 0; i < cartSize; i++) {
        butt = '<div class="del" onclick="removeFemalewear(' + i + ')">x</div>';
        wcart.innerHTML += '<li>'+ orders[i][0] + ' ' + orders[i][1] + ': ' + orders[i][2] + ' $' + butt + '</li>'; 
    }
    wtotal.innerHTML = 'Total: ' + total + ' $';

}

wshoppingCart();

function removeFemalewear(n) {
    var orders = JSON.parse(localStorage.getItem('orders'));
    var total = localStorage.getItem('total');

    total = Number(total) - Number(orders[n][2]);
    orders.splice(n, 1);
    
    // Updating number of items in shopping cart
    var cart = document.querySelector('#cart');
    cart.innerHTML = orders.length;

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('total', total);
    
    wshoppingCart();   
    
}
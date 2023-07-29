var mcart = document.querySelector('#mcart');
var mtotal = document.querySelector('#mtotal');

// add Malewear
function addMalewear(mid){
    // get Malewear name
    malewearId = '#mal' + mid;
    var name = document.querySelector(malewearId).innerHTML;

    // get malewear price
    var radio = 'malewear' + mid;
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

    butt = '<div class="del" onclick="removeMalewear(' + cartSize + ')">x</div>';
    mtotal.innerHTML = 'Total: ' + total + ' $';
    mcart.innerHTML += '<li>'+ name + ' ' + size + ': ' + price + ' $' + butt + '</li>';
}

function mshoppingCart() {
    var orders = JSON.parse(localStorage.getItem('orders'));
    var total = localStorage.getItem('total');
    var cartSize = orders.length;
    mcart.innerHTML = ''
    for (let i = 0; i < cartSize; i++) {
        butt = '<div class="del" onclick="removeMalewear(' + i + ')">x</div>';
        mcart.innerHTML += '<li>'+ orders[i][0] + ' ' + orders[i][1] + ': ' + orders[i][2] + ' $' + butt + '</li>'; 
    }
    mtotal.innerHTML = 'Total: ' + total + ' $';

}

mshoppingCart();

function removeMalewear(n) {
    var orders = JSON.parse(localStorage.getItem('orders'));
    var total = localStorage.getItem('total');

    total = Number(total) - Number(orders[n][2]);
    orders.splice(n, 1);
    
    // Updating number of items in shopping cart
    var cart = document.querySelector('#cart');
    cart.innerHTML = orders.length;

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('total', total);
    
    mshoppingCart();   
    
}
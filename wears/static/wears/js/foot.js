var fcart = document.querySelector('#fcart');
var ftotal = document.querySelector('#ftotal');

// add Footwear
function addFootwear(fid){
    // get footwear name
    footwearId = '#fot' + fid;
    var name = document.querySelector(footwearId).innerHTML;

    // get footwear price
    var radio = 'footwear' + fid;
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

    butt = '<div class="del" onclick="removeFootwear(' + cartSize + ')">x</div>';
    ftotal.innerHTML = 'Total: ' + total + ' $';
    fcart.innerHTML += '<li>'+ name + ' ' + size + ': ' + price + ' $' + butt + '</li>';
}

function fshoppingCart() {
    var orders = JSON.parse(localStorage.getItem('orders'));
    var total = localStorage.getItem('total');
    var cartSize = orders.length;
    fcart.innerHTML = ''
    for (let i = 0; i < cartSize; i++) {
        butt = '<div class="del" onclick="removeFootwear(' + i + ')">x</div>';
        fcart.innerHTML += '<li>'+ orders[i][0] + ' ' + orders[i][1] + ': ' + orders[i][2] + ' $' + butt + '</li>'; 
    }
    ftotal.innerHTML = 'Total: ' + total + ' $';

}

fshoppingCart();

function removeFootwear(n) {
    var orders = JSON.parse(localStorage.getItem('orders'));
    var total = localStorage.getItem('total');

    total = Number(total) - Number(orders[n][2]);
    orders.splice(n, 1);
    
    // Updating number of items in shopping cart
    var cart = document.querySelector('#cart');
    cart.innerHTML = orders.length;

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('total', total);
    
    fshoppingCart();   
    
}
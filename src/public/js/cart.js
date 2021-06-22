let cart = [];

function addOneProduct(event, product) {
    product = JSON.parse(product);
    console.log('here', product);
    const order = {};
    order.product = JSON.stringify(product);
    order.quantity = 1;
    order.orderPrice = product.price;
    const orderPost = $.post( 'http://localhost:3000/cart/add', order );

    orderPost.done(() => {
        location.reload();
    });
}


function addToCartByForm(event, product) {
    product = JSON.parse(product);
    event.preventDefault();
    // console.log(event, product);

    const quantity = document.getElementById("prod_quantity").value;
    const orderPrice = quantity * product.price;

    const order = {};
    order.product = JSON.stringify(product);    
    order.quantity = quantity;
    order.orderPrice = orderPrice;

    console.log(order);

    const form = $("#cart_form");
    const url = form.attr( "action" );
    

    const orderPost = $.post( url, order );

    orderPost.done(() => {
        location.reload();
    });

}

function incrementProductQt(order, cartTotal) {
    order = JSON.parse(order);    
    const orderId = order.id;
    const op = '+';
    const newQt = order.quantity+1;
    const url = 'http://localhost:3000/cart/orders/update';
    const currentTotal = cartTotal;
    // console.log(order, op, newQt, currentTotal);

    const cartUpdate = $.post(url, {orderId, newQt, op, currentTotal});
    document.getElementById(`product_${order.productId}_qt`).value = newQt;
    cartUpdate.done(() => {
       location.reload();
    });
}

function decrementProductQt(order, cartTotal) {
    order = JSON.parse(order);
    // console.log(order);
    if (order.quantity - 1 === 0) {
        return;
    }
    const orderId = order.id;
    const op = '-';
    const newQt = order.quantity-1;
    const url = 'http://localhost:3000/cart/orders/update';
    const currentTotal = cartTotal;
    // console.log(order, op, newQt, currentTotal);
    const cartUpdate = $.post(url, {orderId, newQt, op, currentTotal});
    document.getElementById(`product_${order.productId}_qt`).value = newQt;
    cartUpdate.done(() => {        
        location.reload();
    });
}

function removeOrderFromCart(order, cartTotal) {
    order = JSON.parse(order);
    const orderId = order.id;
    const currentTotal = cartTotal;
    const url = 'http://localhost:3000/cart/remove';
    const cartRemove = $.post(url, {orderId, currentTotal});

    cartRemove.done(() => {
        location.reload();
    })
}
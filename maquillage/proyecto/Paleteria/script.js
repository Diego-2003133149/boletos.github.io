// Obtener referencia al botón de "Agregar al carrito"
var addToCartButtons = document.getElementsByClassName('add-to-cart');

// Agregar evento click a cada botón de "Agregar al carrito"
for (var i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', addToCart);
}

// Función para agregar un producto al carrito
function addToCart(event) {
  var button = event.target;
  var name = button.getAttribute('data-name');
  var price = parseFloat(button.getAttribute('data-price'));

  // Crear objeto del producto
  var product = {
    name: name,
    price: price
  };

  // Obtener carrito del almacenamiento local o crear uno nuevo si no existe
  var cartItems = localStorage.getItem('cartItems');
  var cart = cartItems ? JSON.parse(cartItems) : [];

  // Agregar producto al carrito
  cart.push(product);

  // Guardar carrito en el almacenamiento local
  localStorage.setItem('cartItems', JSON.stringify(cart));

  // Actualizar el número de ítems en el carrito
  updateCartCount(cart.length);

  // Actualizar el carrito de compras
  updateCartUI(cart);
}

// Función para actualizar el número de ítems en el carrito
function updateCartCount(count) {
  var cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.textContent = count;
}

// Función para actualizar la interfaz del carrito
function updateCartUI(cart) {
  var listaCarrito = document.getElementById('lista-carrito');
  var totalElement = document.getElementById('total');

  // Limpiar la lista del carrito
  listaCarrito.innerHTML = '';

  // Recorrer los productos en el carrito
  var total = 0;
  cart.forEach(function(product) {
    // Crear elementos para mostrar la información del producto
    var li = document.createElement('li');
    var nameSpan = document.createElement('span');
    nameSpan.textContent = product.name;
    var priceSpan = document.createElement('span');
    priceSpan.textContent = '$' + product.price.toFixed(2);

    // Agregar elementos al elemento li
    li.appendChild(nameSpan);
    li.appendChild(priceSpan);

    // Agregar el elemento li a la lista del carrito
    listaCarrito.appendChild(li);

    // Sumar el precio al total
    total += product.price;
  });

  // Actualizar el total en la interfaz
  totalElement.textContent = 'Total: $' + total.toFixed(2);
}

// Obtener carrito del almacenamiento local y actualizar el contador y la interfaz
var cartItems = localStorage.getItem('cartItems');
var cart = cartItems ? JSON.parse(cartItems) : [];
updateCartCount(cart.length);
updateCartUI(cart);






const CARRITO_NAME = "carrito";

const renderCarrito = () => {
    const carrito = document.querySelector("#carrito");
    const carritoLista = localStorage.getItem(CARRITO_NAME);
    const emptyButton = document.querySelector("#vaciar-carrito");

    if (carritoLista) {
        const productos = JSON.parse(carritoLista);
        const render = [`<h2>Carrito</h2><ul class="list-group">`];

        productos.forEach((producto) => {
            const price = parseFloat(producto.productPrice).toFixed(2);
            render.push(`<li class="list-group-item list-group-item-success">${producto.productName} - $${price}</li>`);
        });
        render.push("</ul>");

        carrito.innerHTML = render.join("");
        emptyButton.classList.remove("d-none");
    } else {
        carrito.innerHTML = "";
        emptyButton.classList.add("d-none");
    }
};

const addToCart = (producto) => {
    const carritoLista = localStorage.getItem(CARRITO_NAME);

    if (carritoLista) {
        const productos = JSON.parse(carritoLista);

        if (productos.find((p) => p.productName === producto.productName)) {
            return;
        }

        productos.push(producto);
        localStorage.setItem(CARRITO_NAME, JSON.stringify(productos));
    } else {
        localStorage.setItem(CARRITO_NAME, JSON.stringify([producto]));
    }

    renderCarrito();
};

const main = () => {
    window.addEventListener("load", () => {
        // render inicial del carrito
        renderCarrito();

        // inicializo los listeners de los botones
        const botones = document.querySelectorAll('[data-add-cart]');
        botones.forEach((button) => button.addEventListener("click", () => {
            const productName = button.dataset.product;
            const productPrice = button.dataset.price;
            const product = {productName, productPrice};
            addToCart(product);
        }))

        // inicializo el boton de vaciar
        const emptyButton = document.querySelector("#vaciar-carrito");
        emptyButton.addEventListener("click", () => {
            localStorage.removeItem(CARRITO_NAME);
            renderCarrito();
        });
    });
};

main();
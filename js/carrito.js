const baseDeDatos = [
    {
        id: 1,
        nombre: 'View into a Cafe - Ring',
        precio: 99.95,
        info: '../img/anillo_dobleModelo.webp',
        imagen: '../img/anillo_dobleS.webp',
        categorias: ['anillos']
    },
    {
        id: 2,
        nombre: 'Clementine - Purple Ring',
        precio: 44.95,
        imagen: '../img/anillo_corazonS.webp',
        info: '../img/anillo_corazonModelo.webp',
        categorias: ['anillos']
    },
    {
        id: 3,
        nombre: 'Sakura - Blue Ring',
        precio: 79.95,
        imagen: '../img/anillo_florS.webp',
        info: '../img/anillo_florModelo.webp',
        categorias: ['anillos']
    },
    {
        id: 4,
        nombre: 'Ecstasy - Earrings',
        precio: 99.95,
        imagen: '../img/pendiente_verdeS.webp',
        info: '../img/pendiente_verdeModelo.webp',
        categorias: ['pendientes']
    },
    {
        id: 5,
        nombre: 'Cypress - Earrings',
        precio: 54.95,
        imagen: '../img/pendientes_llamaS.webp',
        info: '../img/pendientes_llamaModelo.webp',
        categorias: ['pendientes']
    },
    {
        id: 6,
        nombre: 'Nate - Earrings',
        precio: 39.95,
        imagen: '../img/pendientes_corazonS.webp',
        info: '../img/pendientes_corazonModelo.webp',
        categorias: ['pendientes']
    },
    {
        id: 7,
        nombre: 'Nana - Necklace',
        precio: 59.95,
        imagen: '../img/collar_corazonS.webp',
        info: '../img/collar_corazonModelo.webp',
        categorias: ['collares']
    },
    {
        id: 8,
        nombre: 'Crucifix - Necklace',
        precio: 134.95,
        imagen: '../img/collar_crucesS.webp',
        info: '../img/collar_crucesModelo.webp',
        categorias: ['collares']
    },
    {
        id: 9,
        nombre: 'Fallen Angel - Necklace',
        precio: 64.95,
        imagen: '../img/collar_angelS.webp',
        info: '../img/collar_angelModelo.webp',
        categorias: ['collares']
    }
];

let carrito = [];
const divisa = '€';

const DOMitems = document.querySelector('#item2'); // objeto HTML donde añadir los productos
console.log("DOMitems", DOMitems);

const DOMcarrito = document.querySelector('#carrito2');

const DOMtotal = document.querySelector('#total');

const DOMbotonVaciar = document.querySelector('#boton-vaciar');

const DOMcontCarrito = document.querySelector('#contador-productos');

// -----------------------------------------------------

// Funciones
//* Funciones de "dibujar"
//* Dibujar productos


function renderizarProductos(productos = baseDeDatos) {
    // Limpiar el contenedor de productos antes de agregar los nuevos
    DOMitems.innerHTML = '';

    productos.forEach(producto => {
        const miNodo = document.createElement('section');
        miNodo.classList.add('foto');

        const divImg = document.createElement('div');


        const miNodoImg = document.createElement('img');
        miNodoImg.setAttribute('src', producto.imagen);


        const miNodoInfo = document.createElement('img');
        miNodoInfo.setAttribute('src', producto.info);


        const miNodoNombre = document.createElement('p');
        miNodoNombre.textContent = producto.nombre;


        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.textContent = producto.precio + divisa;


        const pBoton = document.createElement('p');

        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('mas');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', producto.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);


        //* añadimos:
        miNodo.append(divImg);
        divImg.append(miNodoInfo);
        miNodo.append(miNodoImg);
        miNodo.append(miNodoNombre);
        miNodo.append(miNodoPrecio);
        miNodo.append(pBoton);
        pBoton.append(miNodoBoton);

        DOMitems.append(miNodo);
    });
}


function showProductos(){
    const barraProd = document.querySelector('.barraProductos');

    if(barraProd.style.display == 'flex'){
        barraProd.style.display = 'none';
    } else {
        barraProd.style.display = 'flex';
    }       
}

function dontShow(){
    const barraProd = document.querySelector('.barraProductos');
    barraProd.style.display = 'none';
}

let productosMostrados = []; 
function mostrarFiltradoAnillos(){
    productosMostrados = baseDeDatos.filter(producto => producto.categorias.includes('anillos'));
    renderizarProductos(productosMostrados);
}

function mostrarFiltradoCollares(){
    productosMostrados = baseDeDatos.filter(producto => producto.categorias.includes('collares'));
    renderizarProductos(productosMostrados);
}

function mostrarFiltradoPendientes(){
    productosMostrados = baseDeDatos.filter(producto => producto.categorias.includes('pendientes'));
    renderizarProductos(productosMostrados);
}

function mostrarTodos() {
    renderizarProductos();
}


//* Dibujar carrito


function anyadirProductoAlCarrito(evento){
    console.log(evento.target);
    carrito.push(evento.target.getAttribute("marcador"));

    console.log(carrito);

    renderizarCarrito();
}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {

    DOMcarrito.innerHTML = ''; // borro los li del carrito

    const carritoSinDuplicados = new Set(carrito);

    carritoSinDuplicados.forEach( idProducto =>{
    //     <div class="productos">
    //           <section>
    //              <p>
    //                  <b>x2</b>
    //              </p>
    //              <p>Palworld</p>
    //              <p>28,99€</p>
    //              <button id="quitar" class="papelera" type="reset"><i class="fa-solid fa-trash"></i></button>
    //          </section>
    //     </div>  

        // Buscar el objeto producto por id
        const producto = getItem(idProducto);
        console.log("producto:"+producto);

        const numUnidadesProducto = getNumUnidades(idProducto);
        console.log("numUnidadesProducto:",numUnidadesProducto);


        const divProductos = document.createElement('div');
        divProductos.classList.add('productos');

        const miSection = document.createElement("section");

        const pCantidad = document.createElement("p");
        const bCantidad = document.createElement("b");
        bCantidad.textContent = numUnidadesProducto;

        const pNombre = document.createElement("p");
        pNombre.textContent = producto.nombre;

        const pPrecio = document.createElement("p");
        pPrecio.textContent = producto.precio + divisa;

        const miBoton = document.createElement('button');
        miBoton.classList.add('papelera');
        miBoton.dataset.idProducto = producto.id;
        miBoton.style.marginLeft = '5rem';
        
        const iBoton = document.createElement("i");
        iBoton.classList.add('fa-solid', 'fa-trash');

        miBoton.addEventListener('click',borrarItemCarrito);

        //* añadimos:
        divProductos.append(miSection);

        miSection.append(pCantidad);
        pCantidad.append(bCantidad);

        miSection.append(pNombre);
        miSection.append(pPrecio);

        miSection.append(miBoton);
        miBoton.append(iBoton);
        DOMcarrito.append(divProductos);

    });

    DOMtotal.textContent = calcularTotal();
    DOMcontCarrito.textContent = getTotalUnidades();
    guardarCarritoEnLocalStorage();
}

/**
 * Devuelve el item (objeto) del carrito
 */
function getItem(id) {
    return baseDeDatos.find( producto => producto.id == id);
}


/**
 * Devuelve el número de unidades de un mismo producto en el carrito
 */
function getNumUnidades(id) {
    return carrito.filter( idProducto => idProducto == id).length;
}

function getTotalUnidades(){
    return carrito.length;
}

/**
 * Evento para borrar un elemento del carrito (completo, con todas unidades)
 */
function borrarItemCarrito(evento) {
    const idBorrar = evento.target.dataset.idProducto;

    const index = carrito.findIndex(id => id === idBorrar);
    if (index !== -1) {
        carrito.splice(index, 1); 
    }

    renderizarCarrito();

}

// function borrarItemCarrito(evento) {
//     const idBorrar = evento.target.dataset.idProducto;

//     carrito = carrito.filter( id => (id != idBorrar) );

//     renderizarCarrito();

// }

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {

    let total = 0;
    let objProducto;

    for (const id of carrito) {
        objProducto = getItem(id);
        total += objProducto.precio;
    }

    return total.toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    
    if (confirm('¿Seguro que quieres vaciar el carrito?')){
        if(carrito == 0){
            alert('El carrito ya estaba vacío..');
        } else
        carrito = [];

    }
    renderizarCarrito();
}

// -----------------------------------------------------------------------------
// Eventos
// -----------------------------------------------------------------------------
DOMbotonVaciar.addEventListener('click',vaciarCarrito);

// -----------------------------------------------------------------------------
// LocalStorage
// -----------------------------------------------------------------------------
function guardarCarritoEnLocalStorage(){
    window.localStorage.setItem("miniBD",JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage(){
    if (window.localStorage.getItem("miniBD"))
        carrito = JSON.parse(window.localStorage.getItem("miniBD"));
}


// -----------------------------------------------------------------------------
window.addEventListener('load',cargarCarritoDeLocalStorage);
window.addEventListener('load',mostrarTodos);
window.addEventListener('load',renderizarCarrito);
window.addEventListener('load',dontShow);
// -----------------------------------------------------------------------------

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    navbarAn();
})

function navbarAn(){
    const navbar = document.getElementById('itemNav');
    console.log(navbar.style.opacity)
    let scrollTop = window.scrollY ;

    if (scrollTop > lastScrollTop) {
        navbar.style.top = '-100%';
        navbar.style.transition = 'top 0.5s ease-in-out';
    } else {
        
        navbar.style.top = '0';
        navbar.style.transition = 'top 0.2s ease-in-out';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}


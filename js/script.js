const container = document.getElementById('container')
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () =>{
    container.classList.add("active")
} );

loginBtn.addEventListener('click', () =>{
    container.classList.remove("active")
} );




function showSidebar(){
    const barralat = document.querySelector('.barralat')
    barralat.style.display = 'flex' /* se convierte en flex por lo que se muestra (si lo hacemos manualmente el cambiar en css*/
                                /* el display de .barralat a flex vemos como sale */
}

function hideSidebar(){
    const barralat = document.querySelector('.barralat')
    barralat.style.display = 'none' /* aqui ocurriria lo mismo que en el antertior solo que al poner none se oculta el "menu" */
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

window.addEventListener('load',dontShow);


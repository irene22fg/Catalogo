const DOM = {
    select:document.getElementById("categorias-inicial"),
    select2:document.getElementById("categorias-modificar"),
    divContainer:document.getElementById("container"),
    anadir:document.getElementById("anadir"),
    link:document.getElementById("link"),
    titulo:document.getElementById("titulo"),
    modificar:document.getElementById("modificar"),
    borrar:document.getElementById("borrar"),
    guardar:document.getElementById("guardar")
};

var categorias;
var catalogo;
// Añade 2 categorías más de temas que  quieras
var strCategorias='[{"nombre":"Jamones"},{"nombre":"Quesos"},{"nombre":"Turrones"},{"nombre":"Cereales"},{"nombre":"Vinos"}]';
// Añade 3 imágenes a cada categorías para tenerlas ya desde el comienzo
var strCatalogo = '[{"id":1,"src":"https://cdn.metro-group.com/es/es_pim_74739001001_01.png?w=400&h=400&mode=pad","titulo":"Sanches Alcaraz ETG Jamón serrano reserva","categoria":"Jamones"},\
{"id":2,"src":"https://cdn.metro-group.com/es/es_pim_23262001001_01.png?w=400&h=400&mode=pad","titulo":"La era Jamón serrano reserva ETG 7,2/7,5kg","categoria":"Jamones"},\
{"id":3,"src":"https://cdn.shopify.com/s/files/1/1589/5089/products/jamon-serrano_reserva_grande-min_800x.png?v=1615211393","titulo":"Jamones Pinante Jamón serrano reserva","categoria":"Jamones"},\
{"id":4,"src":"https://www.molinasecaonline.com/image/cache/data/Charcuteria/Queso%20nacional/queso%20oveja%20boffard%20entero-882x882.jpg","titulo":"Boffard Queso curado reserva oveja","categoria":"Quesos"},\
{"id":5,"src":"https://www.garciabaquero.com/wp-content/uploads/2020/09/0000s_0014_VillacentenoCurado.png","titulo":"García Baquero Queso manchego curado villacenteno","categoria":"Quesos"},\
{"id":6,"src":"https://exquisitoo.com/298-home_default/queso-de-oveja-leche-cruda-curado-295-305-kg.jpg","titulo":"Fabeiro Queso curado de oveja leche cruda","categoria":"Quesos"},\
{"id":7,"src":"https://ep01.epimg.net/elcomidista/imagenes/2016/12/09/articulo/1481288620_126075_1481289143_sumario_normal.jpg","titulo":"Suchard turrón clásico","categoria":"Turrones"},\
{"id":8,"src":"https://m.media-amazon.com/images/I/81XbrWRVoYL._AC_SX679_.jpg","titulo":"Picó Turrón de Alicante","categoria":"Turrones"},\
{"id":9,"src":"https://www.periodistadigital.com/wp-content/uploads/2018/12/turrones-mas-vendidos-almendro-blando.jpg","titulo":"El almendro Turrón blando","categoria":"Turrones"},\
{"id":10,"src":"https://static.ulabox.com/media/119750_xl.jpg","titulo":"Nestlé Lion caramelo y chocolate","categoria":"Cereales"},\
{"id":11,"src":"https://www.kelloggs.es/content/dam/europe/kelloggs_es/images/our-brands/all-bran/cocopops.png","titulo":"Kellogg`s Choco Krispies","categoria":"Cereales"},\
{"id":12,"src":"https://www.supermercadosmas.com/media/catalog/product/cache/d91bc430dbe2e3d899436802c7aa5233/i/m/import_aecoc_images_08710100127300_ecommerce_51028.jpg","titulo":"Quaker Cruesli chocolate","categoria":"Cereales"},\
{"id":13,"src":"https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201610/11/00118738800616____2__600x600.jpg","titulo":"Pruno Vino tinto crianza Ribera del Duero","categoria":"Vinos"},\
{"id":14,"src":"https://alcazaren.com.gt/wp-content/uploads/2020/06/132001.png","titulo":"Barton & Guestier Vino tinto Cabernet Sauvignon","categoria":"Vinos"},\
{"id":15,"src":"https://www.tusvinosonline.com/media/rioja-vega-crianza1.png","titulo": "Rioja Vega Crianza Vino tinto", "categoria":"Vinos"}]';

//-----------------------------AddEventListener----------------------------------
DOM.select.addEventListener('change', () => {mostrarImagenes(DOM.select.value)});
DOM.divContainer.addEventListener('click', seleccionar);
DOM.anadir.addEventListener('click', anadirProducto);
DOM.modificar.addEventListener('click', modificar);
DOM.borrar.addEventListener('click', borrar);
DOM.guardar.addEventListener('click', guardar);
//--------------------------------------------------------------------------------
//---------------------------------funcion IIFE-----------------------------------
(function(){
    // Obtenemos las categorias del localStorage ... y si no hay las cargamos del string JSON
    categorias = JSON.parse(localStorage.getItem("categorias"));
    if (!categorias)
        categorias=JSON.parse(strCategorias);
    // Obtenemos el catálogo del localStorage ... y si no hay lo cargamos del string JSON
    catalogo = JSON.parse(localStorage.getItem("catalogo"));
    if (!catalogo)
        catalogo=JSON.parse(strCatalogo);

    //Metemos los options en el select estático del HTML
    categorias.forEach(categoria => DOM.select.appendChild(crearNodo("option", categoria.nombre, [], [{name:"value", value:categoria.nombre}])));
    categorias.forEach(categoria => DOM.select2.appendChild(crearNodo("option", categoria.nombre, [], [{name:"value", value:categoria.nombre}])));
    mostrarImagenes(DOM.select.value);
})();
//--------------------------------------------------------------------------------
//-----------------------------Funciones CRUD productos---------------------------
function borrar(){

}

function modificar(){
    let link = DOM.link.value;
    let titulo = DOM.titulo.value;
    if(!link) return;
    if(!titulo) return;
}

function anadirProducto(){
    let link = DOM.link.value;
    let titulo = DOM.titulo.value;
    if(!link) return;
    if(!titulo) return;
    let producto = {"id": catalogo.length+1, "src": link, "titulo": titulo, "categoria": DOM.select.value};
    catalogo.push(producto);
    DOM.link.value = "";
    DOM.titulo.value = "";
    mostrarImagenes(DOM.select.value);
}
//--------------------------------------------------------------------------------
//------------------------------Delegación de eventos-----------------------------
let seleccionada;

function seleccionar(event){
    let target = event.target.closest('.tarjeta');
    if(!target) return;
    if(!DOM.divContainer.contains(target)) return;
    destacar(target);
}

function destacar(divImagen){
    if(seleccionada)
        seleccionada.classList.remove('seleccionada');
    seleccionada = divImagen;
    seleccionada.classList.add('seleccionada');
    DOM.modificar.disabled = false;
    DOM.select2.disabled = false;
    DOM.borrar.disabled = false;
}   
//--------------------------------------------------------------------------------
//----------------------------------Mostrar imagenes------------------------------
function mostrarImagenes(categoria){
    borrarNodo(DOM.divContainer);     //Borramos los nodos que haya en el divContainer para mostrar las nuevas imagenes
    let filtrado = catalogo.filter(producto => producto.categoria == categoria);
    filtrado.forEach(producto => {
        let div = crearNodo("div", "", ["tarjeta"], []);
        div.appendChild(crearNodo("img", "", [], [{name:"src", value:producto.src}]));
        div.appendChild(crearNodo("div", producto.titulo, ["nompre-producto"], []));
        DOM.divContainer.appendChild(div);
    })
}
//--------------------------------------------------------------------------------
//--------------------------------localStorage------------------------------------
function guardar(){
    if(localStorage.getItem("catalogo") == null)
        localStorage.setItem("catalogo", JSON.stringify([]));
    let productos = JSON.parse(localStorage.getItem("catalogo"));  //Sacamos localStorage
    catalogo.forEach(productoLocal => {   //para cada producto del LS comprobamos si ya está añadido
        let productoEncontrado = productos.find(producto => producto.id == productoLocal.id);   //Devuelve el producto si lo encuentra
        if(productoEncontrado == undefined)  // si es undefined lo añadimos, ya que no ha sido encontrado
            anadirLocalStorage(productoLocal);
    })
}

function anadirLocalStorage(producto){
    let catalogo =JSON.parse(localStorage.getItem("catalogo"));
    catalogo.push(producto);
    localStorage.setItem("catalogo", JSON.stringify(catalogo));
}

function eliminarLocalStorage(recetaBorrar){
    let recetas =JSON.parse(localStorage.getItem("recetas"));
    recetas.todo = recetas.todo.filter(receta => receta.nombre != recetaBorrar.nombre);
    localStorage.setItem("recetas", JSON.stringify(recetas));
}
//--------------------------------------------------------------------------------
//------------------------------Crear y borrar nodos------------------------------
function borrarNodo(container) {       //función BORRAR NODO
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function crearNodo(tipo, texto, clases, atributos) {     //función CREAR NODO
    let nodo = document.createElement(tipo);
    if (texto != "" && texto != null) {
        nodo.appendChild(document.createTextNode(texto));
    }
    if (clases.length > 0) {
        clases.forEach(clase => nodo.classList.add(clase));
    }
    if (atributos.length > 0) {
        atributos.forEach(atributo => nodo.setAttribute(atributo.name, atributo.value));
    }
    return nodo;
}
//--------------------------------------------------------------------------------
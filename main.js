// ------------------------------------------------------Inicio Carrito Aside ----------------------------------------//

//...............Inicio Ocultar Carrito Aside...............//
//..................Inicio Agregar al Carrito Funciones.............//

const botonesComprarProducto = document.querySelectorAll(".comprar");
const contenidoCarrito = document.querySelector(".alertas-contenido-carrito");
const tarjetasCarrito = document.querySelectorAll(".tarjeta-carrito");

const agregarProductos = () => {
  for (let botonComprarProducto of botonesComprarProducto) {
    botonComprarProducto.onclick = () => {
      botonComprarProducto.classList.add("producto-agregado");
    };
  }
};

const coincideBotonConTarjeta = () => {
  for (let botonComprarProducto of botonesComprarProducto) {
    for (let tarjetaCarrito of tarjetasCarrito) {
      if (
        botonComprarProducto.dataset.nombre == tarjetaCarrito.dataset.nombre
      ) {
        tarjetaCarrito.classList.remove("ocultar");
      }
    }
  }
};

const clickCarrito = document.querySelector("#click-carrito");
const botonCerrarCarrito = document.querySelector("#cerrar-carrito");
const asideCarrito = document.querySelector("#carrito");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

const mostrarCarritoAside = () => {
  asideCarrito.classList.remove("hidden");
  overlay.classList.remove("ocultar");
  body.classList.add("overflow");
};

clickCarrito.onclick = () => {
  mostrarCarritoAside();
  agregarProductos();
  const productosAgregados = document.querySelectorAll(".producto-agregado");
  coincideBotonConTarjeta();

  if (productosAgregados.length === 0) {
    contenidoCarrito.textContent =
      "No tienes productos en el carrito, ¡agrega algunos!";
  } else {
    coincideBotonConTarjeta();
  }
};

botonCerrarCarrito.onclick = () => {
  asideCarrito.classList.add("hidden");
  overlay.classList.add("ocultar");
  body.classList.remove("overflow");
};

//..................Fin Ocultar Carrito Aside...............//

//..................Inicio Vaciar Carrito Aside.............//

const vaciarCarrito = document.querySelector("#vaciar-carrito");
const cancelarVaciarCarrito = document.querySelector(
  ".boton-cancelar-vaciar-carrito"
);
const vaciarCarritoSection = document.querySelector(".vaciar-carrito-section");

vaciarCarrito.onclick = () => {
  vaciarCarritoSection.classList.remove("hidden");
  overlay.classList.add("overlay-aumentado");
};
cancelarVaciarCarrito.onclick = () => {
  vaciarCarritoSection.classList.add("hidden");
  overlay.classList.remove("overlay-aumentado");
};
// termina aca vaciar carrito aside SIN BORRAR PRODUCTOS
//.....................Fin Vaciar Carrito Aside.............//

//.................Inicio Carrito Checkout Display..........//
const botonComprarCarrito = document.querySelector(".boton-comprar-carrito");
const carritoCheckout = document.querySelector(".checkout");
const botonSeguirComprandoCheckout = document.querySelector(
  "#seguir-comprando-checkout"
);
const botonFinalizarCompraCheckout = document.querySelector(
  "#finalizar-compra-checkout"
);

botonComprarCarrito.onclick = () => {
  overlay.classList.add("overlay-aumentado");
  carritoCheckout.classList.remove("ocultar-checkout");
};

botonFinalizarCompraCheckout.onclick = () => {
  carritoCheckout.classList.add("ocultar-checkout");
  asideCarrito.classList.add("hidden");
  overlay.classList.add("ocultar");
  body.classList.remove("overflow");
  overlay.classList.remove("overlay-aumentado");
};

botonSeguirComprandoCheckout.onclick = () => {
  carritoCheckout.classList.add("ocultar-checkout");
  overlay.classList.remove("overlay-aumentado");
};

//..................Inicio Funciones Checkout.............//

const efectivo = document.querySelectorAll("input[value='efectivo-debito']");
const credito = document.querySelector("input[value='tarjeta-credito']");
const envioOpcion = document.querySelector("input[name='envio']");
const tarjetaDescuento = document.querySelector("input[name='descuento']");
let subtotal = document.querySelector(".subtotal-checkout-importe");
const recargo = document.querySelector(".recargo-checkout-importe");
const renglonEnvio = document.querySelector(".envio-checkout");
const renglonRecargo = document.querySelector(".recargo-checkout");
const renglonDescuento = document.querySelector(".descuento-checkout");
const descuento = document.querySelector(".descuento-checkout-importe");
const envio = document.querySelector(".envio-checkout-importe");
const total = document.querySelector(".total-checkout-importe");
const opcionesDePago = document.querySelectorAll(".metodos-de-pago");

// el problema esta en la declaracion de subtotal que no reflej en el textcontent del carrito
subtotal = 5540;
subtotal.textContent = 5540;

let subtotalNumero = Number(subtotal);

for (let opcion of opcionesDePago) {
  opcion.oninput = () => {
    calcularTotal();
  };
}
let resultadoRecargo;

const recargoTarjeta = () => {
  if (credito.checked) {
    resultadoRecargo = subtotalNumero * 0.1;
    console.log(resultadoRecargo);
    recargo.textContent = resultadoRecargo;
    renglonRecargo.classList.remove("ocultar");
  } else {
    resultadoRecargo = 0;
    renglonRecargo.classList.add("ocultar");
  }
  return resultadoRecargo;
};

let resultadoDescuento;

const aplicarDescuento = () => {
  if (tarjetaDescuento.checked) {
    resultadoDescuento = -subtotalNumero * 0.05;
    descuento.textContent = resultadoDescuento;
    renglonDescuento.classList.remove("ocultar");
  } else {
    resultadoDescuento = 0;
    renglonDescuento.classList.add("ocultar");
  }
  return resultadoDescuento;
};

let resultadoEnvio;

const recargoEnvio = () => {
  if (envioOpcion.checked) {
    resultadoEnvio = 300;
    envio.textContent = resultadoEnvio;
    renglonEnvio.classList.remove("ocultar");
  } else {
    resultadoEnvio = 0;
    renglonEnvio.classList.add("ocultar");
  }
  return resultadoEnvio;
};

const calcularTotal = () => {
  let totalReal = subtotalNumero;
  totalReal =
    subtotalNumero + recargoEnvio() + aplicarDescuento() + recargoTarjeta();
  total.textContent = totalReal;
  return totalReal;
};

// falta vincular al total de carrito sumado
//..................Fin Funciones Checkout.............//
//..................Inicio Filtros Responsive.............//
const botonFiltrosResponsive = document.querySelector(".filtros-responsive");
const asideFiltros = document.querySelector(".filtros");
const botonCerrarFiltrosReponsive = document.querySelector(
  ".cerrar-filtros-responsive"
);

botonFiltrosResponsive.onclick = () => {
  asideFiltros.classList.add("mostrar-filtros-responsive");
};

botonCerrarFiltrosReponsive.onclick = () => {
  asideFiltros.classList.remove("mostrar-filtros-responsive");
};

// -------------------------------------------------Inicio Filtros ---------------------------------------//
const productos = document.querySelectorAll(".tarjeta");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const limpiarBusqueda = document.querySelector("#limpiar-caja-busqueda");
const cajaBusqueda = document.querySelector(".busqueda");

//------------Limpiar Busqueda--------------//
limpiarBusqueda.onclick = () => {
  cajaBusqueda.value = "";
  for (let producto of productos) {
    producto.classList.remove("ocultar");
  }
  for (let checkbox of checkboxes) {
    checkbox.checked = false;
  }
};

//------------Pasa Filtro Busqueda--------------//
const hayBusqueda = () => {
  if (cajaBusqueda.value) {
    return true;
  } else {
    return false;
  }
};
const pasaFiltroBusqueda = (producto) => {
  if (hayBusqueda()) {
    if (coincideBusquedaConProducto(producto)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const coincideBusquedaConProducto = (producto) => {
  let titulo = producto.dataset.nombre;
  let consulta = cajaBusqueda.value.toLowerCase();

  if (titulo.includes(consulta)) {
    return true;
  } else {
    return false;
  }
};

//------------Pasa Filtro Categoria--------------//
const checkboxesCategoria = document.querySelectorAll(
  ".check-filtro-categoria"
);

const pasaFiltroCategoria = (producto) => {
  if (hayCheckboxCheckedCategoria()) {
    if (categoriaCoincideProducto(producto)) {
      return true;
    } else {
      return false;
    }
  }
  return true;
};

const hayCheckboxCheckedCategoria = () => {
  for (let checkboxCategoria of checkboxesCategoria) {
    if (checkboxCategoria.checked) {
      return true;
    }
  }
};

const categoriaCoincideProducto = (producto) => {
  const categoria = producto.dataset.categoria;
  for (let checkboxCategoria of checkboxesCategoria) {
    if (checkboxCategoria.value === categoria && checkboxCategoria.checked) {
      return true;
    }
  }
  return false;
};

//------------Pasa Filtro Puntaje--------------//
const checkboxesPuntaje = document.querySelectorAll(".check-filtro-puntaje");

const hayCheckboxCheckedPuntaje = () => {
  for (let checkboxPuntaje of checkboxesPuntaje) {
    if (checkboxPuntaje.checked) {
      return true;
    }
  }
};

const puntajeCoincideProducto = (producto) => {
  const puntaje = producto.dataset.puntaje;
  for (let checkboxPuntaje of checkboxesPuntaje) {
    if (checkboxPuntaje.value === puntaje && checkboxPuntaje.checked) {
      return true;
    }
  }
  return false;
};

const pasaFiltroPuntaje = (producto) => {
  if (hayCheckboxCheckedPuntaje()) {
    if (puntajeCoincideProducto(producto)) {
      return true;
    } else {
      return false;
    }
  }
  return true;
};

//-----------------Pasa Filtros-----------------//

const ocultarProducto = (producto) => {
  return producto.classList.add("ocultar");
};

const mostrarProducto = (producto) => {
  return producto.classList.remove("ocultar");
};

const pasaFiltros = (producto) => {
  if (
    pasaFiltroBusqueda(producto) &&
    pasaFiltroCategoria(producto) &&
    pasaFiltroPuntaje(producto)
  ) {
    return true;
  } else {
    return false;
  }
};
const filtroProducto = () => {
  for (let producto of productos) {
    if (pasaFiltros(producto)) {
      mostrarProducto(producto);
    } else {
      ocultarProducto(producto);
    }
  }
};
// -------------------------------------------------------- Fin de Filtros --------------------------------------------//
// ------------------------------------------------- Contador tarjetas visibles ---------------------------------------//

const totalProductos = document.querySelector(".total-nros-productos");
const nroMostrado = document.querySelector(".nro-mostrado");

cajaBusqueda.oninput = () => {
  filtroProducto();
  cantidadProductosVisibles();
};

for (let checkbox of checkboxes) {
  checkbox.onclick = () => {
    filtroProducto();

    cantidadProductosVisibles();
  };
}

const productosOcultos = document.getElementsByClassName("tarjeta ocultar");

const cantidadProductosVisibles = () => {
  productosVisibles = productos.length - productosOcultos.length;
  nroMostrado.textContent = productosVisibles;
  totalProductos.textContent = productos.length;
};
//..............Inicia Ver Como............................//

const descripcionProducto = document.querySelectorAll(
  "#descripcion-producto-vista-lista"
);
const especificacionesProducto = document.querySelectorAll(
  ".div-especificaciones"
);
const botonVistaLista = document.querySelector("#vista-lista");
const botonVistaGrilla = document.querySelector("#vista-grilla");
const imagenesProductos = document.querySelectorAll(".producto");

botonVistaLista.onclick = () => {
  for (producto of productos) {
    producto.classList.remove("tarjeta");
    producto.classList.add("ajustes-tarjeta");
  }
  for (parrafo of descripcionProducto) {
    parrafo.classList.remove("vista-normal");
  }
  for (especificaciones of especificacionesProducto) {
    especificaciones.classList.add("ajustes-especificaciones");
  }
  for (imagen of imagenesProductos) {
    imagen.classList.remove("producto");
    imagen.classList.add("ajustes-imagen");
  }
};

botonVistaGrilla.onclick = () => {
  for (producto of productos) {
    producto.classList.add("tarjeta");
    producto.classList.remove("ajustes-tarjeta");
  }
  for (parrafo of descripcionProducto) {
    parrafo.classList.add("vista-normal");
  }
  for (especificaciones of especificacionesProducto) {
    especificaciones.classList.remove("ajustes-especificaciones");
  }
  for (imagen of imagenesProductos) {
    imagen.classList.add("producto");
    imagen.classList.remove("ajustes-imagen");
  }
};

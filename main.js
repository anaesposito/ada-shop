// ------------------------------------------------------Inicio Filtros ---------------------------------------------//
const productos = document.querySelectorAll(".tarjeta");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const limpiarBusqueda = document.querySelector("#limpiar-caja-busqueda");
const cajaBusqueda = document.querySelector(".busqueda");

//--------------------Limpiar Busqueda-------------------//
limpiarBusqueda.onclick = () => {
  cajaBusqueda.value = "";
  for (let producto of productos) {
    producto.classList.remove("ocultar");
  }
  for (let checkbox of checkboxes) {
    checkbox.checked = false;
  }
};

//-----------------Pasa Filtro Busqueda------------------//
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

//-----------------Pasa Filtro Categoria-----------------//
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

//-----------------Pasa Filtro Puntaje------------------//
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

//----------------------Pasa Filtros---------------------//

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

// ---------------------------------------------------- Fin de Filtros ----------------------------------------------//
//...............Inicia Ver Como.........................//

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

//...................Fin Ver Como........................//

// -----------------------------------------------------Inicio Carrito Aside ----------------------------------------//

const botonesComprarProducto = document.querySelectorAll(".comprar");
const contenidoCarrito = document.querySelector(".alertas-contenido-carrito");
const tarjetasCarrito = document.querySelectorAll(".tarjeta-carrito");
const cantidadEnCarrito = document.querySelector(
  ".cantidad-productos-agregados"
);
const itemsEnCarrito = document.querySelector(".carrito-items");
const clickCarrito = document.querySelector("#click-carrito");
const botonCerrarCarrito = document.querySelector("#cerrar-carrito");
const asideCarrito = document.querySelector("#carrito");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

//..........Inicio Mostrar/Ocultar Carrito Aside.........//
const mostrarCarritoAside = () => {
  asideCarrito.classList.remove("hidden");
  overlay.classList.remove("ocultar");
  body.classList.add("overflow");
};

clickCarrito.onclick = () => {
  mostrarCarritoAside();
  contarProductosCarrito();
  hayProductosEnCarrito(productosVisiblesCarrito);
  modificarTabIndex(true);
};

botonCerrarCarrito.onclick = () => {
  asideCarrito.classList.add("hidden");
  overlay.classList.add("ocultar");
  body.classList.remove("overflow");
  modificarTabIndex(false);
};

//................Fin Ocultar Carrito Aside..............//

// -----------------------------------------Inicio Modificacion Tabindex ---------------------------------------------//

const disminuirTabIndexFiltroPuntaje = (removerTab) => {
  for (let inputFiltros of checkboxesPuntaje) {
    if (removerTab == true) {
      inputFiltros.setAttribute("tabIndex", -1);
    } else {
      inputFiltros.removeAttribute("tabIndex", -1);
    }
  }
};
const disminuirTabIndexFiltroCategoria = (removerTab) => {
  for (let inputFiltros of checkboxesCategoria) {
    if (removerTab == true) {
      inputFiltros.setAttribute("tabIndex", -1);
    } else {
      inputFiltros.removeAttribute("tabIndex", -1);
    }
  }
};

const disminuirTabIndexBotonComprarProducto = (removerTab) => {
  for (let botonComprarProducto of botonesComprarProducto) {
    if (removerTab == true) {
      botonComprarProducto.setAttribute("tabIndex", -1);
    } else {
      botonComprarProducto.removeAttribute("tabIndex", -1);
    }
  }
};

const linksFooter = document.querySelectorAll(".link-footer");

const disminuirTabIndexLinksFooter = (removerTab) => {
  for (let link of linksFooter) {
    if (removerTab == true) {
      link.setAttribute("tabIndex", -1);
    } else {
      link.removeAttribute("tabIndex", -1);
    }
  }
};

const disminuirTabIndexProductoCarritoOculto = (removerTab) => {
  for (let boton of document.querySelectorAll(".eliminar-de-carrito")) {
    let tarjetaPadre = boton.parentNode.parentNode.parentNode;
    if (tarjetaPadre.className.includes("ocultar")) {
      if (removerTab == true) {
        boton.setAttribute("tabIndex", -1);
      } else {
        boton.removeAttribute("tabIndex", -1);
      }
    }
  }
};

const modificarTabIndex = (removerTab) => {
  if (removerTab == true) {
    limpiarBusqueda.setAttribute("tabIndex", -1);
    cajaBusqueda.setAttribute("tabIndex", -1);
    modoDiurno.setAttribute("tabIndex", -1);
    clickCarrito.setAttribute("tabIndex", -1);
    botonVistaGrilla.setAttribute("tabIndex", -1);
    botonVistaLista.setAttribute("tabIndex", -1);
  } else {
    limpiarBusqueda.removeAttribute("tabIndex", -1);
    cajaBusqueda.removeAttribute("tabIndex", -1);
    modoDiurno.removeAttribute("tabIndex", -1);
    clickCarrito.removeAttribute("tabIndex", -1);
    botonVistaGrilla.removeAttribute("tabIndex", -1);
    botonVistaLista.removeAttribute("tabIndex", -1);
  }
  disminuirTabIndexLinksFooter(removerTab);
  disminuirTabIndexBotonComprarProducto(removerTab);
  disminuirTabIndexFiltroCategoria(removerTab);
  disminuirTabIndexFiltroPuntaje(removerTab);

  disminuirTabIndexProductoCarritoOculto(removerTab);
};

// -----------------------------------------Fin Modificacion Tabindex ---------------------------------------------//

// ------------------------------ Inicio Contador productos visibles seccion principal-------------------------------//

const totalProductos = document.querySelector(".total-nros-productos");
const nroMostrado = document.querySelector(".nro-mostrado");

cajaBusqueda.oninput = () => {
  filtroProducto();
  cantidadProductosVisiblesMain();
};

for (let checkbox of checkboxes) {
  checkbox.onclick = () => {
    filtroProducto();
    cantidadProductosVisiblesMain();
  };
}

const productosOcultos = document.getElementsByClassName("tarjeta ocultar");

const cantidadProductosVisiblesMain = () => {
  productosVisiblesMain = productos.length - productosOcultos.length;
  nroMostrado.textContent = productosVisiblesMain;
  totalProductos.textContent = productos.length;
};

// ------------------------------------- Fin Contador productos visibles seccion principal --------------------------//

//.........Inicio Agregar Productos en Carrito...........//
const sumarInputAlConteo = (tarjetaCarrito) => {
  // busco dentro de esta tarjeta el input de cantidad de producto
  let inputProductoEnCarrito =
    tarjetaCarrito.lastElementChild.lastElementChild.firstElementChild
      .firstElementChild;
  inputProductoEnCarrito.classList.add("sumar-importe");
  inputProductoEnCarrito.removeAttribute("tabIndex", -1);
};

const agregarProductoAlCarrito = (botonComprarProducto) => {
  for (let tarjetaCarrito of tarjetasCarrito) {
    if (tarjetaCarrito.dataset.nombre === botonComprarProducto.dataset.nombre) {
      tarjetaCarrito.classList.remove("ocultar");
      sumarInputAlConteo(tarjetaCarrito);
      calcularSubTotal();
      contarProductosCarrito();
    }
  }
};
//.............Fin Agregar Productos en Carrito...........//
//...........Inicio Contar Productos en Carrito..........//

const listaProductosEnCarritoOcultos = document.getElementsByClassName(
  "tarjeta-carrito ocultar"
);
const alertaContenidoCarrito = document.querySelector(
  ".alertas-contenido-carrito"
);
const carritoSinContenido = document.querySelector(".carrito-contenido");

const contarProductosCarrito = () => {
  // actualiza indicador total de items en carrito
  productosVisiblesCarrito =
    tarjetasCarrito.length - listaProductosEnCarritoOcultos.length;
  cantidadEnCarrito.textContent = productosVisiblesCarrito;
  itemsEnCarrito.textContent = productosVisiblesCarrito;
};

const hayProductosEnCarrito = () => {
  if (productosVisiblesCarrito === 0) {
    alertaContenidoCarrito.classList.remove("ocultar");
    carritoSinContenido.classList.add("ocultar");
  } else {
    carritoSinContenido.classList.remove("ocultar");
    alertaContenidoCarrito.classList.add("ocultar");
  }
};

for (let botonComprarProducto of botonesComprarProducto) {
  botonComprarProducto.onclick = () =>
    agregarProductoAlCarrito(botonComprarProducto);
}
//..............Fin Contar Productos en Carrito..........//

//...............Inicio Vaciar Carrito Modal.............//

const botonVaciarCarritoConfirmacion = document.querySelector(
  ".boton-vaciar-carrito-confirmacion"
);

const removerProductosDelCarrito = () => {
  for (let tarjetaCarrito of tarjetasCarrito) {
    tarjetaCarrito.classList.add("ocultar");
    vaciarCarritoSection.classList.add("hidden");
    overlay.classList.remove("overlay-aumentado");

    removerInputDelConteo(tarjetaCarrito);
    actualizarSubtotales(0);
    contarProductosCarrito();
    hayProductosEnCarrito();
  }
};

botonVaciarCarritoConfirmacion.onclick = () => removerProductosDelCarrito();
//..................Fin Vaciar Carrito Modal.............//

//...............Inicio Confirmación Vaciar Carrito Aside.............//

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
//......................Fin Vaciar Carrito Aside.........//

//..............Inicio Sumar Productos en Carrito........//

const listaProductosParaSumarImporte = document.getElementsByClassName(
  "tarjeta-carrito sumar-importe"
);

const inputsProductosCarrito = document.querySelectorAll(
  ".input-cantidad-en-carrito"
);
let subtotalCarritoSpan = document.querySelector("#subtotal-carrito-aside");
let subtotalCheckoutImporte = document.querySelector(
  ".subtotal-checkout-importe"
);
const actualizarSubtotales = (subtotal) => {
  // actualiza el valor de los span
  subtotalCarritoSpan.textContent = subtotal;
  subtotalCheckoutImporte.textContent = subtotal;
};

const calcularSubtotalPorInput = (inputProductosCarritos) => {
  // recibe un input del carrito, busca el precio en padre
  // y lo multiplica por el value
  let tarjetaProducto =
    inputProductosCarritos.parentElement.parentElement.parentElement
      .parentElement;
  let precio = tarjetaProducto.dataset.precio;
  return precio * inputProductosCarritos.value;
};

const calcularSubTotal = () => {
  // recorro todos los inputs del carrito
  // tomo los que tienen 'sumar importe' y calculo el subtotal
  let subtotal = 0;
  for (let inputProductosCarritos of inputsProductosCarrito) {
    if (inputProductosCarritos.className.includes("sumar-importe")) {
      subtotal += calcularSubtotalPorInput(inputProductosCarritos);
    }
  }
  actualizarSubtotales(subtotal);
};

for (let inputProductosCarritos of inputsProductosCarrito) {
  // para cada input del carrito llamo a calcularSubtotalPorInout
  inputProductosCarritos.oninput = () => calcularSubTotal();
}
//.................Fin Sumar Productos en Carrito........//

//..............Inicio Eliminar Producto de Carrito .....//
const eliminarProductosEnCarrito = document.querySelectorAll(
  ".eliminar-de-carrito"
);

const removerInputDelConteo = (tarjetaCarrito) => {
  // busco dentro de esta tarjeta el input de cantidad de producto
  let inputProductoEnCarrito =
    tarjetaCarrito.lastElementChild.lastElementChild.firstElementChild
      .firstElementChild;
  inputProductoEnCarrito.classList.remove("sumar-importe");
  inputProductoEnCarrito.setAttribute("tabIndex", -1);
  inputProductoEnCarrito.value = 1;
};

for (let eliminarProducto of eliminarProductosEnCarrito) {
  eliminarProducto.onclick = () => {
    for (tarjetaCarrito of tarjetasCarrito) {
      if (eliminarProducto.dataset.nombre === tarjetaCarrito.dataset.nombre) {
        tarjetaCarrito.classList.add("ocultar");
        removerInputDelConteo(tarjetaCarrito);
        calcularSubTotal();
        contarProductosCarrito();
      }
    }
  };
}

//................Fin Eliminar Producto de Carrito ......//

//.................................................Inicio Funciones Checkout.........................................//

//...............Inicio Carrito Checkout Display.........//
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
  calcularTotal();
};

botonFinalizarCompraCheckout.onclick = () => {
  carritoCheckout.classList.add("ocultar-checkout");
  asideCarrito.classList.add("hidden");
  overlay.classList.add("ocultar");
  body.classList.remove("overflow");
  overlay.classList.remove("overlay-aumentado");
  totalCheckout.textContent = 0;
  modificarTabIndex(false);
  limpiarOpcionesDePago();
  removerProductosDelCarrito();
  alert("Gracias por su compra!!");
};
//..............Inicio Limpiar Opcionesde pago...........//

const opcionesDePago = document.querySelectorAll(".metodos-de-pago");

const limpiarOpcionesDePago = () => {
  for (let opcionDePago of opcionesDePago) {
    opcionDePago.checked = false;
  }
};

botonSeguirComprandoCheckout.onclick = () => {
  limpiarOpcionesDePago();
  carritoCheckout.classList.add("ocultar-checkout");
  overlay.classList.remove("overlay-aumentado");
};
//..............,,,Fin Limpiar Opcionesde pago...........//
//..................Fin Carrito Checkout Display.........//

//...........Inicio Carrito Checkout Operaciones.........//

const efectivo = document.querySelector("input[value='efectivo-debito']");
const credito = document.querySelector("input[value='tarjeta-credito']");
const envioOpcion = document.querySelector("input[name='envio']");
const tarjetaDescuento = document.querySelector("input[name='descuento']");
const recargo = document.querySelector(".recargo-checkout-importe");
const renglonEnvio = document.querySelector(".envio-checkout");
const renglonRecargo = document.querySelector(".recargo-checkout");
const renglonDescuento = document.querySelector(".descuento-checkout");
const descuento = document.querySelector(".descuento-checkout-importe");
const envio = document.querySelector(".envio-checkout-importe");
const totalCheckout = document.querySelector(".total-checkout-importe");

for (let opcion of opcionesDePago) {
  opcion.oninput = () => {
    calcularTotal();
  };
}

let resultadoRecargo;

const recargoTarjeta = (subtotal) => {
  if (credito.checked) {
    resultadoRecargo = subtotal * 0.1;

    recargo.textContent = "$" + resultadoRecargo.toFixed(2);
    renglonRecargo.classList.remove("ocultar");
  } else {
    resultadoRecargo = 0;
    renglonRecargo.classList.add("ocultar");
  }
  return resultadoRecargo;
};

let resultadoDescuento;

const aplicarDescuento = (subtotal) => {
  if (tarjetaDescuento.checked) {
    resultadoDescuento = -subtotal * 0.05;
    descuento.textContent = "$" + resultadoDescuento.toFixed(2); // redondedo dos decimales.
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
    envio.textContent = "$" + resultadoEnvio;
    renglonEnvio.classList.remove("ocultar");
  } else {
    resultadoEnvio = 0;
    renglonEnvio.classList.add("ocultar");
  }
  return resultadoEnvio;
};

const calcularTotal = () => {
  let subtotalGuardadoEnSpan = Number(subtotalCheckoutImporte.textContent); // tomo el valor del subtotal calculado anteriormente
  let totalReal = subtotalGuardadoEnSpan;
  totalReal +=
    recargoEnvio() +
    aplicarDescuento(subtotalGuardadoEnSpan) +
    recargoTarjeta(subtotalGuardadoEnSpan);
  totalCheckout.textContent = "$" + totalReal;
  return totalReal;
};

//..............Fin Carrito Checkout Operaciones.........//

//......................................................Fin Funciones Checkout.......................................//

//.................Inicio Filtros Responsive.............//
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

// -----------------------------------------Inicio Modo Nocturno/Modo Diurno ----------------------------------------//
const modoDiurno = document.querySelector("#modo-diurno");
const modoNocturno = document.querySelector("#modo-nocturno");
const headerTarjetas = document.querySelector(".header-tarjetas");
const mainFooter = document.querySelector(".logo-firma-footer");
const botonesGenerales = document.querySelectorAll("button");
const resumenCheckout = document.querySelector(".resumen-checkout");

modoDiurno.onclick = () => {
  for (let botonGeneral of botonesGenerales) {
    for (let botonComprarProducto of botonesComprarProducto) {
      for (let producto of productos) {
        producto.classList.add("nocturno");
        botonComprarProducto.classList.add("boton-modo-nocturno");
        botonGeneral.classList.add("nocturno");
        mainFooter.classList.add("nocturno");
        modoNocturno.classList.remove("ocultar");
        modoDiurno.classList.add("ocultar");
        body.classList.add("nocturno");
        headerTarjetas.classList.add("nocturno");
        asideCarrito.classList.add("nocturno");
        botonCerrarCarrito.classList.remove("nocturno");
        botonCerrarCarrito.classList.add("nocturno-cerrar-carrito");
        carritoCheckout.classList.add("nocturno");
        resumenCheckout.classList.add("nocturno-resumen-checkout");
        botonSeguirComprandoCheckout.classList.remove("nocturno");
        botonSeguirComprandoCheckout.classList.add("boton-modo-nocturno");
        vaciarCarritoSection.classList.add("nocturno");
        cancelarVaciarCarrito.classList.remove("nocturno");
        cancelarVaciarCarrito.classList.add("boton-modo-nocturno");
        botonVaciarCarritoConfirmacion.classList.remove("nocturno");
        botonVaciarCarritoConfirmacion.classList.add("boton-modo-nocturno");
        asideFiltros.style.backgroundColor = "black";
      }
    }
  }
};
modoNocturno.onclick = () => {
  for (let botonGeneral of botonesGenerales) {
    for (let botonComprarProducto of botonesComprarProducto) {
      for (let producto of productos) {
        producto.classList.remove("nocturno");
        modoDiurno.classList.remove("ocultar");
        modoNocturno.classList.add("ocultar");
        botonComprarProducto.classList.remove("boton-modo-nocturno");
        botonGeneral.classList.remove("nocturno");
        mainFooter.classList.remove("nocturno");
        body.classList.remove("nocturno");
        headerTarjetas.classList.remove("nocturno");
        asideCarrito.classList.remove("nocturno");
        botonCerrarCarrito.classList.remove("nocturno-cerrar-carrito");
        carritoCheckout.classList.remove("nocturno");
        resumenCheckout.classList.remove("nocturno-resumen-checkout");
        botonSeguirComprandoCheckout.classList.remove("boton-modo-nocturno");
        vaciarCarritoSection.classList.remove("nocturno");
        cancelarVaciarCarrito.classList.remove("boton-modo-nocturno");
        botonVaciarCarritoConfirmacion.classList.remove("boton-modo-nocturno");
        asideFiltros.style.backgroundColor = "#fff";
      }
    }
  }
};
// ---------------------------------------------Fin Modo Nocturno/Modo Diurno ----------------------------------------//

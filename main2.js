// -------------------------------------------------Inicio Filtros ---------------------------------------//

//...........Inicio Boton Limpiar Filtros...................//
const vaciarBusqueda = document.querySelector("#limpiar-caja-busqueda");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const cajaBusqueda = document.querySelector(".busqueda");
const numeroMostrado = document.querySelector(".nro-mostrado");
const totalNumerosMostrados = document.querySelector(".total-nros");

vaciarBusqueda.onclick = () => {
  cajaBusqueda.value = "";
  for (let producto of productos) {
    producto.classList.remove("ocultar");
  }
  for (let checkbox of checkboxes) {
    checkbox.checked = false;
  }
};
//..............Fin Boton Limpiar Filtros...................//

//.................Inicio Filtro Busqueda...................//
const tarjetas = document.querySelectorAll(".tarjeta");

const filtrarBusqueda = () => {
  for (let tarjeta of tarjetas) {
    let titulo = tarjeta.dataset.nombre;
    let consulta = busqueda.value.toLowerCase();

    if (titulo.includes(consulta)) {
      tarjeta.classList.remove("ocultar");
    } else {
      tarjeta.classList.add("ocultar");
    }
    if (busqueda.value == "") {
      tarjeta.classList.remove("ocultar");
    }
  }
};
busqueda.oninput = filtrarBusqueda;
//....................Fin Filtro Busqueda...................//

//.................Inicio Filtro Categoria..................//

const checkboxesCategoria = document.querySelectorAll(
  ".check-filtro-categoria"
);

for (let checkboxCategoria of checkboxesCategoria) {
  checkboxCategoria.onclick = () => {
    filtrarPorCheckboxesCategoria();
  };
}

const filtrarPorCheckboxesCategoria = () => {
  for (let tarjeta of tarjetas) {
    tarjeta.classList.add("ocultar");
    if (checkboxSeleccionadoCategoria()) {
      if (coincideCategoria(tarjeta)) {
        tarjeta.classList.remove("ocultar");
      }
    } else {
      tarjeta.classList.remove("ocultar");
    }
  }
};
const checkboxSeleccionadoCategoria = () => {
  for (let checkboxCategoria of checkboxesCategoria) {
    if (checkboxCategoria.checked) {
      return true;
    }
  }
};

const coincideCategoria = (tarjeta) => {
  const categoria = tarjeta.dataset.categoria;
  for (let checkboxCategoria of checkboxesCategoria) {
    if (checkboxCategoria.value === categoria && checkboxCategoria.checked) {
      return true;
    }
  }
};

//.................Fin Filtro Categoria.....................//

//.................Inicio Filtro Puntaje..................//
const checkboxesPuntaje = document.querySelectorAll(".check-filtro-puntaje");

for (let checkbox of checkboxesPuntaje) {
  checkbox.onclick = () => {
    filtrarPorCheckboxesPuntaje();
  };
}

const filtrarPorCheckboxesPuntaje = () => {
  for (let tarjeta of tarjetas) {
    tarjeta.classList.add("ocultar");
    if (checkboxSeleccionadoPuntaje()) {
      if (coincidePuntaje(tarjeta)) {
        tarjeta.classList.remove("ocultar");
      }
    } else {
      tarjeta.classList.remove("ocultar");
    }
  }
};
const checkboxSeleccionadoPuntaje = () => {
  for (let checkbox of checkboxesPuntaje) {
    if (checkbox.checked) {
      return true;
    }
  }
};

const coincidePuntaje = (tarjeta) => {
  const rating = tarjeta.dataset.rating;
  for (let checkbox of checkboxesPuntaje) {
    if (checkbox.value === rating && checkbox.checked) {
      return true;
    }
  }
};

//.................Fin Filtro checkboxes....................//
// //.................Inicio Filtros Simultaneos...............//

const hayBusqueda = () => {
  if (busqueda.value) {
    return true;
  } else {
    return false;
  }
};
const pasaFiltroBusqueda = (tarjeta) => {
  if (hayBusqueda()) {
    if (filtrarBusqueda(tarjeta)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const hayCategoria = () => {
  for (let checkboxCategoria of checkboxesCategoria) {
    if (checkboxCategoria.checked) {
      return true;
    } else {
      return false;
    }
  }
};
const pasaFiltroCategoria = (tarjeta) => {
  if (hayCategoria()) {
    if (filtrarPorCheckboxesCategoria(tarjeta)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const hayPuntaje = () => {
  for (let checkboxPuntaje of checkboxesPuntaje) {
    if (checkboxPuntaje.checked) {
      return true;
    } else {
      return false;
    }
  }
};

const pasaFiltroPuntaje = (tarjeta) => {
  if (hayPuntaje()) {
    if (filtrarPorCheckboxesPuntaje(tarjeta)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};
const mostrarTarjeta = (tarjeta) => {
  return tarjeta.classList.remove("ocultar");
};

const ocultarTarjeta = (tarjeta) => {
  return tarjeta.classList.add("ocultar");
};
const filtroTarjetas = () => {
  for (let tarjeta of tarjetas) {
    if (pasaFiltros(tarjeta)) {
      mostrarTarjeta(tarjeta);
    } else {
      ocultarTarjeta(tarjeta);
    }
  }
};

const pasaFiltros = (tarjeta) => {
  if (
    pasaFiltroBusqueda(tarjeta) &&
    pasaFiltroCategoria(tarjeta) &&
    pasaFiltroPuntaje(tarjeta)
  ) {
    return true;
  } else {
    return false;
  }
};

//.................Fin Filtros Simultaneos..................//

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
  for (tarjeta of tarjetas) {
    tarjeta.classList.remove("tarjeta");
    tarjeta.classList.add("ajustes-tarjeta");
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
  for (tarjeta of tarjetas) {
    tarjeta.classList.add("tarjeta");
    tarjeta.classList.remove("ajustes-tarjeta");
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
//..................Fin Ver Como............................//

// ------------------------------------------------------Inicio Carrito Aside ----------------------------------------//

//...............Inicio Ocultar Carrito Aside...............//
//..................Inicio Agregar al Carrito Funciones.............//

const botonesComprarProducto = document.querySelectorAll(".comprar");
const contenidoCarrito = document.querySelector(".contenido-carrito");
const tarjetasCarrito = document.querySelectorAll(".tarjeta-carrito");
console.log(tarjetasCarrito);
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
};
cancelarVaciarCarrito.onclick = () => {
  vaciarCarritoSection.classList.add("hidden");
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

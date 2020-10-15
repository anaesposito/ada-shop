const productos = document.querySelectorAll(".tarjeta");

// -------------------------------------------------Inicio Filtros ---------------------------------------//
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const limpiarBusqueda = document.querySelector("#limpiar-caja-busqueda");

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

const hayCheckboxCheckedCategoria = () => {
  for (let checkboxCategoria of checkboxesCategoria) {
    if (checkboxCategoria.checked) {
      return true;
    }
  }
};

const categoriaCoincideProducto = (producto) => {
  const categoria = producto.value;
  for (let checkboxCategoria of checkboxesCategoria) {
    if (checkboxCategoria.value === categoria && checkboxCategoria.checked) {
      return true;
    }
  }
  return false;
};

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
  const puntaje = producto.value;
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

const filtroProducto = () => {
  for (let producto of productos) {
    if (pasaFiltros(producto)) {
      mostrarProducto(producto);
    } else {
      ocultarProducto(producto);
    }
  }
};

const ocultarProducto = (producto) => {
  return producto.classlist.add("ocultar");
};

const mostrarProducto = (producto) => {
  return producto.classlist.remove("ocultar");
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
// -------------------------------------------------------- Fin de Filtros --------------------------------------------//
// ------------------------------------------------- Contador tarjetas visibles ---------------------------------------//

cajaBusqueda.oninput = () => {
  filtroTarjetas();
  cantidadProductosMostrados();
};

for (let checkbox of checkboxesCategoria) {
  checkbox.onclick = () => {
    filtroTarjetas();
    cantidadProductosVisibles();
  };
}

for (let checkbox of checkboxesPuntaje) {
  checkbox.onclick = () => {
    filtroTarjetas();
    cantidadProductosVisibles();
  };
}
const productosOcultos = document.querySelectorAll(".tarjetas .ocultar");
const totalProductos = document.querySelectorAll(".total-nros-productos");

const cantidadProductosVisibles = (productosVisibles) => {
  productosVisibles = productos.length - productosOcultos.length;
  productosVisibles.textcontent = productosVisibles;
  totalProductos.textcontent = productos.length;
};

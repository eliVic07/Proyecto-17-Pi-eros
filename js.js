var tareas = [];
var siguienteId = 1;

var formulario = document.getElementById("formulario");
var inputTarea = document.getElementById("nueva-tarea");
var lista = document.getElementById("lista");

function renderTasks() {
  lista.innerHTML = "";

  var pendientes = tareas.filter(function (tarea) {
    return !tarea.completada;
  });
  var completadas = tareas.filter(function (tarea) {
    return tarea.completada;
  });
  var ordenadas = pendientes.concat(completadas);

  ordenadas.forEach(function (tarea) {
    var li = document.createElement("li");
    if (tarea.completada) {
      li.classList.add("completada");
    }

    var casilla = document.createElement("input");
    casilla.type = "checkbox";
    casilla.checked = tarea.completada;
    casilla.setAttribute("aria-label", "Marcar como completada");
    casilla.addEventListener("change", function () {
      cambiarEstado(tarea.id);
    });

    var texto = document.createElement("span");
    texto.textContent = tarea.descripcion;

    var botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.className = "eliminar";
    botonEliminar.setAttribute("aria-label", "Eliminar tarea");
    botonEliminar.textContent = "X";
    botonEliminar.addEventListener("click", function () {
      eliminarTarea(tarea.id);
    });

    li.appendChild(casilla);
    li.appendChild(texto);
    li.appendChild(botonEliminar);
    lista.appendChild(li);
  });
}

function agregarTarea(descripcion) {
  tareas.push({
    id: siguienteId,
    descripcion: descripcion,
    completada: false,
  });
  siguienteId = siguienteId + 1;
  renderTasks();
}

function cambiarEstado(id) {
  for (var i = 0; i < tareas.length; i++) {
    if (tareas[i].id === id) {
      tareas[i].completada = !tareas[i].completada;
    }
  }
  renderTasks();
}

function eliminarTarea(id) {
  tareas = tareas.filter(function (tarea) {
    return tarea.id !== id;
  });
  renderTasks();
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var descripcion = inputTarea.value.trim();

  if (descripcion === "") {
    return;
  }

  agregarTarea(descripcion);
  inputTarea.value = "";
  inputTarea.focus();
});

renderTasks();

var api = {
    url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
    cargarTareas();
    $("#add-form").submit(agregarTarea);
};

var cargarTareas = function () {
    $.getJSON(api.url, function (tareas) {
        tareas.forEach(crearTarea);
    });
}

var plantilla = '<td>' +
    '<span class="glyphicon glyphicon-zoom-in mostrarDetalles"></span>' +
    '<span class="glyphicon glyphicon-pencil"></span>' +
    '<span class="glyphicon glyphicon-remove-circle eliminar"></span> ' +
    '</td>';

var crearTarea = function (tarea) {
    var nombre = tarea.name;
    var estado = tarea.status[0];
    var id = tarea._id;
    
    // creamos la fila
    var $tr = $("<tr />");
    // creamos la celda del nombre
    var $nombreTd = $("<td />");
    $nombreTd.text(nombre);
    // creamos la celda del estado
    var $estadoTd = $("<td />");
    $estadoTd.text(estado);
    // agregamos las celdas a la fila
    $tr.append($nombreTd);
    $tr.append($estadoTd);
    // agregamos filas a la tabla
    $tasksList.append($tr);
    /*var $iconos = $("<span />");
    $iconos.addClass(".glyphicon .glyphicon-zoom-in");
    var $celdaIconos("<td />")
    $celdaIconos.append($iconos);*/
    $tr.append(plantilla);
    //agregamos íconos para funcionalidad 
    $tr.append("<tr />").attr("data-id", id);
};

var agregarTarea = function (e) {
    e.preventDefault();
    var nombre = $("#nombre-tarea").val();
    $.post(api.url, {
        name: nombre
    }, function (tarea) {
        crearTarea(tarea);
        $("#myModal").modal("hide");
    });
};

$(document).on("click", ".mostrarDetalles", function (tarea) {
    console.log(tarea._id);
    
});

$(document).on("click", ".eliminar", function () {
    console.log("yo elimino", this);
});

$(document).ready(cargarPagina);

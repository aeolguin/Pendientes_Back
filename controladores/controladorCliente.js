var con = require('../lib/conexionbd');

function errores (data, res) {
    if (data) {
        console.log("Hubo un error en la consulta", data.message);
        return res.status(404).send("Hubo un error en la consulta");
    }
}

//Lista todos los clientes
function listaClientes(req, res) {
var sql = "SELECT razon_social, tipo, nombre_sucursal, direccion, nombre, telefono, contacto, provincia FROM pendientes.clientes " +
          "LEFT JOIN (pendientes.estado, pendientes.sucursal, pendientes.localidad, pendientes.provincia) " + 
          "ON (clientes.estado_id=estado.id AND sucursal.cliente_id=clientes.id AND sucursal.localidad_id=localidad.id AND sucursal.provincia_id=provincia.id)";
var response = {
    'data': "",
}
con.query(sql, function(error, resultado,fields){
    errores(error, res);
    response = resultado;
    res.send(JSON.stringify(response));
});
};

//Lista todas las sucursales
function listaSucursales(req, res) {
    var sql = "SELECT razon_social,nombre_sucursal,direccion,provincia,nombre,telefono,contacto FROM pendientes.sucursal " +
                "LEFT JOIN	(pendientes.localidad, pendientes.clientes, pendientes.provincia)" +
                "ON (localidad_id=pendientes.localidad.id AND cliente_id=pendientes.clientes.id AND provincia_id=pendientes.provincia.id)";
    var response = {
        'data': "",
    }
    con.query(sql, function(error, resultado,fields){
        errores(error, res);
        response = resultado;
        res.send(JSON.stringify(response));
    });
    };

//Lista todo el equipamiento de un cliente
function listaEquipamiento(req, res) {
    var cliente = req.params.id;
    var sqlEquipamiento = "SELECT nombre,modelo,denominacion,descripcion FROM pendientes.equipamiento " +
              "LEFT JOIN (pendientes.marcas, pendientes.clientes, pendientes.sucursal) " +
              "ON (marca_id=pendientes.marcas.id AND cliente_id=pendientes.clientes.id AND sucursal_id=pendientes.sucursal.id) WHERE razon_social='" + cliente + "'";
    
    var sqlCliente = "SELECT razon_social,nombre_sucursal FROM pendientes.sucursal " +
                     "LEFT JOIN	(pendientes.clientes)" +
                     "ON (cliente_id=pendientes.clientes.id) WHERE razon_social='" + cliente + "'";
    var response = {
        'data': "",
        'razonSocial' : "",
        'sucursal': ""
    }
    
    con.query(sqlCliente, function(error, resultado,fields){
        errores(error, res);
        response.razonSocial = resultado[0].razon_social;
        response.sucursal = resultado[0].nombre_sucursal;
    });

    con.query(sqlEquipamiento, function(error, resultado,fields){
        errores(error, res);
        response.data = resultado;
        res.send(JSON.stringify(response));
    });
    };


//Se exportan los modulos para su utilizacion
module.exports = {
    listaClientes : listaClientes,
    listaSucursales : listaSucursales,
    listaEquipamiento : listaEquipamiento
};




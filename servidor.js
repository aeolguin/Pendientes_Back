//paquetes necesarios para el proyecto
require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controladorCliente = require('./controladores/controladorCliente');
var controladorAdministrador = require('./controladores/controladorAdministrador');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

//Permite los llamados desde otros dominios mediante CORS
app.use((req, res, next) =>{
   res.header('Acces-Control-Allow-Origin', '*');
   res.header('Acces-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Acces-Control-Allow-Request-Method');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
   next();
});

//Pedido de parte del modulo Cliente 
app.use(bodyParser.json());
app.get('/clientes', controladorCliente.listaClientes);
app.get('/sucursal' , controladorCliente.listaSucursales);
app.get('/equipamiento/:id', controladorCliente.listaEquipamiento);
//app.get('/tecnicos', controladorCliente.listaTecnicos);
//app.get('/pendientes', controladorCliente.listaPendientes);

//Pedidos de parte del modulo Administrar
// app.get('/generos', controladorAdministrador.generos);
// app.get('/directores', controladorAdministrador.directores);
// app.get('/actores', controladorAdministrador.actores);
// app.post('/competencias', controladorAdministrador.crearCompetencia);
// app.get('/competencias/:id', controladorAdministrador.competenciaABorrar);
// app.delete('/competencias/:id', controladorAdministrador.eliminaCompetencia);
// app.put('/competencias/:id', controladorAdministrador.editarCompetencia);
// app.delete('/competencias/:id/votos', controladorAdministrador.reiniciarCompetencia);




//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = process.env.PORT;

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});


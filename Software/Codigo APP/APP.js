/*desarmo arreglo para el envio de pines a mapa capa FOO 
  asignando distintos nombresID para usar varias capas del mapa 
  y hacerlo multiusuario*/
var msg1 = {};
var msg2 = {};
var msg3 = {};

var temporal = msg.payload.split(",");
var name = temporal[2];
var lat = temporal[3];
var lon = temporal[4];
var color;

if(name == "1"){
    color="green";
        msg1.payload = {
        layer: "foo",
        lat: lat,
        lon: lon,
        name: "Mario",
        icon: "car",
        iconColor: color,
        color: color
    };
    msg1.topic = 'Mario';
    return msg1;
}

if (name == "2") {
    color = "blue";
    msg2.payload={
    layer: "foo",
    lat:lat, 
    lon:lon, 
    name:"Leo", 
    icon:"car",
    iconColor: color,
    color: color};
    msg2.topic = 'Leo'
    return msg2;
}

if (name == "3") {
    color = "red";
    msg2.payload = {
        layer: "foo",
        lat: lat,
        lon: lon,
        name: "Andres",
        icon: "car",
        iconColor: color,
        color: color
    };
    msg3.topic = 'Andres'
    return msg3;
}

/*captura de la carga util de payload y desasrmo el arreglo para guardar en la base de datos*/
var temporal = msg.payload.split(",");
var fecha = temporal[0];
var hora = temporal[1];
var name = temporal[2];
var lat = temporal[3];
var lon = temporal[4];
var velocidad = temporal[5];
msg.topic = "INSERT INTO datos_traker(fecha,hora,name,lat,lon,velocidad) VALUES ('" + fecha + "','" + hora + "','" + name + "','" + lat + "','" + lon + "','" + velocidad + "')";
return msg;

/*Listo y recupero ruta del ID 2*/
msg.topic = "SELECT * FROM `datos_traker` WHERE `name`= 2";
return msg;

/*Preparo la capa FOO que este disponible y sin pines para recepcion de datos*/
msg.payload = { "command": { "clear": "foo" } };
msg.payload = {
    type: 'Feature',
    features: []
};
return msg;


/*Preparo la capa FOO, declaro usuario y su correspondiente geometria*/
var route = {
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: []
    },
    properties: {
        name: 'Mario',
        icon: 'car',
        line: 'blue'
    },
    }

msg.payload.forEach(function (record) {
    route.geometry.coordinates.push([record.lon, record.lat]);
});

msg.payload = {
    type: 'FeatureCollection',
    features: [route]
};

return msg;

var route = {
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: []
    },
    properties: {
        name: 'Leo',
        color: 'blue',
        weight: 15
    }
};

msg.payload.forEach(function (record) {
    route.geometry.coordinates.push([record.lon, record.lat]);
});

msg.payload = {
    type: 'FeatureCollection',
    features: [route]
};

var route = {
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: []
    },
    properties: {
        name: 'Andres',
        color: 'red',
        weight: 15
    }
};

msg.payload.forEach(function (record) {
    route.geometry.coordinates.push([record.lon, record.lat]);
});

msg.payload = {
    type: 'FeatureCollection',
    features: [route]
};


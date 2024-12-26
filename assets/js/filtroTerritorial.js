import Feature from 'ol/Feature.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {Style, Icon} from 'ol/style.js';
import {Point} from 'ol/geom.js';
import {limiteDepartamental} from '../js/capasTematicas.js';
import {urlWMS, extension3857, markers, departamentosJson, provinciasJson, distritosJson, centrosPobladosJson} from '../js/configuracion.js';

let listaDepartamentos = document.getElementById('listaDepartamentos'),
listaProvincias = document.getElementById('listaProvincias'),
listaDistritos = document.getElementById('listaDistritos'),
listaCentrosPoblados = document.getElementById('listaCentrosPoblados'),
limpiarCCPP = document.getElementById('limpiarCCPP'),
arregloDepartamentos=[], arregloProvincias=[], arregloDistritos=[], arregloCentrosPoblados=[];


fetch(departamentosJson)
.then(response => {
    if (!response.ok) {
        throw new Error('Error al leer el archivo JSON');
    }
    return response.json();
})
.then(datos => {
    arregloDepartamentos = datos;
    datos.forEach(function(v) {
        const fila = document.createElement('option');
        fila.value = v.iddpto;
        fila.text = v.nombre;
        listaDepartamentos.add(fila);
    });
})
.catch(error => { console.log('Error al leer el archivo JSON:', error);});

fetch(provinciasJson)
.then(response => {
    if (!response.ok) { throw new Error('Error al leer el archivo JSON');}
    return response.json();
})
.then(datos => { arregloProvincias = datos;})
.catch(error => { console.log('Error al leer el archivo JSON:', error);});

fetch(distritosJson)
.then(response => {
    if (!response.ok) { throw new Error('Error al leer el archivo JSON');}
    return response.json();
})
.then(datos => { arregloDistritos = datos;})
.catch(error => { console.log('Error al leer el archivo JSON:', error);});

fetch(centrosPobladosJson)
.then(response => {
    if (!response.ok) { throw new Error('Error al leer el archivo JSON');}
    return response.json();
})
.then(datos => { arregloCentrosPoblados = datos;
    //const buscarCCPP = new UseBootstrapSelect(listaCentrosPoblados);
})
.catch(error => { console.log('Error al leer el archivo JSON:', error);});

listaDepartamentos.addEventListener('change', function(){
    const iddpto = this.value;
    const dpto = limiteDepartamental.getSource();
    if(iddpto != -1)
    {
        const departamento = arregloDepartamentos.filter(function(e){ return e.iddpto === iddpto;});
        const extension = new Array(departamento[0].xmin, departamento[0].ymin, departamento[0].xmax, departamento[0].ymax);
        global.vista.fit(extension, global.mapa.getSize());

        const url = urlWMS + "cql_filter=iddpto='" + iddpto + "'";
        console.log(url);
        dpto.setUrl(url);

        const provincias = arregloProvincias.filter(function(e){return e.iddpto === iddpto;});
        listaProvincias.innerHTML = '<option value="0" selected>[Elegir]</option>';
        listaDistritos.innerHTML = '<option value="0" selected>[Elegir]</option>';
        listaCentrosPoblados.innerHTML = '<option value="0" selected>[Elegir]</option>';
        provincias.forEach(function(v){
            const fila = document.createElement('option');
            fila.value = v.idprov;
            fila.text = v.nombre;
            listaProvincias.add(fila);
        });
    }
    else
    {
        dpto.setUrl(urlWMS);
        global.vista.fit(extension3857, global.mapa.getSize());
        listaProvincias.innerHTML = '<option value="0" selected>[Elegir]</option>';
        listaDistritos.innerHTML = '<option value="0" selected>[Elegir]</option>';
        listaCentrosPoblados.innerHTML = '<option value="0" selected>[Elegir]</option>';
    }   
});

listaProvincias.addEventListener('change', function(){
    const idprov = this.value;
    if(idprov != -1)
    {
        const provincia = arregloProvincias.filter(function(e){return e.idprov === idprov;});
        const extension = new Array(provincia[0].xmin, provincia[0].ymin, provincia[0].xmax, provincia[0].ymax);
        global.vista.fit(extension, global.mapa.getSize());

        const distritos = arregloDistritos.filter(function(e){ return e.idprov === idprov;});
        listaDistritos.innerHTML = '<option value="0" selected>[Elegir]</option>';
        listaCentrosPoblados.innerHTML = '<option value="0" selected>[Elegir]</option>';
        distritos.forEach(function(v){
            const fila = document.createElement('option');
            fila.value = v.iddist;
            fila.text = v.nombre;
            listaDistritos.add(fila);
        });
    }    
});

listaDistritos.addEventListener('change', function(){
    const iddist = this.value;
    if(iddist != -1)
    {
        const distrito = arregloDistritos.filter(function(e){return e.iddist === iddist;});
        const extension = new Array(distrito[0].xmin, distrito[0].ymin, distrito[0].xmax, distrito[0].ymax);
        global.vista.fit(extension, global.mapa.getSize());

        const centrosPoblados = arregloCentrosPoblados.filter(function(e){ return e.iddist === iddist;});
        //listaCentrosPoblados.innerHTML= '';
        listaCentrosPoblados.innerHTML = '<option value="0" selected disabled>[Elegir]</option>';
        centrosPoblados.forEach(function(v){
            const fila = document.createElement('option');
            fila.value = v.idccpp;
            fila.text = v.nombre;
            listaCentrosPoblados.add(fila);
        });
    }    
});

listaCentrosPoblados.addEventListener('change', function(){
    const idccpp= this.value;
    if(idccpp != -1)
    {
        const ccpp = arregloCentrosPoblados.filter(function(e){ return e.idccpp === idccpp;});
        const x = ccpp[0].x;
        const y = ccpp[0].y;
        const nombCCPP= ccpp[0].nombre;
    // Icono CCPP
    const iconoCentroPoblado = new Feature({
        geometry: new Point([x, y]),
        name: nombCCPP,
        population: 4000,
        rainfall: 500,
    });
    const estiloCentroPoblado = new Style({
        image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: markers,
        }),
    });
    iconoCentroPoblado.setStyle(estiloCentroPoblado);
    const vectorSource = new VectorSource({
        features: [iconoCentroPoblado],
    });

    const puntoCCPP = new VectorLayer({
        id: 'puntoCCPP',
        source: vectorSource,
    });
    global.mapa.addLayer(puntoCCPP);
    global.vista.setCenter([x , y]);
    global.vista.setZoom(15);
    }
});

limpiarCCPP.addEventListener('click', function(){
    const capas = global.mapa.getLayers().getArray();
    const puntosCCPP = capas.filter(function(layer) {
        return layer.get('id') === 'puntoCCPP';
      });
    const dptos = limiteDepartamental.getSource(); //OMD
    dptos.setUrl(urlWMS); //OMD
    if (puntosCCPP.length > 0) {
      puntosCCPP.forEach(function(layer) {
        global.mapa.removeLayer(layer);
      });
    }
  });
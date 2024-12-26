import {GeoJSON} from 'ol/format';
import ImageWMS from 'ol/source/ImageWMS';
import {TileArcGISRest} from 'ol/source.js';
import VectorSource from 'ol/source/Vector.js';
import {Image as ImageLayer, Vector as VectorLayer} from 'ol/layer.js';
import TileLayer from 'ol/layer/Tile.js';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import {formatoImagen, versionWMS, versionWFS, exepcion, centroid3857, extension3857, proyeccion3857, modificarURLServicioWMS, validarUrl} from './configuracion.js';

const tipoServicio = document.getElementById('tipoServicio'),
direccionWebCapa = document.getElementById('direccionWebCapa'),
conectarServicio = document.getElementById('conectarServicio'),
mensajeServicioWeb = document.getElementById('mensajeServicioWeb'),
capasDisponibles = document.getElementById('capasDisponibles'),
grupoAgregar = document.getElementById('grupoAgregar'),
capasTematicas = document.getElementById('capasTematicas'),
agregarCapas = document.getElementById('agregarCapas'),
limpiarServicio = document.getElementById('limpiarServicio'),
interoperabilidad = document.getElementById('interoperabilidad'),
capasInteroperabilidad= document.getElementById('capasInteroperabilidad');

tipoServicio.addEventListener('change', function(){
    const servicio= this.value;
    switch (servicio){
        case 'wms':
            //grupoIDNombreCapa.style.display = 'block';
            direccionWebCapa.value = '';
            direccionWebCapa.focus();
            
        break;
        case 'wfs':
            //grupoIDNombreCapa.style.display = 'block';
            direccionWebCapa.value = '';
            direccionWebCapa.focus();
            
        break;
        case 'rest':
            //grupoIDNombreCapa.style.display = 'block';
            direccionWebCapa.value = '';
            direccionWebCapa.focus();            
        break;
    }
});

conectarServicio.addEventListener('click', function(){        
    if(direccionWebCapa.value.length > 0)
    {
        conectarServicio.innerHTML = '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Conectando';
        switch (tipoServicio.value) {
            case 'wms':
                conectarServicioOGCWMS();
            break;
            case 'wfs':
                conectarServicioOGCWFS();
            break;
            case 'rest':
                conectarServicioRestArcGIS();
            break;            
        }
    }
    else
    {
        //const texto = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error:</strong> El campo <strong>dirección web</strong> no puede ser vacío.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        //mensajeServicioWeb.innerHTML = texto;
        direccionWebCapa.classList.add('is-invalid');
        direccionWebCapa.focus();
        conectarServicio.innerHTML = '<i class="bi bi-box-arrow-down" ></i> Conectar';
    }
});

function limpiar()
{
    mensajeServicioWeb.innerHTML = '';
    direccionWebCapa.classList.remove('is-invalid');
    direccionWebCapa.value= '';
    direccionWebCapa.focus();
    conectarServicio.classList.remove('disabled');
    conectarServicio.innerHTML = '<i class="bi bi-box-arrow-down" ></i> Conectar';
    capasDisponibles.style.display= 'none';
    grupoAgregar.style.display= 'none';
    interoperabilidad.style.display= 'none';
    capasTematicas.innerHTML= '';
    capasInteroperabilidad.innerHTML= '';
}

limpiarServicio.addEventListener('click', function(){
	global.mapa.getLayers().forEach(function(layer) {
		if (layer.get('id') === 'servicioWMS' || layer.get('id') === 'servicioWFS' || layer.get('id') === 'servicioRest') {
            direccionWebCapa.value = '';           
			
			global.mapa.removeLayer(layer);
			global.vista.setCenter(centroid3857);
			if(global.mapa.getSize()[0] > 1296) global.vista.setZoom(6);
			else global.vista.setZoom(5.4);
		}
	});

    limpiar();
});

function conectarServicioOGCWMS(){    
    const urlServicioWMS = modificarURLServicioWMS(direccionWebCapa.value.trim());

    if(validarUrl(urlServicioWMS))
    {
        fetch(urlServicioWMS, {mode: 'cors'})
        .then(response => {
            if (!response.ok) throw new Error('La solicitud falló');        
            return response.text();
        })
        .then(xmlText => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlText, 'text/xml');

            //let layerElements = xmlDoc.querySelectorAll('Layer[queryable="1"][opaque="0"]');
            let grupoCapas = xmlDoc.querySelectorAll('Layer[queryable="1"]');
            capasDisponibles.style.display= 'block';
            grupoAgregar.style.display= 'block';
            limpiarServicio.classList.remove('disabled');
            
            grupoCapas.forEach(capa => {
                let nombre = capa.querySelector('Name').textContent;
                let titulo = capa.querySelector('Title').textContent;
                const e = document.createElement('option');
                e.textContent = titulo;
                e.value = nombre;
                capasTematicas.appendChild(e);            
            });
        })
        .catch(error => {
            const texto = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error:</strong> Ocurrió un error al realizar la solicitud.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
            mensajeServicioWeb.innerHTML = texto;
            direccionWebCapa.value= '';
            direccionWebCapa.focus();      
        });

        mensajeServicioWeb.innerHTML = '';
        conectarServicio.classList.add('disabled');
        direccionWebCapa.classList.remove('is-invalid');
        conectarServicio.innerHTML = '<i class="bi bi-box-arrow-down" ></i>Conectar';
        limpiarServicio.classList.remove('disabled');        
    }
    else limpiar();
}

function conectarServicioOGCWFS(){    
}

function conectarServicioRestArcGIS(){
    const servicioRest = new TileLayer({
        id: 'servicioRest',
        extent: extension3857,
        source: new TileArcGISRest({
            url: 'https://sigrid.cenepred.gob.pe/arcgis/rest/services/Cartografia_Peligros/MapServer',
            //url: 'https://portalgeo.sbn.gob.pe/geosrv/rest/services/sdrc/wms_sinabip_libre/MapServer',
            //crossOrigin: 'Anonymous',
            params: {
            'TRANSPARENT': true,
            layers: 'show:5010100',
            },                          
        }),
    });
    servicioRest.setVisible(true);
    global.mapa.addLayer(servicioRest);
    conectarServicio.style.display= '';      
}

agregarCapas.addEventListener('click', function(){
    if(capasTematicas.options.length > 0)
    {   
        interoperabilidad.style.display= 'block';
        const codigo= capasTematicas.selectedIndex,
        idCapa= capasTematicas.value,
        nombreCapa = capasTematicas.options[codigo].innerText.substring(0,25),
        url = direccionWebCapa.value,
        tipo = tipoServicio.value;

        const opcionAEliminar = capasTematicas.querySelector('option[value="' + idCapa + '"]');
        if (opcionAEliminar) opcionAEliminar.remove();
        
        const html = `<div class="row d-flex justify-content-between"><div class="col-auto w-80"><div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="${idCapa}" data-url="${url}" data-capa="${idCapa}" data-tipo="${tipo}" /><label class="form-check-label" for="${idCapa}">${nombreCapa}</label></div></div><div class="col-auto w-20"><div class="dropdown"><i class="bi bi-three-dots-vertical btn btn-secondary custom-dosts-vertical btn-sm" type="button" id="btn${idCapa}" data-bs-toggle="dropdown" aria-expanded="false" ></i><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2"><li><a class="dropdown-item" id="i${idCapa}" href="#" ><i class="bi bi-info-square-fill"></i> Identificar</a></li></ul></div></div></div>`;
        capasInteroperabilidad.innerHTML +=html;

        let control = document.getElementById(idCapa);
        control.addEventListener("change", function() {
            if (this.checked) 
                cargarCapa(this.id, true);            
            else cargarCapa(this.id, false);            
        });
    }
});

function cargarCapa(id, estado)
{
    const idCapa = document.getElementById(id);
    const urlWMS = idCapa.getAttribute('data-url'),
    tipo = idCapa.getAttribute('data-tipo');
    
    let capas = global.mapa.getLayers().getArray();
    let capa= capas.filter(c => c.get('id') === 'i'+id);

    if(capa.length== 0)
    {
        switch (tipo) {
            case 'wms':
                const servicioWMS = new ImageLayer({
                    id: 'i' + id,
                    visible: true,
                    source: new ImageWMS({
                      ratio: 1,
                      url: urlWMS,
                      crossOrigin: 'Anonymous',
                      params: {
                          'FORMAT': formatoImagen,
                          'VERSION': versionWMS,
                          'TRANSPARENT': true, 
                          'STYLES': '',
                          'LAYERS': id,
                      }
                    }),
                  });
                  global.mapa.getLayers().insertAt(capas.length - 1, servicioWMS);
            break;
            case 'wfs':            
            break;
            case 'rest':            
            break;
        }
    }
    else
    {
        const i = capa[0];
        i.setVisible(estado);
    }
}
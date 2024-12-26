import {enlacesWeb} from './configuracion.js';

const buttons = document.querySelectorAll('.custom-button-tiktok-plus-widget'),
enlace = document.createElement('a'); 

buttons.forEach(function(button) {
    button.addEventListener('click', function(e) {                
        if(this.id === 'home')
        {
            enlace.href = enlacesWeb[0];            
        }
        else if(this.id === 'consultas')
        {
            enlace.href = enlacesWeb[1];
        }
        else if(this.id === 'tablero')
        {
            enlace.href = enlacesWeb[2];
            
        }
        
        enlace.target = '_blank';
        enlace.style.display = 'block';
        e.preventDefault();
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(link);
        //window.location.href = enlace.href;      
    });    
});
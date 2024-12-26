document.addEventListener('DOMContentLoaded', function () {
    
    // PARA MOSTRAR VENTANAS MODALES DE WIDGETES DE LADO DERECHO
    // Asocia un evento de clic a todos los elementos con la clase 'custom-menu-widget-item'
    document.body.addEventListener('click', function (event) {
        
        const clickedElement = event.target;
        // Verifica si el elemento clicado tiene la clase 'custom-menu-widget-item'
        if (clickedElement.classList.contains('custom-menu-widget-item-image-icon')) {
            // Encuentra el elemento padre con la clase 'custom-menu-widget-item'
            const menuItem = clickedElement.closest('.custom-menu-widget-item');
            // Verifica si el menuItem está presente
            if (menuItem) {
                // Encuentra el elemento hijo con la clase 'custom-menu-widget-item-popup'
                const popup = menuItem.querySelector('.custom-menu-widget-item-popup');
                const allPopups = document.querySelectorAll('.custom-menu-widget-item-popup');
                // Verifica si el popup está presente
                if (popup) {
                    // Cierra todos los popups antes de abrir el nuevo
                    allPopups.forEach(p => {
                        if (p !== popup) {
                            p.style.display = 'none';
                        }
                    });
                    // Muestra u oculta el popup
                    //popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
                    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
                    //console.log(popup);
                }
            }
        }

        // Verifica si el clic fue en un widget
        if(clickedElement.classList.contains('custom-menu-widget-item')){
            // Encuentra el elemento hijo con la clase 'custom-menu-widget-item-popup'
            const popup = clickedElement.querySelector('.custom-menu-widget-item-popup');
            // Verifica si el popup está presente
            if (popup) {
                // Muestra u oculta el popup
                //popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
                popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
            }
            
        }
        // Verifica si el clic fue en el botón cerrar del popup
        if (clickedElement.classList.contains('custom-btn-widget-item-poup-close')) {
            const menuItem = clickedElement.closest('.custom-menu-widget-item');
            if (menuItem) {
                // Encuentra el elemento hijo con la clase 'custom-menu-widget-item-popup'
                const popup = menuItem.querySelector('.custom-menu-widget-item-popup');
                if (popup) {
                    // Oculta el popup
                    //popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
                    popup.style.display = 'none';
                }
            }
        }
    });

    //PARA EL BOTTON TIPO TIKTOK
    // Selecciona el elemento por su ID
    const customButton = document.getElementById('customButtonTiktokPlus');
    if (customButton) {
        // Agrega un escuchador de eventos de clic al elemento
        customButton.addEventListener('click', function () {
            // Toggle de la clase para mostrar/ocultar el cuerpo y los iconos
            const customContent = document.getElementById('customButtonTiktokContent');
            if (customContent) {
                customContent.classList.toggle('show-body');
            }
        });
    }
});

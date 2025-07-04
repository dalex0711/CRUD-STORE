apiUrl = "http://localhost:3000/productos";

/*-----OBTENER*/
async function getData() { //OBTENIENDO RECURSO
    try {
        let response =  await fetch(apiUrl);
        
        if(!response.ok) throw{
            status : response.status,
            statusText : response.statusText
        };

        // Convierte la respuesta a formato JSON para poder trabajar con los datos
        let json = await response.json();
        console.log("Desde getData: ",json);
        mostrarProductos(json);
    } catch (error) {
        let message = error.statusText || "Ha ocurrido un error."
        console.log(`GET: Error ${error.status}: ${message}`)
    }
}
/*-----CREAR*/ 
async function postData(data) { //CREANDO UN NUEVO RECURSO
    try {
        const response = await fetch(apiUrl,{
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });

        if (!response.ok) throw {
            status: response.status,
            statusText: response.statusText
        };
        
        const json = await response.json();     
        console.log("Datos creados:", json);

    } catch (error) {
        let message = error.statusText || "Error al crear datos.";
        console.log(`Error ${error.status}: ${message}`);
    }
}

 
/*-----ACTUALIZAR*/
async function updateData(id, data) { //ACTUALIZANDO UN RECURSO EXISTENTE
    console.log(`Actualizando producto con ID: ${id}`);
    console.log("Datos a actualizar:", data);
    console.log("URL completa:", `${apiUrl}/${id}`);

    try {
        const response = await fetch(`${apiUrl}/${id}`,{
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });

        if (!response.ok) throw {
            status: response.status,
            statusText: response.statusText
        };
        
        const json = await response.json();     
        console.log("Datos creados:", json);

    } catch (error) {
        let message = error.statusText || "Error al crear datos.";
        console.log(`Error ${error.status}: ${message}`);
    }
}

/*-----ELIMIINAR*/

async function deleteData(id) { //ELIMINANDO UN RECURSO
    try {
        const response = await fetch(`${apiUrl}/${id}`,{
            method : 'DELETE'
        });

        if (!response.ok) throw {
            status: response.status,
            statusText: response.statusText
        };
        
        const json = await response.json();     
        console.log("Datos eliminados:", json);

    } catch (error) {
        let message = error.statusText || "Error al crear datos.";
        console.log(`Error ${error.status}: ${message}`);
    }
}

/**
 *-------------------------------------------------------------- AL DOM
 */

function mostrarProductos(productos){
    const container = document.getElementById('productos-container');
    const template = document.getElementById('template-producto');

    container.innerHTML = '';

    productos.forEach(producto => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.text-name').textContent = producto.name;
        clone.querySelector('.text-id').textContent = `ID: ${producto.id}`;
        clone.querySelector('.text-feature').textContent = producto.feature;
        clone.querySelector('.price').textContent = `$${producto.price}`

        container.appendChild(clone)
    });
}


//CARGAR PRIMERO EL HTML Y POSTERIOR LLAMAR LA FUNCION

window.addEventListener('DOMContentLoaded',() => getData());



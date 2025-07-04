apiUrl = "http://localhost:3000/productos";

/*-----------------------------------------------------------------------------------------------OBTENER*/
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
/*-----------------------------------------------------------------------------------------------CREAR*/ 
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

 
/*-------------------------------------------------------------------------------------------ACTUALIZAR*/
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

/*-------------------------------------------------------------------------------------------------------ELIMINAR*/

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
 *---------------------------------------------------------------------------------------------------------------AL DOM
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


///-----------------------------------------------------------------------------------------------------CONST DE FORM

const form = document.getElementById('form-crud'),
      productID = document.getElementById('input-id'),
      productName = document.getElementById('input-name'),
      productFeature = document.getElementById('input-feature'),
      productoPrice = document.getElementById('input-price');

let containerForm = document.getElementById('containerForm'),
    titleForm= document.getElementById('title-form'),
    messageForm = document.getElementById('message');

//BUTTON DE FORM 
const createBtn = document.getElementById('btn-create'),
      updateBtn = document.getElementById('btn-update'),
      deleteBtn = document.getElementById('btn-delete'),
      formulario = document.getElementById('form');



//----------------------------------------------------------------------------------------------------------HABILITANDO INPUTS DEPENDIENDO DEL BUTTON


pressedButton = null;

//-------------------------------------------- PARA CREAR: name,feature,price.
createBtn.addEventListener('click',() => {

    pressedButton = 'create';
    titleForm.innerHTML = "Create"
    messageForm.innerHTML = "You just need to enter the [name, price, and features]. The ID is automatic."
    containerForm.style.display = "flex";

    productID.disabled = true;
    productName.disabled = false;
    productFeature.disabled = false;
    productoPrice.disabled = false; 


});

console.log(containerForm)

//------------------------------------------- PARA UPDATE: id,name,feature,price.
updateBtn.addEventListener('click',() => {

    pressedButton = 'update';
    titleForm.innerHTML = "Update"
    messageForm.innerHTML = "You must enter all fields"
    containerForm.style.display = "flex";

    productID.disabled = false;
    productName.disabled = false;
    productFeature.disabled = false;
    productoPrice.disabled = false; 

});

//--------------------------------------------- PARA DELETE: id o name 
deleteBtn.addEventListener('click',() => {

    pressedButton = 'delete';
    titleForm.innerHTML = "Delete"
    messageForm.innerHTML = "Enter the id to delete"
    containerForm.style.display = "flex";

    productID.disabled = false;
    productName.disabled = true;
    productFeature.disabled = true;
    productoPrice.disabled = true; 

});




//---------------------------------------------------------Fuction para validar los valores



formulario.addEventListener("submit", onFormSubmit);

//--------Aquí obtenemos volares
function onFormSubmit(e){
    e.preventDefault();
	const data = new FormData(e.target);
    const id = data.get("id");
	const name = data.get("name");
    const price = data.get("price");
    const feature = data.get("feature")
	console.log(`Nombre: ${name}, Correo Electrónico: ${price} ${feature} ${id}` );
}


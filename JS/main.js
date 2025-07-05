// Import API utility
import { apiRequest } from './Api/api.Rest.js';

// Show products in the container
function showProducts(products) {
  const container = document.getElementById('productos-container');
  const template = document.getElementById('template-producto');

  container.innerHTML = ''; // Clear container

  products.forEach(product => {
    const clone = template.content.cloneNode(true);

    clone.querySelector('.text-name').textContent = product.name;
    clone.querySelector('.text-id').textContent = `ID: ${product.id}`;
    clone.querySelector('.text-feature').textContent = product.feature;
    clone.querySelector('.price').textContent = `$${product.price}`;

    container.appendChild(clone);
  });
}

// Load products when the page loads
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const products = await apiRequest('GET');
    showProducts(products);
  } catch (error) {
    console.error("Error loading products", error);
  }
});

// Form and buttons
const form = document.querySelector('#form'),
      createBtn = document.querySelector('#btn-create'),
      updateBtn = document.querySelector('#btn-update'),
      deleteBtn = document.querySelector('#btn-delete'),
      
      productID = document.getElementById('input-id'),
      productName = document.getElementById('input-name'),
      productFeature = document.getElementById('input-feature'),
      productoPrice = document.getElementById('input-price');

let containerForm = document.querySelector('#containerForm'),
    titleForm = document.querySelector('#title-form'),
    messageForm = document.querySelector('#message'),
    pressedButton = null;

// Handle create
createBtn.addEventListener('click', () => {
  pressedButton = 'create';
  titleForm.innerHTML = "Create";
  messageForm.innerHTML = "You just need to enter the [name, price, and features]. The ID is automatic.";
  containerForm.style.display = "flex";

  productID.disabled = true;
  productName.disabled = false;
  productFeature.disabled = false;
  productoPrice.disabled = false; 
});

// Handle update
updateBtn.addEventListener('click', () => {
  pressedButton = 'update';
  titleForm.innerHTML = "Update";
  messageForm.innerHTML = "You must enter all fields";
  containerForm.style.display = "flex";

  productID.disabled = false;
  productName.disabled = false;
  productFeature.disabled = false;
  productoPrice.disabled = false; 
});

// Handle delete
deleteBtn.addEventListener('click', () => {
  pressedButton = 'delete';
  titleForm.innerHTML = "Delete";
  messageForm.innerHTML = "Enter the id to delete";
  containerForm.style.display = "flex";

  productID.disabled = false;
  productName.disabled = true;
  productFeature.disabled = true;
  productoPrice.disabled = true; 
});



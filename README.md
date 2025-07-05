# 🛍️ Clothing Shop CRUD (HTML + JS + JSON Server)

This is a simple frontend CRUD app for managing clothing products using HTML, JavaScript, and a fake REST API with [JSON Server](https://github.com/typicode/json-server).

## 🚀 How to Run This Project

### 1. Install JSON Server (only the first time)

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
npm install -g json-server
```

### 2. Start the JSON Server

Run this command in the root directory of the project (where `db.json` is located):

```bash
json-server --watch db.json --port 3000
```

This will start the API at:
```
http://localhost:3000/productos
```

### 3. Open the App

Now open `index.html` in your browser. You can use Live Server in VSCode or just double-click the file.

## 📁 Project Structure

```
.
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── db.json             # Fake JSON database
└── JS/
    ├── main.js         # Main logic and DOM handling
    └── Api/
        └── api.Rest.js # API utility (GET, POST, PUT, DELETE)
```

## ⚙️ Features

- Create new products
- View all products
- Update existing products
- Delete products by ID
- Validations for empty fields, ID existence, and invalid prices

## 🧪 Technologies Used

- HTML5 
- JavaScript 
- JSON Server 

## 👤 Author

Dalexa Sanjuan

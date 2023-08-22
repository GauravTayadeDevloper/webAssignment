let db;
async function initDatabase() {
    try {
        const SQL = await initSqlJs();
        db = new SQL.Database();
        db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, quantity INTEGER, price REAL)');
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}
function addProduct(name, quantity, price) {
    db.run('INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)', [name, quantity, price]);
}
function displayProductsInTable() {
    const productTable = document.getElementById('productTable');
    const tbody = productTable.querySelector('tbody');
    tbody.innerHTML = ''; 
    if (db) {
        const result = db.exec('SELECT * FROM products');
        if (result && result.length > 0) {
            const rows = result[0].values;
            rows.forEach(row => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                `;
                tbody.appendChild(newRow);
            });
        }
    }
}

	document.addEventListener('DOMContentLoaded', () => {
    	initDatabase();

    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', event => {
        event.preventDefault();
        
        const productName = document.getElementById('productName').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const price = parseFloat(document.getElementById('price').value);

        addProduct(productName, quantity, price);

        productForm.reset();
    });
	const displayButton = document.getElementById('display');
    displayButton.addEventListener('click', event => {
        displayProductsInTable();
	
});	    
});


const productList = document.getElementById('productList');
        const searchInput = document.getElementById('searchInput');
        const sortBy = document.getElementById('sortBy');
        let products = [];

        // Function to fetch and display products
        function fetchProducts() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://cynthiaesthermetilda.github.io/Xhrdemo/products.json', true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    products = JSON.parse(xhr.responseText);
                    displayProducts();
                } else {
                    console.error('Error fetching data:', xhr.statusText);
                }
            };

            xhr.send();
        }

        // Function to display products
        function displayProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const sortByValue = sortBy.value;

            productList.innerHTML = '';

            const filteredProducts = products
                .filter(product => product.name.toLowerCase().includes(searchTerm))
                .sort((a, b) => (sortByValue === 'name') ? a.name.localeCompare(b.name) : a.price - b.price);

            filteredProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                const productName = document.createElement('h2');
                productName.textContent = product.name;

                const productDescription = document.createElement('p');
                productDescription.textContent = product.description;

                const productPrice = document.createElement('p');
                productPrice.textContent = `Price: $${product.price.toFixed(2)}`;

                const productImage = document.createElement('img');
                productImage.src = `https://source.unsplash.com/200x200/?technology ${Math.random() * 100}`;
                productImage.alt = product.name;

                productDiv.appendChild(productImage);
                productDiv.appendChild(productName);
                productDiv.appendChild(productDescription);
                productDiv.appendChild(productPrice);

                productList.appendChild(productDiv);
            });
        }

        // Event listeners for search and sorting
        searchInput.addEventListener('input', displayProducts);
        sortBy.addEventListener('change', displayProducts);

        // Fetch products on page load
        fetchProducts();
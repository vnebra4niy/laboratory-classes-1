    // 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.
    const fs = require("fs");
    const { STATUS_CODE } = require("../constants/statusCode");

    // 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.
    const productRouting = (request, response) => {
        if (request.url === "/product/add") {
            return renderAddProductPage(response);
        } else if (request.url === "/product/new") {
            return renderNewProductPage(response);
        } else if (request.url.startsWith("/product/save") && request.method === "POST") {
            return addNewProduct(request, response);
        }
    };

    // 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.
    const renderAddProductPage = (response) => {
        response.writeHead(STATUS_CODE.FOUND, { "Content-Type": "text/html" });
        response.end("<h1>Dodaj nowy produkt</h1><form method='POST' action='/product/save'><input name='product' /><button>Dodaj</button></form>");
    };

    // 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
    // Podpowiedź: fileSystem.readFile(...);
    const renderNewProductPage = (response) => {
        fs.readFile("product.txt", "utf8", (err, data) => {
            response.writeHead(STATUS_CODE.FOUND, { "Content-Type": "text/html" });
            response.end(`<h1>Nowy produkt: ${data || "Brak produktu"}</h1>`);
        });
    };

    // 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
    // Podpowiedź: fileSystem.writeFile(...);
    // Podpowiedź: response.setHeader("Location", "/product/new");
    const addNewProduct = (request, response) => {
        let body = "";
        request.on("data", chunk => {
            body += chunk.toString();
        });
        request.on("end", () => {
            const product = new URLSearchParams(body).get("product");
            fs.writeFile("product.txt", product, () => {
                response.writeHead(STATUS_CODE.FOUND, { Location: "/product/new" });
                response.end();
            });
        });
    };

    // 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.
    module.exports = productRouting;
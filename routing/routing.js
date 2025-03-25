// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
const homeRouting = require("./home");
const productRouting = require("./product");
const logoutRouting = require("./logout");

// 📦 Zaimportuj obiekt STATUS_CODE.
const { STATUS_CODE } = require("../constants/statusCode");

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
// Podpowiedź: const requestRouting = (request, response) => {
const requestRouting = (request, response) => {
    console.log(`INFO [${new Date().toISOString()}]: ${request.method} – ${request.url}`);

    if (request.url === "/") {
        homeRouting(request, response);
    } else if (request.url.startsWith("/product")) {
        productRouting(request, response);
    } else if (request.url === "/logout") {
        logoutRouting(request, response);
    } else if (request.url === "/kill") {
        console.log(`PROCESS [${new Date().toISOString()}]: logout initiated, application will shut down.`);
        process.exit();
    } else {
        console.error(`ERROR [${new Date().toISOString()}]: Requested URL ${request.url} doesn’t exist.`);
        response.writeHead(STATUS_CODE.NOT_FOUND);
        response.end("404 Not Found");
    }
};
// 🏗 Tutaj stwórz logowanie do konsoli informacji, mówiące o typie logowania (INFO), dacie, metodzie oraz url żądania.
// 🏗 Tutaj stwórz podstawowy 'request routing' dla ścieżek '/', zawierającej /product' oraz '/logout'. Przekaż `request` i `routing` do odpowiednio routingu.

// 🏗 Obsłuż specjalny przypadek, jeśli użytkownik zostanie przekierowany na ścieżkę /kill, aplikacja się zamknie.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (PROCESS), dacie oraz informację, że wylogowowyanie zostało wywołane a aplikacja zamknie się.

// 🏗 Tutaj stwórz obsługę przypadku, jeśli żądany URL nie istnieje. Zwróć wtedy błąd 404.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (ERROR), dacie oraz informację, że żądany url nie istnieje.
//  };

// 🔧 Wyeksportuj funkcję 'requestRouting', aby inne moduł mogły jej używać.
module.exports = requestRouting;


#include "http_listener.h"

#include <cpprest/json.h>

using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

// Función para manejar la solicitud POST del formulario
void handle_post(const http_request& request)
{
    // Obtener los datos del formulario
    utility::string_t titulo = request.extract_json().get().at(U("titulo")).as_string();
    utility::string_t autor = request.extract_json().get().at(U("autor")).as_string();
    utility::string_t genero = request.extract_json().get().at(U("genero")).as_string();
    int precio = request.extract_json().get().at(U("precio")).as_integer();

    // Aquí puedes realizar las operaciones necesarias con los datos recibidos, como guardarlos en una base de datos

    // Crear una respuesta
    http_response response(status_codes::OK);
    response.set_body(U("Libro agregado correctamente"));

    // Enviar la respuesta
    request.reply(response);
}

int main()
{
    // Crear un listener HTTP
    http_listener listener(U("http://localhost:8080"));

    // Manejar la solicitud POST del formulario
    listener.support(methods::POST, handle_post);

    try {
        // Iniciar el listener
        listener.open().wait();

        // Mantener el programa en ejecución
        std::cout << "Servidor en ejecución. Presione Enter para detenerlo." << std::endl;
        std::cin.ignore();

        // Detener el listener
        listener.close().wait();
    }
    catch (const std::exception& ex) {
        std::cerr << "Error: " << ex.what() << std::endl;
    }

    return 0;
}

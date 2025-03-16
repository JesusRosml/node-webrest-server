import http2 from "http2";
import fs from "fs";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    const message = `
        Este metodo se utiliza para enviar una parte del cuerpo de la respuesta al cliente. Puedes llamarlo
        multiples veces para enviar datos en fragmentos. Es util cuando necesitas enviar datos de manera
        incremental.
    `;

    console.log(req.url);
    // Indica de que tipo es la respuesta que esta dando el servidor
    //   res.writeHead(200, { "Content-Type": "text/html" });
    //   res.write("<h1>Mi primer servidor web!</h1>");
    //   res.write(`<p>${message}</p>`);
    //   res.write(`<p>URL en donde se esta realizando peticion: ${req.url}</p>`);
    //   res.end(); // Finaliza la respuesta

    //   const user = {
    //     name: "Jess",
    //     surname: "meshee",
    //     age: 30,
    //     city: "Coatzacoalcos",
    //     message,
    //   };

    //   res.writeHead(200, { "Content-Type": "application/json" });

    //   // Forma corta de escribir el cuerpo y finalizar la respuesta, es quivalente a colocar el write y end separados
    //   res.end(JSON.stringify(user));

    if (req.url === "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");

      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      res.end(htmlFile);

      return;
    }

    if (req.url?.endsWith(".js")) {
      res.writeHead(200, { "Content-Type": "application/javascript" });
    } else {
      res.writeHead(200, { "Content-Type": "text/css" });
    }

    if (!req.url?.endsWith(".ico")) {
      const fileResponse = fs.readFileSync(`./public${req.url}`, "utf-8");

      res.end(fileResponse);
    }
  }
);

server.listen(8081, () => {
  console.log("Server running on port 8081");
});

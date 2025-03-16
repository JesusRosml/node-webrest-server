import express from "express";
import path from "path";

interface Options {
  port: number;
  public_path: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, public_path = "public" } = options;

    this.port = port;
    this.publicPath = public_path;
  }

  async start() {
    //* Middlewares: Son funciones que se ejecutan cada que se accede a una ruta
    this.app.use(express.static(this.publicPath));

    //* Cualquier petición que no se encuentre en la carpeta public pasara por este middleware
    this.app.get("*", (req, res) => {
      //* De esta manera podemos servir SPA con router, dirname es una ruta absoluta
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );

      res.sendFile(indexPath);

      return;
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

import express, { Router } from 'express';

interface Options {
  port: number;
  public_path?: string;
  routes: Router;
}

export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, public_path = 'public', routes } = options;
    this.port = port;
    this.routes = routes
    this.publicPath = public_path;
  }

  async start() {

    //* Middlewares
    this.app.use( express.json() ); // raw
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
  

    //* Public Folder
    this.app.use( express.static( this.publicPath ) );

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}
import express, { Router } from 'express';
import path from 'path';


interface Options {
    port: number;
    publicPath?: string;
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        this.port = options.port || 3000;
        this.publicPath = options.publicPath || 'public';
        this.routes = options.routes;
    }

    async start() {

        //* Middlewares
        this.app.use(express.json()); // raw
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.use(this.routes);

        //* SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(3000, () => {
            console.log(`Server is running on port ${3000}`);
        });
    }

}

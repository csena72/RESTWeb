import express from 'express';
import path from 'path';


interface Options {
    PORT?: number;
    PUBLIC_PATH?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        this.port = options.PORT || 3000;
        this.publicPath = options.PUBLIC_PATH || 'public';
    }

    async start() {

        //* Middlewares

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(3000, () => {
            console.log(`Server is running on port ${3000}`);
        });
    }

}

import * as bodyParser from 'body-parser';
import { Logger } from '@overnightjs/logger';
import { Languages } from './routes/languages';
import * as express from 'express';
import { Application } from 'express';
import { Request, Response } from 'express';
import admin = require('firebase-admin');

export class MdFirebaseServer {
    app = express();
    db:admin.firestore.Firestore
    alive(req: Request, res: Response) {
        res.status(200).json({message: "Ok"});
    }
    constructor(db:admin.firestore.Firestore) {
        this.db = db;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupRoutes();
    }
    setupRoutes(): void {
        const languagesController = new Languages(this.db);
        this.app.get('', this.alive);
        this.app.get('/getAllLanguages', (req, res) =>{
            languagesController.getAll(req, res);
        });
    }

    public get():Application{
        return this.app;
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp('Server listening on port: ' + port);
        })
    }
}
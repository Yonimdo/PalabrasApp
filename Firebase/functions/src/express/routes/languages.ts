import { Request, Response } from 'express';
import admin = require('firebase-admin');

import { Logger } from '@overnightjs/logger';

export class Languages {
    db:admin.firestore.Firestore;
    map:any = {}
    
    constructor(db:admin.firestore.Firestore){
        this.db = db;
    }
    
    getAll(req: Request, res: Response){
        this.db.collection('languages').get().then(snapshot=>{
            const languages:any = []
            snapshot.forEach(doc => {
                languages.push(doc.data())
            });
            res.status(200).json(languages);        
        }).catch(e=>{
            Logger.Err(e)
            res.status(503).send(503);
        })
    }

}
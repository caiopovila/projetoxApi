import { Request, Response } from "express";

import { Cover, CoverInterface } from '../model/coverSchema';


export const covers = async (req: Request, res: Response) => {
    try {
        let param: Object = req.query.cover ? { name: req.query.cover } : { };
        
        const list: CoverInterface[] = await Cover.find(param).exec();
        
        res.status(list.length > 0 ? 200 : 204).json(list);
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    }
}; 

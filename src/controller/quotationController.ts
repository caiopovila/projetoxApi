import { Request, Response } from "express";

import { Quotation, QuotationInterface } from '../model/quotationSchema';
import { Cover, CoverInterface } from '../model/coverSchema';


export const quotations = async (req: Request, res: Response) => {
    try {
        const quotation: QuotationInterface = await Quotation.findOne({ id_user: req.user }).populate({ path: 'id_user', select: 'name username' }).populate('cover').exec();
        
        res.status(quotation ? 200 : 204).json(quotation);
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    }
};

export const newQuotation = async (req: Request, res: Response) => {
    try {
        const cover: CoverInterface = await Cover.findOne({ _id: req.body.cover }).exec();     
        
        if (!cover)
            return res.status(422).json({ E: 'Cobertura inválida' });
        
        req.body.id_user = req.user;
        
        const newQuotation: Object | QuotationInterface = new Quotation(req.body);
        
        newQuotation['save']((err, result) => {
            if (err)
                res.status(422).json(err);
            else
                res.status(201).json(result);
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ E: 'Erro inesperado' });
    }
};

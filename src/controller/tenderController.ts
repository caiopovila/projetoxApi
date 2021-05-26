import { Request, Response } from "express";

import { Quotation, QuotationInterface } from '../model/quotationSchema';
import { Tender, TenderInterface } from '../model/tenderSchema';


export const tenders = async (req: Request, res: Response) => {
    try {
        const list: TenderInterface = await Tender.findOne({ user: req.user })
        .populate('refer_quotation_tender')
        .populate('refer_policy_tender')
        .populate({ path: 'user', select: 'name username' });
        
        res.status(!list ? 204 : 200).json(list);
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    }
};

export const newTender = async (req: Request, res: Response) => {
    try {
        const quotation: QuotationInterface = await Quotation.findOne({ id_user: req.user }).exec();
        
        if (!quotation)
            return res.status(422).json({ E: 'Não há contação' });
        else {
            
            req.body.n_tender = quotation.n_quotation;
            req.body.price = quotation.value;
            req.body.user = req.user;
            
            const newTender: any | TenderInterface = new Tender(req.body);
            
            newTender.save((err, result) => {
                if (err)
                    res.status(422).json(err);
                else
                    res.status(201).json([quotation, result]);
            });
            
        };
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    }
};


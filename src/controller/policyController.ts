import { Request, Response } from "express";

import { Tender, TenderInterface } from '../model/tenderSchema';
import { Policy, PolicyInterface } from '../model/policySchema';


export const policys = async (req: Request, res: Response) => {
    try {
        
        const policy: Object | PolicyInterface = await Policy.findOne({ user: req.user })
        .populate('refer_quotation_policy')
        .populate('refer_tender_policy')
        .populate('user').exec();
        
        res.status(policy ? 200 : 204).json(policy);
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    }
};

export const newPolicy = async (req: Request, res: Response) => {
    try {
        const tender: Object | TenderInterface = await Tender.findOne({ id_user: req.user })
        .populate('refer_quotation_tender').exec();
    
        if (!tender || !tender['refer_quotation_tender']) {
            
            return res.status(422).json({ E: 'Não existe proposta' }); 
            
        } else {
            
            const newPolicy: Object | PolicyInterface = new Policy({ n_policy: tender['n_tender'], user: req.user });
            
            newPolicy['save']((err, result) => {
                if (err)
                    res.status(422).json(err);
                else
                    res.status(201).json([tender, result]);
            });
            
        };
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    }
}; 

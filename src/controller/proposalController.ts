import { Request, Response } from "express";

import { Quotation, QuotationInterface } from '../model/quotationSchema';
import { Proposal, ProposalInterface } from '../model/proposalSchema';


export const proposals = async (req: Request, res: Response) => {
    try {
        const list: ProposalInterface = await Proposal.findOne({ user: req.user })
        .populate('refer_quotation_proposal')
        .populate('refer_policy_proposal')
        .populate({ path: 'user', select: 'name username' });
        
        res.status(!list ? 204 : 200).json(list);
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    }
};

export const newProposal = async (req: Request, res: Response) => {
    try {
        const quotation: QuotationInterface = await Quotation.findOne({ id_user: req.user }).exec();
        
        if (!quotation)
            return res.status(422).json({ E: 'Não há contação' });
        else {
            
            req.body.n_proposal = quotation.n_quotation;
            req.body.price = quotation.value;
            req.body.user = req.user;
            
            const newProposal: any | ProposalInterface = new Proposal(req.body);
            
            newProposal.save((err, result) => {
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


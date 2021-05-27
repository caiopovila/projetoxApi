import { Request, Response } from "express";

import { Proposal, ProposalInterface } from '../model/proposalSchema';
import { Policy, PolicyInterface } from '../model/policySchema';


export const policys = async (req: Request, res: Response) => {
    try {
        
        const policy: Object | PolicyInterface = await Policy.findOne({ user: req.user })
        .populate('refer_quotation_policy')
        .populate('refer_proposal_policy')
        .populate('user').exec();
        
        res.status(policy ? 200 : 204).json(policy);
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    }
};

export const newPolicy = async (req: Request, res: Response) => {
    try {
        const proposal: Object | ProposalInterface = await Proposal.findOne({ id_user: req.user })
        .populate('refer_quotation_proposal').exec();
    
        if (!proposal || !proposal['refer_quotation_proposal']) {
            
            return res.status(422).json({ E: 'Não existe proposta' }); 
            
        } else {
            
            const newPolicy: Object | PolicyInterface = new Policy({ n_policy: proposal['n_proposal'], user: req.user });
            
            newPolicy['save']((err, result) => {
                if (err)
                    res.status(422).json(err);
                else
                    res.status(201).json([proposal, result]);
            });
            
        };
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    }
}; 

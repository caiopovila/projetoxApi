import { db } from '../connection';

import { Quotation, QuotationInterface } from '../model/quotationSchema';


export interface ProposalInterface {
    _id?: db.Schema.Types.ObjectId,
    n_proposal: Number,
    price: Number,
    payment: Number,
    user: String
};

const ProposalSchema = new db.Schema<ProposalInterface>({
    n_proposal: {
        type: Number,
        require: [ true, 'Algo deu errado' ],
        unique: true
    },
    price: {
        type: Number,
        require: [ true, 'Preço não calculado' ]
    },
    payment: {
        type: Number,
        require: true,
        default: 0,
        min: [ 0, 'Forma de pagamento inválida' ],
        max: [ 12, 'A parcela máxima ultrapassada' ]
    },
    user: {
        type: db.Schema.Types.ObjectId, 
        require: [ true, 'Usuário não informado' ],
        unique: true,
        ref: 'users'
    }    
});

ProposalSchema.virtual('refer_quotation_proposal', {
    ref: 'quotations',
    localField: 'n_proposal',
    foreignField: 'n_quotation',
    justOne: true
});


ProposalSchema.virtual('refer_policy_proposal', {
    ref: 'policys',
    localField: 'n_proposal',
    foreignField: 'n_policy',
    justOne: true
});

ProposalSchema.pre('save', async function(next) {
    this.price = this.price * 0.05;
    next();
});

export const Proposal = db.model<ProposalInterface>('proposals', ProposalSchema);

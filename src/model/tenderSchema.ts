import { db } from '../connection';

import { Quotation, QuotationInterface } from '../model/quotationSchema';


export interface TenderInterface {
    _id?: db.Schema.Types.ObjectId,
    n_tender: Number,
    price: Number,
    payment: Number,
    user: String
};

const TenderSchema = new db.Schema<TenderInterface>({
    n_tender: {
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

TenderSchema.virtual('refer_quotation_tender', {
    ref: 'quotations',
    localField: 'n_tender',
    foreignField: 'n_quotation',
    justOne: true
});


TenderSchema.virtual('refer_policy_tender', {
    ref: 'policys',
    localField: 'n_tender',
    foreignField: 'n_policy',
    justOne: true
});

TenderSchema.pre('save', async function(next) {
    this.price = this.price * 0.05;
    next();
});

export const Tender = db.model<TenderInterface>('tenders', TenderSchema);

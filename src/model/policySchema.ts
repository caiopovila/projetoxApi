import { db } from '../connection';


export interface PolicyInterface {
    _id?: db.Schema.Types.ObjectId,
    n_policy: Number,
    user: String
};

const PolicySchema = new db.Schema<PolicyInterface>({
    n_policy: {
        type: Number,
        require: [ true, 'Algo deu errado' ],
        unique: true
    },
    user: {
        type: db.Schema.Types.ObjectId, 
        require: [ true, 'Usuário não informado' ],
        unique: true,
        ref: 'users'
    }
});

PolicySchema.virtual('refer_proposal_policy', {
    ref: 'proposals',
    localField: 'n_policy',
    foreignField: 'n_proposal',
    justOne: true
});

PolicySchema.virtual('refer_quotation_policy', {
    ref: 'quotations',
    localField: 'n_policy',
    foreignField: 'n_quotation',
    justOne: true
});

export const Policy = db.model('policys', PolicySchema);

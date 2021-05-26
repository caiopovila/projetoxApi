import { db } from '../connection';


export interface QuotationInterface {
    _id?: db.Schema.Types.ObjectId,
    n_quotation: Number,
    id_user: db.Schema.Types.ObjectId,
    cpf: String,
    initiate: Date,
    finish: Date,
    value: Number,
    cover: db.Schema.Types.ObjectId
};

const countSchema = new db.Schema<{name: string}>({
    name: String
});

countSchema.virtual('numQuotations', {
  ref: 'quotations',
  localField: 'name',
  foreignField: 'count',
  count: true 
});

export const Count = db.model<{name: string}>('count', countSchema);

const QuotationSchema = new db.Schema<QuotationInterface>({
    n_quotation: { 
        type: Number, 
        require: [ true, 'Algo deu errado' ], 
        unique: true, 
        default: 0
    },
    id_user: { 
        type: db.Schema.Types.ObjectId, 
        require: [ true, 'Usuário não informado' ],
        unique: true,
        ref: 'users'
    },
    cpf: { 
        type: String, 
        require: [ true, 'CPF não informado' ], 
        unique: true 
    },
    initiate: { 
        type: Date, 
        require: [ true, 'Data de início não informada' ],
        validate: {
          validator: function (v) {
            return (
              v &&
              v.getTime() > Date.now() + 24 * 60 * 60 * 1000
            );
          },
          message: "Data inválida para o início da vingência"
        }        
    },
    finish: { 
        type: Date, 
        require: [ true, 'Data do término não informada' ],  
        validate: {
          validator: function (v) {
            return (
              v &&
              v.getTime() > Date.now() + 5 * 12 * 30 * 24 * 60 * 60 * 1000 &&
              v.getTime() < Date.now() + 10 * 12 * 30 * 24 * 60 * 60 * 1000
            );
          },
          message: "Data mínima é 5 anos e máxima de 10 para o término da vingência"
        }        
    },
    value: { 
        type: Number, 
        require: [ true, 'Valor não informado' ], 
        min: [ 5000.00, 'Valor mínimo não aceito' ], 
        max: [ 1000000.00, 'Valor máximo não aceito' ] 
    },
    cover: { 
        type: db.Schema.Types.ObjectId, 
        require: [ true, 'Cobertura não informada' ],
        ref: 'covers'
    },
    count: {
        type: String,
        default: 'user'
    }    
});

// referência https://gist.github.com/marcelinobadin/b383b52ea3f7eb5ef804
QuotationSchema
  .path('cpf')
  .validate(function(cpf) {
    var i = 0;
    var somatoria = 0;
    var cpf = cpf.toString().split("");
    var dv11 = cpf[cpf.length - 2];
    var dv12 = cpf[cpf.length - 1];
    cpf.splice(cpf.length - 2, 2);
    for(i = 0; i < cpf.length; i++) {
      somatoria += cpf[i] * (10 - i);
    }
    var dv21 = (somatoria % 11 < 2) ? 0 : (11 - (somatoria % 11));
    cpf.push(dv21);
    somatoria = 0;
    for(i = 0; i < cpf.length; i++) {
      somatoria += cpf[i] * (11 - i);
    }
    var dv22 = (somatoria % 11 < 2) ? 0 : (11 - (somatoria % 11));

    if (dv11 == dv21 && dv12 == dv22) {
      return true
    } else {
      return false
    }
  }, 'CPF inválido');

QuotationSchema.pre('save', async function(next) {
    const quotations: any = await Count.findOne({ name: 'user' }).populate('numQuotations');
    this.n_quotation = quotations.numQuotations + 1;
    next();
});

export const Quotation = db.model<QuotationInterface>('quotations', QuotationSchema);


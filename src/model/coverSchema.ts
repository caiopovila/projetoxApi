import { db } from '../connection';


export interface CoverInterface {
    _id?: db.Schema.Types.ObjectId,
    name: String,
    description: String
};

const CoverSchema = new db.Schema<CoverInterface>({
    name: {
        type: String,
        require: [ true, 'Nome não informado' ],
        unique: true
    },
    description: {
        type: String,
        require: [ true, 'Descrição requerida' ]
    }
});

export const Cover = db.model<CoverInterface>('covers', CoverSchema);

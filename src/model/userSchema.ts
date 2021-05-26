import { db } from '../connection';
import { bc } from '../bcrypt';


export interface UserInterface {
    _id?: db.Schema.Types.ObjectId;
    password: String;
    username: String;
    name?: String;
};

const UserSchema = new db.Schema<UserInterface>({
    name: String,
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

UserSchema.pre('save', async function(next) {
    this.password = await bc.encryptPassword(this.password);
    next();
});

export const User = db.model<UserInterface>('users', UserSchema);

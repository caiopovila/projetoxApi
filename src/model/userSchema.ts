import { db } from '../connection';
import { userList } from '../data/user';


export interface UserInterface {
    password: string;
    username: string;
    name?: string;     
};

const UserSchema = new db.Schema<UserInterface>({
    name: String,
    username: { type: String, require: true },
    password: { type: String, require: true }
});

export const User = db.model<UserInterface>('users', UserSchema);

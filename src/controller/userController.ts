import { Request, Response } from "express";

import { User, UserInterface } from '../model/userSchema';
import { bc } from '../bcrypt';


export const authUser = async (req: Request, res: Response) => {
    if (req.body["username"] && req.body["password"]) {
        const user: UserInterface[] = await User.find({ username: req.body.username });
        if (user.length > 0) {
            if (await bc.compare(req.body.password, user[0].password) == true)
                res.json(user);
            else
                res.status(401).json({ E: 'Não autorizado' });
        } else
            res.status(401).json({ E: 'Não encontrado' });
    } else {
        res.status(403).json({ E: 'Valores não válidos' });
    }
};

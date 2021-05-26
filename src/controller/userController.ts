import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'; 

import { PRIVATE_KEY, addTokenBlackList } from '../jwt';
import { User, UserInterface } from '../model/userSchema';
import { bc } from '../bcrypt';


export const authUser = async (req: Request, res: Response) => {
    try {
        if (req.body["username"] && req.body["password"]) {
            const user: UserInterface = await User.findOne({ username: req.body.username }).exec();
            if (!user)
               return res.status(401).json({ E: 'Não encontrado' });
            else if (await bc.compare(req.body.password, user.password) == true) {
                    
                    const token = jwt.sign({
                        id: user._id
                    }, PRIVATE_KEY, { expiresIn: '1h' });
                    
                    res.json(token);
                    
                } else
                    res.status(401).json({ E: 'Não autorizado' });
            
        } else {
            res.status(422).json({ E: 'Valores não válidos' });
        };
    } catch (e) {
        console.log(e);
        res.status(500).json({ E: 'Erro inesperado' });
    };
};

export const user = async (req: Request, res: Response) => {
    try {
        
        const user: UserInterface = await User.findOne({ _id: req.user }, 'name username').exec();
        res.status(200).json(user);
        
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    };
};

export const logout = async (req: Request, res: Response) => {
    try {
        await addTokenBlackList(req.token);
        res.sendStatus(204);
    } catch {
        res.status(500).json({ E: 'Erro inesperado' });
    };    
};

import * as bcrypt from 'bcrypt';


class Bc {

    encryptPassword(pass: string, saltRounds = 10): Promise<string> {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(pass, salt);        
        return hash;
    };

    async compare(srtPass: string, hash: string): Promise<Boolean> {
        return await bcrypt.compare(srtPass, hash);
    };
};

export const bc = new Bc();

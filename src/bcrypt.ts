import * as bcrypt from 'bcrypt';


class Bc {

    encryptPassword(pass: String, saltRounds = 10): Promise<String> {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(pass, salt);        
        return hash;
    };

    async compare(srtPass: String, hash: String): Promise<Boolean> {
        return await bcrypt.compare(srtPass, hash);
    };
};

export const bc = new Bc();

import { bc } from '../bcrypt';
import { UserInterface } from '../model/userSchema';


export const userList = async (): Promise<UserInterface[]> => { 
    return [
        {
            name: "José Serra",
            username: "serra",
            password: await bc.encryptPassword("jose")
        },
        {
            name: "Marta Suplice",
            username: "marta",
            password: await bc.encryptPassword("suplice")
        },
        {
            name: "Luiz Inácio",
            username: "luiz",
            password: await bc.encryptPassword("inacio")
        },
        {
            name: "Dilma Roussef",
            username: "dilma",
            password: await bc.encryptPassword("roussef")
        } 
    ]  
};

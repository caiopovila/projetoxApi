import { UserInterface } from '../model/userSchema';


export const userList = async (): Promise<UserInterface[]> => { 
    return [
        {
            name: "José Serra",
            username: "serra",
            password: "jose"
        },
        {
            name: "Marta Suplice",
            username: "marta",
            password: "suplice"
        },
        {
            name: "Luiz Inácio",
            username: "luiz",
            password: "inacio"
        },
        {
            name: "Dilma Roussef",
            username: "dilma",
            password: "roussef"
        } 
    ]  
};

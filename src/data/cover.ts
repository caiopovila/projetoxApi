import { CoverInterface } from '../model/coverSchema';


export const coverList = async (): Promise<CoverInterface[]> => { 
    return [
        {
            name: "Simples",
            description: "Cobertura contra danos"
        },
        {
            name: "Básico",
            description: "Cobertura contra danos e roubos"
        },
        {
            name: "Completo",
            description: "Cobertura contra danos, furtos e roubos"
        }
    ]  
};
 

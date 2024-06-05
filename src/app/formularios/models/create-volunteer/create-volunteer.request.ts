export interface CreateVolunteerFormRequest{
    //step2
    acceptConditions: boolean;
    //step3
    fullName: string;
    email: string;
    address:string;
    reason:string;
    availability:string;
    policies:string;
    vehicle:string;
    expectations:string;
    age: number;
    phone: number;
    postalCode: number;
    experience: string;
    skills: string;
    healthLimitations: string;
    trainingArea: string;
    additionalQuestions: string;
    acceptTerms: boolean;

}
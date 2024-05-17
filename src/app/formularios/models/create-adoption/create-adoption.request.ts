export interface CreateAdoptionFormRequest{
    //step1
    acceptConditions: boolean;
    //step2
    petName: string;
    //step3
    fullName: string;
    age: number;
    email: string;
    phone: number;
    address: string;
    postalCode: number;
    peopleCount: number;
    jobSituation: string;
    hobbies: string;
    //step4
    previousPets: boolean;
    vaccinatedRegularly: boolean;
    currentPets: boolean;
    shareSpace: boolean;
    sterilizedPets: boolean;
    opinionSterilization: string;
    //step5
    whoAdoptedAndWhy: string;
    whoWillWalkTheDog: string;
    awareOfCosts: boolean;
    allergyToPets: boolean;
    pregnantSituation: string;
    //step6
    petBehaviorAwareness: boolean;
    petReturnReason: string;
    petSelectionReason: string;
    petSizeSelectionReason: string;
    vacationPlans: string;
    visitedShelter: boolean;
    adoptionReason:string;
    //step7
    housingType: string;
    garden: string;
    permission: boolean;
    opinionMove: string;
    //step8
    opinionMoreInfo: string;
    consentCheckbox: boolean;


}
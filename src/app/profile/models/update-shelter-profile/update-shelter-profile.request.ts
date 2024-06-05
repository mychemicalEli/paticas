export interface UpdateShelterUserRequest {
    name: string;
    email:string;
    cif:string;
    phone: number;
    location: string;
    description: string;
    profileImage: FormData | null;
    backgroundImage:FormData | null;
}
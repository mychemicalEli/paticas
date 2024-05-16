export interface UpdateUserRequest {
    name: string;
    email:string;
    phone: number;
    location: string;
    profileImage: FormData | null;
    backgroundImage:FormData | null;
}
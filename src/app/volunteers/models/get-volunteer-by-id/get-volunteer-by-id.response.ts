import { volunteerAvailability } from "../volunteer-availability.enum";

export interface GetVolunteerByIdResponse{
    id: number;
    profileImage: FormData;
    fullName: string;
    phone: string;
    email: string;
    availability: volunteerAvailability;
    shelterId: number;
}
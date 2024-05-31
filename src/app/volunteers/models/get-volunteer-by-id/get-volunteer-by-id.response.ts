import { volunteerAvailability } from "../volunteer-availability.enum";

export interface GetVolunteerByIdResponse{
    id: number;
    profileImage: FormData;
    fullName: string;
    phone: number;
    email: string;
    availability: volunteerAvailability;
}
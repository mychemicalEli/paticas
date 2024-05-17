import { volunteerAvailability } from "../volunteer-availability.enum";

export interface UpdateVolunteerRequest {
    id: number;
    fullName: string;
    availability: volunteerAvailability;
    phone: number;
    email: string;
    profileImage: FormData;
}
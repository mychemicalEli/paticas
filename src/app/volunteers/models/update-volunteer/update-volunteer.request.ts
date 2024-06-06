import { volunteerAvailability } from "../volunteer-availability.enum";

export interface UpdateVolunteerRequest {
    id: number;
    fullName: string;
    availability: volunteerAvailability;
    phone: string;
    email: string;
    profileImage: FormData;
}
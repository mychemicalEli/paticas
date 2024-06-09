import { volunteerAvailability } from "../volunteer-availability.enum";

export interface CreateVolunteerRequest {
    id: number;
    fullName: string;
    availability: volunteerAvailability;
    phone: number;
    email: string;
    profileImage: FormData;
    shelterId: number;
}
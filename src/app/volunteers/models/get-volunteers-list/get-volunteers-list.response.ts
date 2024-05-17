import { volunteerAvailability } from "../volunteer-availability.enum";

export interface GetVolunteerListResponse{
    volunteers: GetVolunteerListItemResponse[];
    totalElements: number;
    page: number;
    pageSize: number;
}

export interface GetVolunteerListItemResponse{
    id: number;
    profileImage: FormData;
    fullName: string;
    phone: number;
    email: string;
    availability: volunteerAvailability;
    
}
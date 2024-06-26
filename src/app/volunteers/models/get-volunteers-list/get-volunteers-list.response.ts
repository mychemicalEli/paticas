import { volunteerAvailability } from "../volunteer-availability.enum";

export interface GetVolunteerListResponse{
    content: GetVolunteerListItemResponse[];
    totalElements: number;
    page: number;
    pageSize: number;
}

export interface GetVolunteerListItemResponse{
    id: number;
    profileImage: FormData;
    fullName: string;
    phone: string;
    email: string;
    availability: volunteerAvailability;
    shelterId: number;
    
}


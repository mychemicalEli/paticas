export interface GetShelterListResponse{
    shelters: GetShelterListItemResponse[];
    totalElements: number;
    page: number;
    pageSize: number;
}

export interface GetShelterListItemResponse{
    id: number;
    profileImage: string;
    name: string;
    location: string;
    description:string;
    liked: boolean;
   
}
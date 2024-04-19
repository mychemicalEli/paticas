export interface GetShelterListResponse{
    shelters: GetShelterListItemResponse[];
    totalElements: number;
    page: number;
    pageSize: number;
}

export interface GetShelterListItemResponse{
    id: number;
    image: string;
    name: string;
    location: string;
    liked: boolean;
}
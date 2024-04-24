export interface GetPaticasListResponse{
    paticas: GetPaticasListItemResponse[];
    totalElements: number;
    page: number;
    pageSize: number;
}

export interface GetPaticasListItemResponse{
    id: number;
    profileImage: string;
    name: string;
    gender: string;
    liked: boolean;
    species: string;
    isShelterAdmin: boolean;
}
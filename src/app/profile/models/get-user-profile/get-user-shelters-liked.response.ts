export interface GetUserSheltersLikedResponse{
    shelters: GetUserSheltersLikedItemResponse[];
    totalElements: number;
    page: number;
    pageSize: number;
    isLiked: boolean;
}

export interface GetUserSheltersLikedItemResponse{
    id: number;
    image: FormData;
    backgroundImage: FormData;
    name: string;
    location: string;
    liked: boolean;
    description: string
   
}
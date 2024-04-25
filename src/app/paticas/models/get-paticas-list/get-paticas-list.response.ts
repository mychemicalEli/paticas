import { paticaSize } from "../paticas-size.enum";

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
    imageCarousel1: string,
    imageCarousel2: string,
    imageCarousel3: string,
    shelter: string,
    location: string,
    size: paticaSize,
    birthDate: Date,
    description: string,
    goodWithKids: boolean,
    goodWithDogs: boolean,
    goodWithCats: boolean
}
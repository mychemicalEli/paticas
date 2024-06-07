import { paticaSize } from "../../../paticas/models/paticas-size.enum";

export interface GetShelterPaticasDetailResponse{
    id: number;
    profileImage: string;
    imageCarousel1: string;
    imageCarousel2: string;
    imageCarousel3: string;
    name: string;
    shelter: {
        id: number;
        profileImage: string;
        name: string;
        location: string;
        description: string;
    };
    gender: string;
    size: paticaSize;
    birthDate: Date;
    species: string;
    description: string;
    goodWithKids: boolean;
    goodWithDogs: boolean;
    goodWithCats: boolean;
    liked: boolean;
}
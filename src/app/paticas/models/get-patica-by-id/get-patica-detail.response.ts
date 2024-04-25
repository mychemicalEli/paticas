import { paticaSize } from "../paticas-size.enum";

export interface GetPaticaDetailResponse {
    id: number,
    imageCarousel1: string,
    imageCarousel2: string,
    imageCarousel3: string,
    name: string,
    shelter: string,
    location: string,
    gender: string,
    size: paticaSize,
    birthDate: Date,
    species: string,
    description: string,
    goodWithKids: boolean,
    goodWithDogs: boolean,
    goodWithCats: boolean
}
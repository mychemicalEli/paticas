import { paticaSize } from "../../../paticas/models/paticas-size.enum";

export interface AddPaticaRequest {
  id:number;
  profileImage: FormData;
  gender: string;
  species: string;
  imageCarousel1: FormData;
  imageCarousel2: FormData;
  imageCarousel3: FormData;
  size: paticaSize;
  birthDate: Date;
  description: string;
  goodWithKids: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
  shelterId: number;
  liked: boolean;
}

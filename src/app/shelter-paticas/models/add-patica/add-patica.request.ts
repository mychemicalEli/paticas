import { paticaSize } from "../../../paticas/models/paticas-size.enum";

export interface AddPaticaRequest {
  profileImage: FormData;
  name: string;
  gender: string;
  species: string;
  imageCarousel1: FormData;
  imageCarousel2: FormData;
  imageCarousel3: FormData;
  shelter: string;
  location: string;
  size: paticaSize;
  birthDate: Date;
  description: string;
  goodWithKids: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
}

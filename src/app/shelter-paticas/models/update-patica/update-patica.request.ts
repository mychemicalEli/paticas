import { paticaSize } from "../../../paticas/models/paticas-size.enum";

export interface UpdatePaticaRequest {
  profileImage: FormData;
  name: string;
  gender: string;
  species: string;
  imageCarousel1?: FormData | null;
  imageCarousel2?: FormData | null;
  imageCarousel3?: FormData | null;
  shelter: string;
  location: string;
  size: paticaSize;
  birthDate: Date;
  description: string;
  goodWithKids: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
}

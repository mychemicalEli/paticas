import { paticaSize } from "../../../paticas/models/paticas-size.enum";

export interface UpdatePaticaRequest {
  id: number;
  profileImage: string;
  imageCarousel1: FormData | null;
  imageCarousel2: FormData | null;
  imageCarousel3: FormData | null;
  name: string;
  gender: string;
  size: paticaSize;
  birthDate: Date;
  species: string;
  description: string;
  goodWithKids: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
  shelterId: number;
  liked: boolean;
}

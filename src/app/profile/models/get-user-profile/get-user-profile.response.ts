export interface GetUserProfileResponse{
    id: number,
    image: FormData,
    backgroundImage: FormData,
    name: string,
    email: string, 
    phone: number,
    location: string,
  }
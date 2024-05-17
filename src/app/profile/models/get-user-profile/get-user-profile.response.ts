export interface GetUserProfileResponse{
    id: number,
    profileImage: FormData,
    backgroundImage: FormData,
    name: string,
    email: string, 
    phone: number,
    location: string,
  }
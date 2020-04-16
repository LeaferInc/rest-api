
export class CreateUserDto {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  biography: string;
  location: string;
}

export class UserDto {
  id: number;
  createdAt: Date;
  enabled: boolean;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  biography: string;
  location: string;
  pictureId: number;
}
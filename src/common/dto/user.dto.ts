
export class CreateUserDto {
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
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  biography: string;
  location: string;
  pictureId: number;
}
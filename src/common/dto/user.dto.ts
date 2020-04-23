
export class CreateUserDto {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  biography: string;
  location: string;

  constructor(user?: CreateUserDto) {
    if(user) {
      this.email = user.email || null;
      this.username = user.username || null;
      this.password = user.password || null;
      this.firstname = user.firstname || null;
      this.lastname = user.lastname || null;
      this.birthdate = user.birthdate || null;
      this.biography = user.biography || null;
      this.location = user.location || null;
    }
  }

  toLowerCase(): CreateUserDto {
    this.email = this.email?.toLowerCase();
    this.username = this.username?.toLowerCase();
    this.firstname = this.firstname?.toLowerCase();
    this.lastname = this.lastname?.toLowerCase();
    return this;
  }
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
import { IsEmail, IsString, IsDateString, IsDate, IsNumber, IsArray, IsBoolean, IsOptional, IsEnum } from "class-validator";
import { Role } from "../entity/user.entity";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsDateString()
  birthdate: Date;

  @IsOptional()
  @IsString()
  biography: string;

  @IsOptional()
  @IsString()
  location: string;

  constructor(user?: CreateUserDto) {
    if (user) {
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
  @IsNumber()
  id: number;

  @IsDateString()
  createdAt: Date;

  @IsBoolean()
  enabled: boolean;

  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsDateString()
  birthdate: Date;

  @IsString()
  biography: string;

  @IsString()
  location: string;

  @IsNumber()
  pictureId: number;

  @IsEnum(Role)
  role: Role

  @IsArray()
  plants: number[];

  @IsArray()
  events: number[];
}
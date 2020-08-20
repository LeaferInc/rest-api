import { IsEmail, IsString, IsDateString, IsNumber, IsArray, IsBoolean, IsOptional, IsEnum, IsBase64 } from "class-validator";
import { Role } from "../entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsString()
  location?: string;

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

export class EntrantDto {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsDateString()
  @IsOptional()
  birthdate?: Date;

  @IsString()
  @IsOptional()
  biography?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsBase64()
  @IsOptional()
  picture?: string;
}

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsBoolean()
  enabled: boolean;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsDateString()
  birthdate: Date;

  @ApiProperty()
  @IsString()
  biography: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  picture: string;

  @ApiProperty({ enum: ['USER', 'ADMIN']})
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsBoolean()
  premium: boolean;

  @ApiProperty({ type: [Number] })
  @IsArray()
  plants: number[];

  @ApiProperty({ type: [Number] })
  @IsArray()
  events: number[];
}
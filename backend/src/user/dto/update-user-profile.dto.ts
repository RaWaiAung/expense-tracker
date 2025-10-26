import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class UpdateUserProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  photo: string;
}

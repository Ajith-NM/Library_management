import {
  IsOptional,
  IsString,
  MinLength,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsInt()
  user_id: number;

  @IsNotEmpty({ message: 'name required' })
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'role required' })
  role: string;

  @IsString()
  @IsNotEmpty({ message: 'email required' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'minimum 6 digits required' })
  password: string;

  @IsInt({ message: 'phone must be in type of number' })
  phone: number;
}

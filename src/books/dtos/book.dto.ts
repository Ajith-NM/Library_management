import { PickType } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsInt } from 'class-validator';

export class BookDto {
  @IsOptional()
  @IsInt()
  book_id: number;

  @IsNotEmpty({ message: 'title required' })
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'please provide subject' })
  subject: string;

  @IsString()
  @IsNotEmpty({ message: 'Auther is required' })
  author: string;

  @IsInt()
  available: number;

  @IsString()
  image_url: string;
}

export class BookUpdateDto extends PickType(BookDto, [
  'book_id',
  'available',
] as const) {}

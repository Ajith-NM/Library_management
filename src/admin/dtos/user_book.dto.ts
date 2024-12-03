import { IsInt } from 'class-validator';

export class UserBookDto {
  @IsInt()
  user_id: number;

  @IsInt()
  book_id: number;
}

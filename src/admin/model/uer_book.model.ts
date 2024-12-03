import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Book } from 'src/books/model/book.model';
import { User } from 'src/user/model/user.model';

@Table
export class UserBook extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Book)
  @Column
  book_id: number;
}

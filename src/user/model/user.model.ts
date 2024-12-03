import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { UserBook } from 'src/admin/model/uer_book.model';
import { Book } from 'src/books/model/book.model';
//import { Book } from 'src/books/model/book.model';

@Table
export class User extends Model {
  @Column({ autoIncrement: true, primaryKey: true, allowNull: false })
  user_id: number;

  @Column
  name: string;

  @Column
  role: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  phone: number;
  @BelongsToMany(() => Book, () => UserBook)
  books: Book[];
}

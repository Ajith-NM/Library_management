import {
  BelongsToMany,
  //BelongsTo,
  Column,
  //ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserBook } from 'src/admin/model/uer_book.model';
import { User } from 'src/user/model/user.model';
//import { User } from 'src/user/model/user.model';

@Table
export class Book extends Model {
  @Column({ autoIncrement: true, primaryKey: true, allowNull: false })
  book_id: number;

  @Column
  title: string;

  @Column
  subject: string;

  @Column
  author: string;

  @Column({ defaultValue: 1 })
  available: number;

  @Column
  image_url: string;

  @BelongsToMany(() => User, () => UserBook)
  users: User[];
}

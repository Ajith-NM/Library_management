import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserBook } from './model/uer_book.model';
import { User } from 'src/user/model/user.model';
import { Book } from 'src/books/model/book.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(UserBook)
    private userBookModel: typeof UserBook,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async reserveBook(book: number, user: number) {
    return await this.userBookModel.create({
      user_id: user,
      book_id: book,
    });
  }

  async returnBook(book: number, user: number) {
    try {
      const userbook = await this.userBookModel.findOne({
        where: {
          user_id: user,
          book_id: book,
        },
      });
      return await userbook.destroy();
    } catch (error) {
      throw error;
    }
  }

  async getusers(id: number) {
    try {
      return await this.bookModel.findByPk(id, { include: [User] });
    } catch (error) {
      return error;
    }
  }

  async getBooks(id: number) {
    try {
      return await this.userModel.findByPk(id, { include: [Book] });
    } catch (error) {
      return error;
    }
  }
}

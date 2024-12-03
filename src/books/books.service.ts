import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './model/book.model';
import { BookDto } from './dtos/book.dto';
import { Op } from 'sequelize';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async addBook(book: BookDto) {
    try {
      return this.bookModel.create({
        title: book.title,
        subject: book.subject,
        author: book.author,
        available: book.available,
        image_url: book.image_url,
      });
    } catch (error) {
      throw error;
    }
  }

  async findBookByName(title: string) {
    try {
      return this.bookModel.findAll({
        attributes: ['book_id', 'title', 'image_url', 'author'],
        where: { title: { [Op.like]: `%${title}%` } },
      });
    } catch (error) {
      throw error;
    }
  }

  async removeBook(id: number) {
    try {
      const book = await this.bookModel.findOne({
        where: {
          book_id: id,
        },
      });
      return await book.destroy();
    } catch (error) {
      throw error;
    }
  }

  async getAllBooks() {
    try {
      return await this.bookModel.findAll({
        attributes: ['book_id', 'title', 'image_url', 'author'],
      });
    } catch (error) {
      throw error;
    }
  }
  async updateCount(count: number, id: number) {
    try {
      return await this.bookModel.update(
        { available: count },
        { where: { book_id: id } },
      );
    } catch (error) {
      throw error;
    }
  }

  getBook(id: number) {
    try {
      return this.bookModel.findOne({ where: { book_id: id } });
    } catch (error) {
      throw error;
    }
  }
}

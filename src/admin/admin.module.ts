import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserBook } from './model/uer_book.model';
import { Book } from 'src/books/model/book.model';
import { User } from 'src/user/model/user.model';
import { BooksService } from 'src/books/books.service';

@Module({
  imports: [SequelizeModule.forFeature([UserBook, Book, User])],
  controllers: [AdminController],
  providers: [AdminService, BooksService],
})
export class AdminModule {}

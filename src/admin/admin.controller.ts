import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserBookDto } from './dtos/user_book.dto';
import { AdminGuard } from './admin.guard';
import { BooksService } from 'src/books/books.service';

@Controller('admin')
export class AdminController {
  constructor(
    private adminServise: AdminService,
    private bookService: BooksService,
  ) {}

  @Post('reserve')
  @UseGuards(AdminGuard)
  async reserveBook(@Body() body: UserBookDto) {
    const book = await this.bookService.getBook(body.book_id);
    if (book.available) {
      const reserved = await this.adminServise.reserveBook(
        body.book_id,
        body.user_id,
      );
      if (reserved) {
        this.bookService.updateCount(book.available - 1, body.book_id);
        return 'book reserved';
      }
      return 'book cannot be reserved';
    } else {
      return 'book is not available';
    }
  }

  @Delete('returnbook')
  @UseGuards(AdminGuard)
  async retrunBook(
    @Query('book_id', ParseIntPipe) book_id: number,
    @Query('user_id', ParseIntPipe) user_id: number,
  ) {
    const book = await this.bookService.getBook(book_id);

    await this.adminServise.returnBook(book_id, user_id);
    await this.bookService.updateCount(book.available + 1, book_id);
    return 'book added';
  }

  @Get('userholdings/:id')
  getReservedBooksFromUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminServise.getBooks(id);
  }

  @Get('bookholders/:id')
  @UseGuards(AdminGuard)
  getUsersBasedonBook(@Param('id', ParseIntPipe) id: number) {
    return this.adminServise.getusers(id);
  }
}

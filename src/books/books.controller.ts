import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto, BookUpdateDto } from './dtos/book.dto';
import { AdminGuard } from 'src/admin/admin.guard';

@Controller()
export class BooksController {
  constructor(private bookService: BooksService) {}
  @Get()
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }

  @Get('book/:id')
  async getBook(@Param('id', ParseIntPipe) id: number) {
    return await this.bookService.getBook(id);
  }

  @Post('create')
  @UseGuards(AdminGuard)
  async createBook(@Body() body: BookDto) {
    return await this.bookService.addBook(body);
  }

  @Put('book/update')
  @UseGuards(AdminGuard)
  async updateBook(@Body() body: BookUpdateDto) {
    return await this.bookService.updateCount(body.available, body.book_id);
  }
  @Delete('remove/:id')
  @UseGuards(AdminGuard)
  async removeBook(@Param('id', ParseIntPipe) id: number) {
    return await this.bookService.removeBook(id);
  }

  @Get('search')
  async searchbooks(@Query('name') title: string) {
    return await this.bookService.findBookByName(title);
  }
}

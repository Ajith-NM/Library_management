import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model/user.model';
import { Book } from './books/model/book.model';
import { ConfigModule } from '@nestjs/config';
import { UserBook } from './admin/model/uer_book.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.host,
      username: process.env.user,
      password: process.env.password,
      database: process.env.db_name,
      models: [User, Book, UserBook],
      autoLoadModels: true,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    BooksModule,
    AdminModule,
  ],
})
export class AppModule {}

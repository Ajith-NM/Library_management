import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { login } from './dtos/login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async postSignup(@Body() body: UserDto) {
    try {
      const user = await this.userService.findUser(body.email);
      console.log('user', user);
      if (!user) {
        const user = await this.userService.createUser(body);
        return { status: 'success', response: user };
      }
      return { status: 'failed', response: 'user already exist' };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async postLogin(@Body() body: login) {
    try {
      const user = await this.userService.findUser(body.email);
      console.log(user);

      if (user?.dataValues.password === body.password) {
        const token = await this.userService.getToken(user.dataValues);
        return {
          status: 'success',
          response: token,
        };
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw error;
    }
  }

  @Delete('deleteAccount/:id')
  async deleteAccount(@Param('id', ParseIntPipe) id: number) {
    await this.userService.removeUser(id);
    return { status: 'success', response: 'user deleted' };
  }
}

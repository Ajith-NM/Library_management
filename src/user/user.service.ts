import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { UserDto } from './dtos/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  createUser(user: UserDto) {
    return this.userModel.create({
      name: user.name,
      role: user.role,
      email: user.email,
      password: user.password,
      phone: user.phone,
    });
  }
  findUser(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email: email,
      },
    });
  }
  async getToken(user: any) {
    return { access_token: await this.jwtService.signAsync(user) };
  }
  async removeUser(id: number) {
    const user = await this.userModel.findOne({
      where: {
        user_id: id,
      },
    });
    await user.destroy();
  }
}

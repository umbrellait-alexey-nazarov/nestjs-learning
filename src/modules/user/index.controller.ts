import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from './index.service';
import { UserResponseInterface } from './interfaces/userResponse.interface';
import { User } from './decorators/user.decorator';
import { User as UserClass } from './schemas/user.schema';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Types } from 'mongoose';
import { BackendValidationPipe } from '@app/shared/pipes/backend.validation.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new BackendValidationPipe())
  async createUser(
    @Body() createUserDto: createUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new BackendValidationPipe())
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserClass): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @Body() updateUserDto: UpdateUserDto,
    @User('_id') userId: Types.ObjectId,
  ): Promise<UserResponseInterface> {
    const result = await this.userService.updateUser(userId, updateUserDto);
    return this.userService.buildUserResponse(result);
  }
}

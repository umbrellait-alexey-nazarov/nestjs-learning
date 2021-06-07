import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { createUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { UserService } from "./index.service";
import { UserResponseInterface } from "./interfaces/userResponse.interface";
import { Request } from 'express';
import { ExpressRequestInterface } from "@app/types/ExpressRequest.interface";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: createUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Get('user')
    async currentUser(@Req() request: ExpressRequestInterface): Promise<UserResponseInterface> {
        const user = request.user;
        if(!user) {
            throw new HttpException('Unauthorized access', HttpStatus.FORBIDDEN);
        }
        return this.userService.buildUserResponse(user);
    }
}
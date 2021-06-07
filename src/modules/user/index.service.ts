import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createUserDto } from "./dto/createUser.dto";
import { hash, compare } from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model, Types } from "mongoose";
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from "config";
import { UserResponseInterface } from "./interfaces/userResponse.interface";
import { LoginUserDto } from "./dto/loginUser.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async hashPassword(password: string): Promise<string> {
        const result = await hash(password, 10);
        return result;
    }

    async comparePassword(password: string, entirePassword: string): Promise<boolean> {
        const result = await compare(entirePassword, password);
        return result;
    }

    async createUser(createUserDto: createUserDto): Promise<User> {
        const insertData: any = { ...createUserDto };
        
        const userExist = await this.userModel.countDocuments({ $or: [
            { email: insertData.email },
            { username: insertData.username }
        ] });

        if(userExist) {
            throw new HttpException('Email or username is taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        insertData.password = await this.hashPassword(insertData.password);
        insertData._id = new Types.ObjectId();
        const newUser = new this.userModel(insertData);
        return (await newUser.save()).toObject();
    }

    generateJwt(user: User): string {
        const token = sign({ 
            _id: user._id,
            username: user.username,
            email: user.email
         }, JWT_SECRET)
        return token;
    }

    async login(loginUserDto: LoginUserDto): Promise<User> {
        const findUser = await this.userModel.findOne({ email: loginUserDto.email });
        if(!findUser) {
            throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const comparePassword = await this.comparePassword(findUser.password, loginUserDto.password);
        if(comparePassword) {
            return findUser.toObject();
        } else throw new HttpException('Email or password is not correct', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    buildUserResponse(user: User): UserResponseInterface {
        delete user.password;
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
}
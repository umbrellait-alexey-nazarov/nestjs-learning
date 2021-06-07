import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./index.controller";
import { UserService } from "./index.service";
import { User, UserSchema } from "./schemas/user.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule{};
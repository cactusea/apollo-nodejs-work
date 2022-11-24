import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import {UserInfo} from "./UserInfo";

@Controller("users")
export class UsersController {

    constructor(private readonly usersService : UsersService) {}

    @Get(':id')
    async getUserInfo(@Param('id') userId: string) : Promise<UserInfo> {
        console.log(`userId:: ${userId}`);
        return await this.usersService.getUserInfo(userId);
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<string>{
        const {email, password} = dto;
        return await this.usersService.login(email, password);
    }
    @Post()
    async create(@Body() dto: CreateUserDto): Promise<void> {
        const {name, email, password} = dto;
        await this.usersService.createUser(name, email, password);
    }
}
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}
    
    @Post()
    async addUser(
        @Body('username') userUsername: string,
        @Body('password') userPassword: string,
        @Body('fullname') userFullname: string,
    ){
        const generatedID = await this.userService.insertUser(userUsername, userPassword, userFullname)
        return{id: generatedID};
    }

    @Get()
    async getAllUser(){
        const users = await this.userService.getUser();
        return users;
    }

    @Get(':username')
    getUser(@Param('username')userUsername: string){
        return this.userService.getSingleUser(userUsername)
    }

    @Patch(':username')
    async updateUser(
        @Param('username') userUsername : string,
        @Body('password') userPassword : string,
        @Body('fullname') userFullname : string,
    ){
        await this.userService.updateUser(userUsername, userPassword, userFullname)
        return null;
    }
    
    @Delete(':id')
    async removeUser(@Param('id') userUsername: string){
        await this.userService.deleteArticle(userUsername);
        return null;
    }

}
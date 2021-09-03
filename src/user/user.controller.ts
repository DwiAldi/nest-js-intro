import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiAcceptedResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){} 

    @Get()
    @ApiOkResponse({ description: 'The Resource list has been successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getAllUser(){
        const users = await this.userService.getUser();
        return users;
    }

    @Get(':username')
    @ApiOkResponse({ description: 'The Resource has been successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    getUser(@Param('username')userUsername: string){
        return this.userService.getSingleUser(userUsername)
    }

    @Post()
    @ApiCreatedResponse({ description: 'The Resource has been successfully created.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async addUser(
        @Body('username') userUsername: string,
        @Body('password') userPassword: string,
        @Body('fullname') userFullname: string,
    ){
        const generatedID = await this.userService.insertUser(userUsername, userPassword, userFullname)
        return{id: generatedID};
    }

    @Patch(':username')
    @ApiOkResponse({ description: 'The Resource has been successfully updated.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async updateUser(
        @Param('username') userUsername : string,
        @Body('password') userPassword : string,
        @Body('fullname') userFullname : string,
    ){
        await this.userService.updateUser(userUsername, userPassword, userFullname)
        return null;
    }
    
    @Delete(':username')
    @ApiOkResponse({ description: 'The Resource has been successfully removed.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async removeUser(@Param('id') userUsername: string){
        await this.userService.deleteArticle(userUsername);
        return null;
    }

}
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.model";
import { Model } from "mongoose";

@Injectable()
export class UserService{
    private user: User[] = [];

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ){}

    async insertUser(username: string, password: string, fullname: string){
        const newUser = new this.userModel({
            username: username, 
            password: password, 
            fullname: fullname
        });
        const result = await newUser.save() //Insert to db
        return result.id as string;
    }

    async getUser(){
        const user =  await this.userModel.find().exec();
        return user.map((usr) => ({id: usr.id, username: usr.username, password: usr.password, fullname: usr.fullname}));
    }

    async getSingleUser(userUsername: string){
        const user = await this.findUser(userUsername);
        //return user;
        return { 
            username: user.username, 
            password: user.password, 
            fullname: user.fullname 
        };
    }

    async updateUser(
        username: string, 
        password: string, 
        fullname: string
    ){
        const updatedUser = await this.findUser(username)
        if(password){
            updatedUser.password = password;
        }
        if(fullname){
            updatedUser.fullname = fullname;
        }
        updatedUser.save();
    }

    async deleteArticle(userUsername: string){
        await this.userModel.deleteOne({username: userUsername}).exec()

    }

    private async findUser(username: string): Promise<User>{
        console.log(username)
        let user;
        try{
            user = await this.userModel.findOne({"username": username}).exec();
        }catch (error){
            throw new NotFoundException('Could not find user.');
        }
        if (!user){
            throw new NotFoundException('Could not find user');
        }
        console.log(user)
        return user
    }

}
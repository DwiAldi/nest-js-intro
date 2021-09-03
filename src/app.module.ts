import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'; //Import mongoose, must connect if want to use db

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';


@Module({ //Decorator
  imports: [
    ArticleModule, 
    UserModule, 
    MongooseModule.forRoot('mongodb+srv://sa:admin123456@cluster0.jgml7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'), //Connect with SA user and connect to database nestjs-test
],
  controllers: [AppController], //Control how handle incoming request(Handle request and send response)
  providers: [AppService], //Provide functionality like example service to reached out database
})
export class AppModule {} //Can have multiple modules. Module can be serve as route

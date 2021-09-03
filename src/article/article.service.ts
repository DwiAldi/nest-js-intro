import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article } from "./article.model";



@Injectable()
export class ArticleService{
    private article: Article[] = [];
    
    constructor(
        @InjectModel('Article') private readonly articleModel: Model<Article>,
    ){}

    async insertArticle(title: string, body: string, author: string){
        const newArticle = new this.articleModel({
            title: title,
            body: body,
            author: author
        })
        const result = await newArticle.save()
        return result.id as string;
    }

    async getArticle(){
        const article = await this.articleModel.find().exec();
        return article.map((art) => ({id: art.id, title: art.title, body: art.body, author: art.author}))
    }

   async getSingleArticle(articleID: number){
        const article = await this.findArticle(articleID)
        return {
            title: article.title,
            body: article.body,
            author: article.author,
        }
    }

    async updateArticle(
        articleID: number, 
        title: string, 
        body: string
    ){
        const updatedArticle = await this.findArticle(articleID)
        if(title){
            updatedArticle.title = title;
        }
        if(body){
            updatedArticle.body = body;
        }
        updatedArticle.save();
    }

    async deleteArticle(articleID: number){
        await this.articleModel.deleteOne({_id: articleID}).exec()
    }

    private async findArticle(id: number): Promise<Article>{
        let article;
        try {
            article = await this.articleModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find article.');
        }
        if(!article){
            throw new NotFoundException('Could not find user.');
        }
        return article
    }
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { Article } from "./article.model";



@Injectable()
export class ArticleService{
    private article: Article[] = [];

    insertArticle(title: string, body: string, author: string){
        const articleID = Math.floor(Math.random() * 1000);;
        const newArticle = new Article(articleID, title, body, author);
        this.article.push(newArticle);
        return articleID;
    }

    getArticle(){
        return [...this.article];
    }

    getSingleArticle(articleID: number){
        const article = this.findArticle(articleID)[0]
        return {...article}
    }

    updateProduct(articleID: number, title: string, body: string){
        const [article, index] = this.findArticle(articleID)
        const updatedArticle = {...article}
        if(title){
            updatedArticle.title = title
        }
        if(body){
            updatedArticle.body = body
        }
         this.article[index] = updatedArticle;
    }

    deleteArticle(articleID: number){
        const index = this.findArticle(articleID)[1];
        this.article.splice(index,1);
    }

    private findArticle(id: number): [Article, number]{
        const foundArticleIndex = this.article.findIndex((art) => art.id == id)
        const foundArticle = this.article[foundArticleIndex]
        if (!foundArticle ){
            throw new NotFoundException('Could not find article')
        }
        return [foundArticle, foundArticleIndex]
    }
}
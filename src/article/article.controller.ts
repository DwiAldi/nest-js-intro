import { Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import { ArticleService } from "./article.service";

@Controller('article')
export class ArticleController{
    constructor(private readonly articleService: ArticleService){}

    @Post()
    addArticle(
            @Body('title') articleTitle: string, 
            @Body('body') articleBody: string,
            @Body('author') articleAuthor: string
        ): any { //any can be changed to string or anything, because it will return to response
        const generatedID = this.articleService.insertArticle(articleTitle, articleBody, articleAuthor);
        return{id: generatedID};
    }

    @Get()
    getAllArticle(){
        return this.articleService.getArticle();
    }
    
    @Get(':id')
    getArticle(@Param('id') articleID: number){
        return this.articleService.getSingleArticle(articleID)
    }

    @Patch(':id')
    updateArticle(
        @Param('id') articleID: number, 
        @Body('title') articleTitle: string, 
        @Body('body') articleBody: string 
    ) {
        this.articleService.updateProduct(articleID, articleTitle, articleBody)
        return null;
    }

    @Delete(':id')
    removeArticle(@Param('id') articleID: number){
        this.articleService.deleteArticle(articleID)
        return null;
    }
}

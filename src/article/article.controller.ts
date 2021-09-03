import { Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ArticleService } from "./article.service";

@ApiTags('Article')
@Controller('article')
export class ArticleController{
    constructor(private readonly articleService: ArticleService){}

    @Get()
    @ApiOkResponse({ description: 'The Resource list has been successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getAllArticle(){
        const articles = await this.articleService.getArticle();
        return articles;
    }
    
    @Get(':id')
    @ApiOkResponse({ description: 'The Resource has been successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    getArticle(@Param('id') articleID: number){
        return this.articleService.getSingleArticle(articleID)
    }

    @Post()
    @ApiCreatedResponse({ description: 'The Resource has been successfully created.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async addArticle(
            @Body('title') articleTitle: string, 
            @Body('body') articleBody: string,
            @Body('author') articleAuthor: string
    ){ 
        const generatedID = await this.articleService.insertArticle(articleTitle, articleBody, articleAuthor);
        return{id: generatedID};
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'The Resource has been successfully updated.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    updateArticle(
        @Param('id') articleID: number, 
        @Body('title') articleTitle: string, 
        @Body('body') articleBody: string 
    ) {
        this.articleService.updateArticle(articleID, articleTitle, articleBody)
        return null;
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'The Resource has been successfully removed.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    removeArticle(@Param('id') articleID: number){
        this.articleService.deleteArticle(articleID)
        return null;
    }
}

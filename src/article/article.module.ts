import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ArticleController } from "./article.controller";
import { ArticleSchema } from "./article.model";
import { ArticleService } from "./article.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Article', schema: ArticleSchema}])
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
})

export class ArticleModule{}
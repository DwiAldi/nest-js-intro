import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    author: {type: String, required: true},
});

export interface Article extends mongoose.Document {
   title: string;
   body: string;
   author: string;
}
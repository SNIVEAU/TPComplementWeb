import ArticleProvider from "../../ArticleProvider.js";
export default class DetailArticle {
    constructor() {
        this.id = null;
    }
    static async render(){
        let article = await ArticleProvider.getArticle(id)
    }
}
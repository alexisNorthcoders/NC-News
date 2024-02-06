import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-2sb7.onrender.com/api/",
});

export const fetchArticles = () => {
  console.log("fetching articles")
  return ncNews.get(`/articles`);
};
export const fetchArticleById = (article_id) => {
console.log("fecthing article by id")
  return ncNews.get(`/articles/${article_id}`).then(({data:{article}}) => article);
};
export const fetchCommentsByArticleId = (article_id) =>{
  return ncNews.get(`/articles/${article_id}/comments`).then(({data:{comments}}) => comments)
}
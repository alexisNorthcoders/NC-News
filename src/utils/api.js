import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-2sb7.onrender.com/api/",
});

export const fetchArticles = () => {
  
  return ncNews.get(`/articles`);
};
export const fetchArticleById = (article_id) => {

  return ncNews.get(`/articles/${article_id}`).then(({data:{article}}) => article);
};
export const fetchCommentsByArticleId = (article_id) =>{
  return ncNews.get(`/articles/${article_id}/comments`).then(({data:{comments}}) => comments)
}
export const updateVotesByArticleId = (article_id,inc_votes) =>{

  return ncNews.patch(`/articles/${article_id}`,{
    inc_votes: inc_votes})
    .then(({data:{article}}) => article)
    
}
export const insertCommentByArticleId = (article_id,username,comment) =>{

  return ncNews.post(`/articles/${article_id}/comments`,{
    username: username, body : comment})
    .then(({data:{article}}) => article)
    
}
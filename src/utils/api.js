import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-2sb7.onrender.com/api/",
});

export const fetchArticles = () => {
  return ncNews.get(`/articles`);
};
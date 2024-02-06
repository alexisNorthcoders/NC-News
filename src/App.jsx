import Articles from "./components/Articles";
import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Article from "./components/Article";
import PostComment from "./components/PostComment";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/article/:article_id" element={<Article />} />
        <Route path="/article/:article_id/comment" element={<PostComment />} />
      </Routes>
    </>
  );
}

export default App;

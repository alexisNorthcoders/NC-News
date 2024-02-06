import Articles from "./components/Articles";
import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Article from "./components/Article";
function App() {
  return (
    <>
      <Header />
      <Routes>
      <Route path="/" element={<Articles />} />
        <Route path="/article/:article_id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;

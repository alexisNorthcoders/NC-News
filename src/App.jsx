import Articles from "./components/Articles";
import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Article from "./components/Article";
import PostComment from "./components/PostComment";
import { useState } from "react";

function App() {
  const [postButtonClicked, setPostButtonClicked] = useState(false);
  const [selectedTopic,setSelectedTopic] = useState("")
  const handleSubmitForm = () => {
    setPostButtonClicked(true);
  };

  return (
    <>
      <Header onSubmitForm={handleSubmitForm} setSelectedTopic={setSelectedTopic} selectedTopic={selectedTopic}/>
      <Routes>
        <Route path="/" element={<Articles selectedTopic={selectedTopic}/>} />
        <Route path="/article/:article_id/" element={<Article postButtonClicked={postButtonClicked} setPostButtonClicked={setPostButtonClicked}/>} />
        <Route path="/article/:article_id/comment" element={<PostComment setPostButtonClicked={setPostButtonClicked} postButtonClicked={postButtonClicked}/>} />
        </Routes>
    </>
  );
}

export default App;

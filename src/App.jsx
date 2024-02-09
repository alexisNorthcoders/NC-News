import Articles from "./components/Articles";
import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Article from "./components/Article";
import PostComment from "./components/PostComment";
import { useState } from "react";
import ErrorHandler from "./components/ErrorHandler";
import Users from "./components/Users";
import FootBar from "./components/FootBar";
import PostArticle from "./components/PostArticle";

function App() {
  const [postButtonClicked, setPostButtonClicked] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState({
    topic: "",
    sort_by: "created_at",
    order: "desc",
    limit: 10,
    p: 1,
  });
  const [showError, setShowError] = useState(true);
  const { pathname } = useLocation();
  const handleSubmitForm = () => {
    setPostButtonClicked(true);
  };

  return (
    <>
      {" "}
      <FootBar />
      <Routes>
        <Route
          path="*"
          element={
            <ErrorHandler
              pathname={pathname}
              show={showError}
              onHide={() => setShowError(false)}
            />
          }
        />
        <Route path="/" element={<Articles selectedTopic={selectedTopic} />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/article/:article_id/"
          element={
            <Article
              postButtonClicked={postButtonClicked}
              setPostButtonClicked={setPostButtonClicked}
            />
          }
        />
        <Route
          path="/article/:article_id/comment"
          element={
            <PostComment
              setPostButtonClicked={setPostButtonClicked}
              postButtonClicked={postButtonClicked}
            />
          }
        />
         <Route
          path="/article/create"
          element={
            <PostArticle
              setPostButtonClicked={setPostButtonClicked}
              postButtonClicked={postButtonClicked}
            />
          }
        />
      </Routes>
      <Header
        onSubmitForm={handleSubmitForm}
        setSelectedTopic={setSelectedTopic}
        selectedTopic={selectedTopic}
      />
    </>
  );
}

export default App;

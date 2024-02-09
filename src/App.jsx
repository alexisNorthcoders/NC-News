import Articles from "./components/Articles";
import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route,useLocation } from "react-router-dom";
import Article from "./components/Article";
import PostComment from "./components/PostComment";
import { useState } from "react";
import ErrorHandler from "./components/ErrorHandler";

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
  const {pathname} = useLocation()
console.log(pathname)
  const handleSubmitForm = () => {
    setPostButtonClicked(true);
  };

  return (
    <>
      <Header
        onSubmitForm={handleSubmitForm}
        setSelectedTopic={setSelectedTopic}
        selectedTopic={selectedTopic}
      />
      <Routes>
        <Route path="*" element={<ErrorHandler pathname={pathname} show={showError}
    onHide={() => setShowError(false)}
  />} />
        <Route path="/" element={<Articles selectedTopic={selectedTopic} />} />
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
      </Routes>
    </>
  );
}

export default App;

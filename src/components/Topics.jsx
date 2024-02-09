import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { fetchTopics } from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorHandler from "./ErrorHandler";

export default function Topics({ selectedTopic, setSelectedTopic }) {
  const [searchParams] = useSearchParams();

  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const topicParam = searchParams.get("topic");
  function handleTopicChange(topic) {
    setSelectedTopic(topic);
    if (topic) {
      navigate(`/?topic=${topic}`);
    } else {
      navigate(`/`);
    }
  }
  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
      if (topicParam && !topics.some((topic) => topic.slug === topicParam)) {
        setShowError(true);
      }
    });
  }, []);
  return (
    <>
      <ErrorHandler
        topicParam={topicParam}
        show={showError}
        onHide={() => setShowError(false)}
      />
      <Button className="m-1" onClick={() => handleTopicChange("")}>
        All
      </Button>
      {topics.map((topic, index) => (
        <Button
          variant={selectedTopic === topic.slug ? "success" : "secondary"}
          className="m-1 "
          key={topic.slug + index}
          onClick={() => handleTopicChange(topic.slug)}
        >
          {topic.slug}
        </Button>
      ))}
    </>
  );
}

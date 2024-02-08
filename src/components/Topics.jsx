import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { fetchTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Topics({selectedTopic,setSelectedTopic}) {
    const [topics,setTopics]=useState([])
    const navigate = useNavigate();

    function handleTopicChange(topic){
        
        setSelectedTopic({ ...selectedTopic,  topic: topic, });
        if (topic){
        navigate(`/?topic=${topic}`)}
        else{
            navigate(`/`)
        }
    }
    useEffect(() => {
        fetchTopics().then((topics) => {
            
            setTopics(topics) 
        }) 
    },[])
  return (
    <>
      <Button className="m-1" onClick={() => handleTopicChange('')}>All</Button>
      {topics.map((topic, index) => (
        <Button variant={selectedTopic === topic.slug ? 'success' : 'secondary'}className="m-1 " key={topic.slug + index} onClick={() => handleTopicChange(topic.slug)}>
          {topic.slug}
        </Button>
      ))}
    </>
  );
}

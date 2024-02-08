import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { fetchTopics } from "../utils/api";

export default function Topics({topic,setTopic}) {
    const [topics,setTopics]=useState([])
    useEffect(() => {
        fetchTopics().then((topics) => {
            setTopics(topics) 
        }) 
    },[])
  return (
    <Form.Select aria-label="Topic selection dropdown box">
      <option>Select Topic</option>
      {topics.map((topic) =>{
        return (<option key={topic} value={topic.slug}>{topic.slug}</option>)
      } )}
     
    </Form.Select>
  );
}

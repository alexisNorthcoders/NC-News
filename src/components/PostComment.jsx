import { useContext, useEffect } from "react";
import { NavContext } from "./NavHandler";
import { useParams, useNavigate } from "react-router-dom";


export default function PostComment() {
  const { navigation, setNavigation } = useContext(NavContext);
  const navigate = useNavigate();
  const { article_id } = useParams();

  useEffect(() => {
    setNavigation((current) => {
        return { ...current, header: "postcomment",article_id:article_id };
      });
  }, []);


  return <h1>POST COMMENT FORM HERE</h1>;
}

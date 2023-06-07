import surveyFetch from "../axios/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewQuestion.css";

const NewQuestion = () => {
const navigate = useNavigate();
const [title, setTitle] = useState();

const createQuestion = async (e) => {
  e.preventDefault();
  console.log("TITLE",title);
  const question = { title };
  
  await surveyFetch.post("/question", question);
  navigate("/")
};

return ( 
<div className="new-question">
  <h2> New Question:</h2>
    <form onSubmit={(e) => createQuestion(e)}>
      <div className="form-control">
        <label htmlFor="title">Title:</label>
        <input 
        type="text" 
        name="title"
        id="title"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        />

      </div>
      <input type="submit" value="create" className="btn" />
    </form>
</div>
  )
};

export default NewQuestion
import surveyFetch from "../axios/config";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewVote.css";



const NewVote = () => {
const navigate = useNavigate();
const [vote, setOption] = useState();
const { id } = useParams();
const id_question = id; 
const [surveys, setSurvey] = useState([]);

const createVote = async (e) => {
  e.preventDefault();
  console.log(e);
  const newVote = { id_question: id_question, id_option:vote };
  console.log("NEW VOTE", newVote);
  await surveyFetch.post("/result", newVote);
  navigate("/")
};

const getSurvey = async() => {
  try {

    const response = await surveyFetch.get("/result/vote/30");
    const data = response.data;
    setSurvey(data);
    
  } catch (error) {
    console.log(error);
  }

}
useEffect(() => {
  getSurvey();
}, []);
return ( 
<div className="new-vote">
  <h2> New Vote:</h2>
    <form onSubmit={(e) => createVote(e)}>
    {surveys.length === 0 ? (<p>Carregando</p>) : (
        surveys.map((survey) => ( 
          
          <div className="question">
            <label>
              <input 
              type="radio" 
              value={survey.id_option}
              id="vote" 
              name="vote"
              onChange={(e) => setOption(e.target.value)} />
              
              {survey.option}
            </label>
          </div>
          ))
          )} 
      <input type="submit" value="vote" className="btn" />
    </form>
</div>
  )
};

export default NewVote
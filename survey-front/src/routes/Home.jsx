import surveyFetch from '../axios/config';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
const [questions, setQuestions] = useState([]);

const getQuestions = async() => {
  try {

    const response = await surveyFetch.get("/question");
    const data = response.data;
    setQuestions(data);
    
  } catch (error) {
    console.log(error);
  }

}

useEffect(() => {
  getQuestions();
}, []);

  return (
    <div>
      <h1>latest polls</h1>
      {questions.length === 0 ? (<p>Carregando</p>) : (
        questions.map((question) => (
          <div className='question' key={question.id_question}>
            <h2>{question.title}</h2>
              <div className="btnSurvey">
                  
                  <ul>
                      <li>
                      <Link to={`/option/${question.id_question}`} className="btn">result</Link>
                      </li>
                      <li>
                      <Link to={`/option/${question.id_question}`} className="btn">create option</Link>
                      </li>
                      <li>
                      <Link to={`/vote/${question.id_question}`} className="btn">vote</Link>
                      </li>
                  </ul>
              </div>
              
          </div>  
        ))
      )}
    </div>
  )
}

export default Home
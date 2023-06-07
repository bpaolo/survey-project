import surveyFetch from "../axios/config";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewOption.css";



const NewOption = () => {
const navigate = useNavigate();
const [option, setOption] = useState();
const { id } = useParams();
const id_question = id; 

const createOption = async (e) => {
  e.preventDefault();
  const option2 = { option: option, id_question:id_question };
  
  await surveyFetch.post("/option", option2);
  navigate("/")
};

return ( 
<div className="new-option">
  <h2> New Option:</h2>
    <form onSubmit={(e) => createOption(e)}>
      <div className="form-control">
        <label htmlFor="option">Option:</label>
        <input 
        type="text" 
        name="option"
        id="option"
        placeholder="option"
        onChange={(e) => setOption(e.target.value)}
        />

      </div>
      <input type="submit" value="create" className="btn" />
    </form>
</div>
  )
};

export default NewOption
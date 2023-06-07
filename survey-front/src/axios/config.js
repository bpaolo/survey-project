import axios from "axios";

const surveyFetch = axios.create({
    baseURL: "http://localhost:3001/",
    header: {
        "Content-Type": "application/json",
    }
});

export default surveyFetch;
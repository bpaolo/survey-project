import { Link } from "react-router-dom";

import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <h2>
            <Link to={`/`}>Survey</Link>
        </h2>
        <ul>
            <li>
                <Link to={`/`} > Home</Link>
            </li>
            <li>
                <Link to={`/newquestion`} className="new-btn"> New Question</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
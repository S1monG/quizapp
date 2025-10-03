import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="bg-gray-800 text-white">
            <ul className="flex space-x-4 p-4">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/quiz">Quiz</Link></li>
                <li><Link to="/result">Result</Link></li>
            </ul>
        </div>
    )
}

export default NavBar
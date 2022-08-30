import { Link } from "react-router-dom";
import './landingPage.css'
export default function landingPage () {
    return <div className="landingContainer">
        <div className="dvLanding">
        <div>
            <h1>Bienvenidos!</h1>
        </div>
        <div className="dvLanding">
            <Link to={"/home"}><button className="buttonLanding">Ingresar</button></Link>
        </div>
        </div>
    </div>
}
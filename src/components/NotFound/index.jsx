import './index.css'
import {useNavigate} from 'react-router-dom'
const NotFound=()=> {
    const navigate= useNavigate()
    return (
        <div className="not-found-bg">
            <div className="not-found-cont">
                <img src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
                class="not-found-image" alt="not-found-image"
                 />
                 <h1 className="not-found-head">Sorry, we can’t seem to find the page you’re looking for.</h1>
                 <button className="notFoundBtn" onClick={()=> navigate('/jobs')}>Find Jobs</button>
            </div>
        </div>

    )
}

export default NotFound
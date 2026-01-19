import './index.css'
import {useNavigate} from 'react-router-dom'
import Navbar from '../Navbar'
const Home =()=> {
    const navigate= useNavigate()
    return (
        <div className="home-container">
            <Navbar/>
            <div className="home-page">
                <div className="home-page-content">
                    <h1 className='home-heading'>Find The Job That Fits Your Life </h1>
                    <p className="home-description">
                        Millions of people are searching for jobs, salary information, company
                        reviews. Find the job that fits your abilities and potential.
                    </p>
                    <button className="find-jobs-button" type="button">
                        Find Jobs
                    </button>

                </div>

            </div>

        </div>

    
    )
}

export default Home
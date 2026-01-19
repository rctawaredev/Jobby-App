import "./index.css";
import { AiFillStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const JobCard = ({ eachJob }) => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob;
  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="nav-item">
        <div className="logo-title-job-card-cont">
          <img src={companyLogoUrl} className="job-logo" />
          <div className="title-rating-cont">
            <h1 className="job-card-title">{title}</h1>
            <div className="rating-star-cont">
              <AiFillStar className="star-icon-card" />
              <p className="job-card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <ul className="lipc-cont">
          <li className="location-employment-cont">
            <div className="flex-cont">
              <IoLocationSharp className="type-icon" />
              <p className="icon-label">{location}</p>
            </div>
            <div className="flex-cont">
              <BsFillBriefcaseFill className="type-icon" />
              <p className="icon-label">{employmentType}</p>
            </div>
          </li>
          <li>
            <p className="package">{packagePerAnnum}</p>
          </li>
        </ul>

        <h1 className="Description-head">Description</h1>
        <p className="Description-para">{jobDescription}</p>
      </Link>
    </li>
  );
};

export default JobCard;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import "./index.css";
import { BeatLoader } from "react-spinners";

import { AiFillStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillBriefcaseFill } from "react-icons/bs";

const JobDetails = () => {
  const [detailedJobData, setDetailedJobData] = useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const getDetailedJobDetails = async () => {
    setIsLoading(true);
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`;
    const jwtToken = Cookies.get("jwt_token");

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const jobDetails = data.job_details;

      const updatedJobData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
        similarJobs: data.similar_jobs,
      };

      setDetailedJobData(updatedJobData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailedJobDetails();
  }, [id]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="sweet-loading-jd">
          <BeatLoader color="white" loading size={15} />
        </div>
      ) : (
        <div className="job-details-container">
          <div className="job-details-card">
            <div className="job-details-header">
              <img
                src={detailedJobData.companyLogoUrl}
                alt="company logo"
                className="job-details-logo"
              />

              <div className="job-details-title-rating">
                <h1 className="job-details-title">{detailedJobData.title}</h1>
                <div className="job-details-rating-container">
                  <AiFillStar className="job-details-star-icon" />
                  <p className="job-details-rating">{detailedJobData.rating}</p>
                </div>
              </div>
            </div>

            <ul className="job-details-info-list">
              <li className="job-details-meta">
                <div className="job-details-flex">
                  <IoLocationSharp className="job-details-icon" />
                  <p className="job-details-label">
                    {detailedJobData.location}
                  </p>
                </div>

                <div className="job-details-flex">
                  <BsFillBriefcaseFill className="job-details-icon" />
                  <p className="job-details-label">
                    {detailedJobData.employmentType}
                  </p>
                </div>
              </li>

              <li>
                <p className="job-details-package">
                  {detailedJobData.packagePerAnnum}
                </p>
              </li>
            </ul>

            <h1 className="job-details-description-title">Description</h1>
            <p className="job-details-description-text">
              {detailedJobData.jobDescription}
            </p>

            <h1 className="job-details-description-title">Skills</h1>
            <ul className="skills-cont">
              {detailedJobData.skills?.map((skill) => (
                <li key={skill.name} className="skills-list-cont">
                  <img
                    src={skill.image_url}
                    alt={skill.name}
                    className="skill-img"
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="job-details-description-title">Life at Company</h1>
            <div className="life-at-comp-cont">
              <p className="job-details-description-text">
                {detailedJobData.lifeAtCompany?.description}
              </p>
              <img
                src={detailedJobData.lifeAtCompany?.image_url}
                alt="life at company"
                className="life-at-comp-image"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetails;

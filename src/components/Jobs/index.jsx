import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BsSearch } from "react-icons/bs";
import { BeatLoader } from "react-spinners";

import NavBar from "../Navbar";
import FilterJobs from "../FilterJobs";
import ProfileDetails from "../ProfileDetails";
import JobCard from "../JobCard";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Jobs = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [jobDetails, setJobDetails] = useState([]);


  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [profileApiStatus, setProfileApiStatus] = useState(
    apiStatusConstants.initial,
  );
  const [jobsApiStatus, setJobsApiStatus] = useState(
    apiStatusConstants.initial,
  );


  const getProfileDetails = async () => {
    setProfileApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = "https://apis.ccbp.in/profile";

    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileDetails(data.profile_details);
        setProfileApiStatus(apiStatusConstants.success);
      } else {
        setProfileApiStatus(apiStatusConstants.failure);
      }
    } catch {
      setProfileApiStatus(apiStatusConstants.failure);
    }
  };

  const getJobDetails = async () => {
    setJobsApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get("jwt_token");
    const employmentQuery = employmentTypes.join(",");

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentQuery}&minimum_package=${salaryRange}&search=${searchInput}`;

    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        const updatedJobs = data.jobs.map((eachJob) => ({
          id: eachJob.id,
          title: eachJob.title,
          rating: eachJob.rating,
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          jobDescription: eachJob.job_description,
        }));
        setJobDetails(updatedJobs);
        setJobsApiStatus(apiStatusConstants.success);
      } else {
        setJobsApiStatus(apiStatusConstants.failure);
      }
    } catch {
      setJobsApiStatus(apiStatusConstants.failure);
    }
  };

  const changeEmploymentType = (typeId, checked) => {
    if (checked) {
      setEmploymentTypes((prev) => [...prev, typeId]);
    } else {
      setEmploymentTypes((prev) => prev.filter((each) => each !== typeId));
    }
  };

  const changeSalaryRange = (salaryId) => {
    setSalaryRange(salaryId);
  };

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const onClickSearch = () => {
    getJobDetails();
  };

  const onKeyDownSearch = (event) => {
    if (event.key === "Enter") {
      getJobDetails();
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  useEffect(() => {
    getJobDetails();
  }, [employmentTypes, salaryRange]);



  const renderSearchBar = () => (
    <div className="search-bar">
      <input
        className="search-input"
        type="search"
        placeholder="Search"
        value={searchInput}
        onChange={onChangeSearchInput}
        onKeyDown={onKeyDownSearch}
      />
      <button className="search-button" type="button" onClick={onClickSearch}>
        <BsSearch className="search-icon" />
      </button>
    </div>
  );

  const renderProfileSection = () => {
    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="sweet-loading">
            <BeatLoader size={12} color="white" />
          </div>
        );
      case apiStatusConstants.success:
        return <ProfileDetails profileDetails={profileDetails} />;
      case apiStatusConstants.failure:
        return (
          <button className="retry-btn" onClick={getProfileDetails}>
            Retry Profile
          </button>
        );
      default:
        return null;
    }
  };

  const renderNoJobsView = () => (
    <div className="no-jobs-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-desc">
        We could not find any jobs. Try different filters.
      </p>
    </div>
  );

  const renderJobsSection = () => {
    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="sweet-loading">
            <BeatLoader size={30} color="white" />
          </div>
        );
      case apiStatusConstants.success:
        return jobDetails.length === 0 ? (
          renderNoJobsView()
        ) : (
          <ul className="all-jobs-cont">
            {jobDetails.map((eachJob) => (
              <JobCard key={eachJob.id} eachJob={eachJob} />
            ))}
          </ul>
        );
      case apiStatusConstants.failure:
        return (
          <div className="failure-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure-image"
              className="failure-img"
            />
            <button className="retry-btn" onClick={getJobDetails}>
              Retry Jobs
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />
      <div className="jobs-container">
        <div className="flex-sidebar-jobs-cont">
          <div className="sideBar-on-medium-to-large-screen">
            {renderSearchBar()}
            {renderProfileSection()}
            <FilterJobs
              changeEmploymentType={changeEmploymentType}
              changeSalaryRange={changeSalaryRange}
            />
          </div>
          {renderJobsSection()}
        </div>
      </div>
    </>
  );
};

export default Jobs;

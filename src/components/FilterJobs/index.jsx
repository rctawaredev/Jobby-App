import "./index.css";

const employmentTypesList = [
  { label: "Full Time", employmentTypeId: "FULLTIME" },
  { label: "Part Time", employmentTypeId: "PARTTIME" },
  { label: "Freelance", employmentTypeId: "FREELANCE" },
  { label: "Internship", employmentTypeId: "INTERNSHIP" },
];

const salaryRangesList = [
  { salaryRangeId: "1000000", label: "10 LPA and above" },
  { salaryRangeId: "2000000", label: "20 LPA and above" },
  { salaryRangeId: "3000000", label: "30 LPA and above" },
  { salaryRangeId: "4000000", label: "40 LPA and above" },
];

const FilterJobs = (props) => {
  const { changeEmploymentType, changeSalaryRange } = props;

  const onChangeEmploymentType = (event) => {
    const { id, checked } = event.target;
    changeEmploymentType(id, checked);
  };

  const onChangeSalary = (event) => {
    changeSalaryRange(event.target.id);
  };

  return (
    <>
      <div className="filter-container">
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="filter-list">
          {employmentTypesList.map((type) => (
            <li key={type.employmentTypeId} className="filter-item">
              <input
                type="checkbox"
                id={type.employmentTypeId}
                className="checkbox"
                onChange={onChangeEmploymentType}
              />
              <label htmlFor={type.employmentTypeId} className="label">
                {type.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-container">
        <h1 className="filter-heading">Salary Ranges</h1>
        <ul className="filter-list">
          {salaryRangesList.map((range) => (
            <li key={range.salaryRangeId} className="filter-item">
              <input
                type="radio"
                id={range.salaryRangeId}
                name="salary"
                className="radio"
                onChange={onChangeSalary}
              />
              <label htmlFor={range.salaryRangeId} className="label">
                {range.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FilterJobs;

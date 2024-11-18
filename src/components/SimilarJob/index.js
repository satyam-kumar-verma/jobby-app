import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJob = props => {
  const {eachSimilarJobObj} = props
  return (
    <li className="similar-job-container">
      <div className="similar-job-logo-position-section">
        <img
          src={eachSimilarJobObj.companyLogoUrl}
          className="similar-job-logo"
          alt="similar job company logo"
        />
        <div className="similar-job-position-rating-container">
          <h1 className="similar-job-position-para">
            {eachSimilarJobObj.title}
          </h1>
          <div className="similar-rating-container">
            <FaStar className="similar-rating-star-logo" />
            <p className="similar-rating-para">{eachSimilarJobObj.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description-heading">Description</h1>
      <p className="similar-description-para">
        {eachSimilarJobObj.jobDescription}
      </p>
      <div className="similar-job-location-type-salary-section">
        <div className="similar-job-location-type-section">
          <div className="similar-job-location-container">
            <MdLocationOn className="similar-job-location-type-icon" />
            <p className="similar-job-location-type-para">
              {eachSimilarJobObj.location}
            </p>
          </div>
          <div className="similar-job-type-container">
            <BsFillBriefcaseFill className="similar-job-location-type-icon" />
            <p className="similar-job-location-type-para">
              {eachSimilarJobObj.employmentType}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJob

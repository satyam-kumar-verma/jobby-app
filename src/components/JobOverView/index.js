import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobOverView = props => {
  const {eachJobOverViewObj} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachJobOverViewObj
  return (
    <Link className="job-overview-link-style" to={`/jobs/${id}`}>
      <li className="job-over-view-container">
        <div className="job-logo-position-section">
          <img src={companyLogoUrl} className="job-logo" alt="company logo" />
          <div className="job-position-rating-container">
            <h1 className="job-position-para">{title}</h1>
            <div className="rating-container">
              <FaStar className="rating-star-logo" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-location-type-salary-section">
          <div className="job-location-type-section">
            <div className="job-location-container">
              <MdLocationOn className="job-location-type-icon" />
              <p className="job-location-type-para">{location}</p>
            </div>
            <div className="job-type-container">
              <BsFillBriefcaseFill className="job-location-type-icon" />
              <p className="job-location-type-para">{employmentType}</p>
            </div>
          </div>
          <p className="job-salary-para">{packagePerAnnum}</p>
        </div>
        <hr className="job-hr-line" />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobOverView

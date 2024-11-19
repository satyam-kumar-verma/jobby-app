import {Component} from 'react'

import Header from '../Header'

import SkillsLogoName from '../SkillsLogoName'
import SimilarJob from '../SimilarJob'

import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

class JobItemDetail extends Component {
  state = {
    jobDetailObj: {},
    similarJobArray: [],
    skillsArray: [],
    isLoading: true,
    isJobDetailDataFetchingFailed: false,
  }

  componentDidMount() {
    this.getJobDetailData()
  }

  getJobDetailData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const jobDetailUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const detailJobDataResponse = await fetch(jobDetailUrl, options)

    if (detailJobDataResponse.ok === true) {
      const detailJobDataJsonData = await detailJobDataResponse.json()

      const {job_details} = detailJobDataJsonData

      const jobDetailsInCamelCase = {
        companyLogoUrl: job_details.company_logo_url,
        companyWebsiteUrl: job_details.company_website_url,
        employmentType: job_details.employment_type,
        id: job_details.id,
        jobDescription: job_details.job_description,
        lifeAtCompany: job_details.life_at_company,
        location: job_details.location,
        packagePerAnnum: job_details.package_per_annum,
        rating: job_details.rating,
        skills: job_details.skills,
        title: job_details.title,
      }

      const {skills} = jobDetailsInCamelCase

      const skillsInCamelCase = skills.map(eachSkillObj => ({
        imageUrl: eachSkillObj.image_url,
        name: eachSkillObj.name,
      }))

      const {similar_jobs} = detailJobDataJsonData

      const similarJobsInCamelCase = similar_jobs.map(eachSimilarJobObj => ({
        companyLogoUrl: eachSimilarJobObj.company_logo_url,
        employmentType: eachSimilarJobObj.employment_type,
        id: eachSimilarJobObj.id,
        jobDescription: eachSimilarJobObj.job_description,
        location: eachSimilarJobObj.location,
        rating: eachSimilarJobObj.rating,
        title: eachSimilarJobObj.title,
      }))

      this.setState({
        jobDetailObj: jobDetailsInCamelCase,
        similarJobArray: similarJobsInCamelCase,
        skillsArray: skillsInCamelCase,
        isLoading: false,
        isJobDetailDataFetchingFailed: false,
      })
    } else {
      this.setState({
        isLoading: false,
        isJobDetailDataFetchingFailed: true,
      })
    }
  }

  onClickRetryBtn = () => {
    this.setState(
      {
        isLoading: true,
      },
      this.getJobDetailData,
    )
  }

  loadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  fetchingFailedView = () => (
    <div className='detail-job-failed-container'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
        className='detail-job-failed-img'
      />
      <h1 className='detail-job-failed-heading'>Oops! Something Went Wrong</h1>
      <p className='detail-job-failed-para'>
        We cannot seem to find the page you are looking for
      </p>
      <button
        className='detail-job-failed-retry-btn'
        type='button'
        onClick={this.onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderDetailJobStructure = () => {
    const {
      jobDetailObj,
      similarJobArray,
      skillsArray,
      isJobDetailDataFetchingFailed,
    } = this.state

    const {lifeAtCompany} = jobDetailObj
    const {description} = lifeAtCompany

    return (
      <>
        {isJobDetailDataFetchingFailed && this.fetchingFailedView()}
        {!isJobDetailDataFetchingFailed && (
          <>
            <div className='job-detail-container'>
              <div className='job-detail-logo-position-section'>
                <img
                  src={jobDetailObj.companyLogoUrl}
                  className='job-detail-logo'
                  alt='job details company logo'
                />
                <div className='job-detail-position-rating-container'>
                  <h1 className='job-detail-position-para'>
                    {jobDetailObj.title}
                  </h1>
                  <div className='detail-rating-container'>
                    <FaStar className='detail-rating-star-logo' />
                    <p className='detail-rating-para'>{jobDetailObj.rating}</p>
                  </div>
                </div>
              </div>

              <div className='job-detail-location-type-salary-section'>
                <div className='job-detail-location-type-section'>
                  <div className='job-detail-location-container'>
                    <MdLocationOn className='job-detail-loaction-type-icon' />
                    <p className='job-detail-location-type-para'>
                      {jobDetailObj.location}
                    </p>
                  </div>
                  <div className='job-detail-type-container'>
                    <BsFillBriefcaseFill className='job-detail-loaction-type-icon' />
                    <p className='job-detail-location-type-para'>
                      {jobDetailObj.employmentType}
                    </p>
                  </div>
                </div>
                <p className='job-detail-salary-para'>
                  {jobDetailObj.packagePerAnnum}
                </p>
              </div>

              <hr className='job-detail-hr-line' />

              <div className='job-detail-description-visit-container'>
                <h1 className='job-detail-description-heading'>Description</h1>
                <a
                  className='job-detail-visit-style'
                  href={jobDetailObj.companyWebsiteUrl}
                  target='_blank'
                >
                  Visit
                  <BsBoxArrowUpRight className='job-detail-visit-logo' />
                </a>
              </div>

              <p className='job-detail-description-para'>
                {jobDetailObj.jobDescription}
              </p>
              <h1 className='job-detail-description-skills-para'>Skills</h1>
              <ul className='skills-section'>
                {skillsArray.map(eachSkillObj => (
                  <SkillsLogoName
                    key={eachSkillObj.name}
                    eachSkillObj={eachSkillObj}
                  />
                ))}
              </ul>
              <h1 className='job-detail-life-at-company-para'>Life at Company</h1>
              <div className='job-detail-life-at-company-description-image-container'>
                <p className='job-detail-life-at-company-description-para'>
                  {description}
                </p>
                <img
                  src={lifeAtCompany.image_url}
                  className='job-detail-life-at-company-description-image'
                  alt='life at company'
                />
              </div>
            </div>
            <p className='job-detail-similar-job-heading'>Similar Jobs</p>
            <ul className='similar-jobs-section'>
              {similarJobArray.map(eachSimilarJobObj => (
                <SimilarJob
                  key={eachSimilarJobObj.id}
                  eachSimilarJobObj={eachSimilarJobObj}
                />
              ))}
            </ul>
          </>
        )}
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />
        <div className='job-detail-bg'>
          {isLoading ? this.loadingView() : this.renderDetailJobStructure()}
        </div>
      </>
    )
  }
}

export default JobItemDetail

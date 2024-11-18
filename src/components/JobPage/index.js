import {Component} from 'react'

import Cookies from 'js-cookie'

import {IoSearch} from 'react-icons/io5'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Filter from '../Filter'

import JobOverView from '../JobOverView'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobPage extends Component {
  state = {
    jobOverViewList: [],
    employmentTypes: '',
    minimumPackage: '',
    searchText: '',
    isLoading: true,
    isJobOverViewListFetchingFailed: false,
  }

  componentDidMount() {
    this.getJobOverViewList()
  }

  getJobOverViewList = async () => {
    const {employmentTypes, minimumPackage, searchText} = this.state

    const jobOverViewUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${minimumPackage}&search=${searchText}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const jobOverViewResponse = await fetch(jobOverViewUrl, options)

    if (jobOverViewResponse.ok === true) {
      const jobOverViewJsonData = await jobOverViewResponse.json()

      const {jobs} = jobOverViewJsonData

      const jobsListInCamelCase = jobs.map(eachJobObj => ({
        companyLogoUrl: eachJobObj.company_logo_url,
        employmentType: eachJobObj.employment_type,
        id: eachJobObj.id,
        jobDescription: eachJobObj.job_description,
        location: eachJobObj.location,
        packagePerAnnum: eachJobObj.package_per_annum,
        rating: eachJobObj.rating,
        title: eachJobObj.title,
      }))

      this.setState({
        jobOverViewList: jobsListInCamelCase,
        isLoading: false,
        isJobOverViewListFetchingFailed: false,
      })
    } else {
      this.setState({
        isJobOverViewListFetchingFailed: true,
        jobOverViewList: [],
        isLoading: false,
      })
    }
  }

  onChangeMinimumPackageFunction = packageValue => {
    this.setState(
      {
        minimumPackage: packageValue,
        isLoading: true,
      },
      this.getJobOverViewList,
    )
  }

  onChangeEmploymentTypeFunction = employmentTypeDetail => {
    this.setState(
      {
        employmentTypes: employmentTypeDetail,
        isLoading: true,
      },
      this.getJobOverViewList,
    )
  }

  onChangeSearchInput = event => {
    if (event.target.value === '' || event.key === 'Enter') {
      this.setState(
        {
          searchText: event.target.value,
          isLoading: true,
        },
        this.getJobOverViewList,
      )
    } else {
      this.setState({
        searchText: event.target.value,
      })
    }
  }

  onClickSearchLogo = () => {
    this.setState(
      {
        isLoading: true,
      },
      this.getJobOverViewList,
    )
  }

  loadingFunctionStructure = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  NoProductFoundCaseStructure = () => (
    <div className="not-job-over-view-list-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="not-job-found-img"
      />
      <h1 className="no-job-found-heading">No Jobs Found</h1>
      <p className="no-job-found-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  onFailedFetchingJobOverListStructure = () => (
    <div className="not-job-over-view-list-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="not-job-found-img"
      />
      <h1 className="no-job-found-heading">Oops! Something Went Wrong</h1>
      <p className="no-job-found-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.getJobOverViewList}
      >
        Retry
      </button>
    </div>
  )

  searchBarForSmallDevice = () => (
    <div className="job-search-container-small-device">
      <input
        className="job-input-search"
        type="search"
        placeholder="Search"
        onKeyUp={this.onChangeSearchInput}
      />
      <button
        className="job-search-logo-btn"
        onClick={this.onClickSearchLogo}
        type="button"
        data-testid="searchButton"
      >
        <IoSearch className="job-search-logo" />
      </button>
    </div>
  )

  searchBarForLargeDevice = () => (
    <div className="job-search-container">
      <input
        className="job-input-search"
        type="search"
        placeholder="Search"
        onKeyUp={this.onChangeSearchInput}
      />
      <button
        className="job-search-logo-btn"
        onClick={this.onClickSearchLogo}
        type="button"
        data-testid="searchButton"
      >
        <IoSearch className="job-search-logo" />
      </button>
    </div>
  )

  renderJobOverViewListStructure = () => {
    const {jobOverViewList} = this.state

    if (jobOverViewList.length === 0) {
      return this.NoProductFoundCaseStructure()
    }

    return (
      <>
        {jobOverViewList.map(eachJobOverViewObj => (
          <JobOverView
            eachJobOverViewObj={eachJobOverViewObj}
            key={eachJobOverViewObj.id}
          />
        ))}
      </>
    )
  }

  render() {
    const {employmentTypes, isLoading, isJobOverViewListFetchingFailed} =
      this.state

    return (
      <>
        <Header />
        <div className="job-bg">
          {this.searchBarForSmallDevice()}
          <Filter
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            previousSelectedEmploymentType={employmentTypes}
            onChangeMinimumPackageFunction={this.onChangeMinimumPackageFunction}
            onChangeEmploymentTypeFunction={this.onChangeEmploymentTypeFunction}
          />
          <div className="job-list-and-search-container">
            {this.searchBarForLargeDevice()}

            {isJobOverViewListFetchingFailed &&
              this.onFailedFetchingJobOverListStructure()}
            {!isJobOverViewListFetchingFailed && (
              <ul className="jobs-over-view-section">
                {isLoading
                  ? this.loadingFunctionStructure()
                  : this.renderJobOverViewListStructure()}
              </ul>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default JobPage

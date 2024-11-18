import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

class Filter extends Component {
  state = {
    profileData: {},
    isProfileDataFetchingFailed: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      isLoading: true,
    })

    const profileUrl = 'https://apis.ccbp.in/profile'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const profileDataResponse = await fetch(profileUrl, options)

    if (profileDataResponse.ok === true) {
      const profileJsonData = await profileDataResponse.json()

      const {profile_details} = profileJsonData

      const profileDetails = {
        name: profile_details.name,

        profileImageUrl: profile_details.profile_image_url,

        shortBio: profile_details.short_bio,
      }

      this.setState({
        profileData: profileDetails,
        isProfileDataFetchingFailed: false,
        isLoading: false,
      })
    } else {
      this.setState({
        isProfileDataFetchingFailed: true,
        profileData: {},
        isLoading: false,
      })
    }
  }

  onChangeSalaryRange = event => {
    const {onChangeMinimumPackageFunction} = this.props

    onChangeMinimumPackageFunction(event.target.value)
  }

  onClickRetryBtn = () => {
    this.setState(
      {
        isLoading: true,
      },
      this.getProfileData,
    )
  }

  onClickEmploymentType = event => {
    const {previousSelectedEmploymentType} = this.props

    const {onChangeEmploymentTypeFunction} = this.props

    if (event.target.checked) {
      let newEmploymentTypeString = ''

      if (previousSelectedEmploymentType === '') {
        newEmploymentTypeString = newEmploymentTypeString + event.target.value
      } else {
        newEmploymentTypeString =
          previousSelectedEmploymentType + `,${event.target.value}`
      }

      onChangeEmploymentTypeFunction(newEmploymentTypeString)
    } else {
      const selectedEmploymentTypeArr =
        previousSelectedEmploymentType.split(',')

      const filteredEmploymentArr = selectedEmploymentTypeArr.filter(
        eachString => eachString !== event.target.value,
      )

      const newRemovedString = filteredEmploymentArr.join(',')

      onChangeEmploymentTypeFunction(newRemovedString)
    }
  }

  getProfile = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData

    const {isLoading} = this.state

    if (isLoading) {
      return this.loadingProfileFunctionStructure()
    }

    return (
      <div className='filter-profile-bg'>
        <img src={profileImageUrl} className='profile-img' alt='profile' />

        <h1 className='profile-name'>{name}</h1>
        <p className='profile-description'>{shortBio}</p>
      </div>
    )
  }

  profileFailedView = () => (
    <div className='profile-retry-container'>
      <button
        className='profile-retry-btn'
        type='button'
        onClick={this.getProfileData}
      >
        Retry
      </button>
    </div>
  )

  employmentTypestructure = eachEmploymentObj => {
    const {label} = eachEmploymentObj

    return (
      <li
        className='employement-type-checkbox-text-container'
        key={eachEmploymentObj.id}
      >
        <input
          type='checkbox'
          className='employement-type-checkbox'
          id={eachEmploymentObj.employmentTypeId}
          value={eachEmploymentObj.employmentTypeId}
          onClick={this.onClickEmploymentType}
        />
        <label
          htmlFor={eachEmploymentObj.employmentTypeId}
          className='employement-type-label'
        >
          {label}
        </label>
      </li>
    )
  }

  salaryRangeStructure = eachSalaryObj => (
    <li
      className='employement-type-checkbox-text-container'
      key={eachSalaryObj.salaryRangeId}
    >
      <input
        type='radio'
        className='employement-type-checkbox'
        id={eachSalaryObj.salaryRangeId}
        name='salaryRange'
        value={eachSalaryObj.salaryRangeId}
        onChange={this.onChangeSalaryRange}
      />
      <label
        htmlFor={eachSalaryObj.salaryRangeId}
        className='employement-type-label'
      >
        {eachSalaryObj.label}
      </label>
    </li>
  )

  loadingProfileFunctionStructure = () => (
    <div className='loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  render() {
    const {employmentTypesList, salaryRangesList, isProfileDataFetchingFailed} =
      this.props

    return (
      <div className='filter-bg'>
        {isProfileDataFetchingFailed
          ? this.profileFailedView()
          : this.getProfile()}
        <div className='employement-type-container'>
          <p className='employement-para'>Type of Employment</p>

          <ul className='employment-type-salary-range-section'>
            {employmentTypesList.map(eachEmploymentObj =>
              this.employmentTypestructure(eachEmploymentObj),
            )}
          </ul>
        </div>

        <div className='salary-range-container'>
          <p className='salary-para'>Salary Range</p>
          <ul className='employment-type-salary-range-section'>
            {salaryRangesList.map(eachSalaryObj =>
              this.salaryRangeStructure(eachSalaryObj),
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Filter

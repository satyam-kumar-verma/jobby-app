import {TiHome} from 'react-icons/ti'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props

    history.replace('/login')
  }

  const onClickHomeBtn = () => {
    const {history} = props

    history.replace('/')
  }

  const onClickJob = () => {
    const {history} = props

    history.replace('/jobs')
  }

  return (
    <ul className="header-bg">
      <Link className="home-logo-link" to="/">
        <li className="home-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="header-logo-img"
            alt="website logo"
          />
        </li>
      </Link>

      <li className="home-job-container">
        <Link className="home-job-btn-link" to="/">
          <button className="home-job-btn" type="button">
            Home
          </button>
        </Link>

        <Link className="home-job-btn-link" to="/jobs">
          <button className="home-job-btn" type="button">
            Jobs
          </button>
        </Link>
      </li>
      <button
        className="header-logout-btn"
        type="button"
        onClick={onClickLogout}
      >
        Logout
      </button>
      <li className="home-job-logout-btn-secttion-for-small-devices">
        <button
          className="home-job-logout-btn"
          type="button"
          onClick={onClickHomeBtn}
        >
          <TiHome className="home-job-logout-logo" />
        </button>

        <button
          className="home-job-logout-btn"
          type="button"
          onClick={onClickJob}
        >
          <BsBriefcaseFill className="home-job-logout-logo" />
        </button>

        <button
          className="home-job-logout-btn"
          type="button"
          onClick={onClickLogout}
        >
          <FiLogOut className="home-job-logout-logo" />
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)

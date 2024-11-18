import {Component} from 'react'

import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class HomePage extends Component {
  render() {
    return (
      <div className="home-bg">
        <Header />
        <div className="home-lower-bg">
          <div className="home-description-container">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-para">
              Millions of people are searching for jobs, salary, information,
              company reviews. Find the jobs that fits your abilities and
              potential.
            </p>
          </div>
          <Link className="home-btn-link" to="/jobs">
            <button className="home-btn" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default HomePage

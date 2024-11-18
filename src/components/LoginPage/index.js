import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    isErrorDetected: false,
  }

  onSuccessfulLogin = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  onSubmitLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const loginUrl = 'https://apis.ccbp.in/login'

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const loginResponse = await fetch(loginUrl, options)

    if (loginResponse.ok === true) {
      const loginResponseJsonData = await loginResponse.json()

      const {jwt_token} = loginResponseJsonData

      this.onSuccessfulLogin(jwt_token)
    } else {
      const loginResponseErrorJsonData = await loginResponse.json()

      const {error_msg} = loginResponseErrorJsonData

      this.setState({
        errorMessage: error_msg,
        isErrorDetected: true,
      })
    }
  }

  onChangeUserName = event => {
    this.setState({
      username: event.target.value,
      isErrorDetected: false,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
      isErrorDetected: false,
    })
  }

  onDetectError = () => {
    const {errorMessage} = this.state
    return <p className="login-err-msg">*{errorMessage}</p>
  }

  render() {
    const {isErrorDetected} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <form className="login-container" onSubmit={this.onSubmitLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-logo-img"
            alt="website logo"
          />
          <div className="label-input-container">
            <label className="login-label" htmlFor="userName">
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              className="login-input"
              placeholder="Username"
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="label-input-container">
            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
          </div>
          <div className="btn-err-container">
            <button className="login-btn" type="submit">
              Login
            </button>
            {isErrorDetected && this.onDetectError()}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginPage

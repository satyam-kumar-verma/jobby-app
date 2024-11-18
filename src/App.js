import {Switch, Route, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import JobPage from './components/JobPage'
import JobItemDetail from './components/JobItemDetail'
import PageNotFound from './components/PageNotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/jobs" component={JobPage} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetail} />
    <Route exact path="/bad-path" component={PageNotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App

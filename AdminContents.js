import React from 'react'
import '../styles/AdminContents.css'
import TokenService from './token-service'
import CurrentLocation from './CurrentLocation'
import dougsLogo from '../images/Dougs-logo.png'
import CurrentMessage from './CurrentMessage'
import '../styles/CustomerContents.css'
import CurrentTime from './CurrentTime'
import Menu from './Menu'
import MessageForm from './MessageForm'
import MenuForm from './MenuForm'
import Time from './Time'
import LocationForm from './LocationForm'
import { Link } from 'react-router-dom'
import Footer from './Footer'


class AdminContents extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showMessageForm: false,
      showMenuForm: false,
      showTimeForm: false,
      showLocationForm: false,
      showAdmin: false,
    }
  }

  checkAdmin = () => {
    TokenService.hasAuthToken()
      ? this.setState({ showAdmin: true })
      : this.setState({ showAdmin: false })
  }


  toggleMessageForm = () => {
    this.setState({ showMessageForm: !this.state.showMessageForm })
  }

  toggleMenuForm = () => {
    this.setState({ showMenuForm: !this.state.showMenuForm })
  }

  toggleTimeForm = () => {
    this.setState({ showTimeForm: !this.state.showTimeForm })
  }

  toggleLocationForm = () => {
    this.setState({ showLocationForm: !this.state.showLocationForm })
  }

  componentDidMount() {
    this.checkAdmin()
  }


  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    window.localStorage.clear()
  }

  renderLogoutLink = () => {
    return (
      <div>
        <Link
          onClick={this.handleLogoutClick}
          to='/'
          className='log-in-out'>
          Logout
    </Link>
      </div>
    )
  }


  render() {
    return (
      <div className='contents-container'>
        <p className='signout'>{TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : ''}
        </p>
        <img id='food-logo' src={dougsLogo} alt='dougs-pizza-logo' />
        <CurrentMessage
          message={this.props.message}
          passDelete={this.props.messageDelete}
          passPut={this.props.messagePut}
          toggleMessageForm={this.toggleMessageForm}
        />
        <div className={this.state.showMessageForm ? 'display' : 'hidden'}>
          <MessageForm passAdd={this.props.addMessage} />
        </div>
        <CurrentTime
          time={this.props.time}
          passDelete={this.props.timeDelete}
          passPut={this.props.timePut}
          toggleTimeForm={this.toggleTimeForm}
        />
        <div className={this.state.showTimeForm ? 'display' : 'hidden'}>
          <Time passAdd={this.props.addTime} />
        </div>

        <CurrentLocation
          location={this.props.location}
          passDelete={this.props.deleteLocation}
          passPut={this.props.putLocation}
          toggleLocationForm={this.toggleLocationForm}
        />
        <div className={this.state.showLocationForm ? 'display' : 'hidden'}>
          <LocationForm passAdd={this.props.addLocation} />
        </div>

        <Menu
          menuItems={this.props.menu}
          passDelete={this.props.menuDelete}
          passPut={this.props.menuPut}
          passMenu={this.props.getMenu}
          toggleMenuForm={this.toggleMenuForm} />


        <div className={this.state.showMenuForm ? 'display' : 'hidden'}>
          <MenuForm passAdd={this.props.addMenu} />
        </div>

     
      </div>
    )
  }
}

export default AdminContents

import React from 'react'
import '../styles/Menu.css'
import MenuItem from './MenuItem'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TokenService from './token-service'
import RestaurantIcon from '@material-ui/icons/Restaurant'

class Menu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showAdmin: false
    }

  }


  checkAdmin = () => {
    TokenService.hasAuthToken()
      ? this.setState({ showAdmin: true })
      : this.setState({ showAdmin: false })
  }

  componentDidMount() {
    this.checkAdmin()
  }

  render() {

    this.props.menuItems.sort(function (a, b) {
      return a.rank - b.rank
    })
    return (
      <div className="page-container">
        <div className='customer-menu-view'>
          <h3 className='message-header'><RestaurantIcon /></h3>
          <ul className='menu-list'>
            {this.props.menuItems.map((item) => (
              <MenuItem
                key={item.name}
                item={item}
                passDelete={this.props.passDelete}
                passPut={this.props.passPut}
              />
            ))}
            <div className={this.state.showAdmin
              ? 'admin' : 'hidden'}>
              <span onClick={(e) => this.props.toggleMenuForm()} className='add-form'>
                <AddCircleIcon className='add-form' /></span>
            </div>
          </ul>
          <br />
        </div>
      </div>
    )
  }
}
export default Menu

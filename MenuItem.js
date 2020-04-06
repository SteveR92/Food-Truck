import React from 'react'
import '../styles/Menu.css'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import SendIcon from '@material-ui/icons/Send'
import CancelIcon from '@material-ui/icons/Cancel'
import TokenService from './token-service'

export default class MenuItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isInEditMode: false,
      pizzaname: this.props.item.pizzaname,
      blurb: this.props.item.blurb,
      id: this.props.item.id,
      price: this.props.item.price,
      rank: this.props.item.rank,
      deleted: false,
      showAdmin: false,
    }
  }

  checkAdmin = () => {
    TokenService.hasAuthToken()
      ? this.setState({ showAdmin: true })
      : this.setState({ showAdmin: false })
  }
  componentDidMount() {
    this.setState({
      pizzaname: this.props.item.pizzaname,
      blurb: this.props.item.blurb,
      id: this.props.item.id,
      price: this.props.item.price,
      rank: this.props.item.rank,
    })
    this.checkAdmin()
  }

  changeEditMode = () => {
    this.setState({ isInEditMode: !this.state.isInEditMode })
  }

  updateValue = () => {
    this.setState(
      {
        isInEditMode: false,
        pizzaname: this.refs.pizzaInput.value,
        blurb: this.refs.blurbInput.value,
        price: this.refs.priceInput.value,
        rank: this.refs.rankInput.value,
      },
      () => {
        let editedPizza = this.state
        this.props.passPut(editedPizza)
      },
    )
  }
  renderEditView = () => {
    return (
      <div>
        <div className='card-table'>
          <div className='edit-item-container'>
            <label>Name:</label>
            <input
              classname='edit-pizza'
              type='text'
              defaultValue={this.state.pizzaname}
              ref='pizzaInput'
            />
          </div>
          <div className='edit-item-container'>
            <label>Price:</label>
            <input
              classname='edit-pizza'
              type='text'
              defaultValue={this.state.price}
              ref='priceInput'
            />
          </div>
          <div className='edit-item-container'>
            <label>Description:</label>
            <input
              classname='edit-pizza'
              type='text'
              id='edit-description'
              defaultValue={this.state.blurb}
              ref='blurbInput'
            />
          </div>
          <div className='edit-item-container'>
            <label>List Order</label>
            <input
              classname='edit-pizza'
              type='text'
              defaultValue={this.state.rank}
              ref='rankInput'
            />
          </div>
          <br />
          <div className='card-button-container' id='edit-buttons'>
            <button onClick={this.changeEditMode}>
              <span id='edit-cancel'>
                <CancelIcon id='cancel-button' />
              </span>
            </button>
            <button onClick={this.updateValue}>
              <SendIcon id='send-edit' />
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderDefaultView = () => {
    return (
      <div className={this.state.deleted ? 'deleted' : 'default-view'}>
        <div className='menu-top-row'>
          <div className={this.state.showAdmin
            ? 'admin' : 'hidden'}>
            <p className='pizza-rank' id='rank-number'>
              {this.state.rank}
            </p>
          </div>
          <div className='pizza-container'>
            <h3 className='pizza-name'>{this.state.pizzaname}</h3>
            <h4 className='pizza-price'>₩{this.state.price}</h4>
          </div>
          <p className='pizza-blurb'>{this.state.blurb}</p>
        </div>

        <div className={this.state.showAdmin
          ? 'admin' : 'hidden'}>
          <div className='menu-admin-row'>
            <button className='admin-delete-pizza' onClick={this.deletePizza}>
              <DeleteIcon id='edit-button' />
            </button>
            <button className='admin-edit-pizza' onClick={this.changeEditMode}>
              <EditIcon id='edit-button' />
            </button>
          </div>
        </div>
      </div>
    )
  }

  deletePizza = (e) => {
    this.props.passDelete(this.state.id)
    this.setState({ deleted: true })
  }
  render() {
    return this.state.isInEditMode
      ? this.renderEditView()
      : this.renderDefaultView()
  }
}

import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import SendIcon from '@material-ui/icons/Send'

export default function MenuForm(props) {
  function submitForm(e) {
    console.log(e.target)
    e.preventDefault()
    e.stopPropagation(e)
    if (e.target.pizzaname.value === '') {
      alert('Please enter a name for the item you are adding')
    }
    if (e.target.price.value === '') {
      alert('Please enter a price for the item you are adding')
    }
    if (e.target.blurb.value === '') {
      alert('Please enter some information for the item you are adding')
    }
    if (e.target.rank.value === '') {
      alert('Please enter a menu position for the item you are adding')
    }
    props.passAdd(e)
    e.target.reset()
  }


  let id = uuidv4()


  return (
    <div className='card-table' id='location-form'>
      <div className='edit-item-container'>
        <h3>Add New Pizza</h3>
        <form onSubmit={(e) => submitForm(e)}>
          <input
            className='hidden'
            name='id'
            value={id}
          ></input>
          <input
            className='pizza-input'
            type='text'
            name='pizzaname'
            aria-label='pizza name'
            placeholder='pizza name'
          ></input>
          <input
            className='pizza-input'
            type='text'
            name='price'
            aria-label='price pizza'
            placeholder='price or text'
          ></input>
          <input
            className='pizza-input'
            type='text'
            name='blurb'
            aria-label='pizza info'
            placeholder='info about pizza'
          ></input>
          <input
            className='pizza-input'
            type='text'
            name='rank'
            aria-label='rank in menu'
            placeholder='location in menu - 0 is top, can use decimals'
          ></input>
          <div className='card-button-container'>
            <button type='submit' aria-label='Add message'>
              <SendIcon id='send-button' />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

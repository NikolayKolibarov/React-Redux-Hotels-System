import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { createHotel } from '../../store/hotels'
import { resetError } from '../../store/messages'

import Error from '../../shared/components/Error'

class CreateHotel extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillUnmount () {
    if (this.props.error) {
      this.props.resetError()
    }
  }

  handleFormSubmit ({name, location, description, numberOfRooms, image, parkingSlots}) {
    this.props.createHotel({name, location, description, numberOfRooms, image, parkingSlots})
  }

  renderAlert () {
    if (this.props.error) {
      return (
        <Error error={this.props.error} />
      )
    }
  }

  render () {
    const {fields: {name, location, description, numberOfRooms, image, parkingSlots}, handleSubmit} = this.props

    return (
      <div>
        <h1>Create Hotel</h1>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              {this.renderAlert()}
              <div className='form-group'>
                <label>Name</label>
                <input type='text' className='form-control' placeholder='Name' {...name} />
                {name.touched && name.error && <div className='error'>{name.error} </div>}
              </div>

              <div className='form-group'>
                <label>Location</label>
                <input type='text' className='form-control' placeholder='Location' {...location} />
                {location.touched && location.error && <div className='error'>{location.error}</div>}
              </div>

              <div className='form-group'>
                <label>Description</label>
                <input type='text' className='form-control' placeholder='Description' {...description} />
                {description.touched && description.error && <div className='error'>{description.error}</div>}
              </div>

              <div className='form-group'>
                <label>Number of Rooms</label>
                <input type='text' className='form-control' placeholder='Number of Rooms' {...numberOfRooms} />
                {numberOfRooms.touched && numberOfRooms.error && <div className='error'>{numberOfRooms.error} </div>}
              </div>

              <div className='form-group'>
                <label>Image</label>
                <input type='text' className='form-control' placeholder='Image' {...image} />
                {image.touched && image.error && <div className='error'>{image.error} </div>}
              </div>

              <div className='form-group'>
                <label>Parking Slots</label>
                <input type='text' className='form-control' placeholder='Parking Slots' {...parkingSlots} />
              </div>

              <button type='submit' className='btn btn-default'>Create Hotel</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}

  if (!values.name) {
    errors.name = 'Name is required'
  }

  if (!values.location) {
    errors.location = 'Location is required'
  }

  if (!values.description) {
    errors.description = 'Description is required'
  }

  if (!values.numberOfRooms) {
    errors.numberOfRooms = 'Number of Rooms is required'
  }

  if (!values.image) {
    errors.image = 'Image is required'
  }

  return errors
}

const mapStateToProps = state => {
  return {
    error: state.messages.error
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({createHotel, resetError}, dispatch)
}

export default reduxForm({
  form: 'CreateHotel',
  fields: ['name', 'location', 'description', 'numberOfRooms', 'image', 'parkingSlots'],
  validate
})(connect(mapStateToProps, mapDispatchToProps)(CreateHotel))

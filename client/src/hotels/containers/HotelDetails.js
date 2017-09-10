import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CreateReviewForm from './CreateReviewForm'
import ReviewsList from '../components/ReviewsList'

import { fetchHotel, fetchHotelReviews } from '../../store/hotels'

class HotelDetails extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hotelId: this.props.params.id
    }
  }

  componentDidMount () {
    this.props.fetchHotel(this.state.hotelId)
    this.props.fetchHotelReviews(this.state.hotelId)
  }

  back () {
    window.location.href = window.history.back(1)
  }

  renderHotel () {
    if (this.props.hotel) {
      const hotel = this.props.hotel

      return (
        <div>
          <h1>{hotel.name}</h1>
          <img src={hotel.image} className='img-responsive' />
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        {this.renderHotel()}
        <p />
        <button className='btn btn-default' onClick={this.back.bind(this)}>
          Back
        </button>
        <p />
        <h2>Add Review</h2>
        <CreateReviewForm hotelId={this.state.hotelId} />
        <h2>Reviews</h2>
        <ReviewsList reviews={this.props.reviews} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { hotel: state.hotels.selected, reviews: state.hotels.selectedHotelReviews }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchHotel, fetchHotelReviews}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetails)

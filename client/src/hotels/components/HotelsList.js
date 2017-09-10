import React, { Component } from 'react'
import { Link } from 'react-router'

export default class HotelsList extends Component {
  renderHotels () {
    if (this.props.hotels && this.props.hotels.length > 0) {
      return this.props.hotels.map(hotel => {
        return (
          <div key={hotel.id} className='hotel-list-item'>
            <div className='panel panel-default'>
              <div className='panel-body'>
                <h2>{hotel.name}</h2>
                <img src={hotel.image} className='img-responsive' />
                <p />
                <Link to={`/hotels/details/${hotel.id}`} className='btn btn-default'> View Details
                </Link>
              </div>
            </div>
            <hr />
          </div>
        )
      })
    } else {
      return (
        <h3>No hotels to be shown.</h3>
      )
    }
  }

  render () {
    return (
      <div>
        {this.renderHotels()}
      </div>
    )
  }
}

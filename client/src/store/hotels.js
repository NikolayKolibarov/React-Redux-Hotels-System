import { browserHistory } from 'react-router'

import { SET_ERROR } from './messages'
import hotelService from '../shared/services/hotelService'

// Action Types
const FETCH_HOTELS = 'FETCH_HOTELS'
const FETCH_HOTEL = 'FETCH_HOTEL'
const CREATE_HOTEL = 'CREATE_HOTEL'
const CREATE_HOTEL_REVIEW = 'CREATE_HOTEL_REVIEW'
const FETCH_HOTEL_REVIEWS = 'FETCH_HOTEL_REVIEWS'

// Action Creators
export function fetchHotels (page) {
  return dispatch => {
    hotelService
      .getHotels(page)
      .then(response => {
        dispatch({ type: FETCH_HOTELS, payload: { hotels: response.data } })
      })
  }
}

export function fetchHotel (id) {
  return dispatch => {
    hotelService
      .getHotel(id)
      .then(response => {
        dispatch({ type: FETCH_HOTEL, payload: { hotel: response.data } })
      })
  }
}

export function createHotel ({name, location, description, numberOfRooms, image, parkingSlots}) {
  const data = {name, location, description, numberOfRooms, image, parkingSlots}

  return dispatch => {
    hotelService
      .createHotel(data)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: CREATE_HOTEL
          })

          browserHistory.push('/hotels')
        } else {
          if (response.data.errors) {
            if (response.data.errors.description) {
              dispatch(hotelsError(response.data.errors.description))
            } else if (response.data.errors.name) {
              dispatch(hotelsError(response.data.errors.name))
            }
          } else {
            dispatch(hotelsError(response.data.message))
          }
        }
      })
  }
}

export function createHotelReview (hotelId, review) {
  return dispatch => {
    hotelService
      .addReview(hotelId, review)
      .then(response => {
        if (response.data.success) {
          dispatch({type: CREATE_HOTEL_REVIEW})
          dispatch(fetchHotelReviews(hotelId))
        } else {
          if (response.data.errors) {
            if (response.data.errors.description) {
              dispatch(hotelsError(response.data.errors.description))
            } else if (response.data.errors.name) {
              dispatch(hotelsError(response.data.errors.name))
            }
          } else {
            dispatch(hotelsError(response.data.message))
          }
        }
      })
  }
}

export function fetchHotelReviews (hotelId) {
  return dispatch => {
    hotelService
      .getReviews(hotelId)
      .then(response => {
        dispatch({type: FETCH_HOTEL_REVIEWS, payload: {reviews: response.data}})
      })
  }
}

export function hotelsError (error) {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: error
    })
  }
}

// Reducer
export default function reducer (state = { all: [], selected: null, selectedHotelReviews: [] } , action) {
  switch (action.type) {
    case FETCH_HOTELS:
      return Object.assign({}, state, { all: action.payload.hotels })
    case FETCH_HOTEL:
      return Object.assign({}, state, { selected: action.payload.hotel })
    case FETCH_HOTEL_REVIEWS:
      return Object.assign({}, state, { selectedHotelReviews: action.payload.reviews })
    case CREATE_HOTEL:
    case CREATE_HOTEL_REVIEW:
    default:
      return state
  }
}

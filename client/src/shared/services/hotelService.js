import { BASE_URL } from '../api'
import requester from '../requester'

const resourceUrl = `${BASE_URL}/hotels`

function getHotels (page = 1) {
  const serviceUrl = `${resourceUrl}/all?page=${page}`
  return requester.get(serviceUrl)
}

function getHotel (id) {
  const serviceUrl = `${resourceUrl}/details/${id}`
  return requester.get(serviceUrl, true)
}

function createHotel (hotel) {
  const serviceUrl = `${resourceUrl}/create`
  return requester.post(serviceUrl, hotel, true)
}

function addReview (hotelId, review) {
  const serviceUrl = `${resourceUrl}/details/${hotelId}/reviews/create`
  return requester.post(serviceUrl, review, true)
}

function getReviews (hotelId) {
  const serviceUrl = `${resourceUrl}/details/${hotelId}/reviews`
  return requester.get(serviceUrl, true)
}

export default {
  getHotels,
  getHotel,
  createHotel,
  addReview,
  getReviews
}

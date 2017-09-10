import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchHotels } from '../../store/hotels'

import HotelsList from '../components/HotelsList'
import Paginator from '../../shared/components/Paginator'

class Hotels extends Component {
  constructor (props) {
    super(props)

    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)

    this.state = {
      page: 1
    }
  }

  componentDidMount () {
    this.props.fetchHotels(this.state.page)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.page !== nextState.page) {
      this.props.fetchHotels(nextState.page)
    }
  }

  previousPage () {
    if (this.state.page > 1) {
      this.setState((prevState, props) => ({
        page: prevState.page - 1
      }))
    }
  }

  nextPage () {
    this.setState((prevState, props) => ({
      page: prevState.page + 1
    }))
  }

  render () {
    return (
      <div>
        <h1>Hotels</h1>
        <HotelsList hotels={this.props.hotels} />
        <Paginator
          page={this.state.page}
          items={this.props.hotels}
          previousPage={this.previousPage}
          nextPage={this.nextPage} />
        <br />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { hotels: state.hotels.all }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchHotels}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Hotels)

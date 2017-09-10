import React, { Component } from 'react'
import { IndexRoute, Router, Route } from 'react-router'

import App from './App'

// Guards
import RequireGuest from './shared/guards/RequireGuest'
import RequireAuth from './shared/guards/RequireAuth'

import Home from './Home'

// Authentication
import Register from './authentication/Register'
import Login from './authentication/Login'

// Hotels
import CreateHotel from './hotels/containers/CreateHotel'
import Hotels from './hotels/containers/Hotels'
import HotelDetails from './hotels/containers/HotelDetails'

import NotFound from './NotFound'

export default class Routes extends Component {
  render () {
    return (
      <Router history={this.props.history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          {/* Authentication */}
          <Route path='/register' component={RequireGuest(Register)} />
          <Route path='/login' component={RequireGuest(Login)} />
          {/* Hotels */}
          <Route path='/hotels' component={Hotels} />
          <Route path='/hotels/create' component={RequireAuth(CreateHotel)} />
          <Route path='/hotels/details/:id' component={RequireAuth(HotelDetails)} />

          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}

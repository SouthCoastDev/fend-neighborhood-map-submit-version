import React, { Component } from "react"
import "./App.css"
import Header from "./Header"
import SideBar from "./SideBar"
import Footer from "./Footer"
import Map from "./Map"

function gm_authFailure() {
  alert("Google Map authorization error. Please check your connection or API key.")
}

class App extends Component {

  state = {
    //app defaults
    initialMapLatLng: {lat:40.5748434, lng:-73.9804504},
    mapCenter: {lat:40.5748434, lng:-73.9804504},
    query : 'food',
    filteredVenues: [],
    venues: [],
    selectedVenue: null,
    zoom: 14,
    googleAPIKey: "AIzaSyB-9uIpr6zMqh5ivdYUzll0aiPrejC31D0",
    mapLoaded : false
  }

  //should the map location change then up date the map state.
  // mapLocationChanged = (newLat,newLng) => {

  //   this.setState({
  //     mapCenter : {lat:newLat , lng:newLng}
  //   })

  //fetch(`https://api.foursquare.com/v2/venues/explore?ll=${this.state.mapCenter.lat},${this.state.mapCenter.lng}&query=${this.state.query}&v=20180728&limit=20&intent=browse&radius=700&client_id=HL2DKKQVAF2R03TLS5GNWB4WXDTV1FGEZHNRNIN4VTD1V44S&client_secret=GA2DERTJQTIC1ZBE3G3I2UPNRE4I00OS0DR2GYJPE14IGCSJ&X-RateLimit-Remaining`)





    setVenue = (selectedVenue) => {
      this.setState({
        selectedVenue : selectedVenue
       })
    }

    updateFilteredVenues = (filteredVenues) => {
      this.setState({
        filteredVenues : filteredVenues
      })
    }

    clearSelectedVenue = () => {
      this.setState({
         selectedVenue : null
      })
    }

  componentDidMount() {

    gm_authFailure = () => {
          alert("google maps didn't load!")
    }


    this.setState({
      mapLoaded : true
    })

    //venue infomation is from the Foursquare venue api
      console.log("component did mount ran... for App.js")
      const FoursquareAPI = `https://api.foursquare.com/v2/venues/search?ll=${this.state.mapCenter.lat},${this.state.mapCenter.lng}&v=20180728&limit=20&intent=browse&radius=700&client_id=HL2DKKQVAF2R03TLS5GNWB4WXDTV1FGEZHNRNIN4VTD1V44S&client_secret=GA2DERTJQTIC1ZBE3G3I2UPNRE4I00OS0DR2GYJPE14IGCSJ&X-RateLimit-Remaining`

      fetch(FoursquareAPI)
      .then(res => res.json())
      .catch((error) => {
        console.log("Error with the FourSquare API - Please check you connection or you Foursquare key. Error given: " +  error)
        alert("Error with the FourSquare API - Please check you connection or you Foursquare key.")
      })
      .then(data => {
        this.setState({
          venues: data.response.venues
        })
      }).catch((error) => {
        console.log("Error with the FourSquare API - Please check you connection or you Foursquare key. Error given: " +  error)
        alert("Error with the FourSquare API - Please check you connection or you Foursquare key.")
      })
    }

  render() {

    return (
      <div className="App main" role="main" >

      <Header/>

      <div className="sidebar" tabIndex="0" aria-label="sidebar">
          {!!this.state.venues.length ? (
            <SideBar
              onClick = { this.setVenue }
              onChange = { this.updateFilteredVenues }
              venues = { this.state.venues }
            />
          ) : (<div><p>No Venues found! Either you are not connected to the internet or the Foursquare API is broken!</p></div>)
          }
        </div>
        {this.state.mapLoaded ? (
          <div className="map-container" aria-label="application" role="application" tabIndex="4">
          {/* map infomation is from Google maps and the npm package react-google-maps */}
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.state.googleAPIKey}&v=3`}
              loadingElement = { <div style={{ height: `100%` }} /> }
              containerElement = { <div style={{ height: `100%` }} /> }
              mapElement = { <div style={{ height: `100%` }} /> }
              center = { this.state.mapCenter }
              zoom = {this.state.zoom}
              markers = { this.state.filteredVenues }
              selectedMarker ={ this.state.selectedVenue }
              openWindow = { this.setVenue }
              closeWindow = { this.clearSelectedVenue }
            />
          </div>)
          : (<div>ERROR the map didn't load </div>)}
        <Footer/>

      </div>

    );
  }
}

export default App

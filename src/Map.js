import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
import CustomMarker from "./CustomMarker"


class Map extends Component {


    //when this works moving the map will populate new venues.
    //not required for rubic but is a work in progress! :)

    mapLocation = (map) =>{
		// var mapNewCenter = map.props.mapCenter
		// console.log(` map locaton : ${mapNewCenter}`)
		// let newMapCenterLat = mapNewCenter.lat
		// let newMapCenterLng = mapNewCenter.lng
		// this.props.mapLocationChanged(newMapCenterLat,newMapCenterLng)
		// console.log(`newLat: ${newMapCenterLat} and newLng ${newMapCenterLng}`)
    }


    render() {
        return (
            //note turney for map! checks if is null and returns error message if nothing is found.
            GoogleMap ? (
            <GoogleMap
                defaultZoom = { this.props.zoom }
                defaultCenter = { this.props.center }
                onDragEnd ={ (e) => { this.mapLocation(this)} }
                options = {{
                     streetViewControl: false,
                     mapTypeControl: true
                }}
            >

                {
                this.props.markers.map((venue, index) => (
                    <CustomMarker
                    //venue info
                        key = { index }
                        id = { venue.id }
                        address = { venue.address}
                        position = { venue.location }
                        title = { venue.name }
                    //marker info
                        animation = { !!this.props.selectedMarker && venue.id === this.props.selectedMarker.id ? 1 : 2 }
                        isOpen = { !!this.props.selectedMarker && venue.id === this.props.selectedMarker.id }
                        openwindow = { () => this.props.openWindow(venue) }
                        closewindow = { this.props.closeWindow }
                    >
                    </CustomMarker>
                ))
                }


        {this.props.markers.map((venue, index) => (
                    console.log(venue.id)
                    ))
        }
            </GoogleMap>
            ) : (
                <div><h3>Google Maps hasn't loaded! Have a word with Google please...!</h3></div>
            )
        )
    }
}

export default withScriptjs(withGoogleMap((Map)))
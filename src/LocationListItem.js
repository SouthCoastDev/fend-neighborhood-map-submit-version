import React , { Component } from "react"

class LocationListItem extends Component {


    venueClicked = () => {
        this.props.onClick(this.props.venue)
    }

    render (){

        return (
            <li
                tabIndex= { 0 }
                onClick = { this.venueClicked }
                onKeyPress = { this.venueClicked }
                className = "list-item"
                key=  { this.props.venue.id }
                role = "listitem"
            >
                {this.props.venue.name}
            </li>
        )
    }


}

export default LocationListItem
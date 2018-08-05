import React , { Component } from "react"

class LocationListItem extends Component {


    venueClicked = () => {
        this.props.onClick(this.props.venue)
    }

    render (){

        return (
            <li
                onClick={this.venueClicked}
                onKeyPress={this.venueClicked}
                className='list-item'
                key=  { this.props.venue.id }
                tabIndex={2}
                role = 'location list button'
            >
                {this.props.venue.name}
            </li>
        )
    }


}

export default LocationListItem
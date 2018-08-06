import React, { Component } from "react"
import LocationListItem from "./LocationListItem"

class SearchFilter extends Component {

    state = {
        filterBy: '',
    }

    componentDidMount() {
        this.props.onChange(this.props.venues);
    }

    filter = (e) => {
        this.setState({ filterBy: e.target.value });
        this.props.onChange(this.filterVenues(this.props.venues, e.target.value));
    }

    filterVenues = (venues, filterBy) => venues.filter(venue => venue.name.toLowerCase().includes(filterBy.toLowerCase()))

    render() {

        const list = this.filterVenues(this.props.venues, this.state.filterBy).map(venue => {
            return (
                <LocationListItem
                          key ={ venue.id}
                          venue = { venue }
                          onClick = { this.props.onClick }
                          onKeyPress = { this.props.onClick }
                />
            )
        })

        return  (
            <div className = "search" tabIndex={0}>
                <input
                    className='search-input'
                    placeholder = "Find a venue"
                    type = "text"
                    onChange = { this.filter }
                    value = { this.state.filterBy }
                    aria-label = "search"
                    autoFocus = { true }
                />

                <ul tabIndex={0} className ='venue-list'>
                    {list}
                </ul>
            </div>
        )
    }
}

export default SearchFilter
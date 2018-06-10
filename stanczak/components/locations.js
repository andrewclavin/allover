import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {browseLocations, deleteArtist} from '../store/thunks'
import {clearSelection} from '../store/actions'
import Artist from './artist'
import NewLocation from './newLocation'

class Locations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newView: false,
        }
    }

    componentDidMount() {
        this.props.browseLocations()
        this.props.clearSelection()
    }

    toggleView = () => {
        console.log("here", this)
        this.setState({
            newView: !this.state.newView
        })
    }

    render() {
        const locations = this.props.locations
        return (
            <div className="locationsWrapper">
                <div className="itemWrapper">
                    {locations && locations.map(loc => (
                        <Link to={`/locations/${loc.id}`}>
                        <div className="item" key={loc.id}>
                            {loc.title ? (<h2>{loc.title}</h2>) : (
                                <div>
                                    <div>Latitude: <span>{loc.latitude}</span></div>
                                    <div>Longitude: <span>{loc.longitude}</span></div>
                                </div>
                            )}
                        </div>
                        </Link>
                    ))}
                    {(locations.length < 1) && (<div>NO LOCATIONS FOUND</div>)}
                </div>
                {this.state.newView && (
                    <NewLocation cancel={this.toggleView}/>
                )}
                <button className="headerButton" onClick={this.toggleView}>Add New Location</button>
            </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        browseLocations: () => dispatch(browseLocations()),
        deleteArtist: (id) => dispatch(deleteArtist(id)),
        clearSelection: () => dispatch(clearSelection())
    }
}
const mapProps = state => {
    return {
        locations: state.locations
    }
}

export default connect(mapProps, mapDispatch)(Locations)
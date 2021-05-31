import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";

//note: code formatted for ES6 here
export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const containerStyle = {
      width: "100%",
      height: "700px"
    };
    return (
      <Map
        containerStyle={containerStyle}
        google={this.props.google}
        onClick={this.onMapClicked}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDrjS8xAiK04pBrJgGRkxjUKoBUQ-ELiyE",
})(MapContainer);

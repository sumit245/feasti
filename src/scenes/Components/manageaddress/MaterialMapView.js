import React, { useState, useEffect } from "react";
import { View, } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BackButton from "../utility/BackButton";
import { useDispatch } from "react-redux";
import { checkLocationPermission } from "../../../services/actions/addressactions";
import styles from "../../styles/AuthStyle"

export default function MaterialMapView(props) {
  const [location, setLocation] = useState(null)
  const dispatch = useDispatch()
  const getAddress = async () => {
    const location = await dispatch(checkLocationPermission())
    setLocation(location)
  }
  useEffect(() => {
    getAddress()
  }, [])


  return (
    location !== null ?
      <View style={styles.materialMapView}>
        <MapView
          style={{ flex: 1 }}
          onRegionChange={(region) => setLocation(region)}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
          }} >
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            draggable
            onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
          />
        </MapView>
        <View style={styles.mapBackPosition}>
          <BackButton />
        </View>
      </View> : <View />
  );
}


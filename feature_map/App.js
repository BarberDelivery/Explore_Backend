import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {  StyleSheet, Text, View } from "react-native";
import { Button } from 'react-native-paper';
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import * as Location from 'expo-location';


export default function App() {
  const [location, setLocation] = useState(
    {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0822,
      longitudeDelta: 0.0121,
    }
  );
  const [errorMsg, setErrorMsg] = useState(null);

  const [mapRegion, setmapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation({
        ...location,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setmapRegion({
        ...mapRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => {
        setmapRegion({
          ...location
        })
      }}>
          GPS
      </Button>

      <Button mode="contained" onPress={() => console.log(mapRegion)}>
          PRESS
      </Button>
      
      <MapView style={{ height: "50%", width: "100%" }} 
      region={mapRegion}
      showsUserLocation={true}
      >
        <Marker 
        coordinate={mapRegion}
        draggable={true}
        onDragStart={(e) => {
          console.log('drag start', e.nativeEvent.coordinate);
        }}

        onDragEnd={(e) => {
          setmapRegion({
            ...mapRegion,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Circle
          center={mapRegion}
          radius={1000}
        />
      
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Alert } from "react-native";
import { useCallback, useState, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";

export default function Map({ navigation }) {
  const [loc, setLoc] = useState(null);

  const region = {
    latitude: 37.79,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function handleMapPress(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setLoc({ lat, lng });
  }

  const saveLocation = useCallback(() => {
    if (!loc) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location by tapping on the map first!"
      );
      return;
    }

    navigation.navigate("AddPlace", loc);
  }, [loc, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={20}
          color={tintColor}
          onPress={saveLocation}
        />
      ),
    });
  }, [navigation, saveLocation]);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={region}
        style={styles.map}
        onPress={handleMapPress}
      >
        {Boolean(loc) && (
          <Marker
            title="Picked location"
            coordinate={{
              latitude: loc.lat,
              longitude: loc.lng,
            }}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

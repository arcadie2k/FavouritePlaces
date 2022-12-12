import { useEffect, useState } from "react";
import { Button, StyleSheet, View, Alert, Image, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { GOOGLE_API_KEY } from "@env";

export default function LocationPicker({ onPickLocation }) {
  const [loc, setLoc] = useState(null);
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();

  const mapPickedLocation = route.params ?? null;

  function getMapPreview({ lat, lng }) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
  }

  async function verifyPermission() {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const res = await requestPermission();
      return res.granted;
    }

    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insifficient Permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "OK", onPress: requestPermission }]
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    const pos = await getCurrentPositionAsync();

    const obj = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };

    setLoc(obj);
    onPickLocation(obj);
  }

  function pickLocationHandler() {
    navigation.navigate("MapScreen");
  }

  useEffect(() => {
    if (mapPickedLocation) {
      setLoc(mapPickedLocation);
      onPickLocation(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  let imagePreview = <Text>No location yet!</Text>;
  if (loc) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: getMapPreview(loc) }} />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{imagePreview}</View>
      <View style={styles.actions}>
        <Button title="Use current location" onPress={getLocationHandler} />
        <Button title="Choose location" onPress={pickLocationHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

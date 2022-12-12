import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  Button,
} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Place from "../../models/place";
import { GOOGLE_API_KEY } from "@env";

export default function PlaceForm({ onCreatePlace }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  async function getAddress(lat, lng) {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch address!");
    }

    const data = await res.json();
    const address = data.results[0].formatted_address;

    return address;
  }

  function onTakeImage(image) {
    setImage(image);
  }

  function onPickLocation(location) {
    setLocation(location);
  }

  async function savePlaceHandler() {
    const address = await getAddress(location.lat, location.lng);

    const place = new Place(title, image, {
      location,
      address,
    });

    onCreatePlace(place);
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(title) => setTitle(title)}
          value={title}
        />
        <ImagePicker onTakeImage={onTakeImage} />
        <LocationPicker onPickLocation={onPickLocation} />

        <View
          style={{
            paddingTop: 32,
          }}
        ></View>

        <Button title="Submit place" onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: { fontWeight: "bold", marginBottom: 4, color: Colors.primary500 },
  input: {
    marginVertical: 6,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

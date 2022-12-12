import { StyleSheet, FlatList, View, Text } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

export default function PlacesList({ places = [] }) {
  if (!places || places.length === 0)
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          There are no places yet! Start by adding one.
        </Text>
      </View>
    );

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  list: {
    margin: 24,
  },
});

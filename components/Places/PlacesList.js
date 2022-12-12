import { FlatList, View, Text } from "react-native";

export default function PlacesList({ places = [] }) {
  if (!places || places.length === 0)
    return (
      <View>
        <Text>There are no places yet! Start by adding one.</Text>
      </View>
    );

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlacesItem place={item} />}
    />
  );
}

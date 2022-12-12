import PlacesList from "../components/Places/PlacesList";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function AllPlaces({ route }) {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setPlaces((places) => [...places, route.params]);
    }
  }, [isFocused]);

  console.log(places);

  return <PlacesList places={places} />;
}

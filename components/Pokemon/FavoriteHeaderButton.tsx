import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function FavoriteHeaderButton({ isFavorite, onPress }: {
  isFavorite: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 20 }}>
      <Icon
        name={isFavorite ? "heart" : "heart-broken"}
        color="white"
        size={20}
        solid
      />
    </TouchableOpacity>
  );
}

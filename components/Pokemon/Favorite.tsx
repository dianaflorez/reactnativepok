// components/Pokemon/Favorite.tsx
import React, { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default function Favorite({ id }: { id: number }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    console.log(`Toggle favorito para el Pokémon ${id}`);
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¿Favorito? {isFavorite ? "Sí ❤️" : "No 💔"}</Text>
      <Button
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        onPress={toggleFavorite}
        color={isFavorite ? "#c62828" : "#1565c0"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
  },
});

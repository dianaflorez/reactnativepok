import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function TestFavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    console.log("Botón favorito presionado");
    setIsFavorite((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>¿Es favorito? {isFavorite ? "Sí ❤️" : "No 💔"}</Text> */}

      <View style={styles.buttonWrapper}>
        <Button
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos..."}
          onPress={toggleFavorite}
          color={isFavorite ? "#d32f2f" : "#1976d2"} // rojo o azul
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonWrapper: {
    width: 200,
  },
});

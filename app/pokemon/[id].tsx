import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getPokemonDetailsApi } from "@/api/pokemon";
import Header from "@/components/Pokemon/Header";
import Types from "@/components/Pokemon/Types";
import Stats from "@/components/Pokemon/Stats";
import { useNavigation } from "@react-navigation/native";

interface PokemonType {
  id: number;
  name: string;
  order: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export default function PokemonDesc() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchPokemon = async () => {
      try {
        const response = await getPokemonDetailsApi(Number(id));
        setPokemon(response);
      } catch (error) {
        console.error("Error al obtener los datos del Pokémon:", error);
        router.back();
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [id]);

  // 👇 Esto asegura que el botón se monte correctamente en Android
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "",
  //     headerStyle: { backgroundColor: "green" },
  //     headerTintColor: "white",
  //     headerLeft: () => (
  //       <Button title="Volver" color="white" onPress={() => router.back()} />
  //     ),
  //     headerRight: () => (
  //       <Button
  //         title={isFavorite ? "Quitar" : "Favorito"}
  //         onPress={() => {
  //           console.log("Presionado favorito");
  //           setIsFavorite((prev) => !prev);
  //         }}
  //         color={isFavorite ? "orange" : "white"}
  //       />
  //     ),
  //   });
  // }, [navigation, isFavorite]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.center}>
        <Text>No se encontró el Pokémon.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Types types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { getPokemonDetailsApi } from "@/api/pokemon";
import Header from "@/components/Pokemon/Header";
import Types from "@/components/Pokemon/Types";
import Stats from "@/components/Pokemon/Stats";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome5";

interface PokemonType {
    id: number;
    name: string;
    order: number;
    sprites: {
        other: {
            "official-artwork": {        
                front_default: string;
            }
        }
    };
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
}

export default function PokemonDesc() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

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


  if (loading) {
    return (

      <View style={styles.center}>
        <Text>Cargando...</Text>
        <Text>Por favor, espera un momento.</Text>
        <Text>Estamos obteniendo la información del Pokémon.</Text>
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
    <>
    <Stack.Screen
            options={{
            title: '',
            headerStyle: { backgroundColor: 'tomato' },
            headerTintColor: 'white',
            headerLeft: () => (
                <Icon
                name="arrow-left"
                size={24}
                color="white"
                style={{ marginLeft: 15 }}
                onPress={() => {console.log('volver'); router.back()}}
                />
            ),
            }}
        />
    <ScrollView>
        
        <Header
            name={pokemon?.name}
            order={pokemon?.order}
            image={pokemon?.sprites.other["official-artwork"].front_default}
            type={pokemon?.types[0].type.name}
        />
        <Types types={pokemon?.types} />
        <Stats stats={pokemon?.stats} />
    </ScrollView>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    color: "#333",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#333",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
});

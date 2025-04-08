import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import getColorByPokemonType from "@/utils/getColorByPokemonType";
import { capitalize } from "lodash";
import { useRouter } from 'expo-router';

export default function PokemonCard(props:any) {
  const { pokemon } = props;
  const router = useRouter();

  const goToPokemon = () => {
    console.log(`Vamos al pokemon: ${pokemon.id}`);
    console.log(pokemon);
   // router.push({ pathname: "/PokemonDesc", params: { id: pokemon.id } });
    router.push(`/pokemon/${pokemon.id}`);

  };

  const pokemonColor = getColorByPokemonType(pokemon.type);
  const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={bgStyles}>
            <Text style={styles.number}>
              #{`${pokemon.order}`.padStart(3, 0)}
            </Text>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <Image source={{ uri: pokemon.image }} style={styles.image} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
    padding: 10,
    textTransform: "capitalize",
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    
    borderRadius: 3,
  },
  number: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#fff",
    fontSize: 11,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 7,
    paddingLeft: 5,
    paddingBottom: 5,
  },
  image: {
    position: "absolute",
    bottom: 17,
    right: 2,
    width: 90,
    height: 90,
  },
});
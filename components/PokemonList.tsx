import { StyleSheet, FlatList, ActivityIndicator, Platform } from "react-native";
import PokemonCard from "./PokemonCard";

export default function PokemonList(props: any) {
  const { pokemons, loadPokemons, isNext } = props;
  
  const loadMore = () => {
    loadPokemons();
  };
  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.FlatListContentContainer}
      onEndReached={isNext && loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isNext && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="#AEAEAE"
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  FlatListContentContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  pokemonCard: {
    backgroundColor: "#EEE",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    width: "40%",
    color: "#300",
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60
  },
});

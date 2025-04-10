import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getPokemonsApi, getPokemonDetailsByUrlApi } from "@/api/pokemon";
import PokemonList from "@/components/PokemonList";
import { SafeAreaView, Text } from "react-native";
import TestFavorite from "@/components/Pokemon/TestFavorite";

export default function TabTwoScreen() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState(null);

  // useEffect(() => {
  //   loadPokemons();
  // }, []);

  // // useEffect(() => {
  // //   (async () => {
  // //     await loadPokemons();
  // //   })();
  // // }, [loadPokemons]);

  // const loadPokemons = async () => {
  //   try {
  //     const response = await getPokemonsApi(nextUrl);
  //     setNextUrl(response.next);

  //     // Verificamos que la respuesta tenga datos válidos
  //     if (!response || !response.results) {
  //       console.error("Error: La API no devolvió resultados.");
  //       return;
  //     }
      
  //     let ct = 0;
  //     const pokemonsArray:any = [];
  //     const pokemonsDetails = await Promise.all(

  //       response.results.map(async (pokemon:any) => {
  //         console.log('------',pokemon.url);
          
  //         const pokemonDetail = await getPokemonDetailsByUrlApi(pokemon.url);
  
  //         // Verificamos si `pokemonDetail` es válido
  //         if (!pokemonDetail) {
  //           console.warn(`Advertencia: No se encontraron detalles para ${pokemon.name}`);
  //           return null;
  //         }

  //         console.log('------Det',pokemonDetail.id);
  //         ct++;
  //         pokemonsArray.push({ 
  //           id: pokemonDetail.id ?? "Sin ID",
  //           name: pokemonDetail.name ?? "Sin Nombre",
  //           type: pokemonDetail.types?.[0]?.type?.name ?? "Desconocido",
  //           order: pokemonDetail.order ?? "N/A",
  //           image:
  //             pokemonDetail.sprites?.other?.["official-artwork"]?.front_default ??
  //             "https://via.placeholder.com/150",
  //         });
  //         // setPokemons([...pokemons, pokemonsArray]);
  //         setPokemons([...pokemonsArray]); // Aquí corregimos la estructura

  //       })
  //     );
  
  //     // Filtramos los valores nulos para evitar errores
  //     //setPokemons(pokemonsDetails.filter((p) => p !== null));

  //   } catch (error) {
  //     console.error("Error al cargar los Pokémon:", error);
  //   }
  //   console.log('------poke---11--',pokemons);

  // };


  // 22222
  // useEffect(() => {
  //   (async () => {
  //     await loadPokemons();
  //   })();
  // }, []);

  // const loadPokemons = async () => {
  //   try {
  //     const response = await getPokemonsApi();

  //     const pokemonsArray = [];
  //     for await (const pokemon of response.results) {
  //       const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);

  //       pokemonsArray.push({
  //         id: pokemonDetails.id,
  //         name: pokemonDetails.name,
  //         type: pokemonDetails.types[0].type.name,
  //         order: pokemonDetails.order,
  //         image: pokemonDetails.sprites.other["official-artwork"].front_default,
  //       });
  //     }

  //     setPokemons([...pokemons, ...pokemonsArray]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // 333333
  
  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nextUrl);
      setNextUrl(response.next);

      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }

      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <SafeAreaView>
      <Text>Pokemons List...</Text>
      <Text>Pokemons List...</Text>
      <Text>Pokemons List...</Text>
      <TestFavorite />
      <PokemonList pokemons={pokemons} loadPokemons={loadPokemons} isNext={nextUrl} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

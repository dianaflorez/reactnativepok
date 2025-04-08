import { POKEMON_TYPE_COLORS } from "@/utils/constantes";

const getColorByPokemonType = (type) => POKEMON_TYPE_COLORS[type.toLowerCase()];

export default getColorByPokemonType;
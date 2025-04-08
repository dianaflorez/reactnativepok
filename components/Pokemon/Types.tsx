import { View, Text, StyleSheet } from 'react-native';
import getColorByPokemonType from "@/utils/getColorByPokemonType";
import { map, capitalize } from "lodash";


export default function Types(props: any) {
    const { types } = props;

    
    return (
        <View style={styles.container}>
           <Text >Types.....</Text>
           {map(types, (item: any, index: number) => (
                <View
                    key={index}
                    style={{
                    ...styles.pill,
                    backgroundColor: getColorByPokemonType(item.type.name),
                    }}
                >
                    <Text>{capitalize(item.type.name)}</Text>
                </View>
           ))}
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 70,
        marginTop: -30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        color: "#700",
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",

        marginBottom: 10,
        color: "#333",
    },
    pill: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        textTransform: "capitalize",
        fontSize: 16,
        color: "#333",
    }
})
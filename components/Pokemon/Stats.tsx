import { View, Text, StyleSheet } from 'react-native';
import getColorByPokemonType from "@/utils/getColorByPokemonType";
import { map, capitalize } from "lodash";


export default function Stats(props: any) {
    const { stats } = props;

    const barStyles = (number: number) => {
        const color = number > 50 ? "#00ac17" : "#ff3e3e";
        return {
            backgroundColor: color,
            width: `${number}%`,
        }        
    }

    return (
        <View style={styles.container}>
           <Text style={styles.title}>Base Stats</Text>
           {map(stats, (item: any, index: number) => (
                <View key={index} style={styles.block}>
                    <View key={index} style={styles.blockTitle}>
                        <Text style={styles.stateName}>{capitalize(item.stat.name)}</Text>
                    </View>
                    <View style={styles.blockInfo}>
                        <Text style={styles.number}>{item.base_stat}</Text>
                        <View style={styles.bgBar}>
                            <View style={[styles.bar, barStyles(item.base_stat)]}>
                            </View>
                        </View>
                    </View>
                </View>
           ))}
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 0,
        marginBottom: 50,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    block: {
        flexDirection: "row",
        paddingVertical: 10,
    },
    blockTitle: {
        width: "30%",
    },
    stateName: {
        fontSize: 12,
        color: "#333",
        textTransform: "capitalize",
        fontWeight: "bold"
    },
    blockInfo: {
        width: "70%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    number: {
        fontSize: 12,
        color: "#333",
        textTransform: "capitalize",
        fontWeight: "bold"
    },
    bgBar: {
        backgroundColor: "#dedede",
        width: "88%",
        height: 5,
        borderRadius: 20,
        overflow: "hidden",
    },
    bar: {
        height: 5,
        borderRadius: 20,
    }
})

import { StyleSheet, Dimensions, StatusBar } from "react-native";
export const { width, height } = Dimensions.get('window')
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    cuisine: {
        justifyContent: "flex-start",
        width: 70,
    },
    cuisine_name: {
        fontSize: 14,
        textAlign: "center",
        color: "#000",
    },
    firstCuisine: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 12,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    cuisineContent: {
        width: 48,
        height: 48,
        alignSelf: "center",

    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 48,
        marginHorizontal: 6,
        marginBottom: 6,
        paddingBottom: 8,
    },
    headerWithSearch: {
        flexDirection: "row",
        justifyContent: "flex-start",
        height: 32,
        marginHorizontal: 6,
        marginBottom: 6,
    },
    mainStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cfcfcf",
    },
    containerStyle: { backgroundColor: "white", padding: 20 },
    sortView: {
        flex: 1,
        position: "absolute",
        top: 60,
        width: 240,
        left: 4,
    },
    buttonClose: {
        height: 30,
        width: 30,
        backgroundColor: "#fff",
        borderRadius: 15,
        position: "absolute",
        right: -5,
        top: -5,
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        backgroundColor: "white",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        padding: 4,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,

    },
    modalText: {
        padding: 2,
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    item: {
        borderRadius: 5,
        backgroundColor: "#fff",
        padding: 4,
        margin: 2,
        marginVertical: 8
    },
    image: {
        width: "99%",
        height: 150,
        margin: "0.5%",
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        flexWrap: "wrap"
    },
    price: {
        borderRightWidth: 0.6,
        width: "25%",
        borderRightColor: "#ddd",
        paddingHorizontal: 6,
        marginVertical: 4,
    },
})
import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
export const { width, height } = Dimensions.get('window')
export const avatarSize = 0.3 * width;
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
        alignItems: "center",
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
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 6,
        color: "#444",
    },
    selectorSwitch: {
        transform: Platform.OS === "ios" ? [{ scaleX: .7 }, { scaleY: .7 }] : [{ scaleX: 1 }, { scaleY: 1 }]
    },
    headerImage: {
        width: width,
        height: 0.5 * width,
    },
    avatarImage: {
        width: 0.3 * width,
        height: 0.3 * width,
        borderRadius: 0.15 * width,
        borderWidth: 2,
        borderColor: "#fcfcfc",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: -0.14 * width,
    },
    chefName: {
        color: "#444",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    about: {
        margin: 5,
        borderRadius: 5,
        backgroundColor: "white",
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "black",
        shadowOpacity: 0.2,
        elevation: 2,
        padding: 5,
    },
    ratingAndReviews: {
        alignItems: "center",
        marginVertical: 8,
        justifyContent: "center",
        flexDirection: "row",
    },
    menuItem: {
        borderRadius: 5,
        backgroundColor: "#fff",
        elevation: 2,
        padding: 1,
        margin: 2,
    },
    menuImage: {
        width: "100%",
        height: 180,
        marginHorizontal: 1,
        resizeMode: "cover",
    },
    menuTitle: {
        paddingHorizontal: 2,
        marginLeft: -26,
        fontSize: 16,
        fontWeight: "bold",
    },
    optioncard: {
        height: 150,
        width: 200,
        margin: 4,
        borderRadius: 4,
        elevation: 2,
        padding: 2,
    },
    cardcontent: {
        fontSize: 14,
        textAlign: "left",
    },
    planCard: {
        paddingVertical: 8,
        borderRadius: 5,
        elevation: 2,
        margin: 4,
    },
    planBody: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 8,
    },
    selectoffer: {
        backgroundColor: "#2e7d32",
        height: 30,
        paddingHorizontal: 10,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
})
import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
export const { width, height } = Dimensions.get('window')
export const avatarSize = 0.3 * width;
export const ITEM_SIZE = width
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
    bookmark: {
        right: 10,
        top: 4,
        position: "absolute",
        height: 36,
        width: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    chefNameAndReview: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 2,
        margin: 2,
        marginVertical: 4,
        marginBottom: 8,
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
        borderRightColor: "#ddd",
        paddingHorizontal: 6,
        marginVertical: 4,
    },
    pricing: {
        flexDirection: "row",
        marginBottom: 4,
        width: "100%",
        justifyContent: 'space-between'
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
    ratingText: {
        marginHorizontal: 2,
        color: "#ff6600",
        fontWeight: "bold",
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
    restaurantHeader: {
        marginTop: -60,
        marginBottom: 8,
        justifyContent: "center",
        alignSelf: "center",
        elevation: 2,
        borderRadius: 6,
        backgroundColor: "#fff",
        width: width - 2,
        padding: 6,
    },
    restaurantTitle: {
        flexDirection: "row",
        borderBottomColor: "#777",
        borderBottomWidth: 0.3,
        paddingBottom: 2,
    },
    subheader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: -4,
    },
    optionCard: {
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 2,
        elevation: 2,
        borderRadius: 4,
    },
    billingTable: {
        backgroundColor: "#fff",
        padding: 10,
        marginTop: 8,
        marginBottom: 2,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    optionrow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },
    radioRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginVertical: 2,
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.2,
    },
    deliveryNotes: {
        paddingHorizontal: 10,
        marginVertical: 20,
        borderColor: "#ddd",
        borderWidth: 0.5,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    optionsLabels: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    radioLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    button: {
        marginHorizontal: 1,
        padding: 6,
        height: 45,
        backgroundColor: "#008000",
        alignItems: "center",
        justifyContent: "center",
    },
    totalCount: {
        marginHorizontal: 1,
        padding: 6,
        height: 45,
        backgroundColor: "#fff",
        width: width / 2,
    },
    btnText: {
        textAlign: "center",
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "bold",
        marginLeft: 26,
        textTransform: "uppercase",
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 2,
    },
    mealText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    calenderView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(30,30,30,0.5)",
    },
    calendarBody: {
        backgroundColor: "white",
        borderRadius: 4,
    },
    buttonClose: {
        borderRadius: 10,
        elevation: 2,
        height: 20,
        width: 20,
        position: "absolute",
        top: -10,
        right: -10,
        backgroundColor: "#fff",
    },
    tipBox: {
        borderWidth: 0.5,
        borderColor: "#777",
        padding: 8,
        marginHorizontal: 10,
        borderRadius: 4,
        margin: 6,
        paddingHorizontal: 14,
    },
    tipText: {
        marginLeft: 30,
        color: "#777",
    },
    billRow: {
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 2,
    },
    billText: {
        fontSize: 16,
        color: "#8c8c8c",
    },
    billTitle: {
        textDecorationLine: "underline",
        marginVertical: 2,
        padding: 2,
        fontSize: 16,
        fontWeight: "bold",
        color: "#777",
    },
    billLink: {
        textTransform: "uppercase",
        color: "#226ccf",
        fontSize: 12,
        fontWeight: "bold",
    },
    actionButton: {
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    imageFood: {
        width: width / 3,
        height: width / 3,
        resizeMode: "center"
    },
    buttonEllipse: {
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#ff6600',
        backgroundColor: "#ff5600",
        padding: 10,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderStatus: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "right",
        color: "#ffc300"
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    headersubtitle: {
        fontSize: 14,
        color: "#777",
        textTransform: "capitalize"
    },
    tab: {
        padding: 4,
        borderRightWidth: 1,
        borderRightColor: "#ddd",
        width: width / 3,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 4,
        backgroundColor: "#FFF",
        borderTopColor: "#ddd",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    indicator: {
        marginVertical: 4,
        width: 15,
        borderTopColor: "#ff6600",
        borderTopWidth: 4,
        height: 12,
        marginHorizontal: 2,
    },
    navdrawer: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        width: width,
        backgroundColor: '#fff',
    },
    accountHeader: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        height: 100,
        padding: 10,
    },
    drawerRow: {
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        borderBottomStartRadius: 120,
        borderBottomEndRadius: 40,
        width: width,
        marginLeft: 2,
        flexDirection: 'row',
        padding: 14,
        marginVertical: 1,
    },
    drawerText: {
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    profileContainer: {
        height: 80,
        width: 80,
        borderRadius: 40,
        borderColor: '#777',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilepic: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    imageNumName: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoutButton: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10,
        left: '45%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '98%',
        width: 0.98 * width,
    },
    noCardmsg: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        paddingVertical: 10,
        textTransform: "capitalize"
    },
    bottomBtnRound: {
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#ff6600",
        position: "absolute",
        bottom: 20,
        marginHorizontal: "25%",
        padding: 10,
        height: 48,
    },
    swipableCard: {
        margin: 4,
        backgroundColor: "#fff",
        borderRadius: 6,
        borderColor: "#979797",
        borderWidth: 0.5,
        elevation: 4,
        padding: 2,
        marginVertical: 6,
    },
    swipableCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 6,
        height: 40,
        borderBottomWidth: 0.2,
        borderBottomColor: "#979797",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 14,
        marginHorizontal: 12,
    },
    content: {
        fontSize: 14,
        color: "#777",
        paddingRight: 4,
    },
    swipableCardBody: {
        marginHorizontal: 12,
        padding: 4,
        alignItems: "baseline",
    },
    swipableCardHeaderText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: 'bold'
    }
})
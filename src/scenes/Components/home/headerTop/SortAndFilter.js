import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Text,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RadioButton, Badge, Checkbox } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
export default class SortAndFilter extends Component {
    state = {
        sortVisible: false,
        value: 0,
        rating: "",
        meal_type: "",
        price: "",
        filter: "type_filter",
        selected: 0,
        filterCount: this.props.filterCount,
        selectedStar: "",
    };

    setsortVisible = (visible) => {
        this.setState({ sortVisible: visible });
    };

    toggleRight = (filter, selected) => {
        this.setState({ filter: filter, selected: selected });
    };

    mealTypeSelector = (value) => {
        this.setState({ meal_type: value });
    };

    filterStar = (star) => {
        this.setState({ selectedStar: star, rating: star });
    };

    clearFilters = () => {
        this.setState({
            filterCount: 0,
            rating: 0,
            meal_type: "",
            price: "",
            selectedStar: 0,
            sortVisible: false,
        });
        this.props.clearfilter();
    };

    applyFilter = () => {
        let fc = 0;
        if (this.state.rating !== "") {
            fc += 1;
        }
        if (this.state.meal_type !== "") {
            fc += 1;
        }
        if (this.state.price !== "") {
            fc += 1;
        }
        this.setState({ filterCount: fc });
        this.setState((prevState) => ({ sortVisible: !prevState.sortVisible }));
        this.props.applyFilter(this.state.meal_type, this.state.filterCount);
    };

    render() {
        const {
            sortVisible,
            filter,
            meal_type,
            price,
            selected,
            filterCount,
            selectedStar,
        } = this.state;
        const stars = ["5", "4", "3", "2", "1"];
        return (
            <>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={sortVisible}
                        onRequestClose={() => {
                            this.setsortVisible(!sortVisible);
                        }}
                    >
                        <View style={styles.filterBody}>
                            <View style={styles.modalView}>
                                <View style={styles.filterHeader}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                        Sort and Filters
                                    </Text>

                                    <Icon
                                        name="close-sharp"
                                        color="#f00"
                                        size={18}
                                        style={styles.buttonClose}
                                        onPress={() => this.setsortVisible(!sortVisible)}
                                    />
                                </View>
                                <View>
                                    <View style={styles.sortSide}>
                                        <Text
                                            style={[
                                                styles.filterText,
                                                { color: selected === 0 ? "#ff6600" : "#444" },
                                            ]}
                                            onPress={() => this.toggleRight("type_filter", 0)}
                                        >
                                            Meal Type
                                        </Text>

                                        <Text
                                            style={[
                                                styles.filterText,
                                                { color: selected === 1 ? "#ff6600" : "#444" },
                                            ]}
                                            onPress={() => this.toggleRight("rating_filter", 1)}
                                        >
                                            Rating
                                        </Text>

                                        <Text
                                            style={[
                                                styles.filterText,
                                                { color: selected === 2 ? "#ff660" : "#444" },
                                            ]}
                                            onPress={() => this.toggleRight("price_filter", 2)}
                                        >
                                            Price
                                        </Text>
                                    </View>
                                    <View style={styles.sortContent}>
                                        {filter === "type_filter" ? (
                                            <RadioButton.Group
                                                onValueChange={(value) => this.mealTypeSelector(value)}
                                                value={meal_type}
                                            >
                                                <RadioButton.Item label="Veg" value="Veg" />
                                                <RadioButton.Item label="Non-Veg" value="Non-Veg" />
                                            </RadioButton.Group>
                                        ) : filter === "rating_filter" ? (
                                            <View
                                                style={{
                                                    marginTop: "20%",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {stars.map((star, index) => (
                                                    <TouchableOpacity
                                                        style={{
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            padding: 4,
                                                            width: 60,
                                                            borderColor: "#ddd",
                                                            borderRadius: 2,
                                                            borderWidth: 0.8,
                                                            marginHorizontal: 4,
                                                            marginVertical: 2,
                                                            justifyContent: "center",
                                                            backgroundColor:
                                                                star === selectedStar ? "orange" : "#fff",
                                                        }}
                                                        onPress={() => this.filterStar(star)}
                                                    >
                                                        <Icon
                                                            name="star"
                                                            size={16}
                                                            color={star === selectedStar ? "#fff" : "#ff6600"}
                                                        />
                                                        <Text
                                                            style={{
                                                                fontSize: 18,
                                                                fontWeight: "bold",
                                                                color: star === selectedStar ? "#fff" : "#666",
                                                            }}
                                                            key={index}
                                                        >
                                                            {" "}
                                                            {star}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        ) : filter === "price_filter" ? (
                                            <RadioButton.Group
                                                onValueChange={(value) =>
                                                    this.setState({ price: value })
                                                }
                                                value={price}
                                            >
                                                <RadioButton.Item label="Any" value="any" />
                                                <RadioButton.Item label="High to Low" value="h2l" />
                                                <RadioButton.Item label="Low to High" value="l2h" />
                                            </RadioButton.Group>
                                        )
                                            : null}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.filterActions}>
                                <TouchableOpacity
                                    style={[styles.filterBtn]}
                                    onPress={this.clearFilters}
                                >
                                    <Text
                                        style={{ fontSize: 16, color: "#000", fontWeight: "bold" }}
                                    >
                                        Clear All
                                    </Text>
                                </TouchableOpacity>
                                <LinearGradient colors={["#ff9900", "#ff6600"]} style={styles.filterBtn}>
                                    <TouchableOpacity
                                        onPress={() => this.applyFilter()}
                                    >
                                        <Text
                                            style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                                        >
                                            Apply
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    </Modal>
                </View>

                <TouchableOpacity
                    onPress={() => this.setsortVisible(true)}
                    style={{ flexDirection: "row" }}
                >
                    <Icon name="ios-options-outline" size={22} />
                    {filterCount > 0 && (
                        <Badge
                            size={16}
                            style={{
                                fontWeight: "bold",
                                left: -8,
                                top: -8,
                                backgroundColor: "#ff6600",
                                color: "#fff",
                            }}
                        >
                            {filterCount}
                        </Badge>
                    )}
                </TouchableOpacity>
            </>
        );
    }
}
const styles = StyleSheet.create({
    filterHeader: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 20,
        padding: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: "#ccc",
    },
    filterBody: {
        flex: 1,
        position: "absolute",
        bottom: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: width - 4,
        height: 400,
        marginHorizontal: 2,
        backgroundColor: "white",
        elevation: 5,
    },
    filterText: {
        padding: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.2,
        fontWeight: "bold",
        color: "#979797",
        textAlign: "justify",
    },
    filterActions: {
        position: "absolute",
        bottom: 18,
        width: width - 8,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    filterBtn: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
        borderColor: "#ccc",
        borderWidth: 0.2,
        borderRadius: 4,
        width: 140,
        justifyContent: "center",
    },
    sortSide: {
        alignSelf: "flex-start",
        width: width / 3,
        borderRightWidth: 0.2,
        borderColor: "#ccc",
        height: 300,
    },
    sortContent: {
        justifyContent: "space-around",
        width: (2 * width) / 3,
        position: "absolute",
        left: width / 3,
    },
});

import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import moment from "moment";
import { styles } from "../../styles/orderStyles";
export default function OrderDetails({ order, title }) {
    const { address_type, city, flat_num, locality, postal_code } = order.address;
    const [taxes, setTaxes] = useState(0);
    const [service_fee, setServiceFee] = useState(0);
    const { card } = order;

    useEffect(() => {
        let tax = order.taxes;
        let sf = order.service_fee;
        let calcSF = parseFloat(order.price) * parseFloat(sf) * 0.01;
        let calcTax =
            (parseFloat(order.price) +
                parseFloat(order.delivery_fee) +
                parseFloat(calcSF) -
                parseFloat(order.discount) +
                parseFloat(order.tip)) *
            parseFloat(order.taxes) *
            0.01;
        setServiceFee(calcSF);
        setTaxes(calcTax);
    }, []);

    const trimmer = (word) => {
        for (let i = 0; i <= word.length - 5; i++) {
            word = word.replace(word[i], "*");
        }
        return word;
    };

    function add(accumulator, a) {
        return parseFloat(accumulator) + parseFloat(a);
    }

    const subtotals =
        Array.isArray(order.add_on) && order.add_on.map(extra =>
            extra
                .map((item) => item.subtotal));
    let price = subtotals.length !== 0 ? subtotals[0].reduce(add, 0) : 0;

    return (
        <ScrollView
            contentContainerStyle={{
                justifyContent: "flex-start",
                flex: 1,
                backgroundColor: "#fff",
                paddingBottom: 20
            }}
            contentInsetAdjustmentBehavior="automatic"
        >
            <View style={styles.formHeader}>
                <View style={styles.row}>
                    <View style={styles.headerRows}>
                        <View>
                            <Text
                                style={{
                                    textTransform: "uppercase",
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    color:
                                        order.status === "accepted"
                                            ? "#5ca85c"
                                            : order.status === "started"
                                                ? "#ffc300"
                                                : "#ff4300",
                                }}
                            >
                                {order.status}
                            </Text>
                            <Text style={styles.normalText}>From: </Text>
                            <Text style={styles.text}>{order.restaurant}</Text>
                            <Text style={styles.text}>{order.restaurant_id}</Text>
                        </View>
                        <View>
                            <Text style={[styles.text, { textAlign: "right" }]}>
                                #{order.order_id}
                            </Text>
                            <Text style={[styles.normalText, { marginVertical: 2 }]}>
                                {order.user_name + "(" + order.user_id + ")"}
                            </Text>
                            <Text style={[styles.normalText, { marginVertical: 2 }]}>
                                {(address_type || "") +
                                    ", " +
                                    (flat_num || "") +
                                    ",\n" +
                                    (city || "") +
                                    (locality || "") +
                                    ", " +
                                    (postal_code || "")}
                            </Text>
                            <Text style={[styles.normalText, { marginVertical: 2 }]}>
                                M: {order.phone}
                            </Text>
                            <Text style={[styles.normalText, { marginVertical: 2 }]}>
                                E: {order.email_id}
                            </Text>
                            <Text style={[styles.normalText, { marginVertical: 2 }]}>
                                {moment(order.order_time).format("DD-MMM-YYYY HH:mm a")}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.row, { marginVertical: 36 }]}>
                    <View style={styles.headerRows}>
                        <Text style={[styles.text, { color: "#000" }]}>plan</Text>
                        <Text style={[styles.text, { color: "#000" }]}>Start Date</Text>
                        <Text style={[styles.text, { color: "#000" }]}>End Date</Text>
                        <Text style={[styles.text, { color: "#000" }]}>Price</Text>
                    </View>
                    <View style={styles.headerRows}>
                        <Text style={styles.normalText}>
                            {order.plan === "twoPlan"
                                ? "2 Days"
                                : order.plan === "fifteenPlan"
                                    ? "15 Days"
                                    : "30 Days"}
                        </Text>
                        <Text style={styles.normalText}>{order.start_date}</Text>
                        <Text style={styles.normalText}>{order.end_date}</Text>
                        <Text style={styles.normalText}>${order.price}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.text}>Paid from: </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                name={
                                    card.brand === "master-card"
                                        ? "mastercard"
                                        : card.brand === "diners-club"
                                            ? "dinners-club"
                                            : card.brand
                                }
                                size={20}
                                color="#226ccf"
                            />
                            <Text style={styles.normalText}>{trimmer(card.number)}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignSelf: "flex-end",
                            marginTop: -16,
                        }}
                    >
                        <View>
                            <Text style={[styles.text, { marginVertical: 1 }]}>
                                Subtotal:{" "}
                            </Text>
                            <Text style={[styles.text, { marginVertical: 1 }]}>
                                Delivery Fee:{" "}
                            </Text>
                            <Text style={[styles.text, { marginVertical: 1, marginTop: 1 }]}>
                                Service Fee({order.service_fee}%):
                            </Text>
                            <Text style={[styles.text, { marginVertical: 1, marginTop: 1 }]}>
                                Tip:{" "}
                            </Text>
                            <Text style={[styles.text, { marginVertical: 1 }]}>Disc.:</Text>
                            <Text style={[styles.text, { marginVertical: 1, marginTop: 2 }]}>
                                Taxes({order.taxes}%):
                            </Text>
                            <Text style={[styles.text, { marginVertical: 1, marginTop: 16 }]}>
                                Total:{" "}
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.normalText, { textAlign: "right" }]}>
                                ${order.price}
                            </Text>
                            <Text style={[styles.normalText, { textAlign: "right" }]}>
                                ${order.delivery_fee}
                            </Text>
                            <Text style={[styles.normalText, { textAlign: "right" }]}>
                                ${parseFloat(service_fee).toFixed(2)}
                            </Text>
                            <Text style={[styles.normalText, { textAlign: "right" }]}>
                                ${order.tip}
                            </Text>
                            <Text style={[styles.normalText, { textAlign: "right" }]}>
                                {"$" + order.discount}
                            </Text>
                            <Text style={[styles.normalText, { textAlign: "right" }]}>
                                ${parseFloat(taxes).toFixed(2)}
                            </Text>
                            <Text
                                style={[
                                    styles.normalText,
                                    { textAlign: "right", marginTop: 12 },
                                ]}
                            >
                                ${order.total}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <Text
                    style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "#777",
                        maxWidth: 200,
                        marginLeft: 4,
                    }}
                >
                    Notes:
                    {order.notes || "N/A"}
                </Text>
            </View>
            <View style={styles.table}>

                <View style={[styles.tableHead, { justifyContent: "flex-end" }]}>
                    <Text>Total: ${parseFloat(price).toFixed(2)}</Text>
                </View>
                <View style={styles.tableHead}>
                    <Text style={styles.text}>Add on</Text>
                    <Text style={styles.text}>Ordered on</Text>
                    <Text style={styles.text}>PRICE</Text>
                </View>
                {Array.isArray(order.add_on) &&
                    order.add_on.map(extra =>
                        extra
                            .map((extra, key) => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: "#777",
                                    }}
                                    key={key}
                                >
                                    <View>
                                        <Text style={{ padding: 4 }}>{extra.item}</Text>
                                        <Text style={{ padding: 4 }}>
                                            ${parseFloat(extra.rate).toFixed(2) + " x " + extra.qty}
                                        </Text>
                                    </View>

                                    <Text style={{ padding: 4 }}>{extra.order_date}</Text>
                                    <Text style={{ padding: 4 }}>
                                        ${parseFloat(extra.subtotal).toFixed(2)}
                                    </Text>
                                </View>
                            )
                            ))}
            </View>
            <View style={{ height: 120 }} />
        </ScrollView>
    );
}

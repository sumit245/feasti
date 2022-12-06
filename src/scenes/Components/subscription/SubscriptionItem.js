import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import moment from "moment";
import { styles, width } from "../../styles/HomeStyle"
import CurrentMeal from "./CurrentMeal";
import AddOns from "./AddOns";
import Notes from "./Notes";
import FutureMeals from "./FutureMeals";
import LinkOpen from "../utility/LinkOpen";
import Loader from "../utility/Loader"

export default function SubscriptionItem({ item }) {
  const [remaining, setRemaining] = useState(0)
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const { address } = item
  useEffect(() => {
    let componentMounted = true
    if (componentMounted) {
      setLoading(false)
      setMeals(item)
      const remainingMeal = moment(item.end_date).diff(item.start_date, 'days')
      setRemaining(remainingMeal)
      setLoading(true)
    }

    return () => {
      componentMounted = false
    }
  }, [item])

  if (!loading) {
    return <Loader msg="Fetching your subscription Details" />
  }
  return (
    <SafeAreaView style={[styles.container, { width: width, flexDirection: 'column' }]}>
      <View style={[styles.header, { backgroundColor: "#FFF" }]}>
        <View style={{ marginLeft: 4 }}>
          <Text style={styles.headerTitle}>
            {item.plan_name}{" "}
            Subscription
          </Text>
          <Text style={styles.headersubtitle}>by {item.restaurant}</Text>
        </View>
        <Text style={{ color: item.category === "Lunch" ? "#ff9900" : "#ff6600", fontWeight: "bold", marginRight: 4 }}>
          {item.category}
        </Text>
      </View>
      {/* Header */}
      <ScrollView >
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <Text style={{ fontWeight: "bold", color: "#555" }}>STARTED</Text>
            <Text>{item.start_date}</Text>
          </View>

          <View style={styles.tab}>
            <Text style={{ fontWeight: "bold", color: "#555" }}>ENDS</Text>
            <Text>{item.end_date}</Text>
          </View>

          <View style={styles.tab}>
            <Text style={{ fontWeight: "bold", color: "#555" }}>
              REMAINING
            </Text>
            <Text>
              {parseInt(remaining) + 1}{" "}
              {parseInt(remaining) > 1 ? "Meals" : "Meal"}
            </Text>
          </View>
        </View>
        {/* calendar tabs */}
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.optionCard}>
            <View style={styles.optionrow}>
              <Text style={styles.title}>Upcoming Meal</Text>
              {item.isDelivered && (
                <Text style={[styles.title, { color: "#000" }]}>
                  Delivered
                </Text>
              )}
            </View>
            <Text>Today, {moment().format("DD MMM")}</Text>
            <View style={styles.indicator} />
            <CurrentMeal meal={meals[0]} />
          </View>
          {/* Current Meal Section */}

          <View style={styles.optionCard}>
            <Text style={styles.timing}>{item.time}</Text>
            <Text style={styles.address}>
              <Text style={{ textTransform: "capitalize" }}>
                {address.address_type}
              </Text>
              {" | " +
                (address.addressLine1 || "") +
                ", " +
                (address.addressLine2 || "") +
                (address.city || "") +
                "," +
                (address.postal_code || "")}
            </Text>
          </View>
          {/* User Address Section */}
          {!item.isDelivery && (
            <>
              <Text style={styles.headerText}>Chef Pickup</Text>
              <View style={styles.optionCard}>
                <View style={styles.optionrow}>
                  <Text style={[styles.address, { marginVertical: 2 }]}>
                    {
                      (address.addressLine1 || "") +
                      "\n" +
                      (address.addressLine2 || "") +
                      (address.city || "")
                    }
                  </Text>
                  <LinkOpen lat={address.geo.latitude} lng={address.geo.longitude} restaurant={item.restaurant} >GET ADDRESS</LinkOpen>
                </View>
              </View>
            </>
          )}
          {/* Chef Address Section */}
          <View style={styles.optionCard}>
            {/* <AddOns addon={meals[0].add_on} /> */}
          </View>
          {/* AddOns Section */}
          <View style={styles.optionCard}>
            <Notes note={item.notes} order_id={item._id} />
          </View>
          {/* Notes Section */}
          <Text style={styles.headerText}>Future Meals</Text>
          <View style={styles.optionCard}>
            <View style={{ flexDirection: 'column' }}>
              <FutureMeals meals={meals} futuredays={['Wednesday', 'Thursday', 'Friday']} />
            </View>
          </View>
          {/* Future Meals */}
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}
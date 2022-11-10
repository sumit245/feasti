import React from "react";
import { Card, Text } from "react-native-paper";
import { styles } from "../../styles/HomeStyle";
import Icon from "react-native-vector-icons/Ionicons";
export default function MenuItem({ index, meals }) {
    try {
        return (
            <Card style={styles.menuItem} key={index}>
                <Card.Cover source={{ uri: meals.image }} style={styles.menuImage} />
                <Card.Content>
                    <Card.Title
                        titleStyle={[styles.menuTitle, { marginLeft: -36, marginTop: -20 }]}
                        title={meals.meal_name}
                        subtitle={meals.description}
                        subtitleNumberOfLines={3}
                        subtitleStyle={[
                            styles.menuTitle,
                            { fontSize: 12, lineHeight: 12, marginTop: -4, marginLeft: -36 },
                        ]}
                        left={(props) => (
                            <Icon
                                name="stop-circle"
                                size={16}
                                color={
                                    meals.type === "veg" || meals.type === "Veg"
                                        ? "#2aaf21"
                                        : "#cc2224"
                                }
                            />
                        )}
                        leftStyle={[styles.menuTitle, { marginTop: -36 }]}
                    />
                </Card.Content>
            </Card>
        );
    } catch (error) {
        return (
            <Card style={styles.menuItem} key={index}>
                <Card.Content>
                    <Text>The chef does not provide meal on this day</Text>
                </Card.Content>
            </Card>
        );
    }
}

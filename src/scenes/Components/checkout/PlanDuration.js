import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Button } from "react-native-paper";
import moment from 'moment'
import { width, styles } from '../../styles/HomeStyle';
import Icon from "react-native-vector-icons/Ionicons";


export default function PlanDuration({ plan, dateHandler }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const minDate = moment(new Date()).add(1, "day")
    const onDateChange = () => { }
    return (
        <View style={styles.optionCard}>
            <Text style={styles.optionsLabels}>Select plan duration</Text>
            <TouchableOpacity
                style={styles.optionrow}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text>
                    {selectedStartDate || "--"}
                    {" To "}
                    {selectedEndDate || "--"}
                </Text>
                <Icon name="ios-calendar-outline" color="#ff6600" size={22} />
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.calenderView}>
                    <View style={styles.calendarBody}>
                        <CalendarPicker
                            startFromMonday={true}
                            minDate={minDate}
                            todayBackgroundColor="#f2e6ff"
                            selectedDayColor="#2300e6"
                            selectedDayTextColor="#FFFFFF"
                            height={width - 8}
                            width={width - 20}
                            scrollable
                            onDateChange={onDateChange}
                        />
                        <Button
                            mode="text"
                            color="#F00"
                            style={{ alignSelf: "flex-end" }}
                            onPress={() => setModalVisible(false)}
                        >
                            cancel
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
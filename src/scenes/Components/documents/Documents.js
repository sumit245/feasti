import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles, width } from '../../styles/HomeStyle'
import HeaderSimple from "../home/headerTop/HeaderSimple"
import Icons from "react-native-vector-icons/Ionicons"

export default function Documents({ route, navigation }) {
    const { papers } = route.params

    const ListEmptyComponent = () => (
        <View style={styles.centeredView}>
            <Icons
                name='ios-sad-outline'
                size={54}
                color="#ff6600"
            />
            <Text style={[styles.title, { fontSize: 16, textAlign: 'center' }]}>Oops!!! This Restaurant does not have{"\n"} any specific document</Text>
            <TouchableOpacity style={[styles.buttonEllipse, { marginTop: 8 }]} onPress={() => navigation.navigate('Meals')} >
                <Text style={[styles.btnText, { marginLeft: 0, fontSize: 14 }]}>Explore More Homechef</Text>
            </TouchableOpacity>
        </View>
    )
    return (
        <SafeAreaView style={styles.container}>
            <HeaderSimple navigation={navigation} title="Papers" />
            <FlatList
                contentContainerStyle={{ marginHorizontal: 4 }}
                ItemSeparatorComponent={() => <View style={{ width: 0.1 * width }} />}
                data={papers}
                ListEmptyComponent={ListEmptyComponent}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            margin: 1,
                        }}
                    >
                        <Image
                            style={styles.imageThumbnail}
                            source={{ uri: item.image }}
                            resizeMode="contain"
                        />
                        <Text
                            style={{
                                textAlign: 'center',
                                position: 'absolute',
                                bottom: 20,
                                left: '40%',
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: '#000',
                            }}
                        >
                            {item.image_name}
                        </Text>
                    </View>
                )}
                horizontal
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}
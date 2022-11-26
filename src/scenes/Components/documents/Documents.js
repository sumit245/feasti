import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import React from 'react'
import { styles, width } from '../../styles/HomeStyle'
import HeaderSimple from "../home/headerTop/HeaderSimple"

export default function Documents({ route, navigation }) {
    const { papers } = route.params

    return (
        <SafeAreaView style={styles.container}>
            <HeaderSimple navigation={navigation} title="Papers" />
            <FlatList
                contentContainerStyle={{ marginHorizontal: 4 }}
                ItemSeparatorComponent={() => <View style={{ width: 0.1 * width }} />}
                data={papers}
                ListEmptyComponent={() => (
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                marginHorizontal: 8,
                                color: '#000',
                            }}
                        >
                            This Restaurant does not have any specific document
                        </Text>
                    </View>
                )}
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
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/stacknavigator';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

export default function App() {
  // useEffect(() => {
  //   AsyncStorageLib.removeItem('user')
  // }, [])

  return (
    <NavigationContainer>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </NavigationContainer>
  )
}

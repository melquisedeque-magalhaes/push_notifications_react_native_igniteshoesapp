import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import OneSignal from 'react-native-onesignal';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import remoteConfig from '@react-native-firebase/remote-config'

import { Routes } from './src/routes';
import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagNotificationEmail } from './src/notifications/tagsNotifications';
import { useEffect } from 'react';
import { BRANDS } from './src/data/brands';
import { useBrandsStore } from './src/store/useBrandsStore';

OneSignal.setAppId("bdc1df05-797c-42ef-aa87-72ae1685b21f");

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  const { setBrands } =  useBrandsStore()

  tagNotificationEmail()

  async function fetchRemoteConfig() {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 3000
    })

    await remoteConfig().setDefaults({
      brands_tenis: JSON.stringify(BRANDS)
    })

    await remoteConfig().fetchAndActivate()

    const response = remoteConfig().getValue('brands_tenis')

    if(response.getSource() === 'default'){
      const parseResponse = JSON.parse(response.asString())
      setBrands(parseResponse)
      return
    }

    const parseResponse = JSON.parse(response.asString())
    setBrands(parseResponse.brands)
  }

  useEffect(() => {
    fetchRemoteConfig()
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
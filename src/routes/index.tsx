import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';
import { useCart } from '../hooks/useCart';

const linking = {
  prefixes: ['igniteshoesapp://', 'com.melqui.igniteshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification>()

  useEffect(() => {
    const unsubcribe = OneSignal
      .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
        setNotification(notificationReceivedEvent.getNotification())
      })

    return () => unsubcribe
  },[])

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <NavigationContainer linking={linking} theme={theme}>
      <AppRoutes />
      {
        notification?.title && (
          <Notification 
            data={notification}
            onClose={() => setNotification(undefined)}
          />
        )
      }
    </NavigationContainer>
  );
}
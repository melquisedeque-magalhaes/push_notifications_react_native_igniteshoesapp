import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

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
    <NavigationContainer theme={theme}>
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
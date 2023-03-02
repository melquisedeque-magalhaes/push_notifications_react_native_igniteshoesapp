import OneSignal from 'react-native-onesignal';

export function tagNotificationEmail() {
    OneSignal.sendTag('email', 'email')
}
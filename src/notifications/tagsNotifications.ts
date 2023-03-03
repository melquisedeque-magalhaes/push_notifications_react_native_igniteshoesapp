import OneSignal from 'react-native-onesignal';

export function tagNotificationEmail() {
    OneSignal.sendTag('email', 'email')
}

export function tagCartUpdate(countItensCard: string) {
    OneSignal.sendTag('cart_itens_count', countItensCard)
}
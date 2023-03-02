import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { OSNotification } from 'react-native-onesignal';

type Props = {
  data: OSNotification;
  onClose: () => void;
}

interface AdditionalDataProps {
  route?: string
  productId?: string
}

export function Notification({ data, onClose }: Props) {

  const { navigate } = useNavigation()

  function handleNavigate() {
    const { route, productId } = data.additionalData as AdditionalDataProps

    if(route === 'details' && productId){
      navigate('details', { productId })

      onClose()
    }
  }

  return (
    <Pressable
      w="full" 
      p={4} 
      pt={12}
      bgColor="gray.400"
      position="absolute"
      top={0}
      onPress={handleNavigate}
    >
      <HStack 
        justifyContent="space-between" 
        alignItems="center" 
      >
          <Icon as={Ionicons} name="notifications-outline" size={5} color="white" mr={2}/>

          <Text fontSize="md" color="white" flex={1}>
            {data.title}
          </Text>

        <IconButton 
          variant="unstyled" 
          _focus={{ borderWidth: 0 }} 
          icon={<CloseIcon size="3" />} 
          _icon={{ color: "white"}} 
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}
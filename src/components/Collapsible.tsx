import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { TouchableOpacity, useColorScheme, View, Text } from 'react-native';
import { Colors } from '@/src/constants/Colors';
interface FaturaProps extends PropsWithChildren {
  price: string
  status: string;
  vencimento: string;
}
export function Collapsible({ children, title, price, status, vencimento }: FaturaProps & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <View className='rounded-md p-2'>
      <TouchableOpacity
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
        className='flex-row bg-dark mb-12'
      >
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <Text className='text-gray-600 font-bold'> {title}</Text>
      </TouchableOpacity>
      <View className='flex-row justify-between'>
        <Text className='font-bold text-2xl'>R$ {price}</Text>
        <View className='bg-orange-300 items-center justify-center px-4 rounded-xl '>
          <Text className='font-semibold'>{status}</Text>
        </View>
      </View>
      <Text>Vencimento {vencimento}</Text>
      {isOpen && <View>{children}</View>}
    </View>
  );
}

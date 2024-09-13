import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { TouchableOpacity, useColorScheme, View, Text } from 'react-native';
import { Colors } from '@/src/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
        className='justify-between px-2'
      >
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center gap-2'>
            <MaterialCommunityIcons name='barcode-scan' size={20} />
            <Text className='text-gray-600 font-bold text-lg'>Fatura mês de  {new Date(title).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}</Text>
          </View>
          <Ionicons
            name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
            size={18}
            color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          />
        </View>

        <View className='flex-row justify-between'>
          <Text className='font-bold text-3xl mt-2'>
            {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
          </Text>

        </View>

        <View className='flex-row gap-1 items-center justify-between'>
          <View className='flex-row gap-1'>
            <MaterialCommunityIcons name='calendar' size={16} />
            <Text>Vencimento {new Date(vencimento).toLocaleDateString('pt-BR')}</Text>
          </View>
          {status === 'Gerado' ? (
            new Date(vencimento) < new Date() ? (
              // Exibe o status "Atrasada"
              <View className='bg-red-50 items-center border border-red-400 justify-center p-2 rounded-xl'>
                <Text className='font-medium text-red-400'>Atrasada</Text>
              </View>
            ) : (
              // Exibe o status "Em aberto" se não estiver atrasada
              <View className='bg-orange-50 items-center border border-orange-300 justify-center p-2 rounded-xl'>
                <Text className='font-medium text-orange-400'>Em aberto</Text>
              </View>
            )
          ) : (
            // Exibe o status padrão se não for "Gerado" ou não houver vencimento
            <View className='bg-green-50 border border-green-200 items-center justify-center p-2 rounded-xl'>
              <Text className='font-medium text-green-400'>{status}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {isOpen && <View>{children}</View>}
    </View>
  );
}

import { Image, Text, View } from 'react-native';

import { useEffect, useState } from 'react';
import auth from '@/src/constants/auth';
import api from '@/services/api';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import Load from '@/src/components/Load';
import { Button } from '@/src/components/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface ContratoProps {
  razaosocial: string;
  contrato: number;
  cpfcnpj: string;
  planointernet: string;
  vencimento: string;
  planointernet_valor: string;
}

export default function HomeScreen() {
  const [data, setData] = useState<ContratoProps | any>([])
  const [isLoading, setIsloading] = useState(false)

  const handleContrato = async () => {
    try {
      setIsloading(true)
      const response = await auth();
      const data = await api(response.cpfcnpj, '123456')
      const filtered = data.contratos.filter((item: ContratoProps) => item.contrato == response.contrato)
      setData(filtered[0])

    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false)
    }

  }
  useEffect(() => {
    handleContrato();
  }, [])

  if (isLoading) {
    return <Load color={'orange'} size={32} />
  }


  return (
    <SafeAreaView className='bg-black'>
      <View className='bg-gray-100 h-full'>
        <View className='bg-slate-900 p-4 py-16 justify-center items-center relative'>
          <Image className='w-[134px] h-20' source={require('@/assets/images/logo_white.png')} />
          <View className='flex-row items-center justify-between w-full my-4'>
            <Text className="text-red-500 text-xl">Olá, {data.razaosocial}</Text>
            <MaterialCommunityIcons name="cog" size={32} color={'#fff'} />
          </View>

          <View className='bg-white m-4 py-10 absolute bottom-[-64] left-0 right-0 shadow-md  rounded-xl p-4 flex-row justify-between'>
            <Text className='text-red-300 text-xl'>Contrato : {data.status}</Text>
            <Text className='text-red-300 text-xl'>Contrato : {data.contrato}</Text>
          </View>
        </View>

        <View className='p-4 gap-4 mt-12'>
          <Animatable.View animation={'slideInLeft'}>
            <Text>Plano Atual: {data.planointernet} - {data.planointernet_valor}</Text>
            <Text>Vencimento todo dia {data.vencimento}</Text>
          </Animatable.View>

          <Button onPress={() => router.push('/invoice')} isLoading={false} icon='barcode' title='Faturas' />
        </View>
      </View>
    </SafeAreaView>

  );
}




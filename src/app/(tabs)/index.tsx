import { Image, Text, TouchableOpacity, View } from 'react-native';

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
        <View className='bg-slate-900 p-4 py-14 justify-center items-center relative'>
          <Image className='w-[134px] h-20' source={require('@/assets/images/logo_white.png')} />
          <View className='flex-row items-center justify-between w-full my-4'>
            <Text className="text-slate-100 font-semibold text-xl">Olá, {data.razaosocial}</Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <MaterialCommunityIcons name="cog" size={32} color={'#fff'} />
            </TouchableOpacity>
          </View>

          <View className='bg-white m-4 py-8 absolute bottom-[-72px] left-0 right-0 shadow-md  rounded-xl p-8 flex-row justify-between'>
            <View className='flex-row items-center gap-2'>
              <MaterialCommunityIcons name='check-circle-outline' size={32} color={'green'} />
              <Text className='text-slate-900 text-xl'>Status : {data.status}</Text>
            </View>
            <View className='items-center'>
              <Text className='text-slate-900 text-xl'>CONTRATO</Text>
              <View className='flex-row items-center gap-2'>
                <MaterialCommunityIcons name='file-document' size={32} />
                <Text className='text-slate-900 text-xl'>{data.contrato}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className='p-4 gap-6 mt-16'>
          <Animatable.View className='flex-row gap-4' animation={'slideInLeft'}>
            <View className='shadow bg-white flex-1 rounded-xl'>
              <Text>Fatura</Text>
            </View>
            <View className='gap-2 w-56'>
              <Button icon='barcode' title='Faturas' />
              <Button className='bg-blue-500 flex-row p-4 rounded-xl justify-center' icon='barcode' title='Promessas' />

            </View>
          </Animatable.View>
        </View>
      </View>
    </SafeAreaView>

  );
}




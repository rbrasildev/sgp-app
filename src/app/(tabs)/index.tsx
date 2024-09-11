import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { useEffect, useState } from 'react';
import auth from '@/src/constants/auth';
import api from '@/services/api';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

import { Button } from '@/src/components/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { getInvoices } from '@/services/getInvoices';
import { FlatList } from 'react-native-gesture-handler';
import CardFaturaAbertas from '@/src/components/Faturas/CardFaturaAbertas';


interface ContratoProps {
  razaosocial: string;
  contrato: number;
  cpfcnpj: string;
  planointernet: string;
  vencimento: string;
  planointernet_valor: string;
}

interface FaturaProps {
  codigopix: string;
  data_pagamento: Date
  gerapix: Boolean,
  id: Number
  idtransacao: Number
  linhadigitavel: String
  link: String
  link_completo: String
  numero_documento: Number
  pagarcartao: Boolean
  pagarcartaocheckout: String
  pagarcartaodebito: Boolean
  recibo: String
  status: String
  statusid: Number
  valor: Number
  valorcorrigido: Number
  vencimento: Date
  vencimento_atualizado: Date
}

export default function HomeScreen() {
  const [titulo, setTitulo] = useState([])
  const [data, setData] = useState<ContratoProps | any>([])
  const [isLoading, setIsloading] = useState(false)
  const { height, width } = useWindowDimensions();

  const { removeItem } = useAsyncStorage('@sgp')

  const logout = async () => {
    removeItem()
    router.push("/login")
  }

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


  const handleInvoices = async () => {
    try {
      setIsloading(true)
      const response = await getInvoices();
      setTitulo(response.faturas)
    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }

  useEffect(() => {
    handleContrato()
    handleInvoices()
  }, [])


  if (isLoading) {
    return (
      <View className='flex-1 p-4 mt-6'>
        <ContentLoader
          backgroundColor='#ccc'
          foregroundColor='#ddd'
          viewBox={`0 0 ${width} ${height}`}
        >
          <Rect x="90" y="10" rx="0" ry="0" width="200" height="100" />
          <Rect x="10" y="120" rx="8" ry="8" width="340" height="25" />
          <Circle cx="370" cy="130" r="15" />
          <Rect x="10" y="155" rx="8" ry="8" width="345" height="100" />
        </ContentLoader>
      </View>
    )
  }



  return (
    <SafeAreaView className='bg-black'>
      <View className='bg-gray-100 h-full'>
        <View className='bg-slate-900 p-4 justify-center items-center relative'>
          <Image className='w-[134px] h-20' source={require('@/assets/images/logo_white.png')} />
          <View className='flex-row items-center justify-between w-full mb-11'>
            <Text className="text-slate-100 font-semibold text-xl">Olá, {data.razaosocial}</Text>
            <TouchableOpacity onPress={logout}>
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
            <View className='shadow bg-white flex-1 rounded-xl p-4 gap-3'>
              <View>
                <Text className='text-lg'>Você possui {titulo.filter((item: FaturaProps) => item.statusid == 1 && new Date(item.vencimento) < new Date()).length} fatura(s) em aberto</Text>
                <FlatList
                  horizontal
                  data={titulo.filter((item: FaturaProps) => item.statusid == 1 && new Date(item.vencimento) < new Date())}
                  renderItem={({ item }) => (
                    <CardFaturaAbertas item={item} />
                  )}
                  keyExtractor={(item: FaturaProps) => String(item.id)}
                  contentContainerStyle={{ gap: 5, margin: 5 }}
                />
              </View>

              <View className='flex-row items-center gap-2'>
                <MaterialCommunityIcons name='alert' size={20} color={'orange'} />
                <Text className='font-normal text-lg'>Sua internet está suspensa</Text>
              </View>
              <Button icon='lock-open' title='Liberar sua internet' />
            </View>

          </Animatable.View>
        </View>
      </View>
    </SafeAreaView>

  );
}




import Contracts from '@/src/components/Contracts/Contracts'
import api from '@/services/api'

import { useState, useRef } from 'react'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Image, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';

import { Button } from '@/src/components/Button';
import { Input } from '../components/Input';

import { router } from 'expo-router';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

interface ContratoProps {
    contrato: number,
    razaosocial: string;
    planointernet: string;
    cpfcnpj: string;

}

//993.832.332-49
// 952.314.472-34

export default function login() {
    const [cpfCnpj, setCpfCnpj] = useState('952.314.472-34')
    const [contratoData, setContratoData] = useState<ContratoProps[]>([])
    const [isLoaded, setIsloaded] = useState(false)

    const bottomSheetRef = useRef<BottomSheet>(null);
    const { setItem } = useAsyncStorage('@sgp')


    const handleGetDataUser = async () => {
        try {
            setIsloaded(true)
            const response = await api(cpfCnpj, '123456')

            if (!response.contratos) {
                Toast.show({
                    type: 'error',
                    text1: 'Contrato não encontrado',
                    text2: 'Verifique se seu CPF está correto',
                    text1Style: { fontSize: 16 },
                    text2Style: { fontSize: 14 }
                })
                return
            }
            setContratoData(response.contratos)
            if (response.contratos.length == 1) {
                handleSaveData(response.contratos[0].cpfcnpj, response.contratos[0].contrato)
                router.push('/(tabs)')
            }
            bottomSheetRef.current?.expand()
        } catch (error) {
            console.log(error);
        } finally {
            setIsloaded(false)
        }
    }



    const handleSaveData = async (cpfcnpj: string, contrato: string) => {
        try {
            setItem(JSON.stringify({
                cpfcnpj,
                contrato
            }));
            router.push('/(tabs)')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View
            className='justify-center flex-1 bg-gray-900 p-8'
        >
            <View className='absolute top-20 left-0 right-0 items-center'>
                <Image className='h-24 w-48' source={require('@/assets/images/logo_white.png')} />
            </View>
            <Animatable.View
                animation="slideInLeft"
            >
                <Text className='text-gray-500 font-semibold text-lg'>Login</Text>
                <Input
                    placeholder='Digite CPF/CNPJ'
                    placeholderTextColor={'#999'}
                    onChangeText={setCpfCnpj}
                    value={cpfCnpj}
                    keyboardType='numeric'
                />

                <Button
                    icon='enter'
                    onPress={handleGetDataUser}
                    isLoading={isLoaded}
                    title='Entrar'
                    style={{ padding: 22 }}
                />
            </Animatable.View>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[0.01, 284]}
            >
                <Text className='p-2 text-2xl font-light m-4 text-gray-800'>Selecione um contrato 📑</Text>
                <BottomSheetFlatList className='p-4'
                    data={contratoData}
                    keyExtractor={(item) => String(item.contrato)}
                    renderItem={({ item }) => <Contracts item={item} />}
                >
                </BottomSheetFlatList>
            </BottomSheet>

        </View >
    )
}

import Contracts from '@/src/components/Contracts/Contracts'
import api from '@/services/api'

import { useState, useRef } from 'react'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Image, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';

import { Button } from '@/src/components/Button';


import { router } from 'expo-router';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { InputLabelFixed } from '../components/InputLabelFixed';

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
            className='flex-1  bg-gray-900 p-8'
        >
            <View className='items-center'>
                <Image className='h-[117] w-64 mt-10' source={require('@/assets/images/logo_white.png')} />
            </View>
            <Animatable.View
                animation="slideInLeft"
                className='h-4/6 justify-center'
            >

                <InputLabelFixed
                    placeholder='Digite CPF/CNPJ'
                    placeholderTextColor={'#999'}
                    onChangeText={setCpfCnpj}
                    value={cpfCnpj}
                    keyboardType='numeric'
                    label='CPF/CNPJ'
                />

                <Button
                    onPress={handleGetDataUser}
                    isLoading={isLoaded}
                    title='Entrar'
                    style={{ padding: 16 }}
                />
            </Animatable.View>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[0.01, '50%', '100%']}
                backgroundStyle={{ backgroundColor: '#000' }}
            >
                <Text className='uppercase font-medium text-center py-2 text-slate-500 '>Selecione um contrato</Text>
                <BottomSheetFlatList className='px-4'
                    data={contratoData}
                    keyExtractor={(item) => String(item.contrato)}
                    renderItem={({ item }) => <Contracts item={item} />}
                >
                </BottomSheetFlatList>
            </BottomSheet>

        </View >
    )
}

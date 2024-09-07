import Contracts from '@/src/components/Contracts/Contracts'
import api from '@/services/api'

import { useState, useRef, useCallback } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';

import { Button } from '@/src/components/Button';
import { Input } from '../components/Input';
import { Switch } from '../components/Switch';

interface ContratoProps {

    contrato: number,
    razaosocial: string;
    planointernet: string;
    cpfcnpj: string;

}

export default function login() {
    const [cpfCnpj, setCpfCnpj] = useState('018.198.802-06')
    const [contratoData, setContratoData] = useState<ContratoProps>([])
    const [isLoaded, setIsloaded] = useState(false)

    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {

    }, []);

    const handleGetDataUser = async () => {
        try {
            setIsloaded(true)
            const response = await api(cpfCnpj, '123456')
            setContratoData(response.contratos)
            bottomSheetRef.current?.expand()
        } catch (error) {
            console.log(error);
        } finally {
            setIsloaded(false)
        }
    }

    return (
        <View
            className='justify-center p-8 flex-1'
        >
            <Animatable.View
                animation="slideInLeft"
            >
                <Text className='text-gray-500 font-semibold text-lg'>Login</Text>
                <Input
                    placeholder='Digite CPF/CNPJ'
                    placeholderTextColor={'#999'}
                    onChangeText={setCpfCnpj}
                    value={cpfCnpj}
                />

                <View className='flex-row items-center'>
                    <Switch />
                    <Text>Lembrar-me</Text>
                </View>
                <Button
                    icon='enter'
                    onPress={handleGetDataUser}
                    isLoading={isLoaded}
                    title='Entrar'
                />


            </Animatable.View>

            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={[0.01, 500]}
            >
                <BottomSheetView className='p-4' >
                    <Text className='p-2 font-semibold'>Selecione um contrato 📑</Text>
                    < Contracts data={contratoData} />
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}

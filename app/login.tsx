import Contracts from '@/components/Contracts/Contracts'
import api from '@/services/api'

import { useState, useRef, useCallback } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable';
import Load from '@/components/Load';
import { Switch } from '@/components/Switch';
import { Button } from '@/components/Button';

type ContratoProps = {

    contrato: number,
    razaosocial: string;
    planointernet: string;
    cpfcnpj: string;

}

export default function login() {
    const [cpfCnpj, setCpfCnpj] = useState('018.198.802-06')
    const [contratoData, setContratoData] = useState<ContratoProps[]>([])
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
            className='justify-center p-6 flex-1'
        >
            <Animatable.View
                animation="slideInLeft"
            >
                <Text >Login</Text>
                <TextInput
                    placeholder='Digite CPF/CNPJ'
                    placeholderTextColor={'#999'}
                    onChangeText={setCpfCnpj}
                    value={cpfCnpj}
                    className='bg-orange-50 p-6 rounded-xl my-2 font-bold text-lg'
                />
                {/* <TouchableOpacity
                    disabled={isLoaded}
                    onPress={() => handleGetDataUser()}
                    className='bg-orange-400 p-6 rounded-xl justify-center items-center my-2'
                >
                    {isLoaded ? (<Load color='#fff' size={32} />) : (<Text className='text-white text-lg'>Entrar</Text>)}
                </TouchableOpacity> */}
                <Button
                    onPress={handleGetDataUser}
                    disabled={isLoaded}
                    label={isLoaded ? (<Load color='#fff' size={18} />) : 'Entrar'}
                    className='bg-orange-400 p-6' variant={'default'} />
                <Switch />

            </Animatable.View>

            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={[0.01, 284]}
            >
                <BottomSheetView className='p-4' >
                    <Text style={{ padding: 4 }}>Selecione um contrato 📑</Text>
                    < Contracts contrato={contratoData} />
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}

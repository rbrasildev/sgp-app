import Contracts from '@/components/Contracts/Contracts'
import api from '@/services/api'

import { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import * as Animatable from 'react-native-animatable';

type ContratoProps = {
    contratos: {
        contrato: number,
        razaosocial: string;
        planointernet: string;
        cpfcnpj: string;
    }
}

export default function login() {
    const [cpfCnpj, setCpfCnpj] = useState('95231447234')

    const [contratoData, setContratoData] = useState<ContratoProps>([])

    const handleGetDataUser = async () => {
        try {
            const response = await api(cpfCnpj, '123456')

            setContratoData(response)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#141414',
                justifyContent: 'center',

            }}
        >
            <Animatable.View
                animation="fadeInUp"
                style={{
                    flex: 2,
                    justifyContent: 'center',
                    padding: 10
                }}>
                <Text style={{ color: '#fff' }}>Login</Text>
                <TextInput
                    placeholder='Digite CPF/CNPJ'
                    placeholderTextColor={'#999'}
                    onChangeText={setCpfCnpj}
                    value={cpfCnpj}
                    style={{
                        backgroundColor: '#212121',
                        padding: 16,
                        borderRadius: 16,
                        marginVertical: 16,
                        color: '#999'
                    }}
                />
                <TouchableOpacity
                    onPress={() => handleGetDataUser()}
                    style={{
                        backgroundColor: 'orange',
                        padding: 20,
                        borderRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 16
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 18 }}>Entrar</Text>
                </TouchableOpacity>

            </Animatable.View>

            {contratoData.contratos &&
                < Contracts
                    contratos={contratoData.contratos}
                />
            }

        </View>
    )
}


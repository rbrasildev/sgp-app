import api from '@/services/api'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'


const Login = () => {
    const [cpfCnpj, setCpfCnpj] = useState('95231447234')
    const [contratoData, setContratoData] = useState([])

    const { setItem } = useAsyncStorage('@sgp')

    const handleGetDataUser = async () => {
        try {
            const response = await api(cpfCnpj, '123456')
            setContratoData(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handeSaveData = async () => {
        const newData = {
            contrato,
            cpfcnpj,

        }
        try {

        } catch (error) {
            console.log(error)
        }
    }

    console.log(contratoData.auth)



    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#141414',
                justifyContent: 'center',
                padding: 16,
                paddingTop: 30,
            }}
        >
            <Text style={{ color: '#fff' }}>PÁGINA DE LOGIN</Text>
            <TextInput
                placeholder='Digite CPF/CNPJ'
                placeholderTextColor={'#666'}
                onChangeText={setCpfCnpj}
                value={cpfCnpj}
                style={{
                    backgroundColor: '#212121',
                    padding: 16,
                    borderRadius: 16,
                    marginVertical: 16,
                    color: '#666'
                }}
            />
            <TouchableOpacity
                onPress={() => handleGetDataUser()}
                style={{
                    backgroundColor: 'orange',
                    padding: 20,
                    borderRadius: 16,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={{ color: '#fff' }}>Entrar</Text>
            </TouchableOpacity>

            <FlatList
                data={contratoData.contratos}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'space-between', backgroundColor: '#333', marginVertical: 2, padding: 10, borderRadius: 10 }}>
                        <Text style={{ color: '#fff' }}>{item.contrato}</Text>
                        <Text style={{ color: '#fff' }}>{item.razaosocial}</Text>
                    </View>
                )}
                keyExtractor={item => item.contrato}
            />


        </View>
    )
}

export default Login
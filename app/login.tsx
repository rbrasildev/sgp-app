import api from '@/services/api'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { router, useNavigation } from 'expo-router'
import { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'


const Login = () => {
    const [cpfCnpj, setCpfCnpj] = useState('95231447234')
    const [contratoData, setContratoData] = useState([])

    const { setItem, getItem } = useAsyncStorage('@sgp')

    const handleGetDataUser = async () => {
        try {
            const response = await api(cpfCnpj, '123456')
            setContratoData(response)
            handeSaveData()

        } catch (error) {
            console.log(error)
        }
    }


    const handeSaveData = async () => {
        setItem(JSON.stringify(contratoData));
        try {

        } catch (error) {
            console.log(error)
        }
    }

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

            <FlatList
                data={contratoData.contratos}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                gap: 4, justifyContent: 'space-around',
                                alignItems: 'center',
                                backgroundColor: '#333',
                                marginVertical: 2,
                                padding: 10,
                                borderRadius: 16,
                                borderWidth: 1,
                                borderColor: "#666",
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons onPress={() => useNavigation('/')} size={20} color={'#666'} name='file-account' />
                                <Text style={{ color: '#fff' }}>{item.contrato}</Text>
                            </View>
                            <View>
                                <Text style={{ color: '#fff', fontWeight: '700' }}>{item.razaosocial}</Text>
                                <Text style={{ color: '#666' }}>{item.planointernet}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.contrato}
            />
        </View>
    )
}

export default Login
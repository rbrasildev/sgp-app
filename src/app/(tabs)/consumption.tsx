import extrauso from '@/services/getExtratoUso'
import { convertBytes, convertDate } from '@/src/constants/convertBytes'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default function Consumption() {
    const [consumo, setConsumo] = useState([])

    const handleConsumption = async () => {
        try {
            const response = await extrauso(new Date)
            setConsumo(response);
        } catch (error) {

        }
    }

    useEffect(() => {
        handleConsumption();
    }, [])

    return (
        <View className='px-4'>
            <View className='bg-blue-600 my-2 p-4 rounded-xl'>
                <Text className='font-light'>Consumo mês de</Text>
                <Text className='font-bold text-3xl text-slate-100'>{convertBytes(consumo.total)}</Text>
            </View>
            <FlatList
                data={consumo.list}
                renderItem={({ item }) => (
                    <View className='p-4 bg-blue-300 flex-row justify-between my-1 rounded-xl items-center'>
                        <View>
                            <Text className='font-light'>Download {convertBytes(item.download)}</Text>
                            <Text className='font-light'>Upload {convertBytes(item.upload)}</Text>
                            <Text className='font-light'>{`Período de ${convertDate(item.dataini)} a ${convertDate(item.datafim)}`}</Text>
                        </View>
                        <Text className='font-bold text-2xl'>{convertBytes(item.total)}</Text>
                    </View>
                )}
            />
        </View>
    )
}
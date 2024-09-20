import extrauso from '@/services/getExtratoUso'
import { convertBytes, convertDate } from '@/src/constants/convertBytes'
import { ConsumptionProps } from '@/src/types/SgpTypes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Calendar, LocaleConfig, DateData } from 'react-native-calendars';
import { Button } from '@/src/components/Button'
import { ptBR } from '@/src/utils/localeCalendarConfig'
import { CalendarPicker } from '@/src/components/Calendar'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

export default function Consumption() {
    const [consumo, setConsumo] = useState<ConsumptionProps | any>([])
    const [isOpen, setIsOpen] = useState(false)
    const [month, setMonth] = useState<DateData>(new Date().toLocaleString())



    const handleConsumption = async () => {
        try {
            const response = await extrauso(new Date())
            setConsumo(response);
        } catch (error) {

        }
    }

    useEffect(() => {
        handleConsumption();
    }, [])

    return (
        <View className='px-4 bg-slate-900'>
            <Button
                onPress={() => setIsOpen(true)}
                icon='calendar' title='Selecione um mês'
            />
            <CalendarPicker />
            <View className='bg-slate-200 my-2 p-4 rounded-2xl'>
                <Text className='font-light'>Consumo mês de {consumo.mes}</Text>
                <Text className='font-bold text-3xl text-slate-800'>{convertBytes(consumo.total)}</Text>
            </View>
            <FlatList
                data={consumo.list}
                renderItem={({ item }) => (
                    <View className='p-4 rounded-2xl mb-2'>
                        <Text className='text-slate-100 font-bold text-lg'>{`Período de ${convertDate(item.dataini)} a ${convertDate(item.datafim)}`}</Text>
                        <View className='flex-row justify-between items-center'>
                            <View>
                                <MaterialCommunityIcons name='download-network-outline' color={'#fff'} size={36} />
                            </View>
                            <View>
                                <Text className='text-slate-400 font-light'>Download {convertBytes(item.download)}</Text>
                                <Text className='text-slate-400 font-light'>Upload {convertBytes(item.upload)}</Text>
                            </View>
                            <Text className='text-slate-400 font-bold text-2xl'>{convertBytes(item.total)}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}
import extrauso from '@/services/getExtratoUso'
import { convertBytes, convertDate } from '@/src/constants/convertBytes'
import { ConsumptionProps } from '@/src/types/SgpTypes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
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
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    console.log(selectedMonth)

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const months = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const renderMonths = () => {
        return months.map((month, index) => (
            <TouchableOpacity
                key={index}
                className={selectedMonth === index ? 'bg-orange-500 p-4 rounded-full items-center justify-center' : 'bg-slate-200 p-4 rounded-full items-center justify-center'}
                onPress={() => selectMonth(index)}
            >
                <Text className='font-bold' >{month}</Text>
            </TouchableOpacity>

        ));
    };

    function selectMonth(month: number) {
        setIsOpen(false)
        setSelectedMonth(month)
    }

    const increaseYear = () => setSelectedYear(prev => prev + 1);
    const decreaseYear = () => setSelectedYear(prev => prev - 1);




    const handleConsumption = async () => {
        try {
            const fullDate = `${selectedYear}-${selectedMonth}-1`
            const response = await extrauso(new Date(fullDate))
            setConsumo(response);
        } catch (error) {

        }
    }

    useEffect(() => {
        handleConsumption();
    }, [selectedMonth])

    return (
        <View className='px-4 bg-slate-900'>
            <Button
                onPress={() => setIsOpen(true)}
                icon='calendar' title='Selecione um mês'
            />
            {isOpen && (
                <View>
                    <View className='flex-row justify-between my-6'>
                        <TouchableOpacity onPress={decreaseYear}>
                            <Text className='text-slate-200'><MaterialCommunityIcons size={32} name='chevron-left' /></Text>
                        </TouchableOpacity>
                        <Text className='font-bold text-xl text-slate-200'>{selectedYear}</Text>
                        <TouchableOpacity onPress={increaseYear}>
                            <Text className='text-slate-200'><MaterialCommunityIcons size={32} name='chevron-right' /></Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row flex-wrap justify-between gap-2 mb-4'>
                        {renderMonths()}
                    </View>
                </View>
            )}

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
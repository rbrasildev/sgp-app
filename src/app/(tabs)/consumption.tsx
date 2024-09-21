import extrauso from '@/services/getExtratoUso';
import { convertBytes, convertDate } from '@/src/constants/convertBytes';
import { ConsumptionProps, ExtratoProps } from '@/src/types/SgpTypes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Button } from '@/src/components/Button';

export default function Consumption() {
    const [consumo, setConsumo] = useState<ConsumptionProps | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const increaseYear = () => setSelectedYear((prev) => prev + 1);
    const decreaseYear = () => setSelectedYear((prev) => prev - 1);

    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const renderMonths = () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return months.map((month, index) => {
            const isFutureMonth = selectedYear > currentYear || (selectedYear === currentYear && index > currentMonth);

            return (
                <TouchableOpacity
                    key={index}
                    disabled={isFutureMonth}
                    style={isFutureMonth ? { opacity: 0.3, backgroundColor: '#e2e8f0' } : {}}
                    className={
                        selectedMonth === index
                            ? 'bg-orange-500 p-4 rounded-2xl items-center justify-center'
                            : 'bg-slate-200 p-4 rounded-2xl items-center justify-center'
                    }
                    onPress={() => !isFutureMonth && selectMonth(index)} // Garantir que a seleção só ocorre se o mês não for futuro
                >
                    <Text className='font-bold'>{month}</Text>
                </TouchableOpacity>
            );
        });
    };
    function selectMonth(mes: number) {
        setIsOpen(false);
        setSelectedMonth(mes);
    }

    const handleConsumption = async () => {
        try {
            const fullDate = new Date(selectedYear, selectedMonth + 1, 1);
            const response = await extrauso(fullDate);
            setConsumo(response);
        } catch (error) {
            console.error('Erro ao buscar o consumo:', error);
        }
    };

    useEffect(() => {
        handleConsumption();
    }, [selectedMonth]);

    return (
        <View className='px-4 flex-1 bg-slate-900'>
            <Button style={{ borderWidth: 1, borderColor: '#f97316' }} onPress={() => setIsOpen(true)} icon='calendar' title='Selecione um mês' />
            {isOpen && (
                <View className='justify-center border border-slate-200/75 rounded-3xl mt-1 p-2'>
                    <View className='flex-row justify-between my-6'>
                        <TouchableOpacity onPress={decreaseYear}>
                            <Text className='text-slate-200'>
                                <MaterialCommunityIcons size={32} name='chevron-left' />
                            </Text>
                        </TouchableOpacity>
                        <Text className='font-bold text-xl text-slate-200'>{selectedYear}</Text>
                        <TouchableOpacity onPress={increaseYear}>
                            <Text className='text-slate-200'>
                                <MaterialCommunityIcons size={32} name={'chevron-right'} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className='justify-end flex-row flex-wrap gap-2 mb-4'>{renderMonths()}</View>
                    <View className='flex-row gap-2 justify-end mt-2'>
                        <TouchableOpacity
                            className='bg-orange-500 px-6 py-2 rounded-2xl'>

                            <Text className='font-semibold mt-1 text-slate-50'>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='bg-slate-200 px-6 py-2 rounded-2xl'>
                            <Text className='font-semibold mt-1'>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {consumo && (
                <View className='bg-slate-200 my-2 p-4 rounded-2xl'>
                    <Text className='font-light'>Consumo mês de {months[selectedMonth]}</Text>
                    <Text className='font-bold text-3xl text-slate-800'>{convertBytes(consumo.total)}</Text>
                </View>
            )}

            {consumo?.list && (
                <FlatList
                    data={consumo.list}
                    keyExtractor={(item: ExtratoProps | any) => item.dataini}
                    renderItem={({ item }) => (
                        <View className='p-4 rounded-2xl mb-2'>
                            <Text className='text-slate-100 font-bold text-lg'>
                                {`Período de ${convertDate(item.dataini)} a ${convertDate(item.datafim)}`}
                            </Text>
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
            )}
        </View>
    );
}

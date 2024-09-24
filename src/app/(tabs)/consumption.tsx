import extrauso from '@/services/getExtratoUso';
import { convertBytes, convertDate } from '@/src/constants/convertBytes';
import { ConsumptionProps, ExtratoProps } from '@/src/types/SgpTypes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { Button } from '@/src/components/Button';

export default function Consumption() {
    const [consumo, setConsumo] = useState<ConsumptionProps | null>(null);
    const [isLoading, setIsloading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const animatableRef = useRef(null);

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
        setSelectedMonth(mes);
    }

    const handleConsumption = async () => {
        try {
            setIsloading(true)
            const fullDate = new Date(selectedYear, selectedMonth + 1, 1);
            const response = await extrauso(fullDate);
            setConsumo(response);
        } catch (error) {
            console.error('Erro ao buscar o consumo:', error);
        } finally {
            setIsloading(false)
        }
    };

    useEffect(() => {
        handleConsumption();
    }, [selectedMonth, animatableRef]);

    const closeWithAnimation = () => {
        if (animatableRef.current) {
            animatableRef.current.fadeOutUp(100).then(() => {
                openWithAnimation
                setIsOpen(false);
            });
        }
    };

    const openWithAnimation = () => {
        if (animatableRef.current) {
            animatableRef.current.fadeOutUp(3000).then(() => {
                setIsOpen(false);
            });
        }
    };


    return (
        <View className='px-4 flex-1 bg-slate-900'>
            <Button style={{ borderWidth: 1, borderColor: '#f97316' }} onPress={() => setIsOpen(true)} icon='calendar' title='Selecione um mês' />
            {isOpen && (
                <Animatable.View
                    ref={animatableRef}
                    animation="slideInDown"
                    duration={300}
                    className='justify-center  rounded-3xl mt-1 p-2'>
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
                    <View className='justify-between flex-row flex-wrap gap-1'>{renderMonths()}</View>
                    <View className='flex-row gap-2 justify-end mt-2'>
                        <TouchableOpacity
                            onPress={() => closeWithAnimation()}
                            className='bg-orange-500 px-6 py-2 rounded-2xl'>
                            <Text className='font-semibold mt-1 text-slate-50'>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            )}
            <Animatable.View
                ref={animatableRef}
                animation="slideInUp"
                duration={300}
            >
                {consumo && (
                    <View className='border border-slate-500 my-2 p-4 rounded-2xl'>
                        <Text className='font-light text-xl text-slate-100'>Consumo mês de {new Date(selectedYear, selectedMonth).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}</Text>
                        <Text className='font-bold text-3xl text-orange-500'>{convertBytes(consumo.total)}</Text>
                    </View>
                )}
                {isLoading ? (<View className='flex-1 items-center justify-center mt-24'><ActivityIndicator size={32} color={'#fff'} /></View>) :

                    consumo?.list && (
                        <FlatList
                            data={consumo.list}
                            keyExtractor={(item: ExtratoProps | any) => item.dataini}
                            ListEmptyComponent={(
                                <View className='flex-row items-center justify-center gap-2 mt-6'>
                                    <MaterialCommunityIcons size={32} color={'#fff'} name='download-off' />
                                    <Text className='text-slate-200 font-normal text-2xl'>Nenhum consumo para o mês selecionado</Text>
                                </View>
                            )}
                            renderItem={({ item, index }) => (
                                <Animatable.View
                                    animation="fadeInUp"
                                    duration={600}
                                    delay={index * 100}
                                    className='my-2'
                                >
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
                                </Animatable.View>
                            )}
                        />
                    )}
            </Animatable.View>
        </View>
    );
}

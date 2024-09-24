import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

export const CalendarPicker = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const months = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    // Função para renderizar os meses
    const renderMonths = () => {
        return months.map((month, index) => (
            <TouchableOpacity
                key={index}
                className='bg-slate-200 p-4 rounded-full items-center justify-center'
                onPress={() => console.log(`Mês selecionado: ${month} ${selectedYear}`)}
            >
                <Text className='font-bold' >{month}</Text>
            </TouchableOpacity>
        ));
    };

    const increaseYear = () => setSelectedYear(prev => prev + 1);
    const decreaseYear = () => setSelectedYear(prev => prev - 1);

    return (
        <View>
            <View className='flex-row justify-between my-6'>
                <TouchableOpacity onPress={decreaseYear}>
                    <Text className='text-slate-200'><MaterialCommunityIcons size={32} name='chevron-left'/></Text>
                </TouchableOpacity>
                <Text className='font-bold text-xl text-slate-200'>{selectedYear}</Text>
                <TouchableOpacity onPress={increaseYear}>
                    <Text className='text-slate-200'><MaterialCommunityIcons size={32} name='chevron-right'/></Text>
                </TouchableOpacity>
            </View>

            {/* Renderização dos meses */}
            <View className='flex-row flex-wrap justify-between gap-2 my-6'>
                {renderMonths()}
            </View>
        </View>
    );
};

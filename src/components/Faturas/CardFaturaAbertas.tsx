import { Text, View } from "react-native";


import { Button } from "../Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { TouchableOpacityProps } from "react-native";

const CardFaturaAbertas = ({ item, ...rest }: TouchableOpacityProps | any) => {


    return (
        <View className='rounded-2xl my-1 p-4 bg-orange-50 shadow-sm border border-orange-300/50'>
            <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="barcode" size={20} />
                <Text className='font-semibold text-gray-500 text-lg'>
                    Fatura de {new Date(item.vencimento).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}
                </Text>

            </View>
            <View className='flex-row justify-between my-2 px-2 gap-3'>
                <View>
                    <Text className='font-bold text-3xl'>
                        {item.valorcorrigido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        }
                    </Text>
                    <Text>Vencimento {new Date(item.vencimento).toLocaleDateString('pt-br')}</Text>
                </View>
                {new Date(item.vencimento) < new Date() && (
                    <View className='bg-red-50 items-center border border-red-400 justify-center px-2 rounded-xl h-10'>
                        <Text className='font-semibold text-red-400'>Atrasada</Text>
                    </View>
                )}
            </View>
            <Button {...rest} className="bg-green-500 flex-row p-2 m-2 rounded-xl gap-1 justify-center" icon="barcode-outline" title="Pagar" />
        </View>
    )
}

export default CardFaturaAbertas
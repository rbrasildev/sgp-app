import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router";
import { FlatList, TouchableOpacity, View, Text } from "react-native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState } from "react";


type ContratoProps = {
    contrato: number,
    razaosocial: string;
    planointernet: string;
    cpfcnpj: string;
}
export default function Contracts({ item }: any) {
    const { setItem } = useAsyncStorage('@sgp')

    const handleSaveData = async (cpfcnpj: string, contrato: string) => {
        try {
            setItem(JSON.stringify({
                cpfcnpj,
                contrato
            }));
            router.push('/(tabs)')

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <TouchableOpacity
            onPress={() => handleSaveData(item.cpfcnpj, item.contrato)}
            className=" bg-white p-4 my-1 rounded-2xl flex-row gap-6 shadow-sm border border-gray-100"
        >
            <View className="flex-row items-center">
                <MaterialCommunityIcons size={32} color={'#f97316'} name='file-document' />
                <Text className="text-gray-500 font-bold">{item.contrato}</Text>
            </View>
            <View className="flex-1" >
                <Text className="text-gray-600 font-bold" >{item.razaosocial}</Text>
                <Text className="text-gray-600 font-semibold">{item.planointernet}</Text>
            </View>
        </TouchableOpacity >

    )
}


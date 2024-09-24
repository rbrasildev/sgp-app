import getOrders from "@/services/getOrders";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import * as Animatable from 'react-native-animatable'
interface OrderProps {
    cliente: string
    oc_protocolo: number
    oc_conteudo: string
}
export default function Orders() {
    const [order, setOrder] = useState<OrderProps>([])
    const handleOrders = async () => {
        const response = await getOrders();

        setOrder(response)
    }

    useEffect(() => {
        handleOrders()
    }, [])


    return (
        <View className="flex-1 p-4 ustify-center bg-slate-900">
            <Text className="text-medium text-slate-100 text-2xl my-2">Meus chamados</Text>
            <FlatList
                bouncesZoom
                data={order}
                keyExtractor={(item) => String(item.oc_protocolo)}
                renderItem={({ item, index }) => (
                    <Animatable.View animation={'fadeInUp'} duration={300} delay={index * 100} className="gap-2 border border-slate-700 p-4 rounded-2xl mb-2">
                        <View>
                            <Text className="text-slate-100 text-lg mb-2 font-black">Protocolo: {item.oc_protocolo}</Text>
                            <Text className="text-slate-100 font-medium">Criada: {item.oc_data_cadastro}</Text>
                            <Text className="text-slate-100 font-light">Origem: {item.oc_origem_descricao}</Text>
                            <Text className="text-slate-100 font-medium">{item.oc_tipo_descricao}</Text>
                            <Text className="text-slate-100 font-thin">{item.oc_conteudo}</Text>
                            <Text className="text-slate-100 font-light">{item.os_servicoprestado}</Text>

                            <View className="flex-row gap-2 items-center justify-between">
                                <Text className="text-slate-100 font-medium">Encerrada: {item.oc_data_encerramento}</Text>
                                <Text className="text-green-500 font-medium">{item.oc_status_descricao}</Text>
                            </View>
                        </View>
                    </Animatable.View>
                )}
            />
        </View>
    )
}
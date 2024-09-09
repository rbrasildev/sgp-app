import { getInvoices } from '@/services/getInvoices';
import { Collapsible } from '@/src/components/Collapsible';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/Tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FaturaProps {
    codigopix: string;
    data_pagamento: Date
    gerapix: Boolean,
    id: Number
    idtransacao: Number
    linhadigitavel: String
    link: String
    link_completo: String
    numero_documento: Number
    pagarcartao: Boolean
    pagarcartaocheckout: String
    pagarcartaodebito: Boolean
    recibo: String
    status: String
    statusid: Number
    valor: Number
    valorcorrigido: Number
    vencimento: Date
    vencimento_atualizado: Date
}

export default function invoice() {
    const [titulo, setTitulo] = useState<FaturaProps[]>([])

    const handleInvoices = async () => {
        try {
            const response = await getInvoices();
            setTitulo(response.faturas)
        } catch (error) {

        }
    }

    useEffect(() => {
        handleInvoices();
    }, [titulo])


    const CardFaturas = ({ item }) => (
        <View className='rounded-2xl my-1 p-2 bg-white shadow'>
            <Collapsible
                title={item.vencimento}
                price={item.valorcorrigido}
                status={item.status}
                vencimento={item.vencimento}>
                <View className='gap-1 mt-4'>
                    <View className='bg-green-500 flex-row rounded-2xl gap-2 p-3'>
                        <MaterialCommunityIcons name='barcode' size={20} />
                        <Text>Código de barras</Text>
                    </View>
                    <View className='bg-green-500 flex-row rounded-2xl gap-2 p-3'>
                        <MaterialCommunityIcons name='barcode' size={20} />
                        <Text className='text-white'>Pix copia e cola</Text>
                    </View>
                    <View className='bg-green-500 flex-row rounded-2xl gap-2 p-3'>
                        <MaterialCommunityIcons name='barcode' size={20} />
                        <Text>Ver boleto</Text>
                    </View>
                </View>
            </Collapsible>
        </View>
    )

    return (
        <SafeAreaView>
            <View>
                <Tabs defaultValue="abertas">
                    <View className='bg-slate-900 py-10 px-4'>
                        <TabsList className='rounded-2xl p-2 bg-orange-100'>
                            <TabsTrigger value="abertas" id="abertas" title="Em aberto" />
                            <TabsTrigger value='pagas' id="pagas" title="Pagas" />
                        </TabsList>
                    </View>
                    <TabsContent value="abertas">
                        <FlatList
                            data={titulo.filter((item) => item.statusid == 1)}
                            renderItem={CardFaturas}
                            keyExtractor={(item) => String(item.id)}
                            contentContainerClassName='px-4'
                        />
                    </TabsContent>
                    <TabsContent value="pagas">
                        <FlatList
                            data={titulo.filter((item) => item.statusid == 2)}
                            renderItem={CardFaturas}
                            keyExtractor={(item) => String(item.id)}
                            contentContainerClassName='px-4'
                        />
                    </TabsContent>
                </Tabs>
            </View>
        </SafeAreaView>
    )
}
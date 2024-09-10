import { getInvoices } from '@/services/getInvoices';
import { Collapsible } from '@/src/components/Collapsible';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/Tabs';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useEffect, useState } from 'react';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';

import { FlatList, Linking, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import * as Animatable from 'react-native-animatable';
import { Button } from '@/src/components/Button';
import { Link } from 'expo-router';


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
    const [icon, setIcon] = useState('copy-outline')
    const [titulo, setTitulo] = useState<FaturaProps[]>([])
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [list, setList] = useState('')

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(list);
        setIcon('copy')
        setTimeout(() => {
            setIcon('copy-outline')
        }, 2000)
    }

    const openBottomSheet = (item: string) => {
        setList(item)
        bottomSheetRef.current?.expand()
    }

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

    const handleOpenLink = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {

            await Linking.openURL(url);
        } else {
            console.error(`Não é possível abrir o link: ${url}`);
        }
    };

    const CardFaturaAbertas = ({ item }) => (
        <Animatable.View animation={'slideInLeft'} className='rounded-2xl my-1 p-2 bg-white shadow'>
            <Collapsible
                title={item.vencimento}
                price={item.valorcorrigido}
                status={item.status}
                vencimento={item.vencimento}>
                <View className='gap-1 mt-4'>
                    <TouchableOpacity onPress={() => openBottomSheet(item.linhadigitavel)} className='bg-orange-500 flex-row rounded-2xl gap-2 p-3 px-4'>
                        <FontAwesome6 name='barcode' size={20} color='#fff' />
                        <Text className='text-white font-semibold'>Código de barras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => copyToClipboard(item.codigopix)} className='bg-orange-500 flex-row rounded-2xl gap-2 p-3 px-4'>
                        <FontAwesome6 name='pix' size={20} color={'#fff'} />
                        <Text className='text-white font-semibold'>Pix copia e cola</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleOpenLink(item.link_completo)} className='bg-orange-500 flex-row items-center rounded-2xl gap-2 p-3 px-4'>
                        <MaterialCommunityIcons name='cloud-download' size={22} color={'#fff'} />
                        <Text className='text-white font-semibold'>Baixar Fatura</Text>
                    </TouchableOpacity>

                </View>

            </Collapsible>

        </Animatable.View>
    )

    const CardFaturasPagas = ({ item }) => (
        <Animatable.View animation={'slideInRight'} className='rounded-2xl my-1 p-4 bg-white shadow'>
            <Text className='font-semibold text-gray-500 text-xl'>
                Fatura de {new Date(item.vencimento).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}
            </Text>
            <View className='flex-row justify-between my-2 px-2'>
                <Text className='font-bold text-3xl'>
                    {item.valorcorrigido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    }
                </Text>
                {item.status == 'Gerado' ? (
                    <View className='bg-orange-50 items-center justify-center px-4 rounded-xl '>
                        <Text className='font-semibold text-orange-400'>Em aberto</Text>
                    </View>
                ) : (
                    <View className='bg-green-50 border border-green-200 items-center justify-center px-4 rounded-xl '>
                        <Text className='font-semibold text-green-400'>{item.status}</Text>
                    </View>
                )}
            </View>

            <View className='flex-row gap-1 items-center px-2'>
                <MaterialCommunityIcons name='calendar' size={16} />
                <Text>Pago em {new Date(item.data_pagamento).toLocaleDateString('pt-BR')}</Text>
            </View>
        </Animatable.View >
    )

    return (
        <SafeAreaView>

            <View>
                <Tabs defaultValue="abertas">
                    <View className='bg-slate-900 py-10 px-4'>
                        <TabsList className='rounded-2xl bg-slate-200'>
                            <TabsTrigger value="abertas" id="abertas" title="Em aberto" />
                            <TabsTrigger value='pagas' id="pagas" title="Pagas" />
                        </TabsList>
                    </View>
                    <TabsContent style={{ marginBottom: 338 }} value="abertas">
                        <FlatList
                            data={titulo.filter((item) => item.statusid == 1)}
                            renderItem={CardFaturaAbertas}
                            keyExtractor={(item) => String(item.id)}
                            contentContainerClassName='px-4'
                            bouncesZoom
                        />
                    </TabsContent>
                    <TabsContent style={{ marginBottom: 338 }} value="pagas">
                        <FlatList
                            data={titulo.filter((item) => item.statusid == 2)}
                            renderItem={CardFaturasPagas}
                            keyExtractor={(item) => String(item.id)}
                            contentContainerClassName='px-4'
                            bouncesZoom
                        />
                    </TabsContent>
                </Tabs>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={[0.01, 400]}
                keyboardBehavior="fillParent"

            >
                <View className='p-8'>
                    <Text className='py-3 text-lg'>Código de Barras</Text>
                    <BottomSheetTextInput multiline={true} numberOfLines={3} className='bg-slate-100 rounded-2xl p-3 text-center' value={list} />
                    <Button style={{ marginVertical: 10 }} onPress={() => copyToClipboard()} icon={icon} title='Copiar código de barras' />
                </View>
            </BottomSheet>
        </SafeAreaView>
    )
}
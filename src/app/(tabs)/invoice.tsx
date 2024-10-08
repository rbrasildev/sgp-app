import { getInvoices } from '@/services/getInvoices';
import { Collapsible } from '@/src/components/Collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/Tabs';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useEffect, useState } from 'react';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { FlatList, Linking, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import * as Animatable from 'react-native-animatable';
import { Button } from '@/src/components/Button';
import ContentLoader, { Rect } from 'react-content-loader/native'
import { FaturaProps } from '@/src/types/SgpTypes';
import Toast from 'react-native-toast-message';




export default function invoice() {
    const [list, setList] = useState<[] | any>([])
    const [titulo, setTitulo] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const bottomSheetRef = useRef<BottomSheet>(null);

    const { height, width } = useWindowDimensions();


    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(list.codigo);
    }

    const openBottomSheet = (item: []) => {
        setList(item)
        bottomSheetRef.current?.expand()
    }

    const handleInvoices = async () => {
        try {
            setIsloading(true)
            const response = await getInvoices();
            setTitulo(response.faturas)
        } catch (error) {
            console.log(error)
        } finally {
            setIsloading(false)
        }
    }

    useEffect(() => {
        handleInvoices();
    }, [])

    const handleOpenLink = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {

            await Linking.openURL(url);
        } else {
            Toast.show({
                type: 'error',
                text1: `Não é possível abrir o link: ${url}`
            })

        }
    };

    const CardFaturaAbertas = ({ item }: any) => (
        <Animatable.View animation={'slideInLeft'} className='rounded-2xl my-1 p-2 bg-slate-100'>
            <Collapsible
                title={item.vencimento}
                price={item.valorcorrigido}
                status={item.status}
                vencimento={item.vencimento}>
                <View className='gap-1 mt-4'>
                    <TouchableOpacity onPress={() => openBottomSheet({ codigo: item.linhadigitavel, title: 'Código de barras' })} className='bg-orange-500 flex-row rounded-2xl gap-2 p-3 px-4'>
                        <FontAwesome6 name='barcode' size={20} color='#fff' />
                        <Text className='text-white font-semibold'>Código de barras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openBottomSheet({ codigo: item.codigopix, title: 'Código copia e cola PIX' })} className='bg-orange-500 flex-row rounded-2xl gap-2 p-3 px-4'>
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


    if (isLoading) {
        return (
            <View className='bg-slate-900'>
                <ContentLoader
                    backgroundColor='#334155'
                    foregroundColor='#ddd'
                    viewBox={`4 4 ${width} ${height}`}
                >
                    <Rect x="0" y="70" rx="16" ry="16" width="400" height="120" />
                    <Rect x="0" y="200" rx="16" ry="16" width="400" height="120" />
                    <Rect x="0" y="330" rx="16" ry="16" width="400" height="120" />
                    <Rect x="0" y="460" rx="16" ry="16" width="400" height="120" />
                    <Rect x="0" y="590" rx="16" ry="16" width="400" height="120" />
                </ContentLoader>
            </View>
        )
    }

    const CardFaturasPagas = ({ item }: FaturaProps | any) => (
        <Animatable.View animation={'slideInRight'} className='rounded-2xl mt-1 p-4 bg-slate-100'>
            <Text className='font-medium text-gray-500 text-xl'>
                Fatura de {new Date(item.vencimento).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}

            </Text>
            <View className='flex-row justify-between my-2 px-2'>
                <Text className='font-bold text-3xl line-through text-green-500'>
                    {item.valorcorrigido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    }
                </Text>
            </View>

            <View className='flex-row gap-1 items-center px-2 justify-between'>
                <View className='flex-row justify-center items-center gap-2'>
                    <MaterialCommunityIcons name='calendar' color={'#64748b'} size={16} />
                    <Text className='text-light text-slate-500'>Pago em {new Date(item.data_pagamento).toLocaleDateString('pt-BR')}</Text>
                </View>
                <TouchableOpacity onPress={() => handleOpenLink(item.recibo)} activeOpacity={0.7} className='p-2 bg-green-400 rounded-xl px-6 flex-row items-center gap-2'>
                    <MaterialCommunityIcons name='cloud-download' size={18} color={'#fff'} />
                    <Text className='text-slate-100'>Recibo</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View >
    )
    
    return (
        <View className='px-4 flex-1 bg-slate-900'>
            <Tabs defaultValue="abertas">
                <TabsList className='rounded-2xl bg-slate-200 my-1'>
                    <TabsTrigger value="abertas" id="abertas" title="Em aberto" />
                    <TabsTrigger value='pagas' id="pagas" title="Pagas" />
                </TabsList>
                <TabsContent value="abertas">
                    <FlatList
                        data={titulo.filter((item: FaturaProps) => item.statusid == 1)}
                        renderItem={CardFaturaAbertas}
                        keyExtractor={(item: FaturaProps) => String(item.id)}
                        contentContainerClassName='pb-[150]'
                        bouncesZoom
                        ListEmptyComponent={() => (<Text className='text-center mt-[50%] font-light'>Nenhuma fatura aberta</Text>)}

                    />
                </TabsContent>
                <TabsContent value="pagas">
                    <FlatList
                        data={titulo.filter((item: FaturaProps) => item.statusid == 2)}
                        renderItem={CardFaturasPagas}
                        keyExtractor={(item: FaturaProps) => String(item.id)}
                        contentContainerClassName=' pb-[150]'
                        bouncesZoom
                        ListEmptyComponent={() => (<Text className='text-center mt-[50%] font-light'>Nenhuma fatura aberta</Text>)}
                    />
                </TabsContent>
            </Tabs>

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={[0.01, 350]}
                keyboardBehavior="fillParent"
                backgroundStyle={{ backgroundColor: '#fff', elevation: 1, borderWidth: 1, borderColor: '#ddd' }}

            >
                <View className='px-6'>
                    <View className='flex-row justify-between items-center pb-4'>
                        <Text className='text-lg font-medium'>{list.title}</Text>
                        <TouchableOpacity><MaterialCommunityIcons onPress={() => bottomSheetRef.current?.close()} name='close' size={20} /></TouchableOpacity>
                    </View>
                    <BottomSheetTextInput multiline={true} numberOfLines={3} className='bg-slate-100 rounded-2xl p-3 text-center' value={list.codigo} />
                    <Button style={{ marginVertical: 10 }} onPress={() => copyToClipboard()} icon={'copy'} title='Copiar' />
                </View>
            </BottomSheet>
        </View>
    )
}
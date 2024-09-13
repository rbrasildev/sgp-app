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




export default function invoice() {
    const [icon, setIcon] = useState('copy-outline')
    const [list, setList] = useState<[] | any>([])
    const [titulo, setTitulo] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const bottomSheetRef = useRef<BottomSheet>(null);

    const { height, width } = useWindowDimensions();


    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(list.codigo);
        setIcon('copy')
        setTimeout(() => {
            setIcon('copy-outline')
        }, 2000)
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
            console.error(`Não é possível abrir o link: ${url}`);
        }
    };

    const CardFaturaAbertas = ({ item }: any) => (
        <Animatable.View animation={'slideInLeft'} className='rounded-2xl my-1 p-2 bg-white shadow'>
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
            <View className='flex-1 p-4 mt-6'>
                <ContentLoader
                    backgroundColor='#ccc'
                    foregroundColor='#ddd'
                    viewBox={`0 0 ${width} ${height}`}
                >
                    <Rect x="10" y="43" rx="8" ry="8" width="350" height="60" />
                    <Rect x="10" y="150" rx="8" ry="8" width="350" height="100" />
                    <Rect x="10" y="260" rx="8" ry="8" width="350" height="100" />
                    <Rect x="10" y="370" rx="8" ry="8" width="350" height="100" />
                    <Rect x="10" y="480" rx="8" ry="8" width="350" height="100" />
                    <Rect x="10" y="590" rx="8" ry="8" width="350" height="100" />
                </ContentLoader>
            </View>
        )
    }

    const CardFaturasPagas = ({ item }: FaturaProps | any) => (
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
                            data={titulo.filter((item: FaturaProps) => item.statusid == 1)}
                            renderItem={CardFaturaAbertas}
                            keyExtractor={(item: FaturaProps) => String(item.id)}
                            contentContainerClassName='px-2'
                            bouncesZoom
                        />
                    </TabsContent>
                    <TabsContent style={{ marginBottom: 338 }} value="pagas">
                        <FlatList
                            data={titulo.filter((item: FaturaProps) => item.statusid == 2)}
                            renderItem={CardFaturasPagas}
                            keyExtractor={(item: FaturaProps) => String(item.id)}
                            contentContainerClassName='px-2'
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
                backgroundStyle={{ backgroundColor: '#fff', elevation: 1, borderWidth: 1, borderColor: '#ddd' }}

            >
                <View className='p-8'>
                    <Text className='py-3 text-lg font-medium'>{list.title}</Text>
                    <BottomSheetTextInput multiline={true} numberOfLines={3} className='bg-slate-100 rounded-2xl p-3 text-center' value={list.codigo} />
                    <Button style={{ marginVertical: 10 }} onPress={() => copyToClipboard()} icon={icon} title='Copiar' />
                </View>
            </BottomSheet>
        </SafeAreaView>
    )
}
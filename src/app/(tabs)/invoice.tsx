import { Collapsible } from '@/src/components/Collapsible';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/Tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function invoice() {

    return (
        <SafeAreaView>
            <View className='p-6'>
                <Text className='text-orange-500'>Faturas</Text>
                <Tabs defaultValue="abertas">
                    <TabsList className='p-2 rounded-2xl'>
                        <TabsTrigger className='bg-green-400' value="abertas" id="abertas" title="Abertas" />
                        <TabsTrigger value='pagas' id="pagas" title="Pagas" />
                    </TabsList>
                    <TabsContent className='border-0 bg-white p-4 rounded-2xl' value="abertas">
                        <Collapsible title="Fatura mês setemrbo de 2024" price={'120,00'} status={'Em Aberto'} vencimento={"09/09/2024"}>
                            <View className='gap-1 mt-4'>
                                <View className='bg-blue-500 flex-row rounded-md gap-2 p-3'>
                                    <MaterialCommunityIcons name='barcode' size={20} />
                                    <Text>Código de barras</Text>
                                </View>
                                <View className='bg-blue-500 flex-row rounded-md gap-2 p-3'>
                                    <MaterialCommunityIcons name='barcode' size={20} />
                                    <Text>Pix copia e cola</Text>
                                </View>
                                <View className='bg-blue-500 flex-row rounded-md gap-2 p-3'>
                                    <MaterialCommunityIcons name='barcode' size={20} />
                                    <Text>Ver boleto</Text>
                                </View>
                            </View>
                        </Collapsible>
                    </TabsContent>
                    <TabsContent value="pagas">
                        <Collapsible title="Fatura mês setemrbo de 2024" price={'120,00'} status={'Pago'} vencimento={"09/09/2024"}>
                            <View className='gap-1 mt-4'>
                                <View className='bg-blue-500 flex-row rounded-md gap-2 p-3'>
                                    <MaterialCommunityIcons name='barcode' size={20} />
                                    <Text>Código de barras</Text>
                                </View>
                                <View className='bg-blue-500 flex-row rounded-md gap-2 p-3'>
                                    <MaterialCommunityIcons name='barcode' size={20} />
                                    <Text>Pix copia e cola</Text>
                                </View>
                                <View className='bg-blue-500 flex-row rounded-md gap-2 p-3'>
                                    <MaterialCommunityIcons name='barcode' size={20} />
                                    <Text>Ver boleto</Text>
                                </View>
                            </View>
                        </Collapsible>
                    </TabsContent>
                </Tabs>
            </View>
        </SafeAreaView>
    )
}
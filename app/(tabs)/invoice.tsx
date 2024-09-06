import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, Text, View } from 'react-native';

export default function invoice() {

    return (
        <SafeAreaView className='flex-1 p-4 mt-4'>
            <Text className='text-danger'>Faturas</Text>
            <Tabs defaultValue="abertas">
                <TabsList className='justify-between'>
                    <TabsTrigger value="abertas" id="abertas" title="Abertas" />
                    <TabsTrigger value='pagas' id="pagas" title="Pagas" />
                </TabsList>
                <TabsContent className='border-0' value="abertas">
                    <Collapsible title="Fatura mês setemrbo de 2024">
                        <View className='gap-2'>
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
                    <Text className="text-primary">Change your password here.</Text>
                </TabsContent>
            </Tabs>

        </SafeAreaView>
    )
}
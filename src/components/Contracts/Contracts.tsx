import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";




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
            activeOpacity={0.7}
            onPress={() => handleSaveData(item.cpfcnpj, item.contrato)}
            className="p-4 flex-row gap-4 border-b-gray-600/30 border"
        >
            <View className="flex-row items-center justify-center w-12 h-12 rounded-xl bg-orange-300">
                <MaterialCommunityIcons size={32} color={'#fb923c'} name='file-document' />
            </View>
            <View className="flex-1" >
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-500 font-bold text-xl">{item.contrato}</Text>
                    <Text className="text-gray-400 font-semibold text-wrap" >{item.razaosocial}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600 font-light text-wrap">{item.planointernet}</Text>
                    <Text className="text-lime-900 font-bold text-xl">{item.planointernet_valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                </View>
                {/* <View className="border border-b-gray-500"><Text>Texte</Text></View> */}
            </View>
        </TouchableOpacity >

    )
}


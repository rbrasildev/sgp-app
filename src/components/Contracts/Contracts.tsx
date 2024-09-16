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
            onPress={() => handleSaveData(item.cpfcnpj, item.contrato)}
            className=" bg-blue-100 p-4 my-1 rounded-2xl flex-row gap-6  border border-gray-100"
        >
            <View className="flex-row items-center">
                <MaterialCommunityIcons size={32} color={'#f97316'} name='file-document' />
                <Text className="text-gray-500 font-bold">{item.contrato}</Text>
            </View>
            <View className="flex-1" >
                <Text className="text-gray-600 font-bold" >{item.razaosocial}</Text>
                <Text className="text-gray-600 font-light">{item.planointernet}</Text>
            </View>
        </TouchableOpacity >

    )
}


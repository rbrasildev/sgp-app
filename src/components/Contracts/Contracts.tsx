import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router";
import { FlatList, TouchableOpacity, View, Text } from "react-native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";


type ContratoProps = {
    data: ArrayLike<any>;
    contrato: number,
    razaosocial: string;
    planointernet: string;
    cpfcnpj: string;
}
export default function Contracts({ data }: ContratoProps) {
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

        <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => handleSaveData(item.cpfcnpj, item.contrato)}
                    className=" bg-orange-200 p-4 my-1 rounded-xl flex-row gap-6"
                >
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons size={32} color={'#fff'} name='file-document' />
                        <Text className="text-gray-500 font-bold">{item.contrato}</Text>
                    </View>
                    <View >
                        <Text className="text-gray-600 font-bold" >{item.razaosocial}</Text>
                        <Text className="text-gray-600 font-semibold">{item.planointernet}</Text>
                    </View>
                </TouchableOpacity >
            )}
            keyExtractor={item => item.contrato}
        />
    )
}


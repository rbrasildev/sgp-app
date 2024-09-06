import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router";
import { FlatList, TouchableOpacity, View, Text } from "react-native"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type ContratoProps = {
    contrato: number,
    razaosocial: string;
    planointernet: string;
    cpfcnpj: string;
}
const Contracts = ({ contrato }: ContratoProps) => {
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
            data={contrato}
            renderItem={({ item }) => (
                <View>
                    <TouchableOpacity
                        onPress={() => handleSaveData(item.cpfcnpj, item.contrato)}
                        className="just-center"

                    >
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons size={20} color={'#eee'} name='file-document' />
                            <Text style={{ color: '#333' }}>{item.contrato}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text className="text-gray-600 font-bold" >{item.razaosocial}</Text>
                            <Text className="text-gray-600 font-semibold">{item.planointernet}</Text>
                        </View>
                    </TouchableOpacity >
                </View >
            )}
            keyExtractor={item => item.contrato}
            nestedScrollEnabled={true}
        />

    )
}
// const styles = StyleSheet.create({

//     buttonList: {
//         alignItems: 'center',
//         backgroundColor: 'orange',
//         flexDirection: 'row',
//         borderWidth: 1,
//         borderColor: '#dddd',
//         marginVertical: 2,
//         padding: 10,
//         borderRadius: 16,
//         gap: 16

//     }
// })
export default Contracts;
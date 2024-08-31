import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router";
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from "react-native"
import * as Animatable from 'react-native-animatable';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const Contracts = ({ contratos, ...rest }) => {
    const { setItem } = useAsyncStorage('@sgp')


    const handleSaveData = async (cpfcnpj: string, contrato: string) => {
        console.log(contrato)
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
        <Animatable.View animation="fadeInUp"
            {...rest}
            style={styles.popUp}
        >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10
            }}>
                <Text style={{ fontSize: 20, paddingVertical: 10 }}>Selecione o contrato</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons size={20} name="close" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={contratos}
                renderItem={({ item }) => (

                    <TouchableOpacity
                        onPress={() => handleSaveData(item.cpfcnpj, item.contrato)}
                        style={styles.buttonList}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons size={20} color={'#666'} name='file-document' />
                            <Text style={{ color: '#333' }}>{item.contrato}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#333', fontWeight: '700' }}>{item.razaosocial}</Text>
                            <Text style={{ color: '#666' }}>{item.planointernet}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.contrato}
            />
        </Animatable.View>
    )
}
const styles = StyleSheet.create({
    popUp: {
        backgroundColor: '#f3f3f3',
        padding: 15,
        borderTopRightRadius: 20,
        borderTopStartRadius: 20,
        maxHeight: 300,
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    buttonList: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 2,
        padding: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#eee",
    }
})
export default Contracts;
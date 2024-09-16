import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import typeOcurrence from "@/services/typeOcurrence";
import Toast from "react-native-toast-message";
import createTicket from "@/services/createTicket";

interface OcurrenceProps {
    codigo: number
    descricao: string
}

export default function Support() {
    const [selectedValue, setSelectedValue] = useState<number>(5);
    const [ocurrence, setOcurrence] = useState([])
    const [conteudo, setConteudo] = useState('');


    const handleTypeOcurrence = async () => {
        const response = await typeOcurrence();
        setOcurrence(response);
    }

    const handleSaveOcurrange = async () => {

        if (conteudo === '') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'O campo mensagem está vazio',
                text1Style: { fontSize: 16 },
                text2Style: { fontSize: 14 }
            })
            return;
        }

        try {
            const response = await createTicket(conteudo, selectedValue)

            if (response.status === 0) {
                Toast.show({
                    type: "success",
                    text1: 'Chamado aberto com sucesso',
                    text2: `Protocolo: ${response.protocolo}`,
                    text1Style: { fontSize: 16 },
                    text2Style: { fontSize: 14 },
                    visibilityTime: 10000
                })
            }

            if (response.status === 3) {
                Toast.show({
                    type: "error",
                    text1: response.msg,
                    text2: `Protocolo: ${response.protocolo}`,
                    text1Style: { fontSize: 16 },
                    text2Style: { fontSize: 14 },
                    visibilityTime: 10000
                })
            }


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleTypeOcurrence();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
            <KeyboardAvoidingView behavior="position">
                <ScrollView>
                    <View className="justify-center items-center">
                        <View className="rounded-full bg-slate-900 p-4">
                            <MaterialCommunityIcons name="headphones" size={64} color={'#fff'} />
                        </View>
                        <Text className="font-bold text-2xl my-2">Precisa de ajuda?</Text>
                    </View>

                    <View className="bg-white rounded-2xl border border-orange-100">
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            {ocurrence.map((item: OcurrenceProps) => (<Picker.Item key={item.codigo} label={item.descricao} value={item.codigo} />))}
                        </Picker>
                    </View>

                    <Input
                        multiline={true}
                        numberOfLines={6}
                        style={{ textAlignVertical: 'top', }}
                        placeholder="Digite sua mensagem"
                        onChangeText={setConteudo}
                        value={conteudo}
                    />
                    <Button icon="construct" onPress={handleSaveOcurrange} title="Enviar" />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

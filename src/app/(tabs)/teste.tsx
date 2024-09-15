import { KeyboardAvoidingView, View, TextInput, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button } from "@/src/components/Button";


export default function Teste() {
    const [isSelect, setIsSelected] = useState('')
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');

    console.log(isSelect, telefone, mensagem)

    return (
        <KeyboardAvoidingView
            className="container p-4 items-center flex-1"
            behavior="position"
            style={{ height: 200 }}
        >
            <ScrollView>
                <View>
                   
                        <Text className="text-gray-100">Antes de abrir um chmado, certifique-se que a entrada WAN do seu roteador está ligada (A entrada fica em destaque atrás do seu roteador) se estiver, retire seu roteador da energia por cerca de 2 minutos, se ao religar o problema persistir, solicite o suporte preenchendo os campos abaixos.</Text>
                   
                </View>
                <View className="gap-2">
                    <Picker
                        style={{ backgroundColor: '#fff', marginVertical: 5, borderWidth: 1, borderColor: "#333" }}
                        selectedValue={isSelect}
                        onValueChange={(item) => setIsSelected(item)}
                    >
                        <Picker.Item
                            label="Selecione o tipo de resposta"
                            value={null}
                            enabled={false}
                        />
                        <Picker.Item label="Sem acesso" value="access" />
                        <Picker.Item label="Acesso lento" value="slow" />

                    </Picker>
                    <TextInput
                        value={telefone}
                        onChangeText={setTelefone}
                        className="border border-slate-200 bg-slate-50 p-4 rounded-md"
                        placeholder="Telefone para contato" />
                    <TextInput
                        onChangeText={setMensagem}
                        value={mensagem}
                        className="border border-slate-200 bg-slate-50 p-4 rounded-lg text-start"
                        placeholder="Descrição"
                        multiline
                        numberOfLines={6} // Adjust the number of lines as needed
                    />
                </View>
                <Button
                    style={{ borderRadius: 4, marginTop: 20 }}
                    title="Enviar"
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
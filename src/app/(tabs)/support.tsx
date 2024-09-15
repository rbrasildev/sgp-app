import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";

export default function Support() {
    const [selectedValue, setSelectedValue] = useState("java");
    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <KeyboardAvoidingView behavior="position">
                <ScrollView>
                    <View className="justify-center items-center">
                        <View className="rounded-full bg-slate-900 p-4">
                            <Ionicons name="call-sharp" size={64} color={'#fff'} />
                        </View>
                        <Text className="font-bold text-2xl my-2">Precisa de ajuda?</Text>
                    </View>

                    <View className="bg-white rounded-2xl border border-orange-100">
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                            <Picker.Item label="Python" value="python" />
                            <Picker.Item label="PHP" value="php" />
                        </Picker>
                    </View>
                    <Input
                        placeholder="Assunto"
                    />
                    <Input
                        multiline={true}
                        numberOfLines={4}
                        style={{ textAlignVertical: 'top' }}
                        placeholder="Motivo"
                    />
                    <Button icon="construct" title="Enviar" />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

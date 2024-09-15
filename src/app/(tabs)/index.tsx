import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ScrollView
} from "react-native";

import api from "@/services/api";
import { router } from "expo-router";
import auth from "@/src/constants/auth";
import { Button } from "@/src/components/Button";
import { getInvoices } from "@/services/getInvoices";
import * as Animatable from "react-native-animatable";
import { FlatList } from "react-native-gesture-handler";
import React, { useRef, useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import CardFaturaAbertas from "@/src/components/Faturas/CardFaturaAbertas";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";

import WifiStatus from "@/src/components/Wifi/WifiStatus";
import type { FaturaProps, ContratoProps } from "@/src/types/SgpTypes";
import { UsageData } from "@/src/components/Wifi/UsageData";
import Toast from 'react-native-toast-message';
import promisePayment from "@/services/promisePayment";

export default function HomeScreen() {
  const [titulo, setTitulo] = useState([]);
  const [list, setList] = useState<FaturaProps | any>([]);
  const [icon, setIcon] = useState("copy-outline");
  const [isLoading, setIsloading] = useState(false);

  const [data, setData] = useState<ContratoProps | any>([]);
  const { height, width } = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { removeItem } = useAsyncStorage("@sgp");

  const logout = async () => {
    removeItem();
    router.push("/login");
  };

  const openBottomSheet = (item: FaturaProps) => {
    setList(item);
    bottomSheetRef.current?.expand();
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(list.codigopix);
    setIcon("copy");
    setTimeout(() => {
      setIcon("copy-outline");
    }, 2000);
  };

  const handleContrato = async () => {
    try {
      setIsloading(true);
      const AuthUser = await auth();
      const data = await api(AuthUser.cpfcnpj, "123456");
      const invoice = await getInvoices();

      const filtered = data.contratos.filter(
        (item: ContratoProps) => item.contrato == AuthUser.contrato,
      );

      setData(filtered[0]);
      setTitulo(invoice.faturas);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);

    }
  };

  const promisingPayment = async () => {
    const response = await promisePayment();

    if (response.status === 1) {
      Toast.show({
        type: 'success',
        text1: `Sua inteirnet foi liberada ${response.razaosocial}`,
        text2: response.msg,
        onHide: () => handleContrato()
      })
      console.log(response)
    }

    if (response.status === 2) {
      Toast.show({
        visibilityTime: 10000,
        type: 'error',
        text1: `Me desculpe, ${response.razaosocial}`,
        text2: response.msg
      })
    }

  }


  useEffect(() => {
    handleContrato();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 p-4 mt-6">
        <ContentLoader
          backgroundColor="#ccc"
          foregroundColor="#ddd"
          viewBox={`0 0 ${width} ${height}`}
        >
          <Rect x="90" y="10" rx="8" ry="8" width="200" height="100" />
          <Rect x="20" y="120" rx="8" ry="8" width="300" height="25" />
          <Circle cx="340" cy="130" r="15" />
          <Rect x="20" y="155" rx="8" ry="8" width="345" height="100" />
          <Rect x="20" y="265" rx="8" ry="8" width="345" height="300" />
        </ContentLoader>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-black">
      <View className="bg-gray-100 h-full">
        <View className="bg-slate-900 p-4 justify-center items-center relative">
          <Image
            className="w-[134px] h-20"
            source={require("@/assets/images/logo_white.png")}
          />
          <View className="flex-row items-center justify-between w-full mb-11">
            <Text className="text-slate-100 text-wrap my-3 font-semibold text-xl">
              Olá, {data.razaosocial}
            </Text>
            <TouchableOpacity onPress={logout}>
              <MaterialCommunityIcons name="logout" size={28} color={"#fff"} />
            </TouchableOpacity>
          </View>

          <View className="bg-white m-4 py-6 absolute bottom-[-72px] left-0 right-0 shadow-md  rounded-3xl p-8 flex-row justify-between">
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={32}
                color={
                  data.status?.trim() === "Suspenso"
                    ? "orange"
                    : data.status?.trim() === "Ativo"
                      ? "green"
                      : "red"
                }
              />
              <Text className="text-slate-500 text-xl font-bold">
                {data.status}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-slate-900 text-xl font-medium">
                CONTRATO
              </Text>
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons
                  name="file-outline"
                  color={"green"}
                  size={32}
                />
                <Text className="text-slate-900 text-xl font-bold">
                  {data.contrato}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView className="p-4 gap-2 mt-14">
          <Animatable.View className="flex-row gap-4" animation={"slideInLeft"}>
            <View className=" bg-white flex-1 rounded-3xl p-4 gap-3">
              <View>
                <View className="flex-row items-center mx-2 gap-2">
                  <Ionicons name="barcode-sharp" size={20} />
                  <Text className="text-xl font-normal">Segunda via de Fatura</Text>
                </View>

                <FlatList
                  horizontal
                  data={titulo.filter(
                    (item: FaturaProps) =>
                      item.statusid === 1 &&
                      new Date(item.vencimento).getMonth() <=
                      new Date().getMonth() + 1,
                  )}
                  renderItem={({ item }) => (
                    <CardFaturaAbertas
                      onPress={() => openBottomSheet(item)}
                      item={item}
                    />
                  )}
                  keyExtractor={(item: FaturaProps) => String(item.id)}
                  contentContainerStyle={{ gap: 5, margin: 5 }}
                  ListEmptyComponent={() => (<Text className="font-light text-lime-600 text-lg ml-10 my-2 text-center">Nenhuma fatura em aberto 😉</Text>)}

                />
              </View>
              {data.status?.trim() === "Suspenso" && (
                <View>
                  <View className="flex-row items-center gap-2">
                    <MaterialCommunityIcons
                      name="lock"
                      size={20}
                      color={"orange"}
                    />
                    <Text className="text-lg my-2 font-medium">
                      Sua internet está suspensa
                    </Text>
                  </View>
                  <Text className="font-thin mb-3 px-3">
                    Não fique offline, clique no botão abaixo e continue
                    navegando...
                  </Text>
                  <Button onPress={() => promisingPayment()} icon="lock-open" title="Liberar sua internet" />
                </View>
              )}
            </View>
          </Animatable.View>
          <View className="flex-row shadow-sm items-center justify-between bg-blue-100 rounded-3xl mt-2 mb-6">
            <WifiStatus />
            <UsageData />
          </View>
        </ScrollView>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={[0.01, 250]}
          keyboardBehavior="fillParent"
          backgroundStyle={{
            backgroundColor: "#fff",
            elevation: 1,
            borderWidth: 1,
            borderColor: "#ddd",
          }}
        >
          <View className="p-8">
            <BottomSheetTextInput
              multiline={true}
              numberOfLines={3}
              className="bg-slate-100 rounded-2xl p-3 text-center border border-gray-200"
              value={
                list.codigopix
                  ? list.codigopix
                  : "Essa fatura ainda não foi registrada, por favor entrar em contato com a central para solicitar o registro da fatura"
              }
            />
            <Button
              style={{ marginVertical: 10 }}
              onPress={() => copyToClipboard()}
              icon={icon}
              title="Copiar"
            />
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}

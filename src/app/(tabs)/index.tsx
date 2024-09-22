
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
import QRCode from 'react-native-qrcode-svg';

export default function HomeScreen() {
  const [titulo, setTitulo] = useState([]);
  const [list, setList] = useState<FaturaProps | any>([]);
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
  };

  const handleContrato = async () => {
    try {
      setIsloading(true);
      const AuthUser = await auth();
      const data = await api(AuthUser.cpfcnpj, "123456");
      const invoice = await getInvoices();

      if (data.contratos) {
        setData(data.contratos.filter((item: ContratoProps) => item.contrato == AuthUser.contrato)[0]);
      }

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
      <View className="flex-1 px-2 bg-slate-900">
        <ContentLoader
          backgroundColor="#334155"
          foregroundColor="#ddd"
          viewBox={`4 4 ${width} ${height}`}
        >
          <Rect x="0" y="04" rx="22" ry="22" width="400" height="100" />
          <Rect x="0" y="120" rx="22" ry="22" width="400" height="100" />
          <Rect x="0" y="235" rx="15" ry="15" width="250" height="40" />
          <Rect x="0" y="290" rx="22" ry="22" width="400" height="270" />
          <Rect x="0" y="575" rx="22" ry="22" width="150" height="100" />
        </ContentLoader>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-900 px-4">

      <View className="flex-row items-center my-4 gap-2 border p-2 border-slate-400 rounded-2xl">
        <View className="p-4 bg-slate-400 rounded-full justify-center items-center">
          <MaterialCommunityIcons name="account" color={'#fff'} size={32} />
        </View>

        <View className="justify-center flex-wrap">
          <Text className="text-slate-100 font-semibold antialiased mb-[-5] max-w-64">{data.razaosocial}</Text>
          <Text className="font-light  text-slate-50">{data.planointernet}</Text>
          <Text className="font-thin mt-[-5px] text-slate-50">Vencimento todo dia {data.vencimento}</Text>
        </View>
        <WifiStatus />
      </View>


      <View className="bg-slate-50 p-4 shadow-md  rounded-3xl flex-row justify-between">
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
          <Text className="text-slate-900 text-xl font-normal">
            {data.status}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-slate-900 text-xl font-normal">
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

      <ScrollView>
        <Animatable.View className="flex-row gap-4" animation={"slideInLeft"}>
          <View className="mt-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="barcode-sharp" size={20} color={'#f1f5f9'} />
              <Text className="text-xl text-slate-100 font-normal">Segunda via de Fatura</Text>
            </View>

            <FlatList
              horizontal
              data={titulo.filter((item: FaturaProps) => item.statusid === 1 && new Date(item.vencimento).getMonth() <= new Date().getMonth() + 1)}
              style={{ alignContent: 'center' }}
              renderItem={({ item }) => (
                <CardFaturaAbertas
                  onPress={() => openBottomSheet(item)}
                  item={item}
                />
              )}
              keyExtractor={(item: FaturaProps) => String(item.id)}
              contentContainerStyle={{ gap: 5, margin: 5 }}
              ListEmptyComponent={() => (<Text className="font-light text-lime-600 text-lg ml-10 my-2 text-center">Nenhuma fatura em aberta 😉</Text>)}

            />

            {data.status?.trim() === "Suspenso" && (
              <>
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name="lock"
                    size={20}
                    color={"orange"}
                  />
                  <Text className="text-lg text-slate-100 font-medium mb-[-4px]">
                    Sua internet está suspensa
                  </Text>
                </View>

                <Text className="font-thin text-slate-200 my-2 px-3">
                  Não fique offline, clique no botão abaixo e continue
                  navegando...
                </Text>
                <Button onPress={() => promisingPayment()} icon="lock-open" title="Liberar sua internet" />
              </>
            )}
          </View>
        </Animatable.View>

        <UsageData />

      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[0.01, '70%']}
        keyboardBehavior="fillParent"
        backgroundStyle={{
          backgroundColor: "#fff",
          elevation: 1,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <View className="p-8">
          <View className="items-center my-6">

            <QRCode
              value={list.codigopix}
              logo={require("@/assets/images/logo.png")}
              logoSize={64}
              size={196}
            />
          </View>
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
            icon="copy"
            title="Copiar"
          />
        </View>
      </BottomSheet>
    </View>
  );
}

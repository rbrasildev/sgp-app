import extrauso from "@/services/getExtratoUso";
import { convertBytes } from "@/src/constants/convertBytes";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import type { ExtratoProps } from "@/src/types/SgpTypes";

export function UsageData() {
	const [extratoData, setExtratoData] = useState<ExtratoProps | any>([]);
	const hanldeExtratoUso = async () => {
		try {
			const response = await extrauso(new Date());
			setExtratoData(response);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		hanldeExtratoUso();
	}, []);

	return (
		<View className="p-4 bg-white rounded-3xl">
			<Text className="font-medium">Uso de dados</Text>
			<Text className="font-bold font-gray-400 text-3xl">
				{convertBytes(extratoData.total)}
			</Text>
			<Text className="font-thin">Útimos 30 dias</Text>
		</View>
	);
}

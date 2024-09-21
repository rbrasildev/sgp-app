import extrauso from "@/services/getExtratoUso";
import { convertBytes } from "@/src/constants/convertBytes";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import type { ExtratoProps } from "@/src/types/SgpTypes";

export function UsageData() {
	const [extratoData, setExtratoData] = useState<ExtratoProps | any>([]);
	const [isLoading, setIsloading] = useState(false);
	const hanldeExtratoUso = async () => {
		setIsloading(true)
		try {
			const response = await extrauso(new Date());
			setExtratoData(response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsloading(false)
		}
	};

	useEffect(() => {
		hanldeExtratoUso();
	}, []);

	return (
		<View className="my-4 rounded-3xl">
			<Text className="font-medium text-slate-100">Uso de dados</Text>
			<Text className="font-bold text-slate-200 text-3xl">
				{convertBytes(extratoData.total)}
			</Text>
			<Text className="font-thin text-slate-300">Útimos 30 dias</Text>
		</View>
	);
}

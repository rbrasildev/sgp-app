import { getVerifyAccess } from "@/services/getVerifyAccess";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Text, useWindowDimensions, View } from "react-native";


interface WifiProps {
	msg: string;
	status: number;
}

const WifiStatus = () => {
	const [wifiStatus, setWifiStatus] = useState<WifiProps | any>([]);
	const [isLoading, setIsLoading] = useState(false)
	const { height, width } = useWindowDimensions();
	const handleWifiStatus = async () => {
		try {
			setIsLoading(true)
			const response = await getVerifyAccess();
			setWifiStatus(response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false)
		}
	};

	useEffect(() => {
		handleWifiStatus();
	}, []);

	if (isLoading) {
		return (<ContentLoader
			backgroundColor="#ccc"
			foregroundColor="#ddd"
			viewBox={`4 4 ${width} ${height}`}
		>
			<Rect x="40" y="14" rx="7" ry="6" width="80" height="18" />
			<Rect x="4" y="10" rx="10" ry="10" width="28" height="28" />
		</ContentLoader>)
	}

	return (
		<View className="items-center">
			{wifiStatus.status === 1 ? (
				<>
					<MaterialCommunityIcons color={"green"} size={32} name="router-wireless" />
					<View>
						<Text className="font-light text-sm text-slate-300">Online</Text>
					</View>
				</>
			) : (
				<>
					<MaterialCommunityIcons color={"red"} size={28} name="wifi-off" />
					<View>
						<Text className="font-light text-slate-300">Offline</Text>
					</View>
				</>
			)}
		</View>
	);
};

export default WifiStatus;

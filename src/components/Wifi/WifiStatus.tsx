import { getVerifyAccess } from "@/services/getVerifyAccess";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface WifiProps {
	msg: string;
	status: number;
}

const WifiStatus = () => {
	const [wifiStatus, setWifiStatus] = useState<WifiProps | any>([]);

	const handleWifiStatus = async () => {
		try {
			const response = await getVerifyAccess();
			setWifiStatus(response);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		handleWifiStatus();
	}, []);

	return (
		<View className="flex-row items-center rounded-2xl justify-center p-6 gap-2">
			{wifiStatus.status === 1 ? (
				<>
					<MaterialCommunityIcons color={"green"} size={28} name="wifi-check" />
					<View>
						<Text className="font-medium text-lg">Online</Text>
					</View>
				</>
			) : (
				<>
					<MaterialCommunityIcons color={"red"} size={28} name="wifi-off" />
					<View>
						<Text className="font-medium text-lg">Wifi Offline</Text>
					</View>
				</>
			)}
		</View>
	);
};

export default WifiStatus;

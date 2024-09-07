import { ActivityIndicator, View } from "react-native";

type ActiveIndicatorProps = {
    size: number;
    color: string;
}

export default function Load({ color, size }: ActiveIndicatorProps) {
    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={size} color={color} />
        </View>
    )
}
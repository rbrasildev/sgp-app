import { ActivityIndicator, View } from "react-native";

type ActiveIndicatorProps = {
    size: number;
    color: string;
}

export default function Load({ color, size }: ActiveIndicatorProps) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={size} color={color} />
        </View>
    )
}
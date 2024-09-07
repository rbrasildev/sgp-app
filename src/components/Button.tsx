import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string
  isLoading: boolean,
  icon: keyof typeof Ionicons.glyphMap
}
export function Button({
  title,
  isLoading,
  icon,
  ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="flex-row w-full items-center justify-center gap-2 bg-orange-500 rounded-xl p-5"
      disabled={isLoading}
      activeOpacity={0.8}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={'black'} />
      ) : (
        <>
          <Ionicons name={icon} size={20} />
          <Text className="font-bold">{title}</Text>
        </>

      )}
    </TouchableOpacity>
  )
}
import { Text, TextInput, TextInputProps, View } from "react-native";

interface LabelPros extends TextInputProps {
  label: string
}

export function InputLabelFixed({ label, ...rest }: LabelPros) {
  return (
    <View className="relative">
      <Text className='text-orange-500 font-thin text-lg border- bg-slate-900 p-2 absolute top-[-10px] left-6 z-10'>{label}</Text>
      <TextInput
        className='p-4 bg-slate-900 text-white rounded-2xl my-2 font-normal text-lg border-spacing-0.1 border-orange-500 border px-6'
        {...rest}
      />
    </View>
  )
}
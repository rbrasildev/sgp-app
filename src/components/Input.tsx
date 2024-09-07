import { TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
    return (
        <TextInput
            className='bg-orange-50 p-5 rounded-xl my-2 font-bold text-lg border border-orange-500'
            {...rest}
        />
    )
}
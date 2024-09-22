import { TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
    return (
        <TextInput
            className='p-4 bg-white font-light rounded-2xl my-2 text-lg border border-orange-100 px-6'
            {...rest}
        />
    )
}
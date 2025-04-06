import { FormControl, Text, Textarea, TextareaProps } from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";

export interface TextareaInputProps extends TextareaProps {
  control: Control<any>;
  name: string;
  loading: boolean;
  placeholder: string;
}

const TextareaInput = ({
  control,
  name,
  loading,
  placeholder,
  ...props
}: TextareaInputProps) => {
  const {
    formState: { errors },
  } = useController({ control, name });

  return (
    <FormControl isRequired>
      <Textarea
        {...control.register(name)}
        placeholder={placeholder}
        disabled={loading}
        {...props}
        borderRadius="none"
      />
      {errors[name] && (
        <Text color="red">{errors[name].message?.toString()}</Text>
      )}
    </FormControl>
  );
};

export default TextareaInput;

import {
  Box,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller } from "react-hook-form";

import useRegister from "../hooks/useRegister";
import PasswordInput from "../../components/Input/PasswordInput";
import TextInput from "../../components/Input/TextInput";
import MainButton from "../../components/Button/MainButton";

const Register = () => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const handleSelectedGenderClick = (value: string) => {
    setSelectedGender(value);
  };

  const { handleSubmit, loading, onSubmit, control } = useRegister();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmit)(event);
      }}
    >
      <Stack spacing={3}>
        <TextInput
          control={control}
          name="username"
          loading={loading}
          placeholder="Username"
        />
        <TextInput
          control={control}
          name="email"
          loading={loading}
          placeholder="Email"
        />
        <PasswordInput
          control={control}
          name="password"
          loading={loading}
          placeholder="Password"
        />
        <PasswordInput
          control={control}
          name="confirmPassword"
          loading={loading}
          placeholder="Confirm Password"
        />
        <FormControl isRequired>
          <Text fontSize="xs" mb="2px">
            Gender
          </Text>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RadioGroup
                onChange={(value) => {
                  handleSelectedGenderClick(value);
                  field.onChange(value);
                }}
                value={selectedGender}
              >
                <Box display="flex" flexDirection="row">
                  <Radio value="MALE" mr="30px">
                    Male
                  </Radio>
                  <Radio value="FEMALE">Female</Radio>
                </Box>
              </RadioGroup>
            )}
          />
        </FormControl>
        <MainButton
          type={"submit"}
          width="100%"
          mt="10px"
          isLoading={loading}
          mb="20px"
        >
          Register
        </MainButton>
      </Stack>
    </form>
  );
};

export default Register;

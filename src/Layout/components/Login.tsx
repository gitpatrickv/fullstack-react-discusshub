import { Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import useLogin from "../hooks/useLogin";
import MainButton from "../../components/Button/MainButton";

const Login = () => {
  const inputRef = (element: HTMLInputElement | null) => {
    if (element) {
      element.focus();
    }
  };

  const {
    handleSubmit,
    loading,
    onSubmit: onSubmitLogin,
    control,
    setValue,
  } = useLogin();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("email", e.target.value);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmitLogin)(event);
      }}
    >
      <Input
        onChange={handleInputChange}
        mb={4}
        placeholder="Username or Email"
        borderRadius="none"
        ref={inputRef}
      />
      <PasswordInput
        control={control}
        name="password"
        loading={loading}
        placeholder="Password"
      />
      <MainButton
        type={"submit"}
        width="100%"
        mt={4}
        isLoading={loading}
        mb="20px"
      >
        Log In
      </MainButton>
    </form>
  );
};

export default Login;

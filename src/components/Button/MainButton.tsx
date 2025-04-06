import { Button, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
}

const MainButton = ({ children, type, ...props }: Props) => {
  return (
    <Button
      bg="#1877F2"
      _hover={{ bg: "#165BB7" }}
      _active={{ bg: "#165BB7" }}
      color="white"
      borderRadius="none"
      type={type}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MainButton;

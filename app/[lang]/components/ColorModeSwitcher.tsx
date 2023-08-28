import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    // <button
    //   aria-label="Toggle Dark Mode"
    //   type="button"
    //   className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-slate-500"
    //   //     onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    //   onClick={toggleColorMode}
    // >
    //   <SwitchIcon />
    //   {/* {resolvedTheme === "dark" ? (
    //   <SunIcon className="h-5 w-5 text-orange-300" />
    // ) : (
    //   <MoonIcon className="h-5 w-5 text-orange-200" />
    // )} */}
    // </button>

    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="orange"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};

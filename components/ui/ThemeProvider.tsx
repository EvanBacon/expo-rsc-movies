import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNTheme,
} from "@react-navigation/native";

const PurpleLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#AF52DE", // Apple's systemPurple light
  },
};

const PurpleDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#BF5AF2", // Apple's systemPurple dark
  },
};

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  return (
    <RNTheme value={colorScheme === "dark" ? PurpleDarkTheme : PurpleLightTheme}>
      {props.children}
    </RNTheme>
  );
}

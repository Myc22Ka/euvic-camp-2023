import React, { useState, useContext, createContext, ReactElement, useCallback } from "react";

type ThemeType = "light" | "dark";

export const initState: ThemeType = "light";

const useThemeContext = (defaultTheme: ThemeType) => {
  const [theme, setTheme] = useState(defaultTheme);

  const changeTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  return { theme, changeTheme };
};

type useThemeContextType = ReturnType<typeof useThemeContext>;

const initContextState: useThemeContextType = {
  theme: initState,
  changeTheme: () => {},
};

export const ThemeContext = createContext<useThemeContextType>(initContextState);

interface ThemeProviderProps {
  children: ReactElement | null;
  theme: ThemeType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...initState }) => {
  return <ThemeContext.Provider value={useThemeContext(initState.theme)}>{children}</ThemeContext.Provider>;
};

type useThemeHookType = {
  theme: ThemeType;
  changeTheme: () => void;
};

export const useTheme = (): useThemeHookType => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return { theme, changeTheme };
};

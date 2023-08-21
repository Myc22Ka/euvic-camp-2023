import React, { useState, useContext, createContext, ReactElement, useCallback } from "react";

type ThemeType = {
  theme: "light" | "dark";
};

export const initState: ThemeType = { theme: "light" };

const useThemeContext = (defaultTheme: ThemeType) => {
  const [theme, setTheme] = useState(defaultTheme);

  const changeTheme = useCallback(() => {
    setTheme({ theme: theme.theme === "light" ? "dark" : "light" });
  }, []);

  return { theme, changeTheme };
};

type useThemeContextType = ReturnType<typeof useThemeContext>;

const initContextState: useThemeContextType = {
  theme: initState,
  changeTheme: () => {},
};

export const ThemeContext = createContext<useThemeContextType>(initContextState);

type ChildrenType = {
  children: ReactElement | null;
};

export const ThemeProvider = ({ children, ...initState }: ChildrenType & ThemeType) => {
  return <ThemeContext.Provider value={useThemeContext(initState)}>{children}</ThemeContext.Provider>;
};

type useThemeHookType = {
  theme: ThemeType;
  changeTheme: () => void;
};

export const useTheme = (): useThemeHookType => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return { theme, changeTheme };
};

import React, { useState, useContext, createContext, ReactElement, useCallback, useEffect } from "react";
import styles from "../styles/styles.module.scss";
import { useLocation } from "react-router-dom";

export type ThemeType = "light" | "dark";

export const initState: ThemeType = "dark";

const useThemeContext = (defaultTheme: ThemeType) => {
  const [theme, setTheme] = useState(defaultTheme);

  const changeTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    document.body.setAttribute("data-bs-theme", localStorage.getItem("theme") as ThemeType);
    document.documentElement.style.backgroundColor = localStorage.getItem("theme") as ThemeType;
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
  const location = useLocation();
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", localStorage.getItem("theme") as ThemeType);
  }, [location]);

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

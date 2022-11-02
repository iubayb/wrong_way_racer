import { ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { Theme } from "./theme";

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  return (
    <MUIThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

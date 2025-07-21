import { ThemeContextProvider } from "../../theme/ThemeContext.tsx";

export const ThemeDecorator = (Story) => {
  return (
    <ThemeContextProvider>
      <Story />
    </ThemeContextProvider>
  );
};

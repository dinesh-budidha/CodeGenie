export type Language = "java" | "python" | "c";

export type Theme = "light" | "dark" | "system";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "guest" | "user" | "admin";
}

export interface CodeGeneration {
  id: string;
  prompt: string;
  code: string;
  language: Language;
  userId?: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

import { createContext, useContext, useState, ReactNode } from "react";

export type CultureType = "buddhist" | "taoist" | "mazu" | null;

interface CultureTheme {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  name: string;
  icon: string;
  description: string;
}

const cultureThemes: Record<Exclude<CultureType, null>, CultureTheme> = {
  buddhist: {
    primary: "#C5A55A",
    secondary: "#E8B4B8",
    accent: "#8B6914",
    gradient: "from-amber-50 via-yellow-50 to-pink-50",
    name: "佛教",
    icon: "莲",
    description: "慈悲为怀，普度众生",
  },
  taoist: {
    primary: "#4A7C59",
    secondary: "#E8E4DE",
    accent: "#2D5A3E",
    gradient: "from-green-50 via-emerald-50 to-stone-50",
    name: "道教",
    icon: "道",
    description: "道法自然，天人合一",
  },
  mazu: {
    primary: "#4A7C9B",
    secondary: "#7BA3BE",
    accent: "#1E4D6B",
    gradient: "from-blue-50 via-cyan-50 to-sky-50",
    name: "妈祖",
    icon: "海",
    description: "护海佑民，祈福平安",
  },
};

interface CultureContextType {
  culture: CultureType;
  setCulture: (culture: CultureType) => void;
  theme: CultureTheme | null;
  themes: typeof cultureThemes;
}

const CultureContext = createContext<CultureContextType | undefined>(undefined);

export function CultureProvider({ children }: { children: ReactNode }) {
  const [culture, setCulture] = useState<CultureType>(null);
  const theme = culture ? cultureThemes[culture] : null;

  return (
    <CultureContext.Provider value={{ culture, setCulture, theme, themes: cultureThemes }}>
      {children}
    </CultureContext.Provider>
  );
}

export function useCulture() {
  const context = useContext(CultureContext);
  if (!context) {
    throw new Error("useCulture must be used within a CultureProvider");
  }
  return context;
}

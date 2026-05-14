import { motion } from "framer-motion";
import { useCulture, CultureType } from "@/contexts/CultureContext";
import { useLocation } from "wouter";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663483417886/kYBtoRJU9wxjUEZsBMbRsh/hero-landscape-nyV7eb3uEcQuVeyEHdqSrW.webp";
const BUDDHIST_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663483417886/kYBtoRJU9wxjUEZsBMbRsh/buddhist-scene-Ux9ui2oiJpqTTUbVNYuwEr.webp";
const TAOIST_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663483417886/kYBtoRJU9wxjUEZsBMbRsh/taoist-scene-dqe3LQzNw5iLurCF9TiEYw.webp";
const MAZU_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663483417886/kYBtoRJU9wxjUEZsBMbRsh/mazu-scene-FfuCytmAEKRrHxKejt8WWb.webp";

const cultures = [
  {
    id: "buddhist" as CultureType,
    name: "佛教",
    subtitle: "慈悲济世",
    description: "走进峨眉山、乐山大佛与闽南古刹，感受千年佛教智慧。",
    image: BUDDHIST_IMG,
    symbol: "莲",
    region: "四川 · 福建",
    color: "#C5A55A",
  },
  {
    id: "taoist" as CultureType,
    name: "道教",
    subtitle: "道法自然",
    description: "从青城山到鹤鸣山，体会天人合一与修身养性的传统。",
    image: TAOIST_IMG,
    symbol: "道",
    region: "四川",
    color: "#4A7C59",
  },
  {
    id: "mazu" as CultureType,
    name: "妈祖",
    subtitle: "护海佑民",
    description: "溯源湄洲祖庙与海丝航路，理解海洋信俗与民间守护精神。",
    image: MAZU_IMG,
    symbol: "海",
    region: "福建",
    color: "#4A7C9B",
  },
];

export default function Home() {
  const { setCulture } = useCulture();
  const [, setLocation] = useLocation();

  const handleSelect = (cultureId: CultureType) => {
    setCulture(cultureId);
    setLocation("/culture-map");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-parchment)]/60 via-[var(--color-parchment)]/40 to-[var(--color-parchment)]/80" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="pt-12 pb-6 text-center"
        >
          <h1 className="font-display text-5xl md:text-7xl text-[var(--color-mountain-near)] mb-4">全域文化交流</h1>
          <p className="font-serif text-lg md:text-xl text-[var(--color-ink-medium)] max-w-2xl mx-auto px-4 leading-relaxed">
            在数字空间重访传统文化，让经典与当代生活重新连接。
          </p>
        </motion.header>

        <main className="flex-1 flex items-center justify-center px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full">
            {cultures.map((culture, index) => (
              <motion.div
                key={culture.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.23, 1, 0.32, 1] }}
              >
                <button
                  onClick={() => handleSelect(culture.id)}
                  className="group w-full text-left relative overflow-hidden rounded-sm transition-all duration-500 hover:shadow-2xl hover:shadow-black/10"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img src={culture.image} alt={culture.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center border-2 rounded-sm font-display text-xl" style={{ borderColor: culture.color, color: culture.color }}>
                    {culture.symbol}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-xs font-sans tracking-wider opacity-70 mb-2">{culture.region}</div>
                    <h2 className="font-display text-4xl mb-2">{culture.name}</h2>
                    <p className="font-serif text-sm opacity-90 mb-2">{culture.subtitle}</p>
                    <p className="font-sans text-xs opacity-70 leading-relaxed line-clamp-2">{culture.description}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

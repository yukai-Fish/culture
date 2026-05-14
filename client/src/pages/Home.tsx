/**
 * 首页 - 文化选择页
 * Design: 山水长卷沉浸式全景叙事派
 * 三个文化入口以卡片形式呈现，背景为动态山水
 */
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
    subtitle: "慈悲为怀 · 普度众生",
    description: "探索峨眉山、乐山大佛、南普陀寺等佛教圣地的千年智慧",
    image: BUDDHIST_IMG,
    symbol: "莲",
    region: "四川 · 福建",
    color: "#C5A55A",
  },
  {
    id: "taoist" as CultureType,
    name: "道教",
    subtitle: "道法自然 · 天人合一",
    description: "感悟青城山道教文化的清幽与超脱，体验修身养性之道",
    image: TAOIST_IMG,
    symbol: "道",
    region: "四川",
    color: "#4A7C59",
  },
  {
    id: "mazu" as CultureType,
    name: "妈祖",
    subtitle: "护佑平安 · 海上女神",
    description: "追溯湄洲岛妈祖信仰的海洋文化，感受千年航海守护",
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
      {/* Background - Hero Landscape */}
      <div className="fixed inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-parchment)]/60 via-[var(--color-parchment)]/40 to-[var(--color-parchment)]/80" />
      </div>

      {/* Floating clouds decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-32 bg-white/20 rounded-full blur-3xl animate-cloud" />
        <div className="absolute top-40 right-0 w-80 h-24 bg-white/15 rounded-full blur-3xl animate-cloud" style={{ animationDelay: "-7s" }} />
        <div className="absolute bottom-40 left-1/4 w-72 h-20 bg-white/10 rounded-full blur-3xl animate-cloud" style={{ animationDelay: "-14s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="pt-12 pb-6 text-center"
        >
          <h1 className="font-display text-5xl md:text-7xl text-[var(--color-mountain-near)] mb-4">
            全域文化交流
          </h1>
          <p className="font-serif text-lg md:text-xl text-[var(--color-ink-medium)] max-w-2xl mx-auto px-4 leading-relaxed">
            连接传统文化与现代生活的数字化桥梁
          </p>
          <p className="font-sans text-sm text-[var(--color-ink-light)] mt-3">
            选择一种文化，开启您的心灵朝圣之旅
          </p>
        </motion.header>

        {/* Culture Selection Cards */}
        <main className="flex-1 flex items-center justify-center px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full">
            {cultures.map((culture, index) => (
              <motion.div
                key={culture.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.15,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <button
                  onClick={() => handleSelect(culture.id)}
                  className="group w-full text-left relative overflow-hidden rounded-sm transition-all duration-500 hover:shadow-2xl hover:shadow-black/10"
                  style={{ aspectRatio: "3/4" }}
                >
                  {/* Card Image */}
                  <img
                    src={culture.image}
                    alt={culture.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Seal symbol top-right */}
                  <div
                    className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center border-2 rounded-sm font-display text-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ borderColor: culture.color, color: culture.color }}
                  >
                    {culture.symbol}
                  </div>

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-xs font-sans tracking-wider opacity-70 mb-2">
                      {culture.region}
                    </div>
                    <h2 className="font-display text-4xl mb-2">{culture.name}</h2>
                    <p className="font-serif text-sm opacity-90 mb-2">{culture.subtitle}</p>
                    <p className="font-sans text-xs opacity-70 leading-relaxed line-clamp-2">
                      {culture.description}
                    </p>

                    {/* Enter indicator */}
                    <div
                      className="mt-4 inline-flex items-center gap-2 text-xs font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: culture.color }}
                    >
                      <span>进入探索</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center pb-8"
        >
          <p className="font-sans text-xs text-[var(--color-ink-light)]">
            聚焦佛教、道教、妈祖文化的数字化传承与沉浸式修身平台
          </p>
          <p className="font-sans text-xs text-[var(--color-ink-light)] mt-1">
            核心区域：四川 · 福建
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCulture } from "@/contexts/CultureContext";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";
import buddhistMapImage from "@/assets/buddhist-map.png";
import cultureLongImage from "@/assets/culture-long-image.png";

interface Landmark {
  id: string;
  name: string;
  era: string;
  description: string;
  significance: string;
  location: string;
  coordinates: { x: number; y: number };
}

const landmarksData: Record<string, Landmark[]> = {
  buddhist: [
    {
      id: "emei",
      name: "峨眉山",
      era: "东汉",
      description: "中国佛教名山之一，普贤菩萨道场。",
      significance: "佛教朝圣与修行中心。",
      location: "四川乐山",
      coordinates: { x: 43, y: 57 },
    },
    {
      id: "leshan",
      name: "乐山大佛",
      era: "唐代",
      description: "世界最大的石刻弥勒佛坐像。",
      significance: "佛教艺术与工程奇迹。",
      location: "四川乐山",
      coordinates: { x: 41, y: 54 },
    },
    {
      id: "nanputuo",
      name: "南普陀寺",
      era: "唐代",
      description: "闽南佛教重地，依山面海。",
      significance: "闽南佛教文化中心。",
      location: "福建厦门",
      coordinates: { x: 74, y: 62 },
    },
  ],
  taoist: [
    {
      id: "qingcheng",
      name: "青城山",
      era: "东汉",
      description: "道教发源地之一，山林幽深。",
      significance: "天师道重要道场。",
      location: "四川都江堰",
      coordinates: { x: 34, y: 49 },
    },
    {
      id: "heming",
      name: "鹤鸣山",
      era: "东汉",
      description: "五斗米道发端之地。",
      significance: "早期道教传播核心。",
      location: "四川大邑",
      coordinates: { x: 32, y: 52 },
    },
    {
      id: "dujiangyan",
      name: "都江堰",
      era: "战国",
      description: "顺应自然的古代水利工程。",
      significance: "道法自然的工程体现。",
      location: "四川都江堰",
      coordinates: { x: 33, y: 47 },
    },
  ],
  mazu: [
    {
      id: "meizhou",
      name: "湄洲岛",
      era: "宋代",
      description: "妈祖信俗发源地。",
      significance: "妈祖祖庙所在地。",
      location: "福建莆田",
      coordinates: { x: 71, y: 56 },
    },
    {
      id: "tianhou",
      name: "天后宫",
      era: "宋代",
      description: "海上信俗沿海传播的重要节点。",
      significance: "海丝文化见证。",
      location: "福建泉州",
      coordinates: { x: 70, y: 61 },
    },
    {
      id: "xianliang",
      name: "贤良港",
      era: "宋代",
      description: "林默娘诞生地。",
      significance: "妈祖文化象征地。",
      location: "福建莆田",
      coordinates: { x: 72, y: 57 },
    },
  ],
};

const timelineData: Record<string, { era: string; period: string; event: string }[]> = {
  buddhist: [
    { era: "东汉", period: "67年", event: "佛教传入中国" },
    { era: "隋唐", period: "6-9世纪", event: "宗派形成与繁荣" },
    { era: "宋元", period: "10-14世纪", event: "禅宗广泛传播" },
    { era: "当代", period: "20世纪至今", event: "文化保护与数字化传承" },
  ],
  taoist: [
    { era: "先秦", period: "公元前", event: "《道德经》奠基思想" },
    { era: "东汉", period: "2世纪", event: "道教组织化发展" },
    { era: "唐宋", period: "7-13世纪", event: "经典体系与宫观兴盛" },
    { era: "当代", period: "20世纪至今", event: "养生文化大众传播" },
  ],
  mazu: [
    { era: "宋代", period: "10世纪", event: "妈祖信俗形成" },
    { era: "明代", period: "14-17世纪", event: "随海上贸易广泛传播" },
    { era: "清代", period: "17-19世纪", event: "沿海庙宇体系成熟" },
    { era: "当代", period: "2009年", event: "列入人类非遗代表作名录" },
  ],
};

export default function CultureMap() {
  const { culture, theme } = useCulture();
  const [, setLocation] = useLocation();
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [activeEra, setActiveEra] = useState<number>(0);

  useEffect(() => {
    if (!culture || !theme) setLocation("/");
  }, [culture, theme, setLocation]);

  if (!culture || !theme) return null;

  const landmarks = landmarksData[culture] || [];
  const timeline = timelineData[culture] || [];

  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <Navigation />

      <div className="pt-20 pb-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-6"
        >
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-mountain-near)]">万象图</h1>
          <p className="font-serif text-sm text-[var(--color-ink-light)] mt-2">{theme.name}文化 · 时空联动</p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 glass-card rounded-sm p-4 overflow-y-auto custom-scrollbar max-h-[60vh]"
          >
            <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-4 sticky top-0 bg-[var(--color-parchment)]/80 backdrop-blur-sm py-2">
              文脉传承
            </h3>
            <div className="relative rounded-sm overflow-hidden border border-[var(--color-mountain-near)]/10 bg-white/40">
              <img src={cultureLongImage} alt="文化长图" className="w-full h-auto block" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 glass-card rounded-sm p-4 relative overflow-hidden min-h-[50vh]"
          >
            <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-3">
              文化地图 · {culture === "mazu" ? "福建" : culture === "taoist" ? "四川" : "四川 · 福建"}
            </h3>

            <div className="relative w-full rounded-sm overflow-hidden border border-[var(--color-mountain-near)]/10 bg-[#f6efe0]">
              <img src={buddhistMapImage} alt="佛教地图" className="w-full h-auto block" />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />

              {landmarks.map((landmark) => (
                <motion.button
                  key={landmark.id}
                  className="absolute z-10 group -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${landmark.coordinates.x}%`, top: `${landmark.coordinates.y}%` }}
                  onClick={() => setSelectedLandmark(landmark)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ backgroundColor: theme.primary, width: "24px", height: "24px", margin: "-4px" }}
                  />
                  <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all" style={{ backgroundColor: theme.primary }} />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-xs text-[var(--color-ink-dark)] opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 px-2 py-1 rounded-sm">
                    {landmark.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 glass-card rounded-sm p-4 overflow-y-auto custom-scrollbar max-h-[60vh]"
          >
            <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-4">解读说明</h3>

            <AnimatePresence mode="wait">
              {selectedLandmark ? (
                <motion.div
                  key={selectedLandmark.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4">
                    <h4 className="font-display text-2xl" style={{ color: theme.primary }}>{selectedLandmark.name}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-sans text-xs px-2 py-0.5 rounded-sm" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                        {selectedLandmark.era}
                      </span>
                      <span className="font-sans text-xs text-[var(--color-ink-light)]">{selectedLandmark.location}</span>
                    </div>
                  </div>

                  <div className="ink-divider mb-4" />

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-serif text-xs text-[var(--color-ink-light)] mb-1">历史介绍</h5>
                      <p className="font-sans text-sm text-[var(--color-ink-dark)] leading-relaxed">{selectedLandmark.description}</p>
                    </div>
                    <div>
                      <h5 className="font-serif text-xs text-[var(--color-ink-light)] mb-1">文化意义</h5>
                      <p className="font-sans text-sm text-[var(--color-ink-dark)] leading-relaxed">{selectedLandmark.significance}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-48 text-center">
                  <div className="font-display text-4xl opacity-20 mb-4" style={{ color: theme.primary }}>
                    {culture === "buddhist" ? "莲" : culture === "taoist" ? "道" : "海"}
                  </div>
                  <p className="font-sans text-sm text-[var(--color-ink-light)]">点击地图上的地标</p>
                  <p className="font-sans text-xs text-[var(--color-ink-light)] mt-1">查看详细文化解读</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-7xl mx-auto mt-6 glass-card rounded-sm p-4"
        >
          <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-4">历史轴 · {theme.name}在中国的发展</h3>
          <div className="relative overflow-x-auto custom-scrollbar pb-2">
            <div className="flex items-center min-w-max">
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }} />

              {timeline.map((item, index) => (
                <motion.button
                  key={index}
                  className={`relative flex flex-col items-center px-6 py-2 group transition-all ${
                    activeEra === index ? "opacity-100" : "opacity-50 hover:opacity-80"
                  }`}
                  onClick={() => setActiveEra(index)}
                  whileHover={{ y: -2 }}
                >
                  <div
                    className={`w-3 h-3 rounded-full border-2 mb-2 transition-all ${activeEra === index ? "scale-150" : ""}`}
                    style={{
                      borderColor: theme.primary,
                      backgroundColor: activeEra === index ? theme.primary : "transparent",
                    }}
                  />
                  <span className="font-serif text-xs font-medium" style={{ color: activeEra === index ? theme.primary : "var(--color-ink-medium)" }}>
                    {item.era}
                  </span>
                  <span className="font-sans text-[10px] text-[var(--color-ink-light)] mt-0.5">{item.period}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

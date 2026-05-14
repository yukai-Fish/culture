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

const buddhistMapLandmarks: Landmark[] = [
  {
    id: "qiuci-caves",
    name: "龟兹石窟",
    era: "魏晋至唐",
    description: "西域佛教艺术重镇，见证丝路佛教东传。",
    significance: "中亚与中原佛教艺术交流的重要节点。",
    location: "新疆库车一带",
    coordinates: { x: 16, y: 27 },
  },
  {
    id: "dunhuang",
    name: "敦煌莫高窟",
    era: "十六国至元",
    description: "千年壁画与彩塑宝库，丝路佛教文化高峰。",
    significance: "中国佛教美术与文献保存核心遗产。",
    location: "甘肃敦煌",
    coordinates: { x: 35, y: 28 },
  },
  {
    id: "chang-an",
    name: "长安大慈恩寺",
    era: "唐代",
    description: "玄奘译经与法相宗传播的重要道场。",
    significance: "佛经翻译与宗派传播的历史中心。",
    location: "陕西西安",
    coordinates: { x: 50, y: 39 },
  },
  {
    id: "luoyang",
    name: "洛阳白马寺",
    era: "东汉",
    description: "中国最早官办佛寺之一。",
    significance: "佛教传入中原后的关键象征地。",
    location: "河南洛阳",
    coordinates: { x: 57, y: 39 },
  },
  {
    id: "yungang",
    name: "云冈石窟",
    era: "北魏",
    description: "北魏皇家石窟艺术代表。",
    significance: "佛教造像中国化进程的重要里程碑。",
    location: "山西大同",
    coordinates: { x: 54, y: 25 },
  },
  {
    id: "wutai",
    name: "五台山",
    era: "东汉至今",
    description: "文殊菩萨道场，中国四大佛教名山之一。",
    significance: "汉藏佛教长期交流的核心圣地。",
    location: "山西忻州",
    coordinates: { x: 64, y: 27 },
  },
  {
    id: "beijing",
    name: "北京白塔寺",
    era: "元代",
    description: "元代重要佛教建筑代表。",
    significance: "北方都城佛教建筑与信仰传承见证。",
    location: "北京",
    coordinates: { x: 71, y: 26 },
  },
  {
    id: "lingshan-caves",
    name: "灵山石窟",
    era: "北朝至唐",
    description: "中原佛教石窟群的重要组成。",
    significance: "石窟艺术沿中原地带传播的节点。",
    location: "中原地区",
    coordinates: { x: 66, y: 43 },
  },
  {
    id: "chengdu",
    name: "成都昭觉寺",
    era: "唐代",
    description: "西南佛教重要古刹之一。",
    significance: "巴蜀地区佛教弘法与僧团活动中心。",
    location: "四川成都",
    coordinates: { x: 34, y: 50 },
  },
  {
    id: "emei",
    name: "峨眉山",
    era: "东汉至今",
    description: "普贤菩萨道场，中国四大佛教名山之一。",
    significance: "佛教朝圣与山岳信仰结合的典范。",
    location: "四川乐山",
    coordinates: { x: 45, y: 57 },
  },
  {
    id: "dazu",
    name: "大足石刻",
    era: "晚唐至宋",
    description: "石刻造像群规模宏大，题材丰富。",
    significance: "晚期石窟艺术世俗化与本土化代表。",
    location: "重庆大足",
    coordinates: { x: 53, y: 56 },
  },
  {
    id: "tiantai",
    name: "天台山国清寺",
    era: "隋代",
    description: "天台宗祖庭，佛教宗派史地位突出。",
    significance: "中国宗派佛教理论与实践重镇。",
    location: "浙江台州",
    coordinates: { x: 71, y: 58 },
  },
  {
    id: "nanjing",
    name: "南京栖霞寺",
    era: "南朝",
    description: "江南著名佛寺，历史延续久远。",
    significance: "江南佛教传播与文人佛教传统代表。",
    location: "江苏南京",
    coordinates: { x: 74, y: 47 },
  },
  {
    id: "guangzhou",
    name: "广州光孝寺",
    era: "三国至唐",
    description: "岭南佛教传播的重要祖庭之一。",
    significance: "海上佛教交流与岭南文化融合节点。",
    location: "广东广州",
    coordinates: { x: 64, y: 64 },
  },
  {
    id: "putuo",
    name: "普陀山",
    era: "唐宋至今",
    description: "观音菩萨道场，中国四大佛教名山之一。",
    significance: "海洋信仰与观音文化的重要圣地。",
    location: "浙江舟山",
    coordinates: { x: 81, y: 65 },
  },
  {
    id: "nanhai-guanyin",
    name: "南海观音",
    era: "民间信仰",
    description: "佛教观音信仰在海洋文化中的象征。",
    significance: "海上丝路语境下的观音信仰传播符号。",
    location: "南海海域文化意象",
    coordinates: { x: 67, y: 82 },
  },
];

const landmarksData: Record<string, Landmark[]> = {
  buddhist: buddhistMapLandmarks,
  taoist: buddhistMapLandmarks,
  mazu: buddhistMapLandmarks,
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
            <h3 className="sticky top-0 z-30 h-8 flex items-center font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-3 bg-[var(--color-parchment)]/95 backdrop-blur-sm">
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
            className="lg:col-span-5 glass-card rounded-sm p-4 relative min-h-[60vh] flex flex-col"
          >
            <h3 className="h-8 flex items-center font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-3">
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

            <div className="mt-auto pt-4">
              <div className="ink-divider mb-3" />
              <h3 className="font-serif text-xs font-semibold text-[var(--color-mountain-near)] mb-2">
                历史轴 · {theme.name}在中国的发展
              </h3>
              <div className="relative overflow-x-auto custom-scrollbar pb-1">
                <div className="flex items-center min-w-max pr-2">
                  <div
                    className="absolute left-0 right-0 h-px top-[17px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
                  />

                  {timeline.map((item, index) => (
                    <motion.button
                      key={index}
                      className={`relative flex flex-col items-center px-4 py-1 group transition-all ${
                        activeEra === index ? "opacity-100" : "opacity-55 hover:opacity-85"
                      }`}
                      onClick={() => setActiveEra(index)}
                      whileHover={{ y: -1 }}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full border-2 mb-1.5 transition-all ${activeEra === index ? "scale-125" : ""}`}
                        style={{
                          borderColor: theme.primary,
                          backgroundColor: activeEra === index ? theme.primary : "transparent",
                        }}
                      />
                      <span className="font-serif text-[11px] font-medium" style={{ color: activeEra === index ? theme.primary : "var(--color-ink-medium)" }}>
                        {item.era}
                      </span>
                      <span className="font-sans text-[10px] text-[var(--color-ink-light)] leading-none mt-0.5">{item.period}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
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
      </div>
    </div>
  );
}

/**
 * 万象图 - 文脉地图页面
 * Design: 左侧文脉长图 | 中间文化地图 | 右侧解读说明 | 底部历史轴
 * 通过"时空联动"展示文化演变
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCulture } from "@/contexts/CultureContext";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";

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
    { id: "emei", name: "峨眉山", era: "东汉", description: "中国四大佛教名山之一，普贤菩萨道场。金顶云海、万年寺古刹，承载千年佛教文化。", significance: "普贤菩萨道场，四大佛教名山之首", location: "四川省乐山市", coordinates: { x: 25, y: 35 } },
    { id: "leshan", name: "乐山大佛", era: "唐代", description: "世界最大石刻弥勒佛坐像，历时90年凿成。凌云寺旁，临江而坐，庄严慈悲。", significance: "世界文化遗产，唐代石刻艺术巅峰", location: "四川省乐山市", coordinates: { x: 30, y: 45 } },
    { id: "nanputuo", name: "南普陀寺", era: "唐代", description: "闽南佛教圣地，始建于唐代。依山面海，建筑精美，为闽南佛教文化中心。", significance: "闽南佛教文化中心，千年古刹", location: "福建省厦门市", coordinates: { x: 72, y: 65 } },
    { id: "kaiyuan", name: "开元寺", era: "唐代", description: "福建最大佛教寺院，双塔巍峨。桑莲法界，见证泉州海上丝绸之路的辉煌。", significance: "福建最大佛寺，海丝文化见证", location: "福建省泉州市", coordinates: { x: 68, y: 55 } },
  ],
  taoist: [
    { id: "qingcheng", name: "青城山", era: "东汉", description: "中国道教发源地之一，天师道祖庭。幽深静谧，古木参天，道法自然的最佳诠释。", significance: "天师道祖庭，道教发源地", location: "四川省都江堰市", coordinates: { x: 22, y: 30 } },
    { id: "heming", name: "鹤鸣山", era: "东汉", description: "张道陵创立五斗米道之地，道教正一派祖庭。山势如鹤展翅，仙气缭绕。", significance: "五斗米道创立地，正一派祖庭", location: "四川省大邑县", coordinates: { x: 20, y: 38 } },
    { id: "wawu", name: "瓦屋山", era: "西周", description: "道教圣地，相传为老君传道之所。山顶平台如瓦屋，云海翻涌，仙境般的存在。", significance: "老君传道之所，道教圣地", location: "四川省眉山市", coordinates: { x: 28, y: 42 } },
    { id: "dujiangyan", name: "都江堰", era: "战国", description: "李冰父子修建的水利工程，体现道家顺应自然的哲学。两千年来泽被天府之国。", significance: "道法自然的工程典范", location: "四川省都江堰市", coordinates: { x: 24, y: 32 } },
  ],
  mazu: [
    { id: "meizhou", name: "湄洲岛", era: "宋代", description: "妈祖信仰发源地，妈祖祖庙所在。每年妈祖诞辰，万人朝圣，香火鼎盛。", significance: "妈祖信仰发源地，祖庙所在", location: "福建省莆田市", coordinates: { x: 65, y: 50 } },
    { id: "tianhou", name: "天后宫", era: "宋代", description: "泉州天后宫是现存最早的妈祖庙之一，见证了海上丝绸之路的繁荣。", significance: "现存最早妈祖庙之一", location: "福建省泉州市", coordinates: { x: 70, y: 58 } },
    { id: "xianliang", name: "贤良港", era: "宋代", description: "妈祖林默娘出生地，保留了大量妈祖文化遗迹和民间信仰活动。", significance: "妈祖诞生地", location: "福建省莆田市", coordinates: { x: 63, y: 48 } },
    { id: "mazupark", name: "妈祖文化园", era: "现代", description: "集妈祖文化展示、祭祀活动、海洋文化体验于一体的综合文化园区。", significance: "妈祖文化传承基地", location: "福建省莆田市", coordinates: { x: 67, y: 52 } },
  ],
};

const timelineData: Record<string, { era: string; period: string; event: string }[]> = {
  buddhist: [
    { era: "东汉", period: "公元67年", event: "佛教传入中国" },
    { era: "魏晋", period: "3-5世纪", event: "般若学兴起，佛教本土化" },
    { era: "隋唐", period: "6-9世纪", event: "宗派林立，佛教鼎盛" },
    { era: "宋元", period: "10-14世纪", event: "禅宗主导，融入民间" },
    { era: "明清", period: "14-19世纪", event: "四大名山定型，信仰普及" },
    { era: "当代", period: "20世纪至今", event: "文化遗产保护，数字化传承" },
  ],
  taoist: [
    { era: "先秦", period: "公元前6世纪", event: "老子著《道德经》" },
    { era: "东汉", period: "公元142年", event: "张道陵创五斗米道" },
    { era: "魏晋", period: "3-5世纪", event: "上清派、灵宝派兴起" },
    { era: "唐代", period: "7-9世纪", event: "道教国教化，鼎盛时期" },
    { era: "宋元", period: "10-14世纪", event: "全真道创立，内丹学发展" },
    { era: "当代", period: "20世纪至今", event: "道教文化复兴，养生文化传播" },
  ],
  mazu: [
    { era: "宋代", period: "公元960年", event: "林默娘诞生于湄洲" },
    { era: "宋代", period: "公元987年", event: "妈祖升天，民间立庙" },
    { era: "元代", period: "13-14世纪", event: "封天妃，航海守护神" },
    { era: "明代", period: "14-17世纪", event: "郑和下西洋，妈祖信仰远播" },
    { era: "清代", period: "17-19世纪", event: "封天后，信仰遍及沿海" },
    { era: "当代", period: "2009年", event: "列入世界非物质文化遗产" },
  ],
};

export default function CultureMap() {
  const { culture, theme } = useCulture();
  const [, setLocation] = useLocation();
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [activeEra, setActiveEra] = useState<number>(0);

  if (!culture || !theme) {
    setLocation("/");
    return null;
  }

  const landmarks = landmarksData[culture] || [];
  const timeline = timelineData[culture] || [];

  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <Navigation />

      <div className="pt-20 pb-4 px-4">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-6"
        >
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-mountain-near)]">
            万象图
          </h1>
          <p className="font-serif text-sm text-[var(--color-ink-light)] mt-2">
            {theme.name}文脉 · 时空联动
          </p>
        </motion.div>

        {/* Main Content - Three Column Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[60vh]">
          {/* Left - Heritage Timeline (vertical) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 glass-card rounded-sm p-4 overflow-y-auto custom-scrollbar max-h-[60vh]"
          >
            <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-4 sticky top-0 bg-[var(--color-parchment)]/80 backdrop-blur-sm py-2">
              文脉传承
            </h3>
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-2 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${theme.primary}, transparent)` }} />

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`relative mb-6 cursor-pointer group ${activeEra === index ? "opacity-100" : "opacity-60 hover:opacity-80"}`}
                  onClick={() => setActiveEra(index)}
                >
                  {/* Dot */}
                  <div
                    className={`absolute -left-[18px] top-1 w-3 h-3 rounded-full border-2 transition-all ${
                      activeEra === index ? "scale-125" : ""
                    }`}
                    style={{
                      borderColor: theme.primary,
                      backgroundColor: activeEra === index ? theme.primary : "transparent",
                    }}
                  />
                  <div className="font-serif text-xs" style={{ color: theme.primary }}>
                    {item.era} · {item.period}
                  </div>
                  <div className="font-sans text-sm text-[var(--color-ink-dark)] mt-1">
                    {item.event}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center - Map Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 glass-card rounded-sm p-4 relative overflow-hidden min-h-[50vh]"
          >
            <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-3">
              文化地图 · {culture === "mazu" ? "福建" : culture === "taoist" ? "四川" : "四川 · 福建"}
            </h3>

            {/* Stylized Map Background */}
            <div className="relative w-full h-full min-h-[40vh] rounded-sm overflow-hidden">
              {/* Map base - ink wash style */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-mountain-far)]/20 via-[var(--color-parchment)] to-[var(--color-mountain-far)]/10 rounded-sm">
                {/* Decorative mountain silhouettes */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 300" preserveAspectRatio="none">
                  <path d="M0,250 Q50,200 100,220 Q150,180 200,200 Q250,160 300,190 Q350,170 400,200 L400,300 L0,300 Z" fill="#2D4A3E" />
                  <path d="M0,270 Q80,240 150,255 Q220,230 280,250 Q340,235 400,260 L400,300 L0,300 Z" fill="#2D4A3E" opacity="0.5" />
                </svg>
              </div>

              {/* Landmark Points */}
              {landmarks.map((landmark) => (
                <motion.button
                  key={landmark.id}
                  className={`absolute z-10 group`}
                  style={{ left: `${landmark.coordinates.x}%`, top: `${landmark.coordinates.y}%` }}
                  onClick={() => setSelectedLandmark(landmark)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ backgroundColor: theme.primary, width: "24px", height: "24px", margin: "-4px" }}
                  />
                  {/* Point */}
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all"
                    style={{ backgroundColor: theme.primary }}
                  />
                  {/* Label */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-xs text-[var(--color-ink-dark)] opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 px-2 py-1 rounded-sm">
                    {landmark.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right - Detail Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 glass-card rounded-sm p-4 overflow-y-auto custom-scrollbar max-h-[60vh]"
          >
            <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-4">
              解读说明
            </h3>

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
                    <h4 className="font-display text-2xl" style={{ color: theme.primary }}>
                      {selectedLandmark.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-sans text-xs px-2 py-0.5 rounded-sm" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                        {selectedLandmark.era}
                      </span>
                      <span className="font-sans text-xs text-[var(--color-ink-light)]">
                        {selectedLandmark.location}
                      </span>
                    </div>
                  </div>

                  <div className="ink-divider mb-4" />

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-serif text-xs text-[var(--color-ink-light)] mb-1">历史介绍</h5>
                      <p className="font-sans text-sm text-[var(--color-ink-dark)] leading-relaxed">
                        {selectedLandmark.description}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-serif text-xs text-[var(--color-ink-light)] mb-1">文化意义</h5>
                      <p className="font-sans text-sm text-[var(--color-ink-dark)] leading-relaxed">
                        {selectedLandmark.significance}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-3 rounded-sm" style={{ backgroundColor: `${theme.primary}08` }}>
                    <p className="font-serif text-xs text-[var(--color-ink-medium)] italic">
                      "点击地图上的其他地标，探索更多文化遗迹"
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-48 text-center"
                >
                  <div className="font-display text-4xl opacity-20 mb-4" style={{ color: theme.primary }}>
                    {culture === "buddhist" ? "莲" : culture === "taoist" ? "道" : "海"}
                  </div>
                  <p className="font-sans text-sm text-[var(--color-ink-light)]">
                    点击地图上的地标
                  </p>
                  <p className="font-sans text-xs text-[var(--color-ink-light)] mt-1">
                    查看详细文化解读
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom - Historical Timeline (horizontal) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-7xl mx-auto mt-6 glass-card rounded-sm p-4"
        >
          <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-4">
            历史轴 · {theme.name}在中国的发展
          </h3>
          <div className="relative overflow-x-auto custom-scrollbar pb-2">
            <div className="flex items-center min-w-max">
              {/* Horizontal line */}
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
                    className={`w-3 h-3 rounded-full border-2 mb-2 transition-all ${
                      activeEra === index ? "scale-150" : ""
                    }`}
                    style={{
                      borderColor: theme.primary,
                      backgroundColor: activeEra === index ? theme.primary : "transparent",
                    }}
                  />
                  <span className="font-serif text-xs font-medium" style={{ color: activeEra === index ? theme.primary : "var(--color-ink-medium)" }}>
                    {item.era}
                  </span>
                  <span className="font-sans text-[10px] text-[var(--color-ink-light)] mt-0.5">
                    {item.period}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

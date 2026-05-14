import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCulture } from "@/contexts/CultureContext";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";
import buddhistMapImage from "@/assets/buddhist-map.png";

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
    { id: "emei", name: "峨眉山", era: "东汉", description: "中国佛教名山之一，普贤菩萨道场。", significance: "佛教朝圣与修行中心", location: "四川乐山", coordinates: { x: 25, y: 35 } },
    { id: "leshan", name: "乐山大佛", era: "唐代", description: "世界最大的石刻弥勒佛坐像。", significance: "佛教艺术与工程奇迹", location: "四川乐山", coordinates: { x: 30, y: 45 } },
    { id: "nanputuo", name: "南普陀寺", era: "唐代", description: "闽南佛教重地，依山面海。", significance: "闽南佛教文化中心", location: "福建厦门", coordinates: { x: 72, y: 65 } },
  ],
  taoist: [
    { id: "qingcheng", name: "青城山", era: "东汉", description: "道教发源地之一，山林幽深。", significance: "天师道重要道场", location: "四川都江堰", coordinates: { x: 22, y: 30 } },
    { id: "heming", name: "鹤鸣山", era: "东汉", description: "五斗米道发端之地。", significance: "早期道教传播核心", location: "四川大邑", coordinates: { x: 20, y: 38 } },
    { id: "dujiangyan", name: "都江堰", era: "战国", description: "顺应自然的古代水利工程。", significance: "道法自然的工程体现", location: "四川都江堰", coordinates: { x: 24, y: 32 } },
  ],
  mazu: [
    { id: "meizhou", name: "湄洲岛", era: "宋代", description: "妈祖信俗发源地。", significance: "妈祖祖庙所在地", location: "福建莆田", coordinates: { x: 65, y: 50 } },
    { id: "tianhou", name: "天后宫", era: "宋代", description: "海上信俗沿海传播的重要节点。", significance: "海丝文化见证", location: "福建泉州", coordinates: { x: 70, y: 58 } },
    { id: "xianliang", name: "贤良港", era: "宋代", description: "林默娘诞生地。", significance: "妈祖文化象征地", location: "福建莆田", coordinates: { x: 63, y: 48 } },
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
  const mapImage = culture === "buddhist" ? buddhistMapImage : null;

  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <Navigation />
      <div className="pt-20 pb-8 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-mountain-near)]">万象图</h1>
          <p className="font-serif text-sm text-[var(--color-ink-light)] mt-2">{theme.name}文化 · 时空联动</p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[60vh]">
          <div className="lg:col-span-3 glass-card rounded-sm p-4">
            <h3 className="font-serif text-sm font-semibold mb-3">传承时间线</h3>
            {timeline.map((item, index) => (
              <button key={index} onClick={() => setActiveEra(index)} className={`w-full text-left mb-3 ${activeEra === index ? "opacity-100" : "opacity-70"}`}>
                <div className="font-serif text-xs" style={{ color: theme.primary }}>{item.era} · {item.period}</div>
                <div className="font-sans text-sm">{item.event}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-5 glass-card rounded-sm p-4 relative min-h-[50vh]">
            <h3 className="font-serif text-sm font-semibold mb-3">文化地图</h3>
            <div className="relative w-full h-full min-h-[40vh] rounded-sm overflow-hidden">
              {mapImage ? (
                <img
                  src={mapImage}
                  alt="佛教地图"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-mountain-far)]/20 to-[var(--color-parchment)]" />
              )}
              <div className="absolute inset-0 bg-black/10" />
              {landmarks.map((landmark) => (
                <motion.button
                  key={landmark.id}
                  className="absolute z-10 group"
                  style={{ left: `${landmark.coordinates.x}%`, top: `${landmark.coordinates.y}%` }}
                  onClick={() => setSelectedLandmark(landmark)}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: theme.primary }} />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 bg-white/80 px-2 py-1 rounded-sm">
                    {landmark.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 glass-card rounded-sm p-4">
            <h3 className="font-serif text-sm font-semibold mb-3">文化解读</h3>
            <AnimatePresence mode="wait">
              {selectedLandmark ? (
                <motion.div key={selectedLandmark.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h4 className="font-display text-2xl" style={{ color: theme.primary }}>{selectedLandmark.name}</h4>
                  <p className="text-xs text-[var(--color-ink-light)] mt-1">{selectedLandmark.era} · {selectedLandmark.location}</p>
                  <div className="ink-divider my-3" />
                  <p className="text-sm leading-relaxed">{selectedLandmark.description}</p>
                  <p className="text-sm leading-relaxed mt-3">{selectedLandmark.significance}</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[var(--color-ink-light)]">
                  点击地图中的地标，查看详细内容。
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

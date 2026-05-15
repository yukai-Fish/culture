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

interface TimelineEntry {
  era: string;
  period: string;
  event: string;
  detail: string;
}

interface TimelineInsight {
  impact: string;
  route: string;
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

const heritageLandmarks: Landmark[] = [
  {
    id: "heritage-nanhai-putuo",
    name: "南海普陀",
    era: "唐宋至今",
    description: "海天佛国意象中的观音道场，象征海上信仰与朝圣传统。",
    significance: "体现海洋文化语境下的观音信仰传播与民间护佑精神。",
    location: "舟山普陀山文化意象",
    coordinates: { x: 69, y: 8 },
  },
  {
    id: "heritage-nanhai-guanyin",
    name: "南海观音",
    era: "民间信仰",
    description: "观音立于海天之间的核心视觉母题，寓意慈悲济世。",
    significance: "连接佛教经典精神与大众审美记忆的重要图像符号。",
    location: "海上丝路文化意象",
    coordinates: { x: 38, y: 7 },
  },
  {
    id: "heritage-changan",
    name: "长安雁塔",
    era: "唐代",
    description: "长安译经与传播中心的重要地标，见证佛教中国化进程。",
    significance: "承载中外文化交流与经典传播的历史记忆。",
    location: "陕西西安",
    coordinates: { x: 49, y: 23 },
  },
  {
    id: "heritage-longmen",
    name: "龙门石窟",
    era: "北魏至唐",
    description: "中国石窟艺术高峰之一，展现多朝代造像风格演变。",
    significance: "见证佛教艺术本土化与工艺体系成熟。",
    location: "河南洛阳",
    coordinates: { x: 52, y: 38 },
  },
  {
    id: "heritage-leshan-buddha",
    name: "乐山大佛",
    era: "唐代",
    description: "依山凿刻的巨型弥勒坐像，是古代佛教造像工程杰作。",
    significance: "体现佛教艺术、山水地貌与古代工程技术的融合。",
    location: "四川乐山",
    coordinates: { x: 47, y: 53 },
  },
  {
    id: "heritage-potala",
    name: "布达拉宫",
    era: "清代重建",
    description: "雪域高原宗教与政治文化复合地标，具有强烈精神象征。",
    significance: "体现汉藏文化交流脉络与高原佛教建筑成就。",
    location: "西藏拉萨",
    coordinates: { x: 51, y: 73 },
  },
  {
    id: "heritage-wutai",
    name: "五台金顶",
    era: "唐宋至今",
    description: "文殊信仰核心圣境之一，山岳佛教传统延续至今。",
    significance: "体现朝山传统、宗派融合与信仰共同体记忆。",
    location: "山西五台山",
    coordinates: { x: 36, y: 87 },
  },
];

const timelineData: Record<string, TimelineEntry[]> = {
  buddhist: [
    { era: "东汉", period: "67年", event: "佛教传入中国", detail: "由丝路与官方译经体系进入中原，奠定后续宗派发展的文化基础。" },
    { era: "隋唐", period: "6-9世纪", event: "宗派形成与繁荣", detail: "天台、华严、禅宗等体系逐步成熟，寺院网络与经典传播达到高峰。" },
    { era: "宋元", period: "10-14世纪", event: "禅宗广泛传播", detail: "禅宗深入士人和民间生活，山林寺院与城市道场共同构成传播格局。" },
    { era: "当代", period: "20世纪至今", event: "文化保护与数字化传承", detail: "石窟、古寺与文献进入系统保护阶段，并通过数字化实现更广泛传播。" },
  ],
  taoist: [
    { era: "先秦", period: "公元前", event: "《道德经》奠基思想", detail: "无为、自然与天人观念形成核心思想源流，深刻影响后世文化表达。" },
    { era: "东汉", period: "2世纪", event: "道教组织化发展", detail: "教团与仪式体系逐步建立，道教从思想传统转向制度化宗教形态。" },
    { era: "唐宋", period: "7-13世纪", event: "经典体系与宫观兴盛", detail: "宫观建设和斋醮礼仪完善，道教文献整理与传播进入稳定阶段。" },
    { era: "当代", period: "20世纪至今", event: "养生文化大众传播", detail: "道教养生、节气观与生态理念进入公众视野，形成新的生活化表达。" },
  ],
  mazu: [
    { era: "宋代", period: "10世纪", event: "妈祖信俗形成", detail: "沿海民众以护航与祈安为核心诉求，逐渐形成区域性海神信仰共同体。" },
    { era: "明代", period: "14-17世纪", event: "随海上贸易广泛传播", detail: "随海商与移民网络扩展，妈祖信俗在东南沿海和海外港口持续落地。" },
    { era: "清代", period: "17-19世纪", event: "沿海庙宇体系成熟", detail: "庙宇祭典、进香线路与地方社会治理相互嵌合，形成稳定信俗生态。" },
    { era: "当代", period: "2009年", event: "列入人类非遗代表作名录", detail: "非遗认定推动跨区域交流和现代传播，信俗价值被更广泛理解与传承。" },
  ],
};

const timelineInsights: Record<string, TimelineInsight[]> = {
  buddhist: [
    { impact: "奠定经典翻译、僧团制度与礼仪体系基础。", route: "陆上丝路与都城译场并行，逐步向中原腹地扩展。" },
    { impact: "宗派理论与寺院网络成型，文化影响深入文艺与社会生活。", route: "由长安、洛阳向江南与西南扩散，形成多中心传播格局。" },
    { impact: "禅修传统与民间信仰结合，佛教日常化表达显著增强。", route: "山林寺院、城市道场与海上交流通道共同推动延续发展。" },
    { impact: "保护、研究与公众传播协同推进，文化记忆持续激活。", route: "数字化档案、沉浸展示与跨区域联动形成当代传播闭环。" },
  ],
  taoist: [
    { impact: "核心思想完成奠基，影响伦理观与自然观。", route: "经典文本经学术与民间口传并行扩散。" },
    { impact: "教团结构初步稳定，宗教实践走向制度化。", route: "由中原向地方宫观网络延展，形成区域传承节点。" },
    { impact: "斋醮仪式、宫观体系与典籍整理同步成熟。", route: "都城与地方互动增强，信众网络覆盖更广。" },
    { impact: "养生与生态理念进入现代公共文化语境。", route: "通过教育传播、文旅展示与新媒体持续扩散。" },
  ],
  mazu: [
    { impact: "形成以护航祈安为核心的沿海共同信仰。", route: "沿港口与渔村聚落传播，逐步形成祭祀网络。" },
    { impact: "信俗随海贸与移民网络外溢至更广海域。", route: "跨海航线与商帮节点成为传播主轴。" },
    { impact: "庙宇体系与地方社会秩序深度耦合。", route: "进香线路与地方祭典构成稳定跨地域联动。" },
    { impact: "非遗认定后国际认知度与交流频率显著提升。", route: "线上传播、展演活动与学术交流并行推进。" },
  ],
};

const defaultVisualByCulture: Record<string, string> = {
  buddhist: "https://d2xsxph8kpxj0f.cloudfront.net/310519663483417886/kYBtoRJU9wxjUEZsBMbRsh/buddhist-scene-Ux9ui2oiJpqTTUbVNYuwEr.webp",
  taoist: "https://d2xsxph8kpxj0f.cloudfront.net/310519663483417886/kYBtoRJU9wxjUEZsBMbRsh/taoist-scene-dqe3LQzNw5iLurCF9TiEYw.webp",
  mazu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663483417886/kYBtoRJU9wxjUEZsBMbRsh/mazu-scene-FfuCytmAEKRrHxKejt8WWb.webp",
};

const landmarkPhotoBase = `${import.meta.env.BASE_URL}landmark-photos/`;

const landmarkPhotoById: Record<string, string> = {
  "qiuci-caves": `${landmarkPhotoBase}qiuci-caves.jpg`,
  dunhuang: `${landmarkPhotoBase}dunhuang.jpg`,
  "chang-an": `${landmarkPhotoBase}chang-an.jpg`,
  luoyang: `${landmarkPhotoBase}luoyang.jpg`,
  yungang: `${landmarkPhotoBase}yungang.jpg`,
  wutai: `${landmarkPhotoBase}wutai.jpg`,
  beijing: `${landmarkPhotoBase}beijing.jpg`,
  "lingshan-caves": `${landmarkPhotoBase}lingshan-caves.jpg`,
  chengdu: `${landmarkPhotoBase}chengdu.jpg`,
  emei: `${landmarkPhotoBase}emei.jpg`,
  dazu: `${landmarkPhotoBase}dazu.jpg`,
  tiantai: `${landmarkPhotoBase}tiantai.jpg`,
  nanjing: `${landmarkPhotoBase}nanjing.jpg`,
  guangzhou: `${landmarkPhotoBase}guangzhou.jpg`,
  putuo: `${landmarkPhotoBase}putuo.jpg`,
  "nanhai-guanyin": `${landmarkPhotoBase}nanhai-guanyin.jpg`,
  "heritage-nanhai-putuo": `${landmarkPhotoBase}heritage-nanhai-putuo.jpg`,
  "heritage-nanhai-guanyin": `${landmarkPhotoBase}heritage-nanhai-guanyin.jpg`,
  "heritage-changan": `${landmarkPhotoBase}heritage-changan.jpg`,
  "heritage-longmen": `${landmarkPhotoBase}heritage-longmen.jpg`,
  "heritage-leshan-buddha": `${landmarkPhotoBase}heritage-leshan-buddha.jpg`,
  "heritage-potala": `${landmarkPhotoBase}heritage-potala.jpg`,
  "heritage-wutai": `${landmarkPhotoBase}heritage-wutai.jpg`,
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
  const activeTimeline = timeline[activeEra] || timeline[0];
  const activeInsight = timelineInsights[culture]?.[activeEra] ?? timelineInsights[culture]?.[0];

  const handleLandmarkClick = (landmark: Landmark) => {
    setSelectedLandmark(landmark);
  };

  const previewVisual = selectedLandmark
    ? (landmarkPhotoById[selectedLandmark.id] ?? defaultVisualByCulture[culture])
    : defaultVisualByCulture[culture];

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

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:h-[72vh] lg:min-h-[760px] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 glass-card rounded-sm p-4 h-full flex flex-col"
          >
            <h3 className="shrink-0 h-8 flex items-center font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-3">
              文脉传承
            </h3>
            <div className="flex-1 min-h-0 flex items-center justify-center">
              <div className="relative h-full rounded-sm overflow-hidden border border-[var(--color-mountain-near)]/10 bg-white/40">
                <img src={cultureLongImage} alt="文化长图" className="h-full w-auto block" />
                {heritageLandmarks.map((landmark) => (
                  <motion.button
                    key={landmark.id}
                    className="absolute z-20 group -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${landmark.coordinates.x}%`, top: `${landmark.coordinates.y}%` }}
                    onClick={() => handleLandmarkClick(landmark)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-35"
                      style={{ backgroundColor: theme.primary, width: "22px", height: "22px", margin: "-5px" }}
                    />
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg transition-all ${
                        selectedLandmark?.id === landmark.id ? "scale-125" : ""
                      }`}
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-[11px] text-[var(--color-ink-dark)] opacity-0 group-hover:opacity-100 transition-opacity bg-white/85 px-2 py-0.5 rounded-sm">
                      {landmark.name}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 glass-card rounded-sm p-4 relative h-full flex flex-col overflow-hidden"
          >
            <h3 className="h-8 flex items-center font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-3">
              文化地图 · {culture === "mazu" ? "福建" : culture === "taoist" ? "四川" : "四川 · 福建"}
            </h3>

            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
              <div className="relative w-full rounded-sm overflow-hidden border border-[var(--color-mountain-near)]/10 bg-[#f6efe0]">
                <img src={buddhistMapImage} alt="佛教地图" className="w-full h-auto block" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                {landmarks.map((landmark) => (
                  <motion.button
                    key={landmark.id}
                    className="absolute z-10 group -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${landmark.coordinates.x}%`, top: `${landmark.coordinates.y}%` }}
                    onClick={() => handleLandmarkClick(landmark)}
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

              <div className="pt-4">
                <div className="ink-divider mb-3" />
                <h3 className="font-serif text-base md:text-lg font-semibold text-[var(--color-mountain-near)] mb-2.5">
                  历史轴 · {theme.name}在中国的发展
                </h3>
                <div className="relative overflow-x-auto custom-scrollbar pb-1">
                  <div className="flex items-center min-w-max pr-2">
                    <div
                      className="absolute left-0 right-0 h-px top-[20px]"
                      style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }}
                    />

                    {timeline.map((item, index) => (
                      <motion.button
                        key={index}
                        className={`relative flex flex-col items-center px-5 py-1 group transition-all ${
                          activeEra === index ? "opacity-100" : "opacity-55 hover:opacity-85"
                        }`}
                        onClick={() => setActiveEra(index)}
                        whileHover={{ y: -1 }}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full border-2 mb-2 transition-all ${activeEra === index ? "scale-125" : ""}`}
                          style={{
                            borderColor: theme.primary,
                            backgroundColor: activeEra === index ? theme.primary : "transparent",
                          }}
                        />
                        <span className="font-serif text-[17px] leading-none font-medium" style={{ color: activeEra === index ? theme.primary : "var(--color-ink-medium)" }}>
                          {item.era}
                        </span>
                        <span className="font-sans text-[14px] text-[var(--color-ink-light)] leading-none mt-1">{item.period}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                {activeTimeline && (
                  <div className="mt-3 rounded-sm border border-[var(--color-mountain-near)]/15 bg-white/45 p-3 md:p-3.5 min-h-[230px] md:min-h-[250px] flex flex-col justify-between">
                    <p className="font-serif text-sm md:text-base mb-2" style={{ color: theme.primary }}>
                      {activeTimeline.era} · {activeTimeline.period} · {activeTimeline.event}
                    </p>
                    <p className="font-sans text-sm md:text-[15px] text-[var(--color-ink-medium)] leading-7">
                      {activeTimeline.detail}
                    </p>
                    {activeInsight && (
                      <div className="mt-3 pt-2 border-t border-[var(--color-mountain-near)]/10 space-y-1.5">
                        <p className="font-sans text-[13px] text-[var(--color-ink-dark)]">
                          阶段影响：{activeInsight.impact}
                        </p>
                        <p className="font-sans text-[13px] text-[var(--color-ink-dark)]">
                          传播脉络：{activeInsight.route}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 glass-card rounded-sm p-4 h-full flex flex-col"
          >
            <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-4">解读说明</h3>
            <div className="relative rounded-sm overflow-hidden border border-[var(--color-mountain-near)]/15 bg-white/40 h-56 md:h-64 lg:h-[19rem] shrink-0">
              <img
                src={previewVisual}
                alt={selectedLandmark ? `${selectedLandmark.name}实景图` : `${theme.name}全景图`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
              <AnimatePresence mode="wait">
                {selectedLandmark ? (
                  <motion.div
                    key={selectedLandmark.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="mb-1">
                      <h4 className="font-display text-2xl" style={{ color: theme.primary }}>{selectedLandmark.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-sans text-xs px-2 py-0.5 rounded-sm" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}>
                          {selectedLandmark.era}
                        </span>
                        <span className="font-sans text-xs text-[var(--color-ink-light)]">{selectedLandmark.location}</span>
                      </div>
                    </div>

                    <div className="rounded-sm border border-[var(--color-mountain-near)]/15 bg-white/45 p-2.5">
                      <h5 className="font-serif text-xs text-[var(--color-ink-light)] mb-1">历史介绍</h5>
                      <p className="font-sans text-sm text-[var(--color-ink-dark)] leading-relaxed">{selectedLandmark.description}</p>
                    </div>

                    <div className="rounded-sm border border-[var(--color-mountain-near)]/15 bg-white/45 p-2.5">
                      <h5 className="font-serif text-xs text-[var(--color-ink-light)] mb-1">文化意义</h5>
                      <p className="font-sans text-sm text-[var(--color-ink-dark)] leading-relaxed">{selectedLandmark.significance}</p>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col justify-between">
                    <div>
                      <div className="font-display text-4xl opacity-20 mb-3" style={{ color: theme.primary }}>
                        {culture === "buddhist" ? "莲" : culture === "taoist" ? "道" : "海"}
                      </div>
                      <p className="font-sans text-sm text-[var(--color-ink-light)]">点击地图或文脉传承亮点</p>
                      <p className="font-sans text-xs text-[var(--color-ink-light)] mt-1">查看详细文化解读</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

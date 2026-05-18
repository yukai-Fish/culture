/**
 * 感应场 - 互动体验页面
 * Design: 电子木鱼、功德林/水、每日偈语(转经轮)、愿望摇签
 * 仪式感与解压体验
 */
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCulture } from "@/contexts/CultureContext";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Merit messages
const meritMessages = [
  "功德+1", "烦恼-1", "慈悲+1", "智慧+1", "福报+1",
  "清净+1", "自在+1", "欢喜+1", "安宁+1", "善缘+1",
];

// Wisdom quotes
const wisdomQuotes: Record<string, { text: string; source: string; meaning: string }[]> = {
  buddhist: [
    { text: "一切有为法，如梦幻泡影", source: "《金刚经》", meaning: "世间万物皆是因缘和合而生，如同梦境泡影般虚幻不实，不应执着。" },
    { text: "色不异空，空不异色", source: "《心经》", meaning: "物质现象与空性本质并无分别，一切存在既是空又是有。" },
    { text: "应无所住而生其心", source: "《金刚经》", meaning: "心不应执着于任何事物，在无执着中保持清明觉知。" },
    { text: "菩提本无树，明镜亦非台", source: "六祖慧能", meaning: "觉悟的本性不需外在依托，心性本来清净无染。" },
  ],
  taoist: [
    { text: "道可道，非常道", source: "《道德经》", meaning: "可以用语言表达的道，并非永恒不变的道。真正的道超越言语。" },
    { text: "上善若水，水善利万物而不争", source: "《道德经》", meaning: "最高的善如同水一般，滋养万物却不与之争夺。" },
    { text: "知足不辱，知止不殆", source: "《道德经》", meaning: "懂得满足就不会受辱，懂得适可而止就不会有危险。" },
    { text: "天地与我并生，万物与我为一", source: "《庄子》", meaning: "人与天地万物本为一体，应当回归自然本性。" },
  ],
  mazu: [
    { text: "慈航普渡，护佑苍生", source: "妈祖信仰", meaning: "妈祖以慈悲之心普渡众生，保佑世人平安顺遂。" },
    { text: "立德行善，济世利人", source: "妈祖精神", meaning: "妈祖精神的核心是立德行善，以利他之心济世助人。" },
    { text: "海不辞水，故能成其大", source: "妈祖文化", meaning: "大海不拒绝任何水流，所以能成就其广大，做人当有包容之心。" },
    { text: "风平浪静，一帆风顺", source: "妈祖祝福", meaning: "妈祖庇佑，愿您人生如同顺风行船，平安顺利。" },
  ],
};

// Fortune categories
const fortuneCategories = ["学业", "家庭", "事业", "婚姻", "健康"];

const fortuneResults: Record<string, string[]> = {
  学业: ["上上签：学业有成，金榜题名在望。持之以恒，必有所获。", "中吉签：学海无涯，勤为舟楫。虽有波折，终见光明。", "小吉签：厚积薄发，静待花开。当下努力，未来可期。"],
  家庭: ["上上签：家和万事兴，阖家安康。珍惜眼前人，福报自来。", "中吉签：家人相聚是缘，彼此包容理解。和气生财，家道兴旺。", "小吉签：家庭如港湾，风雨中互相扶持。用心经营，幸福长久。"],
  事业: ["上上签：贵人相助，事业腾飞。把握机遇，大展宏图。", "中吉签：脚踏实地，步步为营。虽非一帆风顺，终有出头之日。", "小吉签：蛰伏蓄力，等待时机。韬光养晦，厚积薄发。"],
  婚姻: ["上上签：良缘天定，佳偶天成。有情人终成眷属。", "中吉签：缘分天注定，相知需用心。以诚相待，感情渐深。", "小吉签：姻缘未至，不必强求。修身养性，缘来自会来。"],
  健康: ["上上签：身体康健，精力充沛。保持良好习惯，福寿绵长。", "中吉签：注意调养，劳逸结合。适当运动，饮食有节。", "小吉签：小恙无碍，注意休息。心态平和，百病不侵。"],
};

interface FloatingMerit {
  id: number;
  text: string;
  x: number;
}

export default function InteractiveExperience() {
  const { culture, theme } = useCulture();
  const [, setLocation] = useLocation();
  const [meritCount, setMeritCount] = useState(0);
  const [floatingMerits, setFloatingMerits] = useState<FloatingMerit[]>([]);
  const [treeGrowth, setTreeGrowth] = useState(0);
  const [currentQuote, setCurrentQuote] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [fortuneCategory, setFortuneCategory] = useState<string | null>(null);
  const [fortuneResult, setFortureResult] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const meritIdRef = useRef(0);

  if (!culture || !theme) {
    setLocation("/");
    return null;
  }

  const handleWoodenFish = useCallback(() => {
    setMeritCount((prev) => prev + 1);
    setTreeGrowth((prev) => Math.min(prev + 1, 100));

    // Add floating merit text
    const id = meritIdRef.current++;
    const text = meritMessages[Math.floor(Math.random() * meritMessages.length)];
    const x = 30 + Math.random() * 40;
    setFloatingMerits((prev) => [...prev.slice(-8), { id, text, x }]);

    // Remove after animation
    setTimeout(() => {
      setFloatingMerits((prev) => prev.filter((m) => m.id !== id));
    }, 2000);
  }, []);

  const handlePrayerWheel = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => {
      const quotes = wisdomQuotes[culture!] || [];
      setCurrentQuote(Math.floor(Math.random() * quotes.length));
      setIsSpinning(false);
    }, 2000);
  }, [culture, isSpinning]);

  const handleFortune = useCallback((category: string) => {
    setFortuneCategory(category);
    setIsShaking(true);
    setFortureResult(null);
    setTimeout(() => {
      setIsShaking(false);
      const results = fortuneResults[category] || [];
      setFortureResult(results[Math.floor(Math.random() * results.length)]);
    }, 1500);
  }, []);

  const quotes = wisdomQuotes[culture] || [];
  const treeStage = treeGrowth < 10 ? "幼苗" : treeGrowth < 30 ? "小树" : treeGrowth < 60 ? "青树" : treeGrowth < 90 ? "大树" : "古木";

  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <Navigation />

      <div className="pt-20 pb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-mountain-near)]">
            感应场
          </h1>
          <p className="font-serif text-sm text-[var(--color-ink-light)] mt-2">
            仪式感与心灵解压
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="wooden-fish" className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-white/50 backdrop-blur-sm border border-[var(--color-mountain-near)]/10 rounded-sm h-auto p-1">
              <TabsTrigger value="wooden-fish" className="font-serif text-sm py-2 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                木鱼
              </TabsTrigger>
              <TabsTrigger value="merit-tree" className="font-serif text-sm py-2 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                功德林
              </TabsTrigger>
              <TabsTrigger value="prayer-wheel" className="font-serif text-sm py-2 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                偈语
              </TabsTrigger>
              <TabsTrigger value="fortune" className="font-serif text-sm py-2 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                摇签
              </TabsTrigger>
            </TabsList>

            {/* Wooden Fish */}
            <TabsContent value="wooden-fish" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-sm p-8 text-center relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center"
              >
                {/* Floating merit texts */}
                <AnimatePresence>
                  {floatingMerits.map((merit) => (
                    <motion.div
                      key={merit.id}
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ opacity: 0, y: -80, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute font-serif text-sm pointer-events-none"
                      style={{ left: `${merit.x}%`, top: "40%", color: theme.primary }}
                    >
                      {merit.text}
                    </motion.div>
                  ))}
                </AnimatePresence>

                <p className="font-sans text-sm text-[var(--color-ink-light)] mb-6">
                  点击木鱼，静心凝神
                </p>

                {/* Wooden Fish Button */}
                <motion.button
                  onClick={handleWoodenFish}
                  whileTap={{ scale: 0.92 }}
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-shadow"
                  style={{
                    background: `radial-gradient(circle, ${theme.primary}30, ${theme.primary}10)`,
                    boxShadow: `0 0 40px ${theme.primary}20`,
                  }}
                >
                  <span className="font-display text-6xl md:text-7xl" style={{ color: theme.primary }}>
                    {culture === "buddhist" ? "🪷" : culture === "taoist" ? "☯" : "🌊"}
                  </span>
                </motion.button>

                {/* Merit Counter */}
                <div className="mt-8">
                  <span className="font-display text-3xl" style={{ color: theme.primary }}>
                    {meritCount}
                  </span>
                  <p className="font-serif text-xs text-[var(--color-ink-light)] mt-1">功德累计</p>
                </div>
              </motion.div>
            </TabsContent>

            {/* Merit Tree */}
            <TabsContent value="merit-tree" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-sm p-8 text-center min-h-[400px] flex flex-col items-center justify-center"
              >
                <p className="font-sans text-sm text-[var(--color-ink-light)] mb-6">
                  {culture === "buddhist" ? "菩提树" : culture === "taoist" ? "长青松" : "守护灯"}
                  · 以功德灌溉成长
                </p>

                {/* Tree visualization */}
                <div className="relative w-48 h-64 flex items-end justify-center mb-6">
                  {/* Ground */}
                  <div className="absolute bottom-0 w-full h-4 rounded-full opacity-30" style={{ backgroundColor: theme.primary }} />

                  {/* Tree trunk */}
                  <div
                    className="relative transition-all duration-1000"
                    style={{ height: `${20 + treeGrowth * 0.6}%` }}
                  >
                    <div
                      className="w-3 mx-auto rounded-t-sm transition-all duration-1000"
                      style={{
                        height: "100%",
                        backgroundColor: "#5D4E37",
                        width: `${6 + treeGrowth * 0.08}px`,
                      }}
                    />
                    {/* Canopy */}
                    <div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${30 + treeGrowth * 1.2}px`,
                        height: `${30 + treeGrowth * 1.0}px`,
                        backgroundColor: `${theme.primary}40`,
                        boxShadow: `0 0 ${treeGrowth * 0.5}px ${theme.primary}30`,
                      }}
                    />
                    {treeGrowth > 30 && (
                      <div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${20 + treeGrowth * 0.8}px`,
                          height: `${20 + treeGrowth * 0.6}px`,
                          backgroundColor: `${theme.primary}30`,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Growth info */}
                <div className="space-y-2">
                  <div className="font-display text-xl" style={{ color: theme.primary }}>
                    {treeStage}
                  </div>
                  <div className="w-48 h-2 bg-[var(--color-mountain-near)]/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: theme.primary }}
                      animate={{ width: `${treeGrowth}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="font-sans text-xs text-[var(--color-ink-light)]">
                    成长度 {treeGrowth}% · 继续敲击木鱼积累功德
                  </p>
                </div>
              </motion.div>
            </TabsContent>

            {/* Prayer Wheel / Daily Wisdom */}
            <TabsContent value="prayer-wheel" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-sm p-8 text-center min-h-[400px] flex flex-col items-center justify-center"
              >
                <p className="font-sans text-sm text-[var(--color-ink-light)] mb-6">
                  转动经轮，获取今日偈语
                </p>

                {/* Prayer Wheel */}
                <motion.button
                  onClick={handlePrayerWheel}
                  animate={isSpinning ? { rotate: 720 } : {}}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="w-32 h-32 rounded-full border-4 flex items-center justify-center mb-8"
                  style={{ borderColor: theme.primary }}
                  disabled={isSpinning}
                >
                  <span className="font-display text-4xl" style={{ color: theme.primary }}>
                    {culture === "buddhist" ? "卍" : culture === "taoist" ? "☯" : "☸"}
                  </span>
                </motion.button>

                {/* Quote Display */}
                <AnimatePresence mode="wait">
                  {currentQuote !== null && quotes[currentQuote] && (
                    <motion.div
                      key={currentQuote}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="max-w-md p-6 rounded-sm border"
                      style={{ borderColor: `${theme.primary}30`, backgroundColor: `${theme.primary}05` }}
                    >
                      <p className="font-serif text-lg leading-relaxed" style={{ color: theme.primary }}>
                        "{quotes[currentQuote].text}"
                      </p>
                      <p className="font-sans text-xs text-[var(--color-ink-light)] mt-3">
                        —— {quotes[currentQuote].source}
                      </p>
                      <div className="ink-divider my-4" />
                      <p className="font-sans text-sm text-[var(--color-ink-medium)] leading-relaxed">
                        {quotes[currentQuote].meaning}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {currentQuote === null && !isSpinning && (
                  <p className="font-sans text-xs text-[var(--color-ink-light)]">
                    点击经轮开始转动
                  </p>
                )}
              </motion.div>
            </TabsContent>

            {/* Fortune Drawing */}
            <TabsContent value="fortune" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-sm p-8 min-h-[400px]"
              >
                <p className="font-sans text-sm text-[var(--color-ink-light)] mb-6 text-center">
                  选择类别，摇动签筒
                </p>

                {/* Category Selection */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {fortuneCategories.map((cat) => (
                    <motion.button
                      key={cat}
                      onClick={() => handleFortune(cat)}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-sm font-serif text-sm border transition-all ${
                        fortuneCategory === cat
                          ? "border-current shadow-sm"
                          : "border-[var(--color-mountain-near)]/20 hover:border-[var(--color-mountain-near)]/40"
                      }`}
                      style={{
                        color: fortuneCategory === cat ? theme.primary : "var(--color-ink-medium)",
                        backgroundColor: fortuneCategory === cat ? `${theme.primary}10` : "transparent",
                      }}
                      disabled={isShaking}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>

                {/* Shaking Animation */}
                <AnimatePresence mode="wait">
                  {isShaking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, x: [0, -5, 5, -5, 5, 0] }}
                      transition={{ x: { repeat: 3, duration: 0.3 } }}
                      className="text-center py-8"
                    >
                      <div className="font-display text-5xl animate-float" style={{ color: theme.primary }}>
                        签
                      </div>
                      <p className="font-sans text-xs text-[var(--color-ink-light)] mt-4">
                        摇签中...
                      </p>
                    </motion.div>
                  )}

                  {fortuneResult && !isShaking && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="max-w-md mx-auto p-6 rounded-sm border text-center"
                      style={{ borderColor: `${theme.primary}30`, backgroundColor: `${theme.primary}05` }}
                    >
                      <div className="font-serif text-xs mb-2" style={{ color: theme.primary }}>
                        {fortuneCategory}运势
                      </div>
                      <p className="font-serif text-base text-[var(--color-ink-dark)] leading-relaxed">
                        {fortuneResult}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!fortuneResult && !isShaking && (
                  <div className="text-center py-8">
                    <div className="font-display text-4xl opacity-20" style={{ color: theme.primary }}>
                      签
                    </div>
                    <p className="font-sans text-xs text-[var(--color-ink-light)] mt-4">
                      选择一个类别开始摇签
                    </p>
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

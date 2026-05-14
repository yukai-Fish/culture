/**
 * 禅修房 - 个人修行空间
 * Design: 打坐冥想、动态氛围、声景、计时器
 * 沉浸式冥想体验
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCulture } from "@/contexts/CultureContext";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MEDITATION_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663483417886/kYBtoRJU9wxjUEZsBMbRsh/meditation-bg-SnKda3sYePGsdfogoGRozf.webp";

interface MeditationScene {
  id: string;
  name: string;
  description: string;
  gradient: string;
}

const scenes: Record<string, MeditationScene[]> = {
  buddhist: [
    { id: "cloud-sea", name: "云海日出", description: "峨眉金顶的壮丽云海", gradient: "from-amber-100/80 via-orange-50/60 to-sky-100/40" },
    { id: "lotus-pond", name: "莲池月色", description: "月光下的宁静莲池", gradient: "from-indigo-100/60 via-purple-50/40 to-pink-50/30" },
    { id: "temple-rain", name: "古刹听雨", description: "南普陀寺的细雨绵绵", gradient: "from-slate-200/70 via-gray-100/50 to-green-50/30" },
  ],
  taoist: [
    { id: "mountain-mist", name: "山间云雾", description: "青城山的缥缈仙境", gradient: "from-emerald-100/60 via-green-50/40 to-teal-50/30" },
    { id: "pine-wind", name: "松涛阵阵", description: "古松林中的清风", gradient: "from-green-100/70 via-emerald-50/50 to-lime-50/30" },
    { id: "waterfall", name: "飞瀑流泉", description: "山间瀑布的清凉", gradient: "from-cyan-100/60 via-blue-50/40 to-white/30" },
  ],
  mazu: [
    { id: "ocean-calm", name: "海天一色", description: "湄洲岛的宁静海面", gradient: "from-blue-100/70 via-sky-50/50 to-cyan-50/30" },
    { id: "sunset-sail", name: "夕阳归帆", description: "落日余晖中的归航", gradient: "from-orange-100/60 via-amber-50/40 to-blue-50/30" },
    { id: "moonlit-wave", name: "月照潮声", description: "月光下的潮起潮落", gradient: "from-indigo-100/60 via-blue-50/40 to-slate-50/30" },
  ],
};

// Journal entries (demo data)
const demoJournals = [
  { date: "2024年12月15日", content: "今日静坐二十分钟，心渐渐安定。想起《心经》中'心无挂碍'四字，方知放下之难。" },
  { date: "2024年12月12日", content: "晨起读经，偶得一句触动心弦。世事纷扰，唯有内心清净方能自在。" },
  { date: "2024年12月8日", content: "冥想中感受到前所未有的宁静，仿佛与天地融为一体。感恩这一刻的觉知。" },
];

export default function MeditationRoom() {
  const { culture, theme } = useCulture();
  const [, setLocation] = useLocation();
  const [selectedScene, setSelectedScene] = useState<MeditationScene | null>(null);
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [targetMinutes, setTargetMinutes] = useState(10);
  const [meditationComplete, setMeditationComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  if (!culture || !theme) {
    setLocation("/");
    return null;
  }

  const currentScenes = scenes[culture] || [];

  const startMeditation = useCallback(() => {
    if (!selectedScene) {
      setSelectedScene(currentScenes[0]);
    }
    setIsMeditating(true);
    setMeditationTime(0);
    setMeditationComplete(false);
    timerRef.current = setInterval(() => {
      setMeditationTime((prev) => {
        if (prev >= targetMinutes * 60 - 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsMeditating(false);
          setMeditationComplete(true);
          return targetMinutes * 60;
        }
        return prev + 1;
      });
    }, 1000);
  }, [selectedScene, targetMinutes, currentScenes]);

  const stopMeditation = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsMeditating(false);
    if (meditationTime > 60) {
      setMeditationComplete(true);
    }
  }, [meditationTime]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (meditationTime / (targetMinutes * 60)) * 100;

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
            禅修房
          </h1>
          <p className="font-serif text-sm text-[var(--color-ink-light)] mt-2">
            个人修行空间 · 静心冥想
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="meditation" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-white/50 backdrop-blur-sm border border-[var(--color-mountain-near)]/10 rounded-sm h-auto p-1">
              <TabsTrigger value="meditation" className="font-serif text-sm py-2 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                打坐冥想
              </TabsTrigger>
              <TabsTrigger value="journal" className="font-serif text-sm py-2 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                心灵感悟
              </TabsTrigger>
              <TabsTrigger value="bookshelf" className="font-serif text-sm py-2 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                个人书架
              </TabsTrigger>
            </TabsList>

            {/* Meditation */}
            <TabsContent value="meditation" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Scene Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card rounded-sm p-5"
                >
                  <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-4">
                    选择氛围
                  </h3>
                  <div className="space-y-3">
                    {currentScenes.map((scene) => (
                      <button
                        key={scene.id}
                        onClick={() => setSelectedScene(scene)}
                        className={`w-full text-left p-3 rounded-sm border transition-all ${
                          selectedScene?.id === scene.id
                            ? "border-current shadow-sm"
                            : "border-transparent hover:bg-white/50"
                        }`}
                        style={{
                          borderColor: selectedScene?.id === scene.id ? `${theme.primary}50` : undefined,
                          backgroundColor: selectedScene?.id === scene.id ? `${theme.primary}05` : undefined,
                        }}
                      >
                        <div className="font-serif text-sm text-[var(--color-ink-dark)]">{scene.name}</div>
                        <div className="font-sans text-xs text-[var(--color-ink-light)] mt-1">{scene.description}</div>
                      </button>
                    ))}
                  </div>

                  {/* Duration Setting */}
                  <div className="mt-6">
                    <h4 className="font-serif text-xs text-[var(--color-ink-light)] mb-3">冥想时长</h4>
                    <div className="flex gap-2">
                      {[5, 10, 15, 20, 30].map((min) => (
                        <button
                          key={min}
                          onClick={() => setTargetMinutes(min)}
                          className={`flex-1 py-2 rounded-sm font-sans text-xs transition-all ${
                            targetMinutes === min
                              ? "text-white shadow-sm"
                              : "bg-white/50 text-[var(--color-ink-medium)] hover:bg-white/80"
                          }`}
                          style={{
                            backgroundColor: targetMinutes === min ? theme.primary : undefined,
                          }}
                        >
                          {min}分
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Meditation Area */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-2 relative overflow-hidden rounded-sm min-h-[450px]"
                >
                  {/* Background */}
                  <div className="absolute inset-0">
                    <img
                      src={MEDITATION_BG}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${selectedScene?.gradient || "from-white/60 via-white/30 to-white/60"}`} />
                  </div>

                  {/* Meditation Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center min-h-[450px] p-8">
                    <AnimatePresence mode="wait">
                      {!isMeditating && !meditationComplete && (
                        <motion.div
                          key="start"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center"
                        >
                          <div className="font-display text-2xl text-[var(--color-mountain-near)] mb-2">
                            {selectedScene?.name || "选择一个场景"}
                          </div>
                          <p className="font-sans text-sm text-[var(--color-ink-medium)] mb-8">
                            {selectedScene?.description || "开始您的冥想之旅"}
                          </p>
                          <motion.button
                            onClick={startMeditation}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg"
                            style={{ backgroundColor: theme.primary }}
                          >
                            <span className="font-serif text-sm">开始</span>
                          </motion.button>
                          <p className="font-sans text-xs text-[var(--color-ink-light)] mt-4">
                            {targetMinutes} 分钟冥想
                          </p>
                        </motion.div>
                      )}

                      {isMeditating && (
                        <motion.div
                          key="meditating"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center"
                        >
                          {/* Timer Circle */}
                          <div className="relative w-40 h-40 mb-6">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                              <circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth="2"
                              />
                              <circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke={theme.primary}
                                strokeWidth="2.5"
                                strokeDasharray={`${progress * 2.83} 283`}
                                strokeLinecap="round"
                                className="transition-all duration-1000"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="font-sans text-3xl font-light text-[var(--color-mountain-near)]">
                                {formatTime(meditationTime)}
                              </span>
                              <span className="font-sans text-xs text-[var(--color-ink-light)] mt-1">
                                / {targetMinutes}:00
                              </span>
                            </div>
                          </div>

                          {/* Breathing guide */}
                          <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="font-serif text-sm text-[var(--color-ink-medium)] mb-8"
                          >
                            深呼吸... 放松身心...
                          </motion.div>

                          <button
                            onClick={stopMeditation}
                            className="px-6 py-2 rounded-sm font-sans text-sm border transition-all hover:bg-white/50"
                            style={{ borderColor: `${theme.primary}50`, color: theme.primary }}
                          >
                            结束冥想
                          </button>
                        </motion.div>
                      )}

                      {meditationComplete && (
                        <motion.div
                          key="complete"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center glass-card p-8 rounded-sm max-w-sm"
                        >
                          <div className="font-display text-3xl mb-2" style={{ color: theme.primary }}>
                            圆满
                          </div>
                          <p className="font-serif text-sm text-[var(--color-ink-medium)] mb-4">
                            本次冥想 {formatTime(meditationTime)}
                          </p>
                          <div className="ink-divider mb-4" />
                          <p className="font-sans text-xs text-[var(--color-ink-light)] leading-relaxed">
                            "心如止水，万物自明。"<br />
                            愿您在日常中保持这份宁静。
                          </p>
                          <button
                            onClick={() => { setMeditationComplete(false); setMeditationTime(0); }}
                            className="mt-6 px-4 py-2 rounded-sm font-sans text-xs"
                            style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
                          >
                            再次冥想
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Journal */}
            <TabsContent value="journal" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-sm p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-base font-semibold text-[var(--color-mountain-near)]">
                    心灵感悟
                  </h3>
                  <span className="font-sans text-xs text-[var(--color-ink-light)]">私密日记</span>
                </div>

                {/* New entry area */}
                <div className="mb-6 p-4 rounded-sm border border-dashed border-[var(--color-mountain-near)]/20">
                  <textarea
                    placeholder="记录今日的修行感悟..."
                    className="w-full h-24 bg-transparent font-sans text-sm text-[var(--color-ink-dark)] placeholder:text-[var(--color-ink-light)] resize-none focus:outline-none"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      className="px-4 py-1.5 rounded-sm font-sans text-xs text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      保存感悟
                    </button>
                  </div>
                </div>

                <div className="ink-divider mb-6" />

                {/* Past entries */}
                <div className="space-y-4">
                  {demoJournals.map((journal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-sm bg-white/50"
                    >
                      <div className="font-sans text-xs text-[var(--color-ink-light)] mb-2">
                        {journal.date}
                      </div>
                      <p className="font-sans text-sm text-[var(--color-ink-dark)] leading-relaxed">
                        {journal.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Personal Bookshelf */}
            <TabsContent value="bookshelf" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-sm p-6"
              >
                <h3 className="font-serif text-base font-semibold text-[var(--color-mountain-near)] mb-6">
                  个人书架
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Demo collected books */}
                  {["金刚经", "道德经", "心经", "庄子"].map((title, index) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="aspect-[3/4] rounded-sm p-4 flex flex-col justify-between border"
                      style={{
                        borderColor: `${theme.primary}20`,
                        background: `linear-gradient(135deg, ${theme.primary}05, ${theme.primary}10)`,
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-sm flex items-center justify-center font-display text-xs text-white"
                        style={{ backgroundColor: theme.primary }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-medium text-[var(--color-ink-dark)]">
                          {title}
                        </h4>
                        <p className="font-sans text-[10px] text-[var(--color-ink-light)] mt-1">
                          已收藏
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Empty slot */}
                  <div className="aspect-[3/4] rounded-sm border border-dashed border-[var(--color-mountain-near)]/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-sans text-2xl text-[var(--color-ink-light)]/30 mb-1">+</div>
                      <p className="font-sans text-[10px] text-[var(--color-ink-light)]">
                        从藏书阁收藏
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

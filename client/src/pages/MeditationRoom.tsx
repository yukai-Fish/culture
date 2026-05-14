import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCulture } from "@/contexts/CultureContext";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MEDITATION_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663483417886/kYBtoRJU9wxjUEZsBMbRsh/meditation-bg-SnKda3sYePGsdfogoGRozf.webp";

const scenes: Record<string, { id: string; name: string; description: string; gradient: string }[]> = {
  buddhist: [
    { id: "cloud-sea", name: "云海日出", description: "静观云起云落", gradient: "from-amber-100/80 via-orange-50/60 to-sky-100/40" },
    { id: "lotus", name: "莲池月色", description: "月下莲影，心境澄明", gradient: "from-indigo-100/60 via-purple-50/40 to-pink-50/30" },
  ],
  taoist: [
    { id: "mist", name: "山间云雾", description: "感受道法自然", gradient: "from-emerald-100/60 via-green-50/40 to-teal-50/30" },
    { id: "waterfall", name: "飞瀑流泉", description: "听水而静", gradient: "from-cyan-100/60 via-blue-50/40 to-white/30" },
  ],
  mazu: [
    { id: "ocean", name: "海天一色", description: "潮声入心", gradient: "from-blue-100/70 via-sky-50/50 to-cyan-50/30" },
    { id: "sunset", name: "落日归帆", description: "在光影中放松", gradient: "from-orange-100/60 via-amber-50/40 to-blue-50/30" },
  ],
};

export default function MeditationRoom() {
  const { culture, theme } = useCulture();
  const [, setLocation] = useLocation();
  const [selectedScene, setSelectedScene] = useState<{ id: string; name: string; description: string; gradient: string } | null>(null);
  const [isMeditating, setIsMeditating] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [targetMinutes, setTargetMinutes] = useState(10);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!culture || !theme) setLocation("/");
  }, [culture, theme, setLocation]);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  if (!culture || !theme) return null;

  const currentScenes = scenes[culture] || [];
  const progress = (meditationTime / (targetMinutes * 60)) * 100;

  const startMeditation = useCallback(() => {
    setIsMeditating(true);
    setMeditationTime(0);
    if (!selectedScene) setSelectedScene(currentScenes[0]);
    timerRef.current = setInterval(() => {
      setMeditationTime((prev) => (prev >= targetMinutes * 60 ? prev : prev + 1));
    }, 1000);
  }, [selectedScene, currentScenes, targetMinutes]);

  const stopMeditation = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsMeditating(false);
  }, []);

  const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <Navigation />
      <div className="pt-20 pb-8 px-4">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-mountain-near)]">禅修房</h1>
          <p className="font-serif text-sm text-[var(--color-ink-light)] mt-2">个人修行空间</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="meditation" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-white/50 border rounded-sm h-auto p-1">
              <TabsTrigger value="meditation">打坐冥想</TabsTrigger>
              <TabsTrigger value="notes">心灵感悟</TabsTrigger>
            </TabsList>

            <TabsContent value="meditation" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-card rounded-sm p-5">
                  <h3 className="font-serif text-sm font-semibold mb-4">场景选择</h3>
                  <div className="space-y-3">
                    {currentScenes.map((scene) => (
                      <button key={scene.id} onClick={() => setSelectedScene(scene)} className="w-full text-left p-3 rounded-sm hover:bg-white/50">
                        <div className="text-sm">{scene.name}</div>
                        <div className="text-xs text-[var(--color-ink-light)] mt-1">{scene.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 relative overflow-hidden rounded-sm min-h-[420px]">
                  <div className="absolute inset-0">
                    <img src={MEDITATION_BG} alt="" className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-b ${selectedScene?.gradient || "from-white/60 via-white/30 to-white/60"}`} />
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center min-h-[420px] p-8 text-center">
                    <AnimatePresence mode="wait">
                      {!isMeditating ? (
                        <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <div className="text-xl mb-2">{selectedScene?.name || "选择一个场景"}</div>
                          <p className="text-sm text-[var(--color-ink-medium)] mb-6">{selectedScene?.description || "开始你的冥想"}</p>
                          <button onClick={startMeditation} className="px-6 py-3 rounded-sm text-white" style={{ backgroundColor: theme.primary }}>开始</button>
                        </motion.div>
                      ) : (
                        <motion.div key="running" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <div className="text-4xl mb-2">{formatTime(meditationTime)}</div>
                          <div className="w-56 h-2 bg-white/40 rounded-full overflow-hidden mb-6"><div className="h-full" style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: theme.primary }} /></div>
                          <button onClick={stopMeditation} className="px-6 py-2 rounded-sm border" style={{ borderColor: theme.primary, color: theme.primary }}>结束</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-6">
              <div className="glass-card rounded-sm p-6">
                <h3 className="font-serif text-base mb-3">心灵感悟</h3>
                <textarea className="w-full h-36 p-3 rounded-sm bg-white/60" placeholder="记录今天的冥想体验..." />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

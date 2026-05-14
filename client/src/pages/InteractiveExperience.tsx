import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCulture } from "@/contexts/CultureContext";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const meritMessages = ["功德+1", "烦恼-1", "清净+1", "慈悲+1", "福报+1"];
const fortuneCategories = ["学业", "家庭", "事业", "健康"];
const fortuneResults: Record<string, string[]> = {
  学业: ["循序渐进，近期有明显提升。", "稳中有进，坚持就会看到结果。"],
  家庭: ["和气为贵，沟通将带来转机。", "珍惜当下，家庭关系趋于温暖。"],
  事业: ["贵人将现，适合主动争取机会。", "脚踏实地，阶段成果即将出现。"],
  健康: ["保持作息，身心状态会更稳定。", "适度运动与休息并重，整体向好。"],
};

const wisdomQuotes: Record<string, { text: string; source: string }[]> = {
  buddhist: [
    { text: "应无所住，而生其心。", source: "《金刚经》" },
    { text: "色不异空，空不异色。", source: "《心经》" },
  ],
  taoist: [
    { text: "上善若水。", source: "《道德经》" },
    { text: "知足不辱，知止不殆。", source: "《道德经》" },
  ],
  mazu: [
    { text: "慈航普渡，护佑众生。", source: "妈祖信俗" },
    { text: "立德行善，济世利人。", source: "妈祖文化" },
  ],
};

interface FloatingMerit { id: number; text: string; x: number }

export default function InteractiveExperience() {
  const { culture, theme } = useCulture();
  const [, setLocation] = useLocation();
  const [meritCount, setMeritCount] = useState(0);
  const [floatingMerits, setFloatingMerits] = useState<FloatingMerit[]>([]);
  const [currentQuote, setCurrentQuote] = useState<number | null>(null);
  const [fortuneCategory, setFortuneCategory] = useState<string | null>(null);
  const [fortuneResult, setFortuneResult] = useState<string | null>(null);
  const meritIdRef = useRef(0);

  useEffect(() => {
    if (!culture || !theme) setLocation("/");
  }, [culture, theme, setLocation]);

  if (!culture || !theme) return null;

  const handleWoodenFish = useCallback(() => {
    setMeritCount((prev) => prev + 1);
    const id = meritIdRef.current++;
    const text = meritMessages[Math.floor(Math.random() * meritMessages.length)];
    const x = 30 + Math.random() * 40;
    setFloatingMerits((prev) => [...prev.slice(-6), { id, text, x }]);
    setTimeout(() => setFloatingMerits((prev) => prev.filter((m) => m.id !== id)), 1500);
  }, []);

  const handleQuote = useCallback(() => {
    const quotes = wisdomQuotes[culture] || [];
    setCurrentQuote(Math.floor(Math.random() * quotes.length));
  }, [culture]);

  const handleFortune = useCallback((category: string) => {
    setFortuneCategory(category);
    const list = fortuneResults[category] || [];
    setFortuneResult(list[Math.floor(Math.random() * list.length)] || null);
  }, []);

  const quotes = wisdomQuotes[culture] || [];

  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <Navigation />
      <div className="pt-20 pb-8 px-4">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-mountain-near)]">感应场</h1>
          <p className="font-serif text-sm text-[var(--color-ink-light)] mt-2">仪式感与身心放松体验</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="wooden-fish" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-white/50 border rounded-sm h-auto p-1">
              <TabsTrigger value="wooden-fish">木鱼</TabsTrigger>
              <TabsTrigger value="wisdom">偈语</TabsTrigger>
              <TabsTrigger value="fortune">摇签</TabsTrigger>
            </TabsList>

            <TabsContent value="wooden-fish" className="mt-6">
              <div className="glass-card rounded-sm p-8 text-center relative min-h-[300px]">
                <AnimatePresence>
                  {floatingMerits.map((merit) => (
                    <motion.div key={merit.id} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -60 }} className="absolute text-sm" style={{ left: `${merit.x}%`, top: "40%", color: theme.primary }}>
                      {merit.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <button onClick={handleWoodenFish} className="w-28 h-28 rounded-full" style={{ backgroundColor: `${theme.primary}20` }}>
                  <span className="font-display text-5xl" style={{ color: theme.primary }}>礼</span>
                </button>
                <p className="mt-4 text-sm">累计功德：<span style={{ color: theme.primary }}>{meritCount}</span></p>
              </div>
            </TabsContent>

            <TabsContent value="wisdom" className="mt-6">
              <div className="glass-card rounded-sm p-8 text-center min-h-[300px]">
                <button onClick={handleQuote} className="px-4 py-2 rounded-sm border" style={{ borderColor: theme.primary, color: theme.primary }}>抽取今日偈语</button>
                {currentQuote !== null && quotes[currentQuote] && (
                  <div className="mt-6">
                    <p className="font-serif text-lg">“{quotes[currentQuote].text}”</p>
                    <p className="text-xs text-[var(--color-ink-light)] mt-2">{quotes[currentQuote].source}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="fortune" className="mt-6">
              <div className="glass-card rounded-sm p-8 min-h-[300px]">
                <div className="flex flex-wrap gap-2 justify-center">
                  {fortuneCategories.map((cat) => (
                    <button key={cat} onClick={() => handleFortune(cat)} className="px-4 py-2 rounded-sm border" style={{ borderColor: theme.primary }}>{cat}</button>
                  ))}
                </div>
                {fortuneResult && (
                  <div className="mt-6 p-4 rounded-sm text-center" style={{ backgroundColor: `${theme.primary}08` }}>
                    <p className="text-xs mb-2" style={{ color: theme.primary }}>{fortuneCategory}</p>
                    <p className="text-sm">{fortuneResult}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCulture } from "@/contexts/CultureContext";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Book {
  id: string;
  title: string;
  author: string;
  era: string;
  category: string;
  description: string;
  excerpt: string;
  annotation: string;
}

const booksData: Record<string, Book[]> = {
  buddhist: [
    { id: "jingang", title: "金刚经", author: "鸠摩罗什 译", era: "后秦", category: "般若", description: "大乘佛教核心经典之一。", excerpt: "应无所住，而生其心。", annotation: "强调不执著，保持清明与慈悲。" },
    { id: "xinjing", title: "心经", author: "玄奘 译", era: "唐代", category: "般若", description: "篇幅短小但义理深远。", excerpt: "色不异空，空不异色。", annotation: "说明现象与本质并非对立。" },
  ],
  taoist: [
    { id: "daodejing", title: "道德经", author: "老子", era: "春秋", category: "道家经典", description: "道家思想奠基之作。", excerpt: "上善若水。", annotation: "以水喻德，主张柔和而有力量的处世之道。" },
    { id: "zhuangzi", title: "庄子", author: "庄周", era: "战国", category: "道家经典", description: "寓言丰富，强调精神自由。", excerpt: "天地与我并生，万物与我为一。", annotation: "人与自然本为一体，应回归自在本心。" },
  ],
  mazu: [
    { id: "mazu", title: "妈祖志", author: "历代编纂", era: "明清", category: "信俗文献", description: "记述妈祖生平与信俗传播。", excerpt: "慈航普渡，护佑众生。", annotation: "体现海洋文化中的守护、团结与互助精神。" },
    { id: "haisi", title: "海丝见闻", author: "航海者汇编", era: "明清", category: "海洋文化", description: "记录海上贸易与信俗交流。", excerpt: "风平浪静，一帆风顺。", annotation: "折射沿海社会对平安与共同体的祈愿。" },
  ],
};

const comments = [
  { user: "山间清风", time: "2小时前", text: "这段注解很好，读完更容易理解原文。" },
  { user: "云水禅心", time: "昨天", text: "希望后续增加更多地标与典籍关联。" },
];

export default function Library() {
  const { culture, theme } = useCulture();
  const [, setLocation] = useLocation();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAnnotation, setShowAnnotation] = useState(false);

  useEffect(() => {
    if (!culture || !theme) setLocation("/");
  }, [culture, theme, setLocation]);

  if (!culture || !theme) return null;

  const books = booksData[culture] || [];

  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <Navigation />
      <div className="pt-20 pb-8 px-4">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-mountain-near)]">藏书阁</h1>
          <p className="font-serif text-sm text-[var(--color-ink-light)] mt-2">知识共享空间</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 glass-card rounded-sm p-5">
            <h3 className="font-serif text-sm font-semibold mb-4">典籍目录</h3>
            <div className="space-y-3">
              {books.map((book) => (
                <button key={book.id} onClick={() => { setSelectedBook(book); setShowAnnotation(false); }} className="w-full text-left p-3 rounded-sm hover:bg-white/50">
                  <h4 className="font-serif text-base">{book.title}</h4>
                  <p className="text-xs text-[var(--color-ink-light)]">{book.author} · {book.era}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 glass-card rounded-sm p-6 min-h-[420px]">
            <AnimatePresence mode="wait">
              {selectedBook ? (
                <motion.div key={selectedBook.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-display text-3xl" style={{ color: theme.primary }}>{selectedBook.title}</h2>
                  <p className="text-xs text-[var(--color-ink-light)] mt-2">{selectedBook.author} · {selectedBook.category}</p>
                  <p className="text-sm mt-4">{selectedBook.description}</p>
                  <div className="ink-divider my-4" />
                  <div className="p-4 rounded-sm bg-white/50 cursor-pointer" onDoubleClick={() => setShowAnnotation((v) => !v)}>
                    {selectedBook.excerpt}
                  </div>
                  {showAnnotation && <div className="mt-4 text-sm" style={{ color: theme.primary }}>{selectedBook.annotation}</div>}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[var(--color-ink-light)]">
                  从左侧选择一部典籍开始阅读。
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-3 glass-card rounded-sm p-5">
            <h3 className="font-serif text-sm font-semibold mb-4">读者感悟</h3>
            <ScrollArea className="h-[320px]">
              <div className="space-y-3 pr-2">
                {comments.map((c, i) => (
                  <div key={i} className="p-3 rounded-sm bg-white/50">
                    <div className="flex items-center justify-between text-xs">
                      <span>{c.user}</span>
                      <span className="text-[var(--color-ink-light)]">{c.time}</span>
                    </div>
                    <p className="text-xs mt-2">{c.text}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}

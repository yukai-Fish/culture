/**
 * 藏书阁 - 知识共享空间
 * Design: 典籍库分类展示、交互阅读、实时讨论
 * 新中式书架布局
 */
import { useState } from "react";
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
    {
      id: "jingang",
      title: "金刚经",
      author: "鸠摩罗什 译",
      era: "后秦",
      category: "般若部",
      description: "全称《金刚般若波罗蜜经》，是大乘佛教般若系经典中最精炼的一部。",
      excerpt: "如是我闻。一时佛在舍卫国祇树给孤独园，与大比丘众千二百五十人俱。尔时世尊食时，著衣持钵，入舍卫大城乞食。于其城中次第乞已，还至本处。饭食讫，收衣钵，洗足已，敷座而坐。",
      annotation: "这段开头描述了佛陀在舍卫国祇树给孤独园的日常生活场景，展现了佛陀虽为觉者，仍保持平凡朴素的生活方式——托钵乞食、洗足静坐，体现了佛教'平常心是道'的精神。",
    },
    {
      id: "xinjing",
      title: "心经",
      author: "玄奘 译",
      era: "唐代",
      category: "般若部",
      description: "全称《般若波罗蜜多心经》，仅260字，却是佛教最核心的智慧结晶。",
      excerpt: "观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。舍利子，色不异空，空不异色，色即是空，空即是色，受想行识亦复如是。",
      annotation: "观自在菩萨（观世音菩萨）在深入般若智慧的禅定中，照见构成人的五种要素（色受想行识）都是空性的，由此超越了一切苦难。'色不异空'是说物质现象本质上就是空性，二者不可分离。",
    },
    {
      id: "fahua",
      title: "法华经",
      author: "鸠摩罗什 译",
      era: "后秦",
      category: "法华部",
      description: "全称《妙法莲华经》，被誉为'经中之王'，阐述一切众生皆可成佛。",
      excerpt: "尔时世尊从三昧安详而起，告舍利弗：诸佛智慧，甚深无量，其智慧门，难解难入，一切声闻、辟支佛所不能知。",
      annotation: "佛陀从深定中起来，告诉舍利弗：诸佛的智慧极其深远无量，通往智慧的门径难以理解和进入。这段经文暗示了佛陀即将开示最究竟的教法——一切众生皆有佛性。",
    },
  ],
  taoist: [
    {
      id: "daodejing",
      title: "道德经",
      author: "老子",
      era: "春秋",
      category: "道家经典",
      description: "又称《老子》，道家哲学的奠基之作，五千言涵盖宇宙观、人生观、政治观。",
      excerpt: "道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无欲以观其妙，常有欲以观其徼。此两者同出而异名，同谓之玄。玄之又玄，众妙之门。",
      annotation: "开篇即点明'道'的本质——它超越了语言的表达能力。'无'是天地的本源，'有'是万物的根基。在无欲的状态下可以体悟道的奥妙，在有欲的状态下可以观察道的表现。这两者本质相同，都是深奥玄妙的。",
    },
    {
      id: "zhuangzi",
      title: "庄子",
      author: "庄周",
      era: "战国",
      category: "道家经典",
      description: "又称《南华真经》，以寓言故事阐述道家思想，文学价值极高。",
      excerpt: "北冥有鱼，其名为鲲。鲲之大，不知其几千里也。化而为鸟，其名为鹏。鹏之背，不知其几千里也。怒而飞，其翼若垂天之云。",
      annotation: "《逍遥游》开篇以鲲鹏的宏大意象，展现了庄子对自由和超越的追求。鲲化为鹏，象征着生命的转化与升华。庄子借此说明，真正的自由不在于形体的大小，而在于精神的超脱。",
    },
    {
      id: "yinfu",
      title: "阴符经",
      author: "黄帝（托名）",
      era: "先秦",
      category: "道教经典",
      description: "道教重要经典，论述天道与人事的关系，言简意深。",
      excerpt: "观天之道，执天之行，尽矣。天有五贼，见之者昌。五贼在心，施行于天。宇宙在乎手，万化生乎身。",
      annotation: "观察天道的运行规律，遵循天道而行，这就是修道的全部。天地间有五种隐微的力量（五贼），能洞察它们的人就能兴盛。这五种力量存在于心中，通过心可以与天地相应。",
    },
  ],
  mazu: [
    {
      id: "mazuzhi",
      title: "妈祖志",
      author: "多人编纂",
      era: "明清",
      category: "信仰文献",
      description: "记载妈祖生平事迹、显灵传说及信仰传播历史的重要文献。",
      excerpt: "天妃，莆田都巡检林愿之第六女也。母王氏，于宋建隆元年三月二十三日生。生而不啼，因名默。幼而聪颖，读书过目成诵，尤好焚香礼佛。",
      annotation: "这段记载了妈祖的身世——她是莆田都巡检林愿的第六个女儿，出生时不哭不闹，因此取名'默'（林默娘）。她自幼聪慧过人，喜好礼佛修行，这为她后来成为海上守护神奠定了基础。",
    },
    {
      id: "tianfei",
      title: "天妃显圣录",
      author: "僧照乘",
      era: "明代",
      category: "信仰文献",
      description: "记录妈祖显灵救助海上遇难者的故事集，是妈祖信仰传播的重要载体。",
      excerpt: "宋雍熙四年，默年二十八。重九日，谓家人曰：'心好清净，不愿尘世。'遂登湄峰，乘云而去。后人建庙祀之。",
      annotation: "记载了妈祖升天的传说——宋雍熙四年重阳节，年仅28岁的林默娘告别家人，说自己向往清净不愿留恋尘世，随后登上湄洲岛最高峰，乘云升天。后人在此建庙祭祀，开启了千年妈祖信仰。",
    },
    {
      id: "haishi",
      title: "海事文献集",
      author: "历代航海者",
      era: "宋-清",
      category: "航海文化",
      description: "收录历代航海者关于妈祖庇佑的记载，反映海上丝绸之路的文化交流。",
      excerpt: "凡航海者，出入必祷于天妃。风涛危急，呼之即应。商舶往来南洋诸国，莫不建庙奉祀，以祈平安。",
      annotation: "这段文字反映了妈祖信仰在航海活动中的核心地位——所有出海的人都会向妈祖祈祷，遇到风浪危险时呼唤妈祖就能得到回应。随着海上贸易的发展，妈祖庙遍布东南亚各国。",
    },
  ],
};

// Simulated reader comments
const readerComments = [
  { user: "云水禅心", time: "2小时前", text: "读到此处，心中豁然开朗。万法皆空，唯有慈悲常在。" },
  { user: "山间清风", time: "5小时前", text: "古人智慧，历久弥新。每次重读都有新的感悟。" },
  { user: "静水流深", time: "1天前", text: "分享给同修们，愿大家都能从中获得启发。" },
];

export default function Library() {
  const { culture, theme } = useCulture();
  const [, setLocation] = useLocation();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAnnotation, setShowAnnotation] = useState(false);

  if (!culture || !theme) {
    setLocation("/");
    return null;
  }

  const books = booksData[culture] || [];

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
            藏书阁
          </h1>
          <p className="font-serif text-sm text-[var(--color-ink-light)] mt-2">
            知识共享 · {theme.name}典籍
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Book Shelf - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="glass-card rounded-sm p-5">
              <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-4">
                典籍目录
              </h3>
              <div className="space-y-3">
                {books.map((book, index) => (
                  <motion.button
                    key={book.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => { setSelectedBook(book); setShowAnnotation(false); }}
                    className={`w-full text-left p-4 rounded-sm border transition-all duration-200 ${
                      selectedBook?.id === book.id
                        ? "border-current shadow-sm"
                        : "border-transparent hover:border-[var(--color-mountain-near)]/20 hover:bg-white/50"
                    }`}
                    style={{
                      borderColor: selectedBook?.id === book.id ? `${theme.primary}50` : undefined,
                      backgroundColor: selectedBook?.id === book.id ? `${theme.primary}05` : undefined,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Book spine decoration */}
                      <div
                        className="w-1 h-12 rounded-full flex-shrink-0"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div>
                        <h4 className="font-serif text-base font-medium text-[var(--color-ink-dark)]">
                          {book.title}
                        </h4>
                        <p className="font-sans text-xs text-[var(--color-ink-light)] mt-1">
                          {book.author} · {book.era}
                        </p>
                        <span
                          className="inline-block mt-2 font-sans text-[10px] px-2 py-0.5 rounded-sm"
                          style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                        >
                          {book.category}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Reading Area - Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="glass-card rounded-sm p-6 min-h-[500px]">
              <AnimatePresence mode="wait">
                {selectedBook ? (
                  <motion.div
                    key={selectedBook.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4">
                      <h2 className="font-display text-3xl" style={{ color: theme.primary }}>
                        {selectedBook.title}
                      </h2>
                      <p className="font-sans text-xs text-[var(--color-ink-light)] mt-2">
                        {selectedBook.author} · {selectedBook.era} · {selectedBook.category}
                      </p>
                    </div>

                    <p className="font-sans text-sm text-[var(--color-ink-medium)] mb-6">
                      {selectedBook.description}
                    </p>

                    <div className="ink-divider mb-6" />

                    {/* Excerpt with interactive annotation */}
                    <div className="mb-4">
                      <h4 className="font-serif text-xs text-[var(--color-ink-light)] mb-3">
                        经文节选 <span className="opacity-60">（双击查看释义）</span>
                      </h4>
                      <div
                        className="font-serif text-base leading-loose text-[var(--color-ink-dark)] p-4 rounded-sm cursor-pointer select-none transition-colors hover:bg-white/50"
                        style={{ backgroundColor: `${theme.primary}03` }}
                        onDoubleClick={() => setShowAnnotation(!showAnnotation)}
                      >
                        {selectedBook.excerpt}
                      </div>
                    </div>

                    {/* Annotation */}
                    <AnimatePresence>
                      {showAnnotation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="p-4 rounded-sm border-l-2"
                            style={{ borderColor: theme.primary, backgroundColor: `${theme.primary}08` }}
                          >
                            <h5 className="font-serif text-xs font-medium mb-2" style={{ color: theme.primary }}>
                              释义解读
                            </h5>
                            <p className="font-sans text-sm text-[var(--color-ink-medium)] leading-relaxed">
                              {selectedBook.annotation}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-96 text-center"
                  >
                    <div className="font-display text-6xl opacity-10 mb-4" style={{ color: theme.primary }}>
                      书
                    </div>
                    <p className="font-serif text-sm text-[var(--color-ink-light)]">
                      从左侧选择一部典籍开始阅读
                    </p>
                    <p className="font-sans text-xs text-[var(--color-ink-light)] mt-2">
                      双击经文段落可查看专家释义
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Discussion Panel - Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-sm p-5">
              <h3 className="font-serif text-sm font-semibold text-[var(--color-mountain-near)] mb-4">
                读者感悟
              </h3>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4 pr-2">
                  {readerComments.map((comment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-3 rounded-sm bg-white/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-xs font-medium text-[var(--color-ink-dark)]">
                          {comment.user}
                        </span>
                        <span className="font-sans text-[10px] text-[var(--color-ink-light)]">
                          {comment.time}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[var(--color-ink-medium)] leading-relaxed">
                        {comment.text}
                      </p>
                    </motion.div>
                  ))}

                  {/* Input area placeholder */}
                  <div className="pt-4 border-t border-[var(--color-mountain-near)]/10">
                    <div className="p-3 rounded-sm border border-dashed border-[var(--color-mountain-near)]/20 text-center">
                      <p className="font-sans text-xs text-[var(--color-ink-light)]">
                        分享您的读书感悟...
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

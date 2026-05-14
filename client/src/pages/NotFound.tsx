import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-parchment)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4"
      >
        <div className="font-display text-8xl text-[var(--color-mountain-near)]/20 mb-4">
          迷
        </div>
        <h1 className="font-serif text-xl text-[var(--color-ink-dark)] mb-2">
          此路不通
        </h1>
        <p className="font-sans text-sm text-[var(--color-ink-light)] mb-8">
          您所寻找的页面似乎已隐入山雾之中
        </p>
        <Link href="/">
          <span className="seal-btn inline-block">
            返回首页
          </span>
        </Link>
      </motion.div>
    </div>
  );
}

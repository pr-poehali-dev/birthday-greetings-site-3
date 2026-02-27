import { useEffect, useState, useRef } from "react";

// ── Конфетти ─────────────────────────────────────────────────────────────────
interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  shape: "rect" | "circle" | "star";
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

const CONFETTI_COLORS = [
  "#FF4DAF", "#FFD600", "#00E5FF", "#FF6B35",
  "#BF5AF2", "#00E676", "#FF3D3D", "#FFAB00"
];

function useConfetti(count = 60) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  useEffect(() => {
    const arr: ConfettiPiece[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: (["rect", "circle", "star"] as const)[Math.floor(Math.random() * 3)],
      size: 8 + Math.random() * 12,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 6,
      rotation: Math.random() * 360,
    }));
    setPieces(arr);
  }, [count]);
  return pieces;
}

function ConfettiCanvas({ pieces }: { pieces: ConfettiPiece[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            width: p.shape === "circle" ? p.size : p.size * 0.7,
            height: p.shape === "circle" ? p.size : p.size * 1.3,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
            clipPath: p.shape === "star"
              ? "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"
              : undefined,
          }}
        />
      ))}
    </div>
  );
}

// ── Бабочки ───────────────────────────────────────────────────────────────────
interface ButterflyDef {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

const BUTTERFLY_COLORS = ["#FF4DAF", "#BF5AF2", "#FFD600", "#00E5FF", "#FF6B35"];

function Butterfly({ b }: { b: ButterflyDef }) {
  return (
    <div
      className="absolute animate-butterfly-fly pointer-events-none"
      style={{
        left: `${b.x}%`,
        top: `${b.y}%`,
        animationDuration: `${b.duration}s`,
        animationDelay: `${b.delay}s`,
        zIndex: 10,
      }}
    >
      <div className="relative" style={{ width: b.size * 2, height: b.size }}>
        <div
          className="absolute animate-wing-flap"
          style={{
            width: b.size,
            height: b.size * 0.8,
            backgroundColor: b.color,
            borderRadius: "80% 0 80% 0",
            left: 0,
            top: 0,
            opacity: 0.85,
            transformOrigin: "right center",
          }}
        />
        <div
          className="absolute animate-wing-flap"
          style={{
            width: b.size,
            height: b.size * 0.8,
            backgroundColor: b.color,
            borderRadius: "0 80% 0 80%",
            right: 0,
            top: 0,
            opacity: 0.85,
            transformOrigin: "left center",
            animationDelay: "0.15s",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 4,
            height: b.size * 0.9,
            backgroundColor: "#333",
            borderRadius: 2,
            left: "50%",
            top: "-4px",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
}

function Butterflies() {
  const [butterflies] = useState<ButterflyDef[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90,
      y: Math.random() * 70,
      color: BUTTERFLY_COLORS[i % BUTTERFLY_COLORS.length],
      size: 20 + Math.random() * 20,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
    }))
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 5 }}>
      {butterflies.map((b) => <Butterfly key={b.id} b={b} />)}
    </div>
  );
}

// ── Всплывающие поздравления ──────────────────────────────────────────────────
const POPUP_MESSAGES = [
  "🎉 Ты лучшая!",
  "💖 С Днём Рождения!",
  "🌟 Ты — звезда!",
  "🦋 Будь счастлива!",
  "🎊 Ура-ура-ура!",
  "🍰 Желаем торта!",
  "✨ Всё сбудется!",
  "🎈 Ты прекрасна!",
];

interface FloatingMsg {
  id: number;
  text: string;
  x: number;
  y: number;
}

function FloatingMessages() {
  const [messages, setMessages] = useState<FloatingMsg[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg: FloatingMsg = {
        id: nextId.current++,
        text: POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)],
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 60,
      };
      setMessages((prev) => [...prev.slice(-5), msg]);
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      }, 2000);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 60 }}>
      {messages.map((m) => (
        <div
          key={m.id}
          className="absolute animate-float-up"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <div
            className="font-rubik font-bold text-white px-4 py-2 rounded-full shadow-xl text-sm whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #FF4DAF, #BF5AF2)",
              boxShadow: "0 4px 20px rgba(255,77,175,0.5)",
            }}
          >
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #FF4DAF 0%, #BF5AF2 30%, #00E5FF 60%, #FFD600 100%)",
          backgroundSize: "400% 400%",
          animation: "rainbow-shift 6s ease infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)",
        }}
      />

      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 animate-wiggle"
          style={{
            width: 100 + i * 80,
            height: 100 + i * 80,
            border: "4px solid rgba(255,255,255,0.6)",
            top: `${10 + i * 12}%`,
            left: `${5 + i * 14}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2 + i * 0.5}s`,
          }}
        />
      ))}

      <div className="relative z-10">
        <div className="text-8xl md:text-[120px] mb-2 animate-bounce-in">🎂</div>
        <h1
          className="font-pacifico text-white mb-4 animate-slide-up-fade"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            textShadow: "0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.4)",
            animationDelay: "0.3s",
          }}
        >
          С Днём Рождения,
          <br />
          <span style={{ color: "#FFD600" }}>Катя!</span>
        </h1>
        <p
          className="font-caveat text-white/90 text-2xl md:text-3xl animate-slide-up-fade"
          style={{ animationDelay: "0.6s", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          Сегодня твой день — самый лучший! 🌟
        </p>

        <div
          className="mt-10 flex gap-4 justify-center flex-wrap animate-slide-up-fade"
          style={{ animationDelay: "0.9s" }}
        >
          {(["#wishes", "#gallery", "#jokes"] as const).map((href, i) => {
            const labels = ["💌 Пожелания", "📸 Галерея", "😂 Шутки"];
            return (
              <a
                key={href}
                href={href}
                className="font-rubik font-bold text-sm md:text-base px-6 py-3 rounded-full transition-transform hover:scale-110 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                  border: "2px solid rgba(255,255,255,0.5)",
                  color: "white",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                {labels[i]}
              </a>
            );
          })}
        </div>
      </div>

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white animate-star-spin"
          style={{
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 90}%`,
            fontSize: `${8 + (i % 4) * 5}px`,
            opacity: 0.4 + (i % 3) * 0.2,
            animationDuration: `${2 + (i % 4)}s`,
            animationDelay: `${(i % 5) * 0.6}s`,
          }}
        >
          ✦
        </div>
      ))}
    </section>
  );
}

// ── Пожелания ─────────────────────────────────────────────────────────────────
const WISHES = [
  {
    icon: "💖",
    title: "Счастья без края",
    text: "Пусть каждый день будет наполнен радостью, смехом и маленькими приятными сюрпризами. Ты заслуживаешь всего самого лучшего!",
    color: "#FF4DAF",
    bg: "#FFF0F8",
  },
  {
    icon: "🌟",
    title: "Больших побед",
    text: "Пусть все задуманные цели становятся реальностью, а мечты — осуществляются одна за другой. Ты способна на всё!",
    color: "#B89000",
    bg: "#FFFDE7",
  },
  {
    icon: "🌺",
    title: "Здоровья и красоты",
    text: "Оставайся такой же яркой и прекрасной. Пусть здоровье крепнет, а улыбка никогда не сходит с лица!",
    color: "#D4521A",
    bg: "#FFF3EE",
  },
  {
    icon: "💫",
    title: "Любви и тепла",
    text: "Пусть рядом всегда будут близкие люди, которые любят тебя так же сильно, как ты любишь их!",
    color: "#BF5AF2",
    bg: "#F5EEFF",
  },
  {
    icon: "🎯",
    title: "Исполнения желаний",
    text: "Загадай желание — пусть оно сбудется! А если не сбудется само, знай: мы поможем его воплотить в жизнь!",
    color: "#007EA8",
    bg: "#E0FAFF",
  },
  {
    icon: "🦋",
    title: "Новых приключений",
    text: "Пусть впереди тебя ждут захватывающие путешествия, интересные знакомства и незабываемые моменты!",
    color: "#009955",
    bg: "#EEFFEE",
  },
];

function WishCard({ wish, index }: { wish: typeof WISHES[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-3xl p-6 cursor-default"
      style={{
        backgroundColor: wish.bg,
        border: `3px solid ${wish.color}40`,
        boxShadow: `0 8px 30px ${wish.color}20`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        transition: `all 0.5s ease ${index * 100}ms`,
      }}
    >
      <div className="text-5xl mb-3">{wish.icon}</div>
      <h3 className="font-rubik font-bold text-xl mb-2" style={{ color: wish.color }}>
        {wish.title}
      </h3>
      <p className="font-rubik text-gray-600 text-sm leading-relaxed">{wish.text}</p>
    </div>
  );
}

function WishesSection() {
  return (
    <section id="wishes" className="py-20 px-4" style={{ background: "#FFF9FF" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-6xl mb-4">💌</div>
          <h2 className="font-pacifico text-4xl md:text-5xl" style={{ color: "#FF4DAF" }}>
            Пожелания
          </h2>
          <p className="font-caveat text-xl text-gray-500 mt-2">
            Всё это — только для тебя, Катя!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WISHES.map((wish, i) => (
            <WishCard key={i} wish={wish} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Галерея ───────────────────────────────────────────────────────────────────
const GALLERY_PLACEHOLDERS = [
  { label: "Фото 1", emoji: "📸" },
  { label: "Фото 2", emoji: "🌸" },
  { label: "Фото 3", emoji: "✨" },
  { label: "Фото 4", emoji: "🎉" },
  { label: "Фото 5", emoji: "💫" },
  { label: "Фото 6", emoji: "🦋" },
];

const GALLERY_COLORS = ["#FF4DAF", "#BF5AF2", "#B89000", "#D4521A", "#007EA8", "#009955"];

function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 px-4" style={{ background: "linear-gradient(180deg, #FFF0FF 0%, #E8F4FF 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-6xl mb-4">📸</div>
          <h2 className="font-pacifico text-4xl md:text-5xl" style={{ color: "#BF5AF2" }}>
            Галерея
          </h2>
          <p className="font-caveat text-xl text-gray-500 mt-2">
            Добавьте ваши фотографии — здесь будут самые тёплые воспоминания
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_PLACEHOLDERS.map((ph, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
              style={{
                aspectRatio: "1",
                background: `linear-gradient(135deg, ${GALLERY_COLORS[i]}30, ${GALLERY_COLORS[(i + 2) % 6]}30)`,
                border: `3px solid ${GALLERY_COLORS[i]}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${GALLERY_COLORS[i]}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl mb-2 transition-transform duration-300 group-hover:scale-125">
                  {ph.emoji}
                </div>
                <p className="font-caveat text-lg font-bold" style={{ color: GALLERY_COLORS[i] }}>
                  {ph.label}
                </p>
                <p className="font-rubik text-xs text-gray-400 mt-1">Нажмите для просмотра</p>
              </div>
            </div>
          ))}
        </div>

        {selected !== null && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "rgba(0,0,0,0.8)" }}
            onClick={() => setSelected(null)}
          >
            <div
              className="rounded-3xl p-12 text-center animate-pop-in"
              style={{
                background: `linear-gradient(135deg, ${GALLERY_COLORS[selected]}30, white)`,
                border: `4px solid ${GALLERY_COLORS[selected]}`,
                maxWidth: 400,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-8xl mb-4">{GALLERY_PLACEHOLDERS[selected].emoji}</div>
              <p className="font-pacifico text-2xl" style={{ color: GALLERY_COLORS[selected] }}>
                {GALLERY_PLACEHOLDERS[selected].label}
              </p>
              <p className="font-rubik text-gray-500 mt-2 text-sm">Здесь будет ваше фото</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 font-rubik font-bold text-white px-6 py-2 rounded-full transition-transform hover:scale-105"
                style={{ background: GALLERY_COLORS[selected] }}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Шутки ─────────────────────────────────────────────────────────────────────
const JOKES = [
  {
    setup: "Почему именинники такие весёлые?",
    punchline: "Потому что они знают: раз в год можно есть торт без угрызений совести! 🍰",
    emoji: "🎂",
  },
  {
    setup: "Что подарить человеку, у которого есть всё?",
    punchline: "Ещё один день рождения! Потому что чем больше праздников — тем лучше! 🎉",
    emoji: "🎁",
  },
  {
    setup: "Говорят, с возрастом становишься мудрее…",
    punchline: "Значит, Катя сегодня стала ещё немного мудрее. Поздравляем с апгрейдом! 🧠✨",
    emoji: "💡",
  },
  {
    setup: "Как называется человек, который любит торты?",
    punchline: "Именинник! Это вообще-то медицинский термин. Лечится только тортом! 😂",
    emoji: "😋",
  },
  {
    setup: "День рождения — это как Новый год…",
    punchline: "Только лично твой. И подарки тут — только тебе! Главный праздник в году! 🎊",
    emoji: "🥳",
  },
];

function JokeCard({ joke, index }: { joke: typeof JOKES[0]; index: number }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className="rounded-3xl p-6 cursor-pointer"
      style={{
        background: "white",
        border: "3px solid #FFD600",
        boxShadow: revealed ? "0 8px 30px rgba(255,214,0,0.3)" : "0 4px 15px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.3s ease",
      }}
      onClick={() => setRevealed(!revealed)}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{joke.emoji}</div>
        <div className="flex-1">
          <p className="font-rubik font-bold text-gray-800 text-base mb-3">{joke.setup}</p>
          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: revealed ? "200px" : "0", opacity: revealed ? 1 : 0 }}
          >
            <p className="font-caveat text-lg font-semibold" style={{ color: "#D4521A" }}>
              {joke.punchline}
            </p>
          </div>
          {!revealed && (
            <div
              className="font-rubik text-sm font-medium px-4 py-1 rounded-full inline-block"
              style={{ background: "#FFD60020", color: "#8A7000" }}
            >
              Нажмите, чтобы узнать 😄
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function JokesSection() {
  return (
    <section id="jokes" className="py-20 px-4" style={{ background: "#FFFDE7" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-6xl mb-4">😂</div>
          <h2 className="font-pacifico text-4xl md:text-5xl" style={{ color: "#D4521A" }}>
            Шутки про ДР
          </h2>
          <p className="font-caveat text-xl text-gray-500 mt-2">
            Нажми на карточку, чтобы узнать ответ!
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {JOKES.map((joke, i) => (
            <JokeCard key={i} joke={joke} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-12 px-4 text-center"
      style={{
        background: "linear-gradient(135deg, #FF4DAF, #BF5AF2, #00E5FF)",
      }}
    >
      <div className="text-5xl mb-4 animate-wiggle">🎉</div>
      <h3 className="font-pacifico text-white text-3xl mb-2">
        Ещё раз с Днём Рождения!
      </h3>
      <p className="font-caveat text-white/80 text-xl">
        Пусть этот год будет самым лучшим! 💖
      </p>
      <div className="mt-6 flex justify-center gap-3 text-3xl flex-wrap">
        {["🎂","🦋","🌺","⭐","🎊","💫","🎈","🌟","🎁","💎"].map((e, i) => (
          <span
            key={i}
            className="animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {e}
          </span>
        ))}
      </div>
    </footer>
  );
}

// ── Главная страница ──────────────────────────────────────────────────────────
export default function Index() {
  const confetti = useConfetti(70);

  return (
    <div className="font-rubik overflow-x-hidden">
      <ConfettiCanvas pieces={confetti} />
      <Butterflies />
      <FloatingMessages />
      <HeroSection />
      <WishesSection />
      <GallerySection />
      <JokesSection />
      <Footer />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { 
  Droplets, 
  Fish, 
  ShieldAlert, 
  Thermometer, 
  Zap, 
  Leaf, 
  Scale, 
  MessageCircle,
  X,
  ChevronRight,
  Info
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ParameterChart from "./components/ParameterChart";
import BettaGallery from "./components/BettaGallery";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const BETTA_INFO = [
  {
    title: "Яркое Происхождение",
    description: "Родом из мелководных водоемов Таиланда, Камбоджи и Вьетнама, петушки Betta splendens эволюционировали, чтобы выживать в условиях низкого содержания кислорода.",
    icon: Fish,
    color: "bg-blue-500/10 text-blue-400"
  },
  {
    title: "Внутренняя Битва",
    description: "Известные как 'Сиамские бойцовые рыбки', самцы яростно охраняют свою территорию. Они не просто сражаются; они защищают свое убежище ценой жизни и плавников.",
    icon: ShieldAlert,
    color: "bg-red-500/10 text-red-400"
  },
  {
    title: "Аквариумный Зенит",
    description: "Оптимальный уход требует минимум 20 литров, обогреватель и мягкую фильтрацию, чтобы защитить их нежные, струящиеся плавники.",
    icon: Droplets,
    color: "bg-emerald-500/10 text-emerald-400"
  }
];

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "model", text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatHistory(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "Вы — эксперт-аквариумист, специализирующийся на петушках (Betta Splendens). Предоставляйте краткие, точные и полезные советы по уходу. Всегда ставьте благополучие рыбы на первое место. Если спрашивают о барбусах, объясните, как их привычка обкусывать плавники может погубить петушка. Отвечайте на РУССКОМ языке.",
        },
      });

      setChatHistory(prev => [...prev, { role: "model", text: response.text || "Извините, я не смог обработать ваш запрос." }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setChatHistory(prev => [...prev, { role: "model", text: "У меня возникли трудности с подключением к базе знаний. Пожалуйста, попробуйте позже." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-red-500/30">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/src/assets/images/betta_hero_main_png_1779178671627.png" 
            alt="Betta Splendens" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'%3E%3Crect width='1600' height='900' fill='%23050505'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='48' fill='white'%3EBetta Splendens Sanctuary%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-red-500 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">Жемчужина Востока</span>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-white mb-6 leading-none italic">
              Betta <span className="font-semibold not-italic">Splendens</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Откройте для себя деликатное пересечение чистой мощи и непревзойденной красоты. Глубокое погружение в мир сиамских бойцовых рыбок.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => document.getElementById('care')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-white text-black rounded-full font-medium flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Начать руководство <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]" />
      </section>

      {/* Quick Stats / Info Bento */}
      <section id="care" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BETTA_INFO.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-2xl ${info.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">{info.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {info.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Barb Conflict Section */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-red-500/10 blur-3xl rounded-full" />
            <img 
              src="/src/assets/images/tiger_barbs_png_1779178708620.png" 
              alt="Tiger Barb" 
              className="rounded-3xl border border-white/10 relative z-10 w-full aspect-video object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23050505'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='white'%3ETiger Barb Conflict%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="absolute top-4 left-4 z-20 px-4 py-2 bg-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
              Предупреждение о совместимости
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-white mb-6 leading-tight italic">
              Конфликт с <span className="text-red-500 not-italic font-semibold">Барбусами</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 font-light leading-relaxed">
              В аквариумистике суматранских и алых барбусов часто ошибочно считают подходящими соседями. Однако у них есть опасная привычка: <span className="text-white font-medium">обкусывание плавников</span>.
            </p>
            <ul className="space-y-4">
              {[
                { label: "Целенаправленные атаки", text: "Барбусов привлекают медлительные рыбы с длинными плавниками." },
                { label: "Смертельный стресс", text: "Постоянные преследования приводят к экстремальному стрессу и гибели." },
                { label: "Разница в скорости", text: "Петушки не могут обогнать молниеносных барбусов." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <div>
                    <span className="text-white font-medium block">{item.label}</span>
                    <span className="text-gray-500 font-light">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Parameters Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-light text-white mb-2 italic">Важные <span className="not-italic font-semibold text-emerald-400">Параметры</span></h2>
            <p className="text-gray-500 font-light">Стабильность важнее идеальных цифр.</p>
          </div>
          <div className="px-6 py-2 rounded-full border border-white/10 text-xs font-mono text-gray-400 uppercase tracking-widest">
            Характеристики Эксперта
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Температура", val: "25.5°C - 26.5°C", icon: Thermometer },
            { label: "Уровень pH", val: "6.5 - 7.5", icon: Scale },
            { label: "Объем аквариума", val: "мин. 20 л", icon: Info },
            { label: "Рацион", val: "Много белка", icon: Zap }
          ].map((spec, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col gap-4">
              <spec.icon className="w-5 h-5 text-gray-500" />
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">{spec.label}</span>
                <span className="text-lg text-white font-medium">{spec.val}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <BettaGallery />

      {/* Historical Data Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto mb-24">
        <ParameterChart />
      </section>

      {/* Floating Care Assistant */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-[#0f0f0f] border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-bottom border-white/10 flex items-center justify-between bg-white text-black">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <Fish className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Водный Советник</h4>
                  <span className="text-[10px] uppercase tracking-widest opacity-60">ИИ Помощник по уходу</span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-black/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 && (
                <div className="text-center py-10">
                  <MessageCircle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm italic">Спросите меня о чем угодно по уходу за петушками, соседях или здоровье.</p>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-red-500 text-white rounded-br-none' 
                      : 'bg-white/10 text-gray-200 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 bg-black/50">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Задайте вопрос..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !chatInput.trim()}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsChatOpen(prev => !prev)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-red-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:hidden" />
        <X className="w-6 h-6 hidden group-hover:block" />
      </button>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center mt-auto">
        <div className="flex items-center justify-center gap-2 mb-4 text-white">
          <Fish className="w-5 h-5" />
          <span className="font-bold tracking-tight">BETTA SANCTUARY</span>
        </div>
        <p className="text-gray-600 text-sm font-light">Создано для преданных аквариумистов. Всегда ставьте благополучие рыб на первое место.</p>
      </footer>
    </div>
  );
}

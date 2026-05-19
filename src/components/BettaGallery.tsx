import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X } from 'lucide-react';

interface BettaVariety {
  id: number;
  name: string;
  color: string;
  finType: string;
  image: string;
  description: string;
}

const BETTA_VARIETIES: BettaVariety[] = [
  {
    id: 1,
    name: "Багряный Монарх",
    color: "Красный",
    finType: "Халфмун",
    image: "/src/assets/images/betta_hero_main_png_1779178671627.png",
    description: "Глубокий красный окрас с массивным размахом хвоста на 180 градусов."
  },
  {
    id: 2,
    name: "Кобальтовый Фантом",
    color: "Синий",
    finType: "Коронохвост",
    image: "/src/assets/images/betta_blue_crowntail_png_1779178692198.png",
    description: "Шипастые лучи плавников, создающие вид короны."
  },
  {
    id: 3,
    name: "Изумрудный Страж",
    color: "Разноцветный",
    finType: "Халфмун",
    image: "/src/assets/images/betta_emerald_guardian_1779178869891.png",
    description: "Редкое сочетание зеленых и синих переливчатых чешуек."
  },
  {
    id: 4,
    name: "Туманный Дракон",
    color: "Разноцветный",
    finType: "Плакат",
    image: "/src/assets/images/betta_plakat_neon_png_1779178723601.png",
    description: "Короткие, мощные плавники, идеальные для маневренности."
  },
  {
    id: 5,
    name: "Полуночный Сапфир",
    color: "Синий",
    finType: "Халфмун",
    image: "/src/assets/images/betta_midnight_sapphire_halfmoon_1779178888110.png",
    description: "Потрясающая темно-синяя чешуя с соответствующими плавниками."
  },
  {
    id: 6,
    name: "Лазурное Пламя",
    color: "Синий",
    finType: "Коронохвост",
    image: "/src/assets/images/betta_azure_crowntail_flame_1779178907488.png",
    description: "Яркие синие шипы, светящиеся при правильном освещении."
  }
];

const COLORS = ["Все", "Красный", "Синий", "Белый", "Разноцветный"];
const FIN_TYPES = ["Все", "Халфмун", "Коронохвост", "Вуалехвост", "Плакат"];

export default function BettaGallery() {
  const [activeColor, setActiveColor] = useState("Все");
  const [activeFin, setActiveFin] = useState("Все");
  const [selectedBetta, setSelectedBetta] = useState<BettaVariety | null>(null);

  const filteredBettas = BETTA_VARIETIES.filter(betta => {
    const colorMatch = activeColor === "Все" || betta.color === activeColor;
    const finMatch = activeFin === "Все" || betta.finType === activeFin;
    return colorMatch && finMatch;
  });

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
         <h2 className="text-4xl font-light text-white mb-4 italic">Витрина <span className="not-italic font-semibold text-red-500">Пород</span></h2>
         <p className="text-gray-500 font-light max-w-xl mx-auto">От величественных Халфмунов до стремительных Плакатов.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 bg-[#0a0a0a] p-6 rounded-3xl border border-white/5">
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono flex items-center gap-2">
            <Filter className="w-3 h-3" /> Палитра Цветов
          </span>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <button
                key={color}
                onClick={() => setActiveColor(color)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeColor === color 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-px h-12 bg-white/10" />

        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono flex items-center gap-2 text-left">
            <Filter className="w-3 h-3" /> Морфология Плавников
          </span>
          <div className="flex flex-wrap gap-2">
            {FIN_TYPES.map(fin => (
              <button
                key={fin}
                onClick={() => setActiveFin(fin)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFin === fin 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {fin}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBettas.map((betta) => (
            <motion.div
              layout
              key={betta.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedBetta(betta)}
            >
              <div className="overflow-hidden rounded-3xl aspect-[4/5] bg-[#0d0d0d] border border-white/5 group-hover:border-white/20 transition-all shadow-xl flex items-center justify-center">
                <img 
                  src={betta.image} 
                  alt={betta.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%230a0a0a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='20' fill='%23333'%3E${betta.name}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-widest text-red-500 font-mono mb-1 block">Тип плавников: {betta.finType}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{betta.name}</h3>
                  <p className="text-xs text-gray-400 font-light opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    Нажмите для подробностей
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredBettas.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-[#0a0a0a] rounded-3xl border border-dashed border-white/10"
        >
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
             <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-white font-medium mb-1">Совпадений не найдено</h3>
          <p className="text-gray-500 text-sm">Попробуйте изменить фильтры, чтобы найти другую жемчужину.</p>
        </motion.div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedBetta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedBetta(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-[40px] max-w-4xl w-full overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedBetta(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-96 md:h-auto overflow-hidden">
                  <img 
                    src={selectedBetta.image} 
                    alt={selectedBetta.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%230f0f0f'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='40' fill='%23333'%3E${selectedBetta.name}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-red-500 font-mono text-xs uppercase tracking-widest mb-4 block">Разновидность {selectedBetta.finType}</span>
                  <h2 className="text-4xl font-serif text-white mb-6 tracking-tight italic">{selectedBetta.name}</h2>
                  <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                    {selectedBetta.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Цвет</span>
                      <span className="text-white font-medium">{selectedBetta.color}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Тип плавников</span>
                      <span className="text-white font-medium">{selectedBetta.finType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

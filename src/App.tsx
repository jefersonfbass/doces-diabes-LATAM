import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  BookOpen,
  Star,
  Lock,
  Sparkles,
  Smile,
  X,
  CreditCard,
  QrCode,
  ChevronDown,
  ChevronRight,
  Apple,
  Clock,
  Coffee
} from "lucide-react";
import { EBOOKS_DATA, FAQS_DATA, EBookItem, RECIPES_DATA } from "./data";

const carouselImages = [
  {
    url: "https://i.ibb.co/BKP0rJxx/images-2-2.webp",
    title: "Pastel Volcán de Chocolate",
    desc: "Exquisito panqué húmedo de chocolate con un centro líquido de fudge irresistible y sin azúcar."
  },
  {
    url: "https://i.ibb.co/kshYMnB8/images-2-1.webp",
    title: "Pay Cremoso de Limón",
    desc: "Una base crujiente y dorada con relleno cítrico ultra sedoso que se derrite en la boca."
  },
  {
    url: "https://i.ibb.co/pvb9QxTS/images-2.webp",
    title: "Mousse Cremoso de Fresa",
    desc: "Cremosa textura de fresas frescas con ganache de chocolate amargo prémium sin alterar el azúcar."
  },
  {
    url: "https://i.ibb.co/nNsfDGGC/Brigadeiro-Gomer.jpg",
    title: "Trufas Gourmet Cero Azúcar",
    desc: "Pequeños bocados de puro chocolate con leche, súper suaves, ideales para toda la familia."
  },
  {
    url: "https://i.ibb.co/Gfz2KLhY/sobremesa-sensacao-na-travessa-03-04-1024x683.jpg",
    title: "Pavé de Fresa y Chocolate Amargo",
    desc: "El postre del domingo perfecto: capas de crema aireada, fresas y chocolate premium de bajo impacto."
  },
  {
    url: "https://i.ibb.co/VWVHPkVn/bolo-brownie-3.webp",
    title: "Brownie Fudge de Nuez",
    desc: "Brownie denso y húmedo con trozos crujientes de nuez fina y cero azúcar refinado."
  },
  {
    url: "https://i.ibb.co/rRyRgcgn/maxresdefault.jpg",
    title: "Flan de Leche Casero",
    desc: "Textura tersa y sedosa con un caramelo dorado brillante idéntico en sabor al tradicional."
  },
  {
    url: "https://i.ibb.co/xSZvqGCD/images-2.jpg",
    title: "Muffin de Frutos Rojos",
    desc: "Panecillos esponjosos rellenos de arándanos y frambuesas silvestres, ideales para la merienda."
  },
  {
    url: "https://i.ibb.co/bG0RSTQ/aee6b7eabcfbb7f95c4f7ee66e00ef27-XL.jpg",
    title: "Copas Dulces Finas",
    desc: "Mousses y postres en porción individual que demuestran que controlar el azúcar puede ser un placer."
  }
];

// Asset paths
const productShowcaseImg = "https://i.ibb.co/wh1N5qJj/Chat-GPT-Image-21-de-jun-de-2026-18-19-50-Photoroom.webp";

export default function App() {
  // Navigation / Modal States
  const [selectedBook, setSelectedBook] = useState<EBookItem>(EBOOKS_DATA[0]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<"basico" | "completo">("completo");
  const [checkoutStep, setCheckoutStep] = useState<"details" | "payment" | "success">("details");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  
  // Checkout inputs
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  
  // Dashboard Simulator
  const [activeTab, setActiveTab] = useState<"materials" | "recipes" | "glycemic">("materials");
  const [bloodSugarValue, setBloodSugarValue] = useState<number>(140);
  const [simulatedMealResult, setSimulatedMealResult] = useState<{
    text: string;
    level: "safe" | "risk";
    diff: string;
  } | null>(null);

  const applyCoupon = () => {
    const code = couponCode.toUpperCase();
    if (code === "GLICOSE80" || code === "GLUCOSA80" || code === "QUEROCOZER" || code === "QUIEROCOCINAR") {
      setCouponApplied(true);
    }
  };

  const scrollToOffers = () => {
    document.getElementById("comparativo-pacotes")?.scrollIntoView({ behavior: "smooth" });
  };

  const trackInitiateCheckout = (packageName: string, price: number) => {
    try {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "InitiateCheckout", {
          content_name: packageName,
          value: price,
          currency: "USD"
        });
      }
    } catch (e) {
      console.warn("fbq tracking error:", e);
    }
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (checkoutStep === "details") {
      if (!buyerName || !buyerEmail) {
        alert("¡Por favor, ingresa tu nombre y correo electrónico!");
        return;
      }
      setCheckoutStep("payment");
    } else if (checkoutStep === "payment") {
      setCheckoutStep("success");
    }
  };

  // Run a simple calculation for the interactive glycemic simulator
  const handleSimulateMeal = (type: "traditional" | "smart") => {
    if (type === "traditional") {
      setSimulatedMealResult({
        text: "¡Pico de insulina severo! Los alimentos elaborados con harinas refinadas o azúcares refinados liberan glucosa a una velocidad extrema en el organismo. Tu páncreas se ve forzado a trabajar horas extra, lo que provoca la acumulación de grasa corporal y fatiga súbita.",
        level: "risk",
        diff: "+ 80 mg/dL"
      });
      setBloodSugarValue(220);
    } else {
      setSimulatedMealResult({
        text: "¡Nivel súper seguro y estable! El uso de fibra soluble (como el psyllium) y harinas de frutos secos alternativas, repletas de proteínas, ralentiza el vaciado gástrico, manteniendo los niveles de azúcar en la sangre perfectamente constantes.",
        level: "safe",
        diff: "+ 10 mg/dL (Estable)"
      });
      setBloodSugarValue(95);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2524] antialiased selection:bg-[#E5C158]/30 overflow-x-hidden font-sans">
      
      {/* URGENCY TOP BANNER */}
      <div className="bg-[#BA2525] text-white py-3 px-4 text-center text-xs sm:text-sm font-black tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm z-50 relative">
        <Clock className="w-4 h-4 shrink-0 animate-pulse" />
        <span>ESTA OFERTA ESPECIAL TERMINA MUY PRONTO</span>
        <Clock className="w-4 h-4 shrink-0 animate-pulse" />
      </div>
      
      {/* TOP BAR / NAVIGATION */}
      <header className="hidden md:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DFC5A3]/20 shadow-xs px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-end">
          <button
            onClick={scrollToOffers}
            className="hidden md:flex items-center gap-2 bg-[#4E8A66] hover:bg-[#3E6B48] text-white font-medium text-xs py-2 px-4 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-all uppercase"
          >
            Quiero el Combo Completo
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* MAIN HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 bg-gradient-to-b from-[#F9F7F4] via-[#FAF9F6] to-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center">
            
            <h1 className="text-3xl sm:text-4.5xl lg:text-5.5xl font-extrabold text-[#4A3E3D] tracking-tight leading-tight text-center max-w-3xl mb-8 z-10 uppercase">
              NO TIENES QUE <span className="text-[#C5A880]">RENUNCIAR A LOS DULCES</span> PARA CUIDAR TU GLUCOSA
            </h1>

            {/* First Image / Mockup */}
            <div className="relative flex justify-center items-center mb-10 w-full">
              {/* Back glowing elements */}
              <div className="absolute w-72 h-72 bg-[#DFC5A3]/30 rounded-full blur-3xl -z-10" />
              <div className="absolute w-44 h-44 bg-[#4E8A66]/10 rounded-full blur-xl bottom-4 right-4 -z-10" />
              
              <div className="relative max-w-full sm:max-w-md w-full p-4">
                <img
                  src={productShowcaseImg}
                  alt="Recetas que cuidan tu glucosa combo premium"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.01]"
                />

                {/* Floating satisfaction badge */}
                <div className="absolute -bottom-2 -left-2 bg-white/95 rounded-xl border border-amber-200 p-3 shadow-md flex items-center gap-2 max-w-[180px] backdrop-blur-xs">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-[#4E8A66] flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-[#4A3E3D] leading-none">Probado y Aprobado</p>
                    <p className="text-[9.5px] text-[#8A7E7D] mt-0.5">Ingredientes 100% seguros</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left side text / CTA */}
            <div className="max-w-3xl space-y-6 text-center z-10">
              
              <p className="text-base sm:text-lg text-[#655A59] font-light max-w-2xl mx-auto leading-relaxed">
                Descubre 60 recetas deliciosas para calmar tus antojos de dulce sin provocar picos bruscos de azúcar en tu sangre.
              </p>

              {/* Mega Hero Button */}
              <div className="pt-4 flex flex-col items-center gap-3">
                <button
                  onClick={() => {
                    window.open("https://pay.hotmart.com/A106432463B?off=9zo69lb3", "_blank");
                  }}
                  className="w-full sm:w-auto bg-[#e5a04e] hover:bg-[#d8913b] text-white font-bold text-base px-8 py-5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3 tracking-wide"
                >
                  ¡APROVECHAR EL COMBO COMPLETO!
                  <ChevronRight className="w-5 h-5" />
                </button>
                <p className="text-xs text-[#8A7E7D] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  Compra segura y encriptada • Acceso instantáneo en tu correo
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 3: LO QUE VAS A RECIBIR */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6]/30 border-y border-[#DFC5A3]/10 text-center relative overflow-hidden">
        {/* Decorative subtle background glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-50/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4.5xl font-extrabold text-[#4A3E3D] tracking-tight uppercase">
              LO QUE VAS A RECIBIR:
            </h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            
            {/* Item 1 */}
            <div className="relative bg-white p-5 rounded-2xl border border-emerald-100/60 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-350 flex flex-row items-center gap-4 text-left group">
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-pink-100/80 transition-all duration-300">
                <Sparkles className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="pr-4">
                <h3 className="font-extrabold text-[#4A3E3D] text-base leading-snug">
                  Postres deliciosos, probados y aprobados con amor
                </h3>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative bg-white p-5 rounded-2xl border border-emerald-100/60 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-350 flex flex-row items-center gap-4 text-left group">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-orange-100/80 transition-all duration-300">
                <Clock className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="pr-4">
                <h3 className="font-extrabold text-[#4A3E3D] text-base leading-snug">
                  Preparaciones exprés de menos de 15 minutos
                </h3>
              </div>
            </div>

            {/* Item 3 */}
            <div className="relative bg-white p-5 rounded-2xl border border-emerald-100/60 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-350 flex flex-row items-center gap-4 text-left group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-100/80 transition-all duration-300">
                <Coffee className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="pr-4">
                <h3 className="font-extrabold text-[#4A3E3D] text-base leading-snug">
                  Panqués, flanes, mousses y repostería para el día a día
                </h3>
              </div>
            </div>

            {/* Item 4 */}
            <div className="relative bg-white p-5 rounded-2xl border border-emerald-100/60 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-350 flex flex-row items-center gap-4 text-left group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-100/80 transition-all duration-300">
                <Apple className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="pr-4">
                <h3 className="font-extrabold text-[#4A3E3D] text-base leading-snug">
                  Ingredientes simples y fáciles de conseguir
                </h3>
              </div>
            </div>

            {/* Item 5 */}
            <div className="relative bg-white p-5 rounded-2xl border border-emerald-100/60 hover:border-emerald-350 shadow-xs hover:shadow-md transition-all duration-350 flex flex-row items-center gap-4 text-left group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-purple-100/80 transition-all duration-300">
                <Smile className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="pr-4">
                <h3 className="font-extrabold text-[#4A3E3D] text-base leading-snug">
                  Recetas hechas para disfrutar del dulce con absoluta tranquilidad
                </h3>
              </div>
            </div>

          </div>

          <div className="pt-6">
            <button
              onClick={scrollToOffers}
              className="inline-flex items-center gap-3 bg-[#e5a04e] hover:bg-[#d8913b] text-white font-extrabold px-10 py-5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-base tracking-wide uppercase cursor-pointer"
            >
              ¡Quero recibir mi combo completo ahora!
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO CARROSSEL DE RECEITAS REAIS */}
      <section className="py-12 bg-[#211A19] overflow-hidden w-full relative">
        <div className="max-w-4xl mx-auto px-4 mb-8 text-center">
          <h2 className="text-2xl sm:text-3.5xl font-extrabold text-[#FAF9F6] tracking-tight uppercase">
            ¡SOLO DE VERLOS SE ANTOJAN! MIRA LO QUE TE ESPERA: 😋🍰
          </h2>
          <div className="w-16 h-1 bg-[#C5A880] mx-auto rounded-full mt-3" />
        </div>

        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <motion.div
            className="flex flex-nowrap gap-0 shrink-0"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {[...carouselImages, ...carouselImages].map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.title}
                loading="lazy"
                decoding="async"
                width={320}
                height={224}
                className="w-56 sm:w-72 md:w-80 h-36 sm:h-48 md:h-56 object-cover shrink-0 select-none pointer-events-none opacity-90 hover:opacity-100 transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
            ))}
          </motion.div>
        </div>

        <div className="max-w-2xl mx-auto px-4 mt-8 mb-6">
          <div className="bg-[#2D2221] border-2 border-dashed border-[#C5A880]/40 rounded-2xl p-6 text-center relative shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#BA9241] text-white text-xs font-black uppercase px-4 py-1 rounded-full shadow-sm tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> ATENCIÓN
            </div>
            <p className="text-sm sm:text-base md:text-lg text-amber-100/90 font-extrabold leading-relaxed pt-2">
              Todas las recetas fueron creadas con ingredientes cuidadosamente seleccionados para que disfrutes de tus dulces favoritos de forma segura.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE BÔNUS EXCLUSIVOS */}
      <section className="py-16 md:py-24 bg-white" id="bonus-section">
        <div className="w-full bg-gradient-to-r from-[#BA9241] via-[#D33F49] to-[#8A4E68] py-8 sm:py-10 px-4 sm:px-6 text-center shadow-[0_4px_20px_rgba(211,63,73,0.15)] mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.18),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250px_250px] animate-[pulse_3s_infinite] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3.5xl md:text-4.5xl font-black text-white tracking-normal leading-tight uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              🎁 NO SOLO VAS A RECIBIR 60 RECETAS
            </h2>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 text-center mb-16 space-y-4">
          <p className="text-[#7D706F] text-base sm:text-lg font-bold leading-relaxed">
            Al elegir el <span className="text-amber-600 font-black">Combo Completo</span>, también desbloquearás de inmediato estos <span className="bg-amber-100 text-amber-950 px-2 py-1 rounded-lg font-black transition-all hover:bg-amber-200">regalos exclusivos</span>.
          </p>
          <div className="w-16 h-1 bg-[#C5A880] mx-auto rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            
            {/* Bonus 1 */}
            <div className="group bg-[#FAF9F6]/50 rounded-3xl border-2 border-[#C5A880]/50 p-8 shadow-[0_15px_40px_rgba(197,168,128,0.1)] hover:shadow-[0_25px_60px_rgba(186,146,65,0.18)] hover:border-[#BA9241] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#8A4E68]/10 text-[#8A4E68] text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#8A4E68]/10">
                ⭐ REGALO EXCLUSIVO
              </div>
              <div className="space-y-4 pt-12">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-extrabold text-[#4A3E3D] leading-snug group-hover:text-[#C5A880] transition-colors duration-200">
                    🎁 REGALO 1: Guía Completa de Ingredientes Amigos de tu Glucosa
                  </h3>
                  <p className="text-sm sm:text-base text-[#4C3F3E] leading-relaxed font-normal">
                    Conoce con exactitud qué ingredientes usar y cuáles evitar al preparar tus postres favoritos.
                  </p>
                </div>
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="group bg-[#FAF9F6]/50 rounded-3xl border-2 border-[#C5A880]/50 p-8 shadow-[0_15px_40px_rgba(197,168,128,0.1)] hover:shadow-[0_25px_60px_rgba(186,146,65,0.18)] hover:border-[#BA9241] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#2D5A7B]/10 text-[#2D5A7B] text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#2D5A7B]/10">
                ⭐ REGALO EXCLUSIVO
              </div>
              <div className="space-y-4 pt-12">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-extrabold text-[#4A3E3D] leading-snug group-hover:text-[#C5A880] transition-colors duration-200">
                    🎁 REGALO 2: Snacks que Cuidan tu Glucosa
                  </h3>
                  <p className="text-sm sm:text-base text-[#4C3F3E] leading-relaxed font-normal">
                    Opciones súper prácticas para desayunar, merendar y comer entre comidas cuidando tus niveles de azúcar con mucho sabor.
                  </p>
                </div>
              </div>
            </div>

            {/* Bonus 3 */}
            <div className="group bg-[#FAF9F6]/50 rounded-3xl border-2 border-[#C5A880]/50 p-8 shadow-[0_15px_40px_rgba(197,168,128,0.1)] hover:shadow-[0_25px_60px_rgba(186,146,65,0.18)] hover:border-[#BA9241] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#755D93]/10 text-[#755D93] text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#755D93]/10">
                ⭐ REGALO EXCLUSIVO
              </div>
              <div className="space-y-4 pt-12">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-extrabold text-[#4A3E3D] leading-snug group-hover:text-[#C5A880] transition-colors duration-200">
                    🎁 REGALO 3: Postres para Ocasiones Especiales
                  </h3>
                  <p className="text-sm sm:text-base text-[#4C3F3E] leading-relaxed font-normal">
                    Recetas festivas premium para cumpleaños y celebraciones para disfrutar con tus seres queridos de forma segura.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 7: COMPARATIVO DE PACOTES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FCFAF7] via-[#FFFDFB] to-[#F5EFE6] border-y border-[#DFC5A3]/40 relative overflow-hidden text-center flex flex-col items-center" id="comparativo-pacotes">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#BA9241]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-12 relative z-10 w-full flex flex-col items-center">
          
          <div className="max-w-xl mx-auto space-y-6 w-full flex flex-col items-center text-center">
            <div className="bg-red-50 border-2 border-red-500/80 text-red-700 rounded-2xl py-3.5 px-6 text-center shadow-[0_4px_12px_rgba(239,68,68,0.12)] flex items-center justify-center gap-3 w-full animate-pulse">
              <span className="text-xl">⏰</span>
              <span className="text-xs sm:text-sm font-black tracking-widest uppercase">
                Oferta Especial por Tiempo Limitado
              </span>
            </div>
          </div>

          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4.5xl font-extrabold text-[#4A3E3D] tracking-tight uppercase leading-tight">
              Elige Tu Oferta
            </h2>
            <div className="w-24 h-1 bg-[#BA9241] mx-auto rounded-full" />
          </div>

          {/* Dual Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch w-full pt-4">
            
            {/* PACOTE BÁSICO CARD */}
            <div className="bg-white rounded-3xl border border-[#DFC5A3]/40 p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-2xl relative overflow-hidden text-center items-center w-full">
              <div className="space-y-6 w-full flex flex-col items-center">
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A3E3D] bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200 inline-block">
                    Esencial para Comenzar
                  </span>
                  <h3 className="text-3xl font-black text-[#4A3E3D] mt-4 uppercase">Combo Básico</h3>
                </div>

                {/* Price tag */}
                <div className="py-4 border-y border-neutral-100 flex flex-col items-center justify-center w-full gap-1">
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Solo</span>
                    <span className="text-[11px] text-red-600 font-bold line-through opacity-80 bg-red-100/50 px-2 py-0.5 rounded-md">De $10.00 USD</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter">$5.00</span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold mt-1">pago único</span>
                </div>

                {/* Features list */}
                <div className="space-y-4 w-full max-w-xs">
                  <p className="text-sm font-black text-[#4A3E3D] uppercase tracking-widest block text-center">Lo que incluye:</p>
                  <ul className="space-y-3.5 text-sm sm:text-base text-[#4C3F3E] font-bold text-left">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-[#4E8A66] shrink-0 mt-0.5 stroke-[3]" />
                      <span>Ebook de 60 Recetas para Comer Dulce sin preocuparte por tu Glucosa</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-[#4E8A66] shrink-0 mt-0.5 stroke-[3]" />
                      <span>Acceso inmediato de por vida en tu correo electrónico</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Button CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100 w-full flex justify-center">
                <button
                  onClick={() => {
                    window.open("https://pay.hotmart.com/A106432463B?off=s6z6hr1d", "_blank");
                  }}
                  className="w-full max-w-xs border-2 border-[#4A3E3D] hover:bg-[#4A3E3D]/5 text-[#4A3E3D] font-black py-4 px-6 rounded-xl text-center text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  ELEGIR BÁSICO
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* PACOTE COMPLETO CARD */}
            <div className="bg-[#FAF7F2] rounded-3xl border-3 border-[#BA9241] p-8 flex flex-col justify-between shadow-2xl hover:shadow-3xl transition-all duration-300 relative scale-100 md:scale-[1.04] group overflow-hidden text-center items-center w-full">
              <div className="absolute top-1 right-1 bg-[#BA9241] text-white font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-lg shadow-md z-10 flex items-center justify-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 fill-white/20" />
                La Opción Más Inteligente
              </div>

              <div className="space-y-6 w-full flex flex-col items-center">
                <div className="flex flex-col items-center text-center mt-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#BA9241] bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200/50 inline-block">
                    Completo + Regalos Incluidos
                  </span>
                  <h3 className="text-3xl font-black text-[#4A3E3D] mt-3 uppercase font-sans">Combo Completo</h3>
                </div>

                {/* Price tag */}
                <div className="py-2.5 border-y border-amber-200/40 flex flex-col items-center justify-center w-full gap-1">
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <span className="text-sm text-amber-900 font-extrabold uppercase tracking-wider">Solo</span>
                    <span className="text-xs text-red-600 font-bold line-through opacity-80 bg-red-100/50 px-2 py-0.5 rounded-md">De $27.00 USD</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-5xl sm:text-6xl font-black text-emerald-700 tracking-tighter">$10.00</span>
                  </div>
                  <span className="text-sm text-slate-700 font-bold mt-1">pago único</span>
                </div>

                {/* Features included list */}
                <div className="space-y-4 w-full max-w-xs">
                  <p className="text-sm font-black text-amber-900 uppercase tracking-widest block text-center">Todo lo que vas a recibir:</p>
                  <ul className="space-y-3.5 text-sm sm:text-base text-[#4A3E3D] text-left">
                    <li className="flex items-start gap-2.5 font-extrabold text-neutral-900">
                      <Check className="w-5 h-5 text-[#4E8A66] shrink-0 mt-0.5 stroke-[3]" />
                      <span>Ebook de 60 Recetas para Comer Dulce sin preocuparte por tu Glucosa</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-bold text-slate-900">
                      <Check className="w-5 h-5 text-[#4E8A66] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>🎁 REGALO 1: Guía de Ingredientes Amigos de tu Glucosa</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-bold text-slate-900">
                      <Check className="w-5 h-5 text-[#4E8A66] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>🎁 REGALO 2: Guía de Snacks y Bocadillos Saludables</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-bold text-slate-900">
                      <Check className="w-5 h-5 text-[#4E8A66] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>🎁 REGALO 3: Recetario de Postres para Ocasiones Especiales</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-bold text-slate-900">
                      <Check className="w-5 h-5 text-[#4E8A66] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>✅ ACTUALIZACIONES DE POR VIDA GRATIS</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-emerald-950 font-black">
                      <Check className="w-5 h-5 text-[#4E8A66] shrink-0 mt-0.5 stroke-[3]" />
                      <span>Acceso inmediato de por vida en tu correo</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Button CTA */}
              <div className="mt-8 pt-6 border-t border-amber-200/40 w-full flex justify-center">
                <button
                  onClick={() => {
                    window.open("https://pay.hotmart.com/A106432463B?off=9zo69lb3", "_blank");
                  }}
                  className="w-full max-w-xs bg-gradient-to-r from-[#D97706] to-[#BA9241] hover:from-[#EA580C] hover:to-[#D97706] text-white font-extrabold py-4.5 px-6 rounded-xl text-center text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 duration-200"
                >
                  ELEGIR COMPLETO
                  <Sparkles className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SEÇÃO 7.5: DEPOIMENTOS REAIS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0F0A09] via-[#090505] to-[#010101] border-b border-neutral-950 relative overflow-hidden font-sans" id="depoimentos">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#BA9241]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4.5xl font-black text-white tracking-tight leading-tight uppercase">
              VOCES DE LA COMUNIDAD (TESTIMONIOS REALES):
            </h2>
            <div className="w-16 h-1 bg-[#BA9241] mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                text: "Cuando me dijeron que tenía que cuidar mi glucosa, pensé que tendría que olvidarme de los postres para siempre. Estas recetas me demostraron que sí es posible seguir disfrutando de algo dulce. Hoy vuelvo a disfrutar esos pequeños momentos sin sentir que me estoy privando de todo.",
                author: "Marta G.",
                role: "Volví a disfrutar los postres",
                avatarImg: "https://i.ibb.co/1G8T9DGj/mulher.jpg"
              },
              {
                text: "Siempre fui fan de los panes dulces, pasteles y postres. Lo que más me gustó de este recetario es que las recetas realmente son deliciosas y fáciles de preparar. Ahora, cuando me dan ganas de algo dulce, tengo varias opciones para disfrutar sin sentir culpa.",
                author: "Carlos R.",
                role: "Por fin dejé de pasar antojos",
                avatarImg: "https://i.ibb.co/1GvHmtX2/homem.jpg"
              },
              {
                text: "Confieso que compré con dudas porque pensé que las recetas llevarían ingredientes caros o difíciles de encontrar. Me sorprendió ver que la mayoría son ingredientes muy comunes. Además, los postres quedan buenísimos y se preparan en muy poco tiempo.",
                author: "Silvia M.",
                role: "Mucho más fácil de lo que imaginaba",
                avatarImg: "https://i.ibb.co/dw0K131n/mulher.jpg"
              },
              {
                text: "Lo que más extrañaba era poder comer algo dulce de vez en cuando. Estas recetas me ayudaron a volver a disfrutar de mis postres favoritos de una forma mucho más tranquila. Son fáciles, rápidas y realmente deliciosas. Las recomiendo muchísimo.",
                author: "Jorge A.",
                role: "Ya no siento que me estoy privando",
                avatarImg: "https://i.ibb.co/vCZrZrPJ/homem-velho.jpg"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-[#140D0C]/80 rounded-3xl border border-amber-900/20 p-6 flex flex-col justify-start text-center shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:border-[#BA9241]/35 hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <span className="absolute top-6 right-6 text-3xl font-serif text-[#BA9241]/10 group-hover:text-[#BA9241]/20 pointer-events-none font-bold">
                  “
                </span>

                <div className="pb-4 mb-4 border-b border-dashed border-amber-950/40 flex flex-col items-center justify-center gap-3 w-full">
                  <img
                    src={item.avatarImg}
                    alt={item.author}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-cover shrink-0 shadow-md border-2 border-[#BA9241]/40"
                  />
                  <div className="flex flex-col items-center text-center">
                    <span className="text-base font-bold text-neutral-100">{item.author}</span>
                    <span className="text-xs sm:text-sm text-[#DFD3CE] font-semibold leading-normal mt-0.5">{item.role}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal italic">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SEÇÃO 8: GARANTIA */}
      <section className="py-12 bg-[#FAF8F5] border-y border-[#DFC5A3]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FAF9F6] border border-[#DFC5A3]/30 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center gap-6">
            <img 
              src="https://i.ibb.co/G4p0SjpH/selo-garantia-Photoroom.webp" 
              alt="Sello de Garantía de 7 Días" 
              className="w-28 h-28 object-contain shrink-0" 
              referrerPolicy="no-referrer"
            />

            <div className="space-y-2 text-center md:text-left">
              <h4 className="font-extrabold text-[#4A3E3D] text-lg sm:text-xl">
                ¡Garantía de Satisfacción Incondicional!
              </h4>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Tienes 7 días completos para probar nuestras recetas y guías adicionales. Si dentro de ese periodo sientes que las recetas no son tan fáciles, o por cualquier motivo decides dar marcha atrás, solo envíanos un correo electrónico. Te devolveremos el 100% de tu dinero de manera inmediata, sin preguntas molestas ni trámites engorrosos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-[#FAF9F6] border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold">Resolvemos tus Dudas</span>
            <h3 className="text-xl sm:text-2.5xl font-extrabold text-[#4A3E3D]">
              Preguntas Frecuentes
            </h3>
            <div className="w-10 h-0.5 bg-[#C5A880] mx-auto mt-2" />
          </div>

          <div className="space-y-3">
            {FAQS_DATA.map((faq, index) => {
              const isOpen = faqOpen === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#DFC5A3]/20 shadow-xs overflow-hidden"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-neutral-50"
                  >
                    <span className="font-extrabold text-sm sm:text-base text-[#4A3E3D]">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#C5A880] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-slate-700 border-t border-slate-100 leading-relaxed font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="py-12 px-4 sm:px-6 bg-[#2B2321] text-[#FAF8F5]/80 text-center text-xs space-y-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <div>
            <span className="text-slate-400">Desarrollado con cariño para tu bienestar • © 2026 Todos los derechos reservados</span>
          </div>
        </div>
      </footer>

      {/* CHECKOUT MODAL AND LEARNING PLATFORM SIMULATOR */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-[#DFC5A3]/40 flex flex-col max-h-[90vh]"
            >
              
              {/* Header */}
              <div className="bg-[#4A3E3D] text-white p-4 px-6 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-white rounded-md p-1">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-sm tracking-tight">Simulador de Pago Seguro</h3>
                    <p className="text-[10px] text-amber-300">Procesando en entornos seguros de prueba (Sandbox)</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress step */}
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-2.5 flex items-center gap-4 text-xs font-semibold shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    checkoutStep === "details" ? "bg-amber-500 text-white" : "bg-[#4E8A66] text-white"
                  }`}>
                    {checkoutStep === "details" ? "1" : "✓"}
                  </span>
                  <span className={checkoutStep === "details" ? "text-slate-800" : "text-slate-400"}>Identificación</span>
                </div>
                <div className="h-px bg-slate-300 grow" />
                <div className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    checkoutStep === "payment" ? "bg-amber-500 text-white" : checkoutStep === "success" ? "bg-[#4E8A66] text-white" : "bg-slate-200 text-slate-500"
                  }`}>
                    {checkoutStep === "success" ? "✓" : "2"}
                  </span>
                  <span className={checkoutStep === "payment" ? "text-slate-800" : "text-slate-400"}>Pago</span>
                </div>
                <div className="h-px bg-slate-300 grow" />
                <div className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    checkoutStep === "success" ? "bg-[#4E8A66] text-white animate-bounce" : "bg-slate-200 text-slate-500"
                  }`}>
                    3
                  </span>
                  <span className={checkoutStep === "success" ? "text-amber-600 font-bold" : "text-slate-400"}>¡Acceso Liberado!</span>
                </div>
              </div>

              <div className="overflow-y-auto p-6 grow">
                
                {/* 1. STATE: DETAILS FORM */}
                {checkoutStep === "details" && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex gap-3 text-xs text-[#4A3E3D]">
                      <span className="text-xl">{selectedPackage === "completo" ? "🎁" : "📖"}</span>
                      <div>
                        {selectedPackage === "completo" ? (
                          <>
                            <strong>Estás adquiriendo el Combo Completo:</strong> Ebook Principal (Recetas que Cuidan tu Glucosa) + los 3 volúmenes de Regalo incluidos por solo <strong>$10.00 USD en pago único</strong>.
                          </>
                        ) : (
                          <>
                            <strong>Estás adquiriendo el Combo Básico:</strong> Ebook de 60 Recetas para Comer Dulces sin Preocupación por solo <strong>$5.00 USD en pago único</strong>.
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Nombre Completo</label>
                      <input
                        type="text"
                        placeholder="Ej: Juan Pérez"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Tu mejor Correo Electrónico</label>
                      <input
                        type="email"
                        placeholder="Ej: juan@correo.com"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                      <p className="text-[10.5px] text-slate-400">Enviaremos el enlace de descarga a este correo.</p>
                    </div>

                    {/* Applied Mock Coupon */}
                    <div className="pt-2 border-t border-slate-150">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Cupón de Descuento"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 w-36 uppercase font-mono"
                        />
                        <button
                          type="button"
                          onClick={applyCoupon}
                          className="bg-slate-200 hover:bg-slate-300 text-[#4A3E3D] font-bold text-xs px-3 py-1.5 rounded-lg cursor-pointer"
                        >
                          Aplicar
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        CONSEJO: ¡Intenta escribir <strong className="text-amber-600 font-mono">GLUCOSA80</strong> para simular un descuento promocional especial!
                      </p>
                      {couponApplied && (
                        <div className="text-xs text-[#4E8A66] font-bold mt-2">
                          ✓ ¡Cupón activado con éxito! Se aplicó un descuento simulado y el costo total se fijó en $11.90 USD en total.
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#4E8A66] hover:bg-[#3E6B48] text-white font-bold py-4 rounded-xl cursor-pointer text-xs uppercase tracking-widest mt-6"
                    >
                      Continuar al Pago Simulado
                    </button>
                  </form>
                )}

                {/* 2. STATE: PAYMENT SELECTION */}
                {checkoutStep === "payment" && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Selecciona la opción de pago ficticio:</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("pix")}
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                            paymentMethod === "pix" 
                              ? "bg-amber-500/5 border-amber-500" 
                              : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                          }`}
                        >
                          <QrCode className="w-6 h-6 text-amber-600" />
                          <span className="text-xs font-bold text-[#4A3E3D]">Transferencia de Prueba</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                            paymentMethod === "card" 
                              ? "bg-amber-500/5 border-amber-500" 
                              : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                          }`}
                        >
                          <CreditCard className="w-6 h-6 text-amber-600" />
                          <span className="text-xs font-bold text-[#4A3E3D]">Tarjeta de Crédito</span>
                        </button>
                      </div>
                    </div>

                    {paymentMethod === "pix" ? (
                      <div className="text-center p-4 bg-[#FAF9F6] border border-[#DFC5A3]/40 rounded-xl space-y-3">
                        <p className="text-xs font-semibold text-[#4A3E3D]">¡Listo! Referencia de transferencia generada provisionalmente:</p>
                        <div className="p-3 bg-white border border-slate-200 rounded-lg select-all font-mono text-xs max-w-xs mx-auto break-words">
                          GLUCOSA-MOCK-SPEI-{selectedPackage === "completo" ? "1790" : "990"}-HOTMART
                        </div>
                        <p className="text-[10px] text-amber-600 font-bold animate-pulse">
                          ¡Haz clic en concluir abajo para simular la transferencia Spei y liberar tu acceso y recetario en pantalla!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-800">
                          💳 Información simulada de prueba pre-cargada. No se aplicará ningún cobro real.
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="col-span-2 space-y-1">
                            <label className="text-[10px] font-bold uppercase text-slate-500">Número de Tarjeta</label>
                            <input
                              type="text"
                              value="4444 4444 4444 4444"
                              disabled
                              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-slate-500">Vencimiento</label>
                            <input
                              type="text"
                              value="12/29"
                              disabled
                              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono text-xs text-center"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-slate-500">CVV</label>
                            <input
                              type="text"
                              value="123"
                              disabled
                              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono text-xs text-center"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <button
                        type="submit"
                        className="w-full bg-[#4E8A66] hover:bg-[#3E6B48] text-white font-bold py-4 rounded-xl cursor-pointer text-xs uppercase tracking-widest"
                      >
                        {paymentMethod === "pix" ? "SIMULAR TRANSFERENCIA EXCITOSA" : "SIMULAR PAGO CON TARJETA"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCheckoutStep("details")}
                        className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
                      >
                        Regresar al paso anterior
                      </button>
                    </div>
                  </form>
                )}

                {/* 3. STATE: SUCCESS DASHBOARD SIMULATOR */}
                {checkoutStep === "success" && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <span className="text-3xl">🎉</span>
                      <h4 className="text-xl sm:text-2xl font-black text-[#4E8A66]">
                        ¡Felicidades, {buyerName || "Lector(a)"}!
                      </h4>
                      <p className="text-xs text-[#8A7E7D]">
                        Tu pago ficticio simulado fue procesado con éxito y hemos enviado tu enlace y materiales al correo <strong className="text-slate-700">{buyerEmail || "prueba@correo.com"}</strong>.
                      </p>
                      
                      <div className="bg-[#E8F2EA] text-[#4E8A66] font-bold text-xs p-3.5 rounded-xl border border-emerald-100 flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        ¡TU ACCESO VIP AL RECETARIO SE HA LIBERADO DIRECTAMENTE EN ESTA PANTALLA!
                      </div>
                    </div>

                    {/* INTERACTIVE ALUNO AREA PORTAL */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                      <div className="bg-[#4A3E3D] text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-amber-400">
                          <BookOpen className="w-3.5 h-3.5" />
                          Plataforma de Consulta Interactiva
                        </span>
                        <span className="text-[10px] text-slate-300">Dra. Raquel Souza</span>
                      </div>

                      {/* Tab buttons switcher */}
                      <div className="bg-slate-50 border-b border-slate-100 grid grid-cols-3 text-center text-xs">
                        <button
                          onClick={() => setActiveTab("materials")}
                          className={`py-2 px-1 font-bold ${
                            activeTab === "materials" ? "border-b-2 border-amber-500 text-amber-600" : "text-slate-500"
                          }`}
                        >
                          📚 Descargar PDFs
                        </button>
                        <button
                          onClick={() => setActiveTab("recipes")}
                          className={`py-2 px-1 font-bold ${
                            activeTab === "recipes" ? "border-b-2 border-amber-500 text-amber-600" : "text-slate-500"
                          }`}
                        >
                          🍲 Cocinar Hoy
                        </button>
                        <button
                          onClick={() => setActiveTab("glycemic")}
                          className={`py-2 px-1 font-bold ${
                            activeTab === "glycemic" ? "border-b-2 border-amber-500 text-amber-600" : "text-slate-500"
                          }`}
                        >
                          📈 Indicador Glucémico
                        </button>
                      </div>

                      {/* Content panel */}
                      <div className="p-4 sm:p-5 max-h-[300px] overflow-y-auto bg-[#FAF9F6]">
                        
                        {/* Tab 1: materials downloads */}
                        {activeTab === "materials" && (
                          <div className="space-y-3">
                            <p className="text-[11px] text-slate-400 font-bold block text-left">HAZ CLIC EN CADA ELEMENTO PARA INICIAR SU DESCARGA EN PDF:</p>
                            
                            {EBOOKS_DATA.map((book) => (
                              <div key={book.id} className="bg-white p-3 rounded-lg border border-slate-100 flex items-center justify-between text-xs transition-hover hover:border-amber-400 text-left">
                                <div>
                                  <h5 className="font-bold text-[#4A3E3D] leading-none">{book.title}</h5>
                                  <span className="text-[10px] text-slate-400 mt-1 block">{book.pages} Páginas • Formato PDF inteligente</span>
                                </div>
                                <button
                                  onClick={() => alert(`¡Descarga simulada en PDF de "${book.title}" iniciada con éxito!`)}
                                  className="bg-[#4E8A66] text-white px-3 py-1 rounded text-[10.5px] font-bold hover:bg-[#3E6B48] flex items-center gap-1 cursor-pointer"
                                >
                                  Descargar (.PDF)
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tab 2: micro step recipes list */}
                        {activeTab === "recipes" && (
                          <div className="space-y-3">
                            <p className="text-[11px] text-[#4A3E3D] font-bold text-left">RECETAS DETALLADAS PASSO A PASSO:</p>
                            
                            {RECIPES_DATA.map((rec) => (
                              <div key={rec.id} className="bg-white p-3 rounded-lg border border-slate-100 space-y-2 text-left">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-bold text-[#4A3E3D] text-xs">{rec.title}</h5>
                                  <span className="text-[10px] bg-emerald-100 text-[#4E8A66] px-1.5 py-0.5 rounded-xs font-semibold">
                                    {rec.tag}
                                  </span>
                                </div>
                                <p className="text-[10.5px] text-slate-400 italic">"{rec.description}"</p>
                                
                                <div className="space-y-1 block text-left bg-slate-50 p-2 rounded text-[10px] text-slate-500">
                                  <span className="font-bold text-slate-600 block">Preparación Exprés:</span>
                                  <span>1. Mezclar todos los ingredientes secos. 2. Incorporar lentamente los ingredientes líquidos y mezclar con suavidad. 3. Llevar al fuego u horno por {rec.prepTime}. ¡Disfruta con total seguridad y salud!</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tab 3: mini insulin meal simulator */}
                        {activeTab === "glycemic" && (
                          <div className="space-y-4">
                            <div className="bg-white p-3 rounded-lg border border-slate-150 space-y-2 text-center text-xs">
                              <p className="text-slate-500">Nivel de Glucosa Estimado en Sangre:</p>
                              
                              <div className="flex items-center justify-center gap-2">
                                <span className={`text-3xl font-black font-mono ${
                                  bloodSugarValue > 140 ? "text-rose-600" : "text-[#4E8A66]"
                                }`}>
                                  {bloodSugarValue} mg/dL
                                </span>
                                <span className={`text-[10px] font-bold uppercase rounded px-2 py-0.5 ${
                                  bloodSugarValue > 140 ? "bg-rose-100 text-rose-700 animate-pulse" : "bg-emerald-100 text-[#4E8A66]"
                                }`}>
                                  {bloodSugarValue > 145 ? "Pico Glucémico" : "Nivel Estable"}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-[11px] text-[#4A3E3D] font-bold block text-center">SIMULA UN ALIMENTO PARA OBSERVAR EL EFECTO:</p>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <button
                                  type="button"
                                  onClick={() => handleSimulateMeal("traditional")}
                                  className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200 rounded-lg cursor-pointer text-center"
                                >
                                  🚫 Comer Pan Blanco de Trigo
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSimulateMeal("smart")}
                                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#4E8A66] font-bold border border-emerald-200 rounded-lg cursor-pointer text-center"
                                >
                                  ✓ Comer Nuestro Pan Bajo en Carb
                                </button>
                              </div>
                            </div>

                            {simulatedMealResult && (
                              <div className={`p-3 rounded-lg text-xs space-y-1 block border text-left ${
                                simulatedMealResult.level === "risk" 
                                  ? "bg-rose-50/70 text-rose-700 border-rose-200" 
                                  : "bg-emerald-50/70 text-[#4E8A66] border-emerald-200"
                              }`}>
                                <div className="flex justify-between font-bold">
                                  <span>Efecto de los Carbohidratos:</span>
                                  <span>{simulatedMealResult.diff}</span>
                                </div>
                                <p className="text-[10.5px] leading-relaxed font-light">{simulatedMealResult.text}</p>
                              </div>
                            )}

                          </div>
                        )}

                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCheckoutOpen(false);
                          setCheckoutStep("details");
                        }}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl cursor-pointer text-xs uppercase"
                      >
                        Concluido • Regresar a la Página Principal
                      </button>
                    </div>

                  </div>
                )}

              </div>
              
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

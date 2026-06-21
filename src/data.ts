export interface EBookItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  topics: string[];
  pages: number;
}

export interface RecipeItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  ingredients: string[];
  traditionalComparison: {
    name: string;
    impact: "Alto Riesgo (Pico de Glucosa)" | "Atención Glucémica";
    healthIssues: string;
  };
  smartAlternative: {
    name: string;
    impact: "Seguro y Estable" | "Excelente Control";
    benefits: string;
  };
  nutrients: string;
  prepTime: string;
}

export const EBOOKS_DATA: EBookItem[] = [
  {
    id: "glicose_principal",
    title: "Recetas que Cuidan tu Glucosa",
    badge: "GUÍA PRINCIPAL",
    description: "La guía definitiva con el método completo para reprogramar tu alimentación. Contiene pautas de sustitución fáciles, más de 50 recetas deliciosas y los secretos para evitar picos de insulina después de tus comidas principales.",
    topics: ["Pautas de nutrición explicadas de forma práctica", "El secreto para equilibrar los macronutrientes", "Cómo leer etiquetas y evitar las trampas de la industria"],
    pages: 120
  },
  {
    id: "paes_massas",
    title: "Guía Completa de Ingredientes Amigos de tu Glucosa",
    badge: "BONO EXCLUSIVO 1",
    description: "Descubre qué ingredientes usar y cuáles evitar a toda costa al preparar tus postres favoritos.",
    topics: ["Sustitución de harinas refinadas por opciones funcionales", "Análisis objetivo de endulzantes saludables", "Lista de compras inteligente de bajísimo índice glucémico"],
    pages: 35
  },
  {
    id: "doces_inteligentes",
    title: "Postres para Ocasiones Especiales",
    badge: "BONO EXCLUSIVO 2",
    description: "Recetas diseñadas para cumpleaños, reuniones familiares y fechas especiales, sin tener que quedarte solo mirando cómo comen los demás.",
    topics: ["Mousses cremosas y flanes irresistibles", "Pasteles de cumpleaños de bajo impacto glucémico", "Dulces finos de fiesta sin picos de azúcar"],
    pages: 40
  },
  {
    id: "almocos_jantares",
    title: "Almuerzos y Cenas Prácticos",
    badge: "BONO EXCLUSIVO 4",
    description: "Ideas completas de platos principales de lunes a domingo. Aprende a preparar carnes jugosas, purés inteligentes de bajo costo, risottos funcionales y ensaladas saciantes.",
    topics: ["Paso a paso de risottos de coliflor y quinoa", "Carnes tiernas con salsas ricas en antioxidantes", "Guarniciones estratégicas que frenan la absorción de glucosa"],
    pages: 60
  },
  {
    id: "lanches_praticos",
    title: "Snacks que Cuidan tu Glucosa",
    badge: "BONO EXCLUSIVO 3",
    description: "Opciones súper prácticas para la tarde y entre comidas, evitando tener que recurrir a alimentos ultraprocesados de la tienda.",
    topics: ["Muffins y panecillos rápidos en taza (mug cakes)", "Galletas crujientes de frutos secos", "Bocadillos salados proteicos facilísimos al horno"],
    pages: 38
  },
  {
    id: "guia_substituicoes",
    title: "La Guía Definitiva de Sustituciones",
    badge: "BONO EXCLUSIVO 5",
    description: "Una tabla interactiva de consulta rápida para el supermercado y la cocina. Sustituye la harina de trigo, fécula de maíz, aceites refinados y azúcares por opciones saludables, económicas y deliciosas.",
    topics: ["Conversión exacta de harinas en recetas para hornear", "Tabla de equivalencia de dulzor", "Ingredientes secretos que reducen la absorción de glucosa en el torrente sanguíneo"],
    pages: 25
  }
];

export const RECIPES_DATA: RecipeItem[] = [
  {
    id: "pao_caseiro",
    title: "Pan Casero Bajo en Carbohidratos",
    tag: "Desayunos y Snacks",
    description: "Un pan súper esponjoso y aromático que esponja de verdad y tiene la textura perfecta del pan artesanal. Excelente para comer calientito con mantequilla.",
    ingredients: ["Harina de almendras o de cacahuate fino", "Huevos enteros", "Cáscara de psyllium en polvo (el secreto de la esponjosidad)", "Levadura seca", "Pizca de sal marina"],
    traditionalComparison: {
      name: "Pan Blanco o Bolillo Tradicional",
      impact: "Alto Riesgo (Pico de Glucosa)",
      healthIssues: "La harina blanca refinada se absorbe de inmediato, convirtiéndose en glucosa en pocos minutos, lo que genera fatiga, pesadez y hambre poco tiempo después."
    },
    smartAlternative: {
      name: "Nuestro Pan Casero Kéto / Low-Carb",
      impact: "Seguro y Estable",
      benefits: "Rico en fibra prebiótica y grasas saludables. Absorción muy lenta, energía constante y cero sobrecarga de estrés para el páncreas."
    },
    nutrients: "2.4 g de carbohidratos netos por rebanada | 6 g de proteína | Fibra activa",
    prepTime: "30 min al horno"
  },
  {
    id: "bolo_banana",
    title: "Panqué de Plátano con Canela Fit",
    tag: "Repostería y Café",
    description: "Ese panqué reconfortante ideal para disfrutar a media tarde. Endulzado en su justa medida gracias a plátanos maduros seleccionados y canela aromática.",
    ingredients: ["Plátanos maduros de índice glucémico medio", "Harina de avena sin gluten", "Huevos", "Canela en polvo", "Nuez picada para dar un toque crujiente"],
    traditionalComparison: {
      name: "Panqué de Plátano de Panadería Común",
      impact: "Alto Riesgo (Pico de Glucosa)",
      healthIssues: "Cargado de azúcar refinada y harina de trigo purificada, promoviendo una sobrecarga masiva de carbohidratos de absorción ultra veloz."
    },
    smartAlternative: {
      name: "Panqué de Plátano Funcional",
      impact: "Excelente Control",
      benefits: "Aprovecha la dulzura natural de la fruta amortiguada por la fibra soluble de la avena y las nueces, impidiendo que el azúcar se dispare."
    },
    nutrients: "5.1 g de carbohidratos por rebanada mediana | Sin azúcar añadida",
    prepTime: "35 min al horno"
  },
  {
    id: "pizza_caseira",
    title: "Pizza Margherita Proteica",
    tag: "Masas Clásicas",
    description: "Masa crujiente al auténtico estilo italiano con queso mozzarella derretido, tomate fresco, albahaca y un chorrito de aceite de oliva extra virgen.",
    ingredients: ["Masa de coliflor finamente rallada con huevo y parmesano", "Salsa de tomate casera natural", "Queso mozzarella de calidad", "Albahaca fresca y orégano"],
    traditionalComparison: {
      name: "Pizza Comercial de Cadena",
      impact: "Alto Riesgo (Pico de Glucosa)",
      healthIssues: "Una sola rebanada de masa de harina refinada supera con creces la porción ideal de carbohidratos simples, forzando la demanda de insulina."
    },
    smartAlternative: {
      name: "Pizza Margherita Saludable",
      impact: "Seguro y Estable",
      benefits: "¡Cero trigo! Su base de vegetales y las proteínas del huevo y el queso evitan de forma inmediata la inestabilidad de la glucosa periférica."
    },
    nutrients: "4.5 g de carbohidratos netos por media pizza | Alta en proteínas",
    prepTime: "25 min de preparación"
  },
  {
    id: "lanches_praticos_item",
    title: "Bocadillos de Pollo Horneados",
    tag: "Snacks Prácticos",
    description: "Masa doradita que se deshace en la boca con un relleno sumamente jugoso de pollo deshebrado bien sazonado.",
    ingredients: ["Pollo cocido deshebrado y sazonado", "Queso crema o aderezo cremoso sin féculas", "Harina de semillas de calabaza (pepitas)", "Yema de huevo para barnizar"],
    traditionalComparison: {
      name: "Empanadas o Frituras Tradicionales de Harina blanca",
      impact: "Alto Riesgo (Pico de Glucosa)",
      healthIssues: "Fritura en aceites vegetales inflamatorios combinada con una masa de harina de trigo enriquecida de muy rápida absorción."
    },
    smartAlternative: {
      name: "Bocadillo de Pollo Funcional",
      impact: "Excelente Control",
      benefits: "Altamente proteico y bajo en carbohidratos. Garantiza una saciedad prolongada por más de 4 horas."
    },
    nutrients: "1.8 g de carbohidratos por pieza grande",
    prepTime: "20 min al horno"
  },
  {
    id: "sobremesas_inteligentes",
    title: "Mousse de Chocolate Belga Cremoso",
    tag: "Postres",
    description: "El postre definitivo para los fines de semana o después de comer. Denso, aterciopelado y con el sabor intenso y genuino del cacao premium.",
    ingredients: ["Chocolate 70% cacao puro", "Crema para batir o leche evaporada", "Claras batidas a punto de nieve", "Eritritol en polvo premium (endulzante natural sin calorías)"],
    traditionalComparison: {
      name: "Mousse de Chocolate con Leche Condensada",
      impact: "Alto Riesgo (Pico de Glucosa)",
      healthIssues: "Bomba calórica cargada de azúcares y almidones refinados. Dispara los niveles en el gráfico de glucosa en tiempo récord."
    },
    smartAlternative: {
      name: "Mousse de Chocolate 70%",
      impact: "Seguro y Estable",
      benefits: "Aporta grasas saludables que ralentizan el vaciado gástrico, junto con cacao rico en magnesio y antioxidantes protectores."
    },
    nutrients: "3.2 g de carbohidratos netos por porción generosa",
    prepTime: "10 min de preparación | 2 h de refrigeración"
  },
  {
    id: "almoco_completo",
    title: "Ñoquis de Calabaza al Estilo Ragú",
    tag: "Almuerzos y Cenas",
    description: "Masa ligera de calabaza con una salsa esbelta y esbelta de carne molida perfectamente sazonada.",
    ingredients: ["Puré de calabaza cocida al vapor", "Harina de coco fina", "Huevo orgánico o de rancho", "Boloñesa de carne molida selecta"],
    traditionalComparison: {
      name: "Ñoquis de Papa Tradicionales",
      impact: "Alto Riesgo (Pico de Glucosa)",
      healthIssues: "La mezcla de harina de trigo con papa blanca resulta en un almidón de altísimo índice glucémico que ingresa rápido a las células."
    },
    smartAlternative: {
      name: "Ñoquis de Calabaza Especiales",
      impact: "Excelente Control",
      benefits: "La calabaza tiene bajísimo aporte de carbohidratos netos residuales y aporta betacaroteno de alta absorción."
    },
    nutrients: "6.5 g de carbohidratos netos por plato lleno",
    prepTime: "30 min de preparación"
  },
  {
    id: "jantar_leve",
    title: "Crema de Puerro y Calabacitas",
    tag: "Almuerzos y Cenas",
    description: "Calientita, cremosa y perfecta para restaurar y desinflamar el cuerpo por la noche, induciendo un sueño reparador.",
    ingredients: ["Calabacita italiana fresca", "Puerro cortado en rodajas", "Caldo de pollo natural", "Crema de ricota o requesón ligero"],
    traditionalComparison: {
      name: "Sopas Instantáneas de Sobre con Fideos",
      impact: "Atención Glucémica",
      healthIssues: "Cargadas de sodio artificial, conservantes inflamatorios y harinas de rápida asimilación que alteran el descanso."
    },
    smartAlternative: {
      name: "Crema Funcional Verde",
      impact: "Seguro y Estable",
      benefits: "Sumamente hidratante, depurativa y rica en minerales alcalinos naturales que ayudan a disminuir la resistencia a la insulina."
    },
    nutrients: "3.8 g de carbohidratos por porción",
    prepTime: "20 min de hervor"
  }
];

export const FAQS_DATA = [
  {
    question: "¿Cómo voy a recibir el material?",
    answer: "Inmediatamente después de confirmar tu pago, recibirás un enlace de acceso exclusivo directamente en tu correo electrónico de registro. Todo el material se entrega en formato digital de alta resolución (PDF), listo para leer en tu teléfono, tablet, computadora o incluso para imprimir de forma muy cómoda si así lo deseas."
  },
  {
    question: "¿Los ingredientes son costosos o difíciles de conseguir?",
    answer: "Para nada. Todas las recetas utilizan ingredientes sencillos, cotidianos y muy accesibles que puedes adquirir con total facilidad en supermercados convencionales o mercados locales. Nuestro objetivo prioritario es que sean opciones totalmente prácticas y económicas para tu día a día."
  },
  {
    question: "Tengo diabetes tipo 2 o prediabetes, ¿de verdad puedo consumirlos?",
    answer: "¡Sí, con total y absoluta seguridad! De hecho, todas las recetas de postres, bizcochos y refrigerios han sido diseñadas específicamente por expertos buscando inhibir cualquier incremento repentino de glucosa. Esto te permite disfrutar desayunos, meriendas o tu antojo dulce favorito sin culpa y de manera sumamente saludable."
  },
  {
    question: "¿Qué pasa si no me gustan las recetas? ¿Tengo garantía?",
    answer: "¡Por supuesto! Cuentas con una garantía incondicional de 7 días enteros. Si al revisar tu recetario consideras que las preparaciones son complejas o simplemente no cumplen con tu expectativa, solo escríbenos un correo y te reembolsaremos el 100% de tu dinero de manera inmediata, sin condiciones, preguntas molestas ni trámites engorrosos."
  }
];

const INGREDIENT_ICONS: Record<string, string> = {
  // Proteins
  res: "🥩",
  carne: "🥩",
  beef: "🥩",
  pollo: "🍗",
  chicken: "🍗",
  trucha: "🐟",
  trout: "🐟",
  cerdo: "🐷",
  pork: "🐷",
  desmechada: "🥩",
  pulled: "🥩",
  costilla: "🍖",
  rib: "🍖",
  panceta: "🥓",
  chicharrón: "🥓",
  crackling: "🥓",
  tocineta: "🥓",
  bacon: "🥓",
  lentejas: "🫘",
  lentil: "🫘",
  huevos: "🥚",
  eggs: "🥚",
  codorniz: "🥚",
  quail: "🥚",

  // Dairy
  queso: "🧀",
  cheese: "🧀",
  mozzarella: "🧀",
  cheddar: "🧀",
  cuajada: "🧀",
  curd: "🧀",
  filadelfia: "🧀",
  cream: "🧀",
  crema: "🧀",

  // Vegetables & fruits
  tomate: "🍅",
  tomato: "🍅",
  lechuga: "🥬",
  lettuce: "🥬",
  cebolla: "🧅",
  onion: "🧅",
  piña: "🍍",
  pineapple: "🍍",
  aguacate: "🥑",
  avocado: "🥑",
  frijoles: "🫘",
  beans: "🫘",
  maíz: "🌽",
  corn: "🌽",
  pepinos: "🥒",
  cucumber: "🥒",
  pico: "🍅",

  // Sides
  plátano: "🍌",
  plantain: "🍌",
  papa: "🍟",
  papas: "🍟",
  fries: "🍟",
  french: "🍟",
  ripio: "🍟",
  chips: "🍟",

  // Sauces
  salsa: "🫙",
  sauce: "🫙",
  bbq: "🔥",

  // Bread
  pan: "🍞",
  bun: "🍞",
  arepa: "🫓",
};

export function getIngredientIcon(ingredient: string): string {
  const lower = ingredient.toLowerCase();
  for (const [keyword, icon] of Object.entries(INGREDIENT_ICONS)) {
    if (lower.includes(keyword)) return icon;
  }
  return "•";
}

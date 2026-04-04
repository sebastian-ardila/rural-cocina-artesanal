import { MenuItem, MenuCategory, DisplayCategory } from "@/types/menu";

export const categories: {
  id: MenuCategory;
  label: { es: string; en: string };
}[] = [
  { id: "arepaburger", label: { es: "Arepaburger", en: "Arepaburger" } },
  { id: "hamburguesa", label: { es: "Hamburguesas", en: "Burgers" } },
  { id: "combo", label: { es: "Combos", en: "Combos" } },
  { id: "extra", label: { es: "Extras", en: "Extras" } },
  {
    id: "papas-topping",
    label: { es: "Papas con Topping", en: "Loaded Fries" },
  },
];

export const displayCategories: {
  id: DisplayCategory;
  label: { es: string; en: string };
}[] = [
  ...categories,
  { id: "vegetariano", label: { es: "Vegetariano", en: "Vegetarian" } },
];

export const menuItems: MenuItem[] = [
  // ─── AREPABURGER ───
  {
    id: "arepa-rural-res",
    category: "arepaburger",
    name: { es: "Arepa Rural de Res", en: "Beef Rural Arepa" },
    description: {
      es: "Carne de res 100% artesanal, piña caramelizada, tomate, lechuga, queso, cebolla grillé, tocineta",
      en: "100% artisan beef, caramelized pineapple, tomato, lettuce, cheese, grilled onion, bacon",
    },
    price: 22800,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "arepa-rural-pollo",
    category: "arepaburger",
    name: { es: "Arepa Rural Pollo", en: "Chicken Rural Arepa" },
    description: {
      es: "Carne de pollo 100% artesanal, piña caramelizada, tomate, lechuga, queso, cebolla grillé, tocineta",
      en: "100% artisan chicken, caramelized pineapple, tomato, lettuce, cheese, grilled onion, bacon",
    },
    price: 22000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "arepa-rural-trucha",
    category: "arepaburger",
    name: { es: "Arepa Rural Trucha", en: "Trout Rural Arepa" },
    description: {
      es: "Carne de trucha 100% artesanal, piña caramelizada, tomate, lechuga, queso, cebolla grillé",
      en: "100% artisan trout, caramelized pineapple, tomato, lettuce, cheese, grilled onion",
    },
    price: 22500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "arepa-rural-desmechada",
    category: "arepaburger",
    name: { es: "Arepa Rural Desmechada", en: "Pulled Beef Rural Arepa" },
    description: {
      es: "Carne de res desmechada 100% artesanal, piña caramelizada, tomate, lechuga, queso, cebolla grillé, tocineta",
      en: "100% artisan pulled beef, caramelized pineapple, tomato, lettuce, cheese, grilled onion, bacon",
    },
    price: 23000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "arepa-rural-quesillo",
    category: "arepaburger",
    name: { es: "Arepa Rural Quesillo", en: "Cheese Rural Arepa" },
    description: {
      es: "Arepa con quesillo",
      en: "Arepa with soft cheese",
    },
    price: 7500,
    isVegetarian: true,
    requiresMeatChoice: false,
  },

  // ─── HAMBURGUESAS ───
  {
    id: "rural-res",
    category: "hamburguesa",
    name: { es: "Rural Res", en: "Rural Beef" },
    description: {
      es: "Carne de res 100% artesanal, piña caramelizada, tomate, lechuga, queso, cebolla grillé, tocineta",
      en: "100% artisan beef, caramelized pineapple, tomato, lettuce, cheese, grilled onion, bacon",
    },
    price: 22800,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-pollo",
    category: "hamburguesa",
    name: { es: "Rural Pollo", en: "Rural Chicken" },
    description: {
      es: "Carne de pollo 100% artesanal, piña caramelizada, tomate, lechuga, queso, cebolla grillé, tocineta",
      en: "100% artisan chicken, caramelized pineapple, tomato, lettuce, cheese, grilled onion, bacon",
    },
    price: 22000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-trucha",
    category: "hamburguesa",
    name: { es: "Rural Trucha", en: "Rural Trout" },
    description: {
      es: "Carne de trucha 100% artesanal, piña caramelizada, tomate, lechuga, queso, cebolla grillé",
      en: "100% artisan trout, caramelized pineapple, tomato, lettuce, cheese, grilled onion",
    },
    price: 23000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-desmechada",
    category: "hamburguesa",
    name: { es: "Rural Desmechada", en: "Rural Pulled Beef" },
    description: {
      es: "Carne de res desmechada 100% artesanal, piña caramelizada, tomate, lechuga, queso, cebolla grillé, tocineta",
      en: "100% artisan pulled beef, caramelized pineapple, tomato, lettuce, cheese, grilled onion, bacon",
    },
    price: 23000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-doble-res",
    category: "hamburguesa",
    name: { es: "Rural Doble Res", en: "Rural Double Beef" },
    description: {
      es: "2 carnes de res 100% artesanal, piña caramelizada, tomate, lechuga, doble queso, cebolla grillé, doble tocineta",
      en: "2 artisan beef patties, caramelized pineapple, tomato, lettuce, double cheese, grilled onion, double bacon",
    },
    price: 37000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-doble-pollo",
    category: "hamburguesa",
    name: { es: "Rural Doble Pollo", en: "Rural Double Chicken" },
    description: {
      es: "2 carnes de pollo 100% artesanal, piña caramelizada, tomate, lechuga, doble queso, cebolla grillé, tocineta",
      en: "2 artisan chicken patties, caramelized pineapple, tomato, lettuce, double cheese, grilled onion, bacon",
    },
    price: 33800,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-doble-mixta",
    category: "hamburguesa",
    name: { es: "Rural Doble Mixta", en: "Rural Double Mixed" },
    description: {
      es: "1 carne de res + 1 carne de pollo 100% artesanal, piña caramelizada, tomate, lechuga, doble queso, cebolla grillé, tocineta",
      en: "1 beef + 1 chicken artisan patty, caramelized pineapple, tomato, lettuce, double cheese, grilled onion, bacon",
    },
    price: 36800,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-costilla-corta",
    category: "hamburguesa",
    name: { es: "Rural Costilla Corta", en: "Rural Short Rib" },
    description: {
      es: "Costilla BBQ, piña caramelizada, tomate, lechuga, queso, cebolla grillé, tocineta",
      en: "BBQ rib, caramelized pineapple, tomato, lettuce, cheese, grilled onion, bacon",
    },
    price: 32400,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-3-quesos",
    category: "hamburguesa",
    name: { es: "Rural 3 Quesos", en: "Rural 3 Cheese" },
    description: {
      es: "Carne de res 100% artesanal, piña caramelizada, tomate, lechuga, queso mozzarella, cheddar, queso filadelfia, cebolla grillé, tocineta",
      en: "100% artisan beef, caramelized pineapple, tomato, lettuce, mozzarella, cheddar, cream cheese, grilled onion, bacon",
    },
    price: 23700,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-montanera",
    category: "hamburguesa",
    name: { es: "Rural Montañera", en: "Rural Montanera" },
    description: {
      es: "Carne de res 100% artesanal, piña caramelizada, tomate, lechuga, queso, queso cuajada, cebolla grillé, tocineta, plátano pintón, ripio de papa y salsa de aguacate de la casa",
      en: "100% artisan beef, caramelized pineapple, tomato, lettuce, cheese, curd cheese, grilled onion, bacon, plantain, potato chips & house avocado sauce",
    },
    price: 27000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-vegetariana",
    category: "hamburguesa",
    name: { es: "Rural Vegetariana", en: "Rural Vegetarian" },
    description: {
      es: "Carne de lentejas artesanal, piña caramelizada, tomate, lechuga, queso, cebolla grillé",
      en: "Artisan lentil patty, caramelized pineapple, tomato, lettuce, cheese, grilled onion",
    },
    price: 18500,
    isVegetarian: true,
    requiresMeatChoice: false,
  },
  {
    id: "rural-mix",
    category: "hamburguesa",
    name: { es: "Rural Mix", en: "Rural Mix" },
    description: {
      es: "Carne de res 100% artesanal, piña caramelizada, tomate, lechuga, queso, pollo desmechado en salsa blanca, pepinos agridulces, cebolla grillé, tocineta",
      en: "100% artisan beef, caramelized pineapple, tomato, lettuce, cheese, pulled chicken in white sauce, pickled cucumbers, grilled onion, bacon",
    },
    price: 28500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "rural-mexicana",
    category: "hamburguesa",
    name: { es: "Rural Mexicana", en: "Rural Mexicana" },
    description: {
      es: "Pan artesanal, maíz en salsa blanca, carne de res, queso cheddar, frijoles, pico de gallo, salsa de aguacate, queso cuajada y lechuga",
      en: "Artisan bun, corn in white sauce, beef, cheddar cheese, beans, pico de gallo, avocado sauce, curd cheese & lettuce",
    },
    price: 27500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },

  // ─── COMBOS ───
  {
    id: "combo-res-pollo",
    category: "combo",
    name: {
      es: "Rural Res o Pollo + Papas",
      en: "Rural Beef or Chicken + Fries",
    },
    description: {
      es: "Hamburguesa Rural de Res o Pollo con papas a la francesa",
      en: "Rural Beef or Chicken burger with french fries",
    },
    price: 30500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "combo-trucha",
    category: "combo",
    name: {
      es: "Rural Trucha o Salentina + Papas",
      en: "Rural Trout or Salentina + Fries",
    },
    description: {
      es: "Hamburguesa Rural de Trucha o Salentina con papas a la francesa",
      en: "Rural Trout or Salentina burger with french fries",
    },
    price: 31000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "combo-desmechada",
    category: "combo",
    name: {
      es: "Rural Desmechada + Papas",
      en: "Rural Pulled Beef + Fries",
    },
    description: {
      es: "Hamburguesa Rural Desmechada con papas a la francesa",
      en: "Rural Pulled Beef burger with french fries",
    },
    price: 31500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "combo-doble",
    category: "combo",
    name: { es: "Rural Doble + Papas", en: "Rural Double + Fries" },
    description: {
      es: "Hamburguesa Rural Doble con papas a la francesa",
      en: "Rural Double burger with french fries",
    },
    price: 44000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "combo-costilla",
    category: "combo",
    name: { es: "Rural Costilla + Papas", en: "Rural Rib + Fries" },
    description: {
      es: "Hamburguesa Rural Costilla con papas a la francesa",
      en: "Rural Rib burger with french fries",
    },
    price: 39500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "combo-3-quesos",
    category: "combo",
    name: { es: "Rural 3 Quesos + Papas", en: "Rural 3 Cheese + Fries" },
    description: {
      es: "Hamburguesa Rural 3 Quesos con papas a la francesa",
      en: "Rural 3 Cheese burger with french fries",
    },
    price: 35900,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "combo-montanera",
    category: "combo",
    name: { es: "Rural Montañera + Papas", en: "Rural Montanera + Fries" },
    description: {
      es: "Hamburguesa Rural Montañera con papas a la francesa",
      en: "Rural Montanera burger with french fries",
    },
    price: 34900,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "combo-mix",
    category: "combo",
    name: { es: "Rural Mix + Papas", en: "Rural Mix + Fries" },
    description: {
      es: "Hamburguesa Rural Mix con papas a la francesa",
      en: "Rural Mix burger with french fries",
    },
    price: 35900,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "combo-vegetariana",
    category: "combo",
    name: {
      es: "Rural Vegetariana + Papas",
      en: "Rural Vegetarian + Fries",
    },
    description: {
      es: "Hamburguesa Rural Vegetariana con papas a la francesa",
      en: "Rural Vegetarian burger with french fries",
    },
    price: 23500,
    isVegetarian: true,
    requiresMeatChoice: false,
  },
  {
    id: "combo-adicional-sal-pimienta",
    category: "combo",
    name: {
      es: "Adicional: sal, pimienta en cualquier combo",
      en: "Add-on: salt & pepper to any combo",
    },
    description: {
      es: "Sal y pimienta adicional en cualquier combo",
      en: "Extra salt & pepper on any combo",
    },
    price: 2500,
    isVegetarian: true,
    requiresMeatChoice: false,
  },

  // ─── EXTRAS ───
  {
    id: "extra-tocineta",
    category: "extra",
    name: { es: "Tocineta", en: "Bacon" },
    description: {
      es: "Porción adicional de tocineta",
      en: "Extra portion of bacon",
    },
    price: 5500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "extra-desmechada",
    category: "extra",
    name: { es: "Carne Desmechada", en: "Pulled Beef" },
    description: {
      es: "Porción adicional de carne desmechada",
      en: "Extra portion of pulled beef",
    },
    price: 11500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "extra-costilla-bbq",
    category: "extra",
    name: { es: "Costilla BBQ", en: "BBQ Rib" },
    description: {
      es: "Porción adicional de costilla BBQ",
      en: "Extra portion of BBQ rib",
    },
    price: 11500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "extra-pollo",
    category: "extra",
    name: { es: "Pollo", en: "Chicken" },
    description: {
      es: "Porción adicional de pollo",
      en: "Extra portion of chicken",
    },
    price: 9500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "extra-maiz-dulce",
    category: "extra",
    name: { es: "Maíz Dulce", en: "Sweet Corn" },
    description: {
      es: "Porción adicional de maíz dulce",
      en: "Extra portion of sweet corn",
    },
    price: 3000,
    isVegetarian: true,
    requiresMeatChoice: false,
  },
  {
    id: "extra-queso",
    category: "extra",
    name: { es: "Queso", en: "Cheese" },
    description: {
      es: "Porción adicional de queso",
      en: "Extra portion of cheese",
    },
    price: 4500,
    isVegetarian: true,
    requiresMeatChoice: false,
  },
  {
    id: "extra-huevos-codorniz",
    category: "extra",
    name: { es: "Huevos de Codorniz", en: "Quail Eggs" },
    description: {
      es: "Porción adicional de huevos de codorniz",
      en: "Extra portion of quail eggs",
    },
    price: 6500,
    isVegetarian: true,
    requiresMeatChoice: false,
  },
  {
    id: "extra-chicharron",
    category: "extra",
    name: { es: "Chicharrón", en: "Pork Crackling" },
    description: {
      es: "Porción adicional de chicharrón",
      en: "Extra portion of pork crackling",
    },
    price: 14500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },

  // ─── PAPAS CON TOPPING ───
  {
    id: "papas-costillas-bbq",
    category: "papas-topping",
    name: { es: "Papas con Costillas BBQ", en: "Fries with BBQ Ribs" },
    description: {
      es: "Papas a la francesa con costillas BBQ",
      en: "French fries with BBQ ribs",
    },
    price: 22800,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "papas-desmechada",
    category: "papas-topping",
    name: { es: "Papas con Desmechada", en: "Fries with Pulled Beef" },
    description: {
      es: "Papas a la francesa con carne desmechada",
      en: "French fries with pulled beef",
    },
    price: 23000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "papas-tocineta",
    category: "papas-topping",
    name: { es: "Papas con Tocineta", en: "Fries with Bacon" },
    description: {
      es: "Papas a la francesa con tocineta",
      en: "French fries with bacon",
    },
    price: 16500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "papas-huevos-codorniz",
    category: "papas-topping",
    name: {
      es: "Papas con Huevos de Codorniz",
      en: "Fries with Quail Eggs",
    },
    description: {
      es: "Papas a la francesa con huevos de codorniz",
      en: "French fries with quail eggs",
    },
    price: 16500,
    isVegetarian: true,
    requiresMeatChoice: false,
  },
  {
    id: "papas-cerdo-asado",
    category: "papas-topping",
    name: { es: "Papas con Cerdo Asado", en: "Fries with Roasted Pork" },
    description: {
      es: "Papas a la francesa con cerdo asado",
      en: "French fries with roasted pork",
    },
    price: 21500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "papas-pollo-asado",
    category: "papas-topping",
    name: {
      es: "Papas con Pollo Asado",
      en: "Fries with Roasted Chicken",
    },
    description: {
      es: "Papas a la francesa con pollo asado",
      en: "French fries with roasted chicken",
    },
    price: 20500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "papas-mexicanas",
    category: "papas-topping",
    name: { es: "Papas Mexicanas", en: "Mexican Fries" },
    description: {
      es: "Papas a la francesa, carne de res, lechuga, pico de gallo, queso cheddar, salsa de aguacate, queso cuajada, frijoles y maíz en salsa blanca",
      en: "French fries, beef, lettuce, pico de gallo, cheddar cheese, avocado sauce, curd cheese, beans & corn in white sauce",
    },
    price: 30000,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "papas-rural-especial",
    category: "papas-topping",
    name: { es: "Papas Rural Especial", en: "Special Rural Fries" },
    description: {
      es: "Carne de tu elección, queso mozzarella, queso cuajada, huevos de codorniz, cebolla grillé, maíz dulce, tocineta y salsa de aguacate de la casa",
      en: "Your choice of protein, mozzarella, curd cheese, quail eggs, grilled onion, sweet corn, bacon & house avocado sauce",
    },
    price: 32000,
    isVegetarian: false,
    requiresMeatChoice: true,
    meatOptions: ["res", "pollo", "trucha", "cerdo", "desmechada"],
  },
  {
    id: "papas-chicharronadas",
    category: "papas-topping",
    name: { es: "Papas Chicharronadas", en: "Crackling Fries" },
    description: {
      es: "Papas a la francesa, chicharrón, salsa de maíz, crema agria, pico de gallo",
      en: "French fries, pork crackling, corn sauce, sour cream, pico de gallo",
    },
    price: 31500,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "papas-todo-terreno",
    category: "papas-topping",
    name: {
      es: "Papas Todo Terreno (para 2 personas)",
      en: "All-Terrain Fries (for 2)",
    },
    description: {
      es: "Papas a la francesa, salsa de aguacate, costillas BBQ, carne desmechada, panceta, huevos codorniz, queso cuajada, maíz tierno, tocineta, queso mozzarella",
      en: "French fries, avocado sauce, BBQ ribs, pulled beef, pork belly, quail eggs, curd cheese, tender corn, bacon, mozzarella",
    },
    price: 52600,
    isVegetarian: false,
    requiresMeatChoice: false,
  },
  {
    id: "papas-rural",
    category: "papas-topping",
    name: { es: "Papas Rural", en: "Rural Fries" },
    description: {
      es: "Con la carne de tu elección, queso mozzarella, cebolla grillé, maíz dulce, tocineta y salsa de aguacate de la casa",
      en: "With your choice of protein, mozzarella, grilled onion, sweet corn, bacon & house avocado sauce",
    },
    price: 28500,
    isVegetarian: false,
    requiresMeatChoice: true,
    meatOptions: ["res", "pollo", "trucha", "cerdo", "desmechada"],
  },
];

export type MenuCategory =
  | "arepaburger"
  | "hamburguesa"
  | "combo"
  | "extra"
  | "papas-topping";

export type MeatOption = "res" | "pollo" | "trucha" | "cerdo" | "desmechada";

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: { es: string; en: string };
  description: { es: string; en: string };
  price: number;
  image?: string;
  isVegetarian: boolean;
  requiresMeatChoice: boolean;
  meatOptions?: MeatOption[];
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: { es: string; en: string };
  price: number;
  quantity: number;
  meatChoice?: MeatOption;
  image?: string;
}

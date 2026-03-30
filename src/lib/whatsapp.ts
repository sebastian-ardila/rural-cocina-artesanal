import { CartItem, MeatOption } from "@/types/menu";
import { formatPrice } from "./utils";

const WHATSAPP_NUMBER = "573115719922";

const MEAT_LABELS: Record<MeatOption, { es: string; en: string }> = {
  res: { es: "Res", en: "Beef" },
  pollo: { es: "Pollo", en: "Chicken" },
  trucha: { es: "Trucha", en: "Trout" },
  cerdo: { es: "Cerdo", en: "Pork" },
  desmechada: { es: "Desmechada", en: "Pulled Beef" },
};

export function buildOrderMessage(
  items: CartItem[],
  total: number,
  locale: string,
  customerName: string,
  paymentMethod: string,
  orderType: string
): string {
  const isEs = locale === "es";

  const lines = items.map((item) => {
    const name = isEs ? item.name.es : item.name.en;
    const subtotal = formatPrice(item.price * item.quantity);
    let line = `🍔 ${item.quantity}x ${name} — ${subtotal}`;
    if (item.meatChoice) {
      const meatLabel = isEs
        ? MEAT_LABELS[item.meatChoice].es
        : MEAT_LABELS[item.meatChoice].en;
      line += ` (🥩 ${meatLabel})`;
    }
    return line;
  });

  return [
    isEs ? `👋 Hola, soy *${customerName}*` : `👋 Hi, I'm *${customerName}*`,
    "",
    isEs ? "📋 *Mi pedido:*" : "📋 *My order:*",
    ...lines,
    "",
    `💰 *Total:* ${formatPrice(total)}`,
    `💳 *${isEs ? "Pago" : "Payment"}:* ${paymentMethod}`,
    `📍 *${isEs ? "Tipo" : "Type"}:* ${orderType}`,
  ].join("\n");
}

export function buildContactMessage(
  data: {
    name: string;
    email: string;
    phone: string;
    interestType: string;
    message: string;
  },
  locale: string
): string {
  const isEs = locale === "es";

  return [
    isEs ? `👋 Hola, soy *${data.name}*` : `👋 Hi, I'm *${data.name}*`,
    "",
    `📧 ${data.email}`,
    `📱 ${data.phone}`,
    `🏷️ ${data.interestType}`,
    "",
    `💬 ${data.message}`,
  ].join("\n");
}

export function buildReservationMessage(
  data: {
    name: string;
    people: number;
    date: string;
    time: string;
    comments: string;
  },
  locale: string
): string {
  const isEs = locale === "es";

  const lines = [
    isEs
      ? `👋 Hola, soy *${data.name}*`
      : `👋 Hi, I'm *${data.name}*`,
    "",
    isEs ? "📅 *Quiero reservar:*" : "📅 *I'd like to book:*",
    `👥 ${data.people} ${isEs ? "personas" : "guests"}`,
    `📆 ${data.date}`,
    `🕐 ${data.time}`,
  ];

  if (data.comments) {
    lines.push(`💬 ${data.comments}`);
  }

  return lines.join("\n");
}

export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

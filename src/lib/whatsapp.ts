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
  locale: string
): string {
  const isEs = locale === "es";

  const header = isEs
    ? "🍔 *Pedido - Rural Cocina Artesanal* 🔥"
    : "🍔 *Order - Rural Cocina Artesanal* 🔥";

  const separator = "━━━━━━━━━━━━━━━━━";

  const lines = items.map((item) => {
    const name = isEs ? item.name.es : item.name.en;
    const unitPrice = formatPrice(item.price);
    const subtotal = formatPrice(item.price * item.quantity);
    let line = `🛒 ${item.quantity}x *${name}*\n   💲 ${unitPrice} c/u → *${subtotal}*`;
    if (item.meatChoice) {
      const meatLabel = isEs
        ? MEAT_LABELS[item.meatChoice].es
        : MEAT_LABELS[item.meatChoice].en;
      line += `\n   🥩 _${isEs ? "Proteína" : "Protein"}: ${meatLabel}_`;
    }
    return line;
  });

  const totalLine = `💰 *${isEs ? "TOTAL" : "TOTAL"}:* ${formatPrice(total)}`;

  const thanks = isEs
    ? "🙏 ¡Gracias! Quedo atento a la confirmación."
    : "🙏 Thank you! I'll wait for confirmation.";

  const delivery = isEs
    ? "🏠 _¿Domicilio o para recoger?_"
    : "🏠 _Delivery or pickup?_";

  return [
    header,
    "",
    separator,
    ...lines,
    separator,
    "",
    totalLine,
    "",
    delivery,
    "",
    thanks,
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

  const header = isEs
    ? "📩 *Contacto - Rural Cocina Artesanal* ✨"
    : "📩 *Contact - Rural Cocina Artesanal* ✨";

  const separator = "━━━━━━━━━━━━━━━━━";

  const lines = [
    `👤 *${isEs ? "Nombre" : "Name"}:* ${data.name}`,
    `📧 *Email:* ${data.email}`,
    `📱 *${isEs ? "Teléfono" : "Phone"}:* ${data.phone}`,
    `🏷️ *${isEs ? "Interés" : "Interest"}:* ${data.interestType}`,
    "",
    `💬 *${isEs ? "Mensaje" : "Message"}:*`,
    data.message,
  ];

  const thanks = isEs
    ? "\n🙏 ¡Gracias por contactarnos! Responderemos pronto."
    : "\n🙏 Thank you for reaching out! We'll respond soon.";

  return [header, "", separator, ...lines, thanks].join("\n");
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

  const header = isEs
    ? "📅 *Reserva - Rural Cocina Artesanal* 🍽️"
    : "📅 *Reservation - Rural Cocina Artesanal* 🍽️";

  const separator = "━━━━━━━━━━━━━━━━━";

  const lines = [
    `👤 *${isEs ? "Nombre" : "Name"}:* ${data.name}`,
    `👥 *${isEs ? "Personas" : "Guests"}:* ${data.people}`,
    `📆 *${isEs ? "Fecha" : "Date"}:* ${data.date}`,
    `🕐 *${isEs ? "Hora" : "Time"}:* ${data.time}`,
  ];

  if (data.comments) {
    lines.push("");
    lines.push(`💬 *${isEs ? "Comentarios" : "Comments"}:*`);
    lines.push(data.comments);
  }

  const thanks = isEs
    ? "\n🙏 ¡Gracias! Quedo atento a la confirmación de la reserva."
    : "\n🙏 Thank you! I'll wait for the reservation confirmation.";

  return [header, "", separator, ...lines, thanks].join("\n");
}

export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

  // Create a temporary link and click it — works reliably on mobile and desktop
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

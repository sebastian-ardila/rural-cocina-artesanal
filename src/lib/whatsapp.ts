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
    ? "Hola! Quiero hacer un pedido:"
    : "Hi! I'd like to place an order:";

  const lines = items.map((item) => {
    const name = isEs ? item.name.es : item.name.en;
    const subtotal = formatPrice(item.price * item.quantity);
    let line = `- ${item.quantity}x ${name} - ${subtotal}`;
    if (item.meatChoice) {
      const meatLabel = isEs
        ? MEAT_LABELS[item.meatChoice].es
        : MEAT_LABELS[item.meatChoice].en;
      line += ` (${isEs ? "Proteína" : "Protein"}: ${meatLabel})`;
    }
    return line;
  });

  const totalLine = `\n${isEs ? "Total" : "Total"}: ${formatPrice(total)}`;
  const thanks = isEs ? "\nGracias!" : "\nThank you!";

  return `${header}\n\n${lines.join("\n")}${totalLine}${thanks}`;
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
    ? "Hola! Me comunico desde la web de Rural Cocina Artesanal."
    : "Hi! I'm reaching out from the Rural Cocina Artesanal website.";

  const lines = [
    `${isEs ? "Nombre" : "Name"}: ${data.name}`,
    `${isEs ? "Email" : "Email"}: ${data.email}`,
    `${isEs ? "Teléfono" : "Phone"}: ${data.phone}`,
    `${isEs ? "Tipo de interés" : "Interest"}: ${data.interestType}`,
    `\n${isEs ? "Mensaje" : "Message"}:\n${data.message}`,
  ];

  return `${header}\n\n${lines.join("\n")}`;
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
    ? "Hola! Quiero hacer una reserva:"
    : "Hi! I'd like to make a reservation:";

  const lines = [
    `${isEs ? "Nombre" : "Name"}: ${data.name}`,
    `${isEs ? "Personas" : "Guests"}: ${data.people}`,
    `${isEs ? "Fecha" : "Date"}: ${data.date}`,
    `${isEs ? "Hora" : "Time"}: ${data.time}`,
  ];

  if (data.comments) {
    lines.push(`${isEs ? "Comentarios" : "Comments"}: ${data.comments}`);
  }

  return `${header}\n\n${lines.join("\n")}`;
}

export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
}

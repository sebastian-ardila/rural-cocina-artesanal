export function RestaurantJsonLd({ locale }: { locale: string }) {
  const isEs = locale === "es";

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Rural Cocina Artesanal",
    description: isEs
      ? "Cocina artesanal colombiana con raíces en Salento, ahora en Pereira. Arepaburgers, hamburguesas artesanales y más."
      : "Colombian artisan cuisine with roots in Salento, now in Pereira. Arepaburgers, artisan burgers and more.",
    url: "https://rural-cocina-artesanal.com",
    telephone: "+573115719922",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Poblado 2, Mz 31, Cs 15",
      addressLocality: "Pereira",
      addressRegion: "Risaralda",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.8133,
      longitude: -75.6961,
    },
    servesCuisine: ["Colombian", "Artisan Burgers", "Arepaburgers"],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "15:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "15:00",
        closes: "23:00",
      },
    ],
    sameAs: [
      "https://facebook.com/rural.salento/",
      "https://instagram.com/ruralpereira",
    ],
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Arepaburger",
        },
        {
          "@type": "MenuSection",
          name: isEs ? "Hamburguesas" : "Burgers",
        },
        {
          "@type": "MenuSection",
          name: "Combos",
        },
        {
          "@type": "MenuSection",
          name: "Extras",
        },
        {
          "@type": "MenuSection",
          name: isEs ? "Papas con Topping" : "Loaded Fries",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

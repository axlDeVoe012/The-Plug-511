const products = [
  {
    id: 1,
    name: "Hubbly Flavours",
    price: "R35.00",
    description: "Assorted flavours including Golden Barzz, Amaren, Nareen, Nakhla, and Richman for your hubbly sessions.",
    mainImage: "/sales/flavours/flav.webp",
    images: ["/sales/flavours/golden1.webp", "/sales/flavours/amaren.webp", "/sales/flavours/nareen.webp", "/sales/flavours/nakhla.webp", "/sales/flavours/richman.webp"]
  },
  {
    id: 2,
    name: "Egyptian Small Hookah Pipe",
    price: "R300.00",
    description: "Compact Egyptian hookah pipe for personal sessions.",
    mainImage: "/sales/small.webp",
    images: ["/sales/small.webp", "/sales/small2.webp"]
  },
  {
    id: 3,
    name: "Egyptian Medium Hookah Pipe",
    price: "R350.00",
    description: "Medium-sized Egyptian hookah pipe built for smooth draws.",
    mainImage: "/sales/medium.webp",
    images: ["/sales/medium.webp", "/sales/medium1.webp", "/sales/medium2.webp", "/sales/midium3.webp"]
  },
  {
    id: 4,
    name: "Egyptian Big Hookah Pipe",
    price: "R450.00",
    description: "Large Egyptian hookah pipe ideal for group sessions.",
    mainImage: "/sales/Big.webp",
    images: ["/sales/Big.webp", "/sales/Big.webp", "/sales/big2.webp"]
  },
  {
    id: 5,
    name: "Other Hookah Pipe Medium",
    price: "R250.00",
    description: "Affordable medium-size hookah pipe with a traditional build.",
    mainImage: "/sales/other.webp",
    images: ["/sales/other2.webp", "/sales/other.webp"]
  },
  {
    id: 6,
    name: "English Walker Hookah Pipe",
    price: "R900.00",
    description: "Premium English hookah pipe offering high durability and performance.",
    mainImage: "/sales/hubbly/main.webp",
    images: ["/sales/english.webp", "/sales/english2.webp", "/sales/english3.webp", "/sales/english1.webp"]
  },
  {
    id: 7,
    name: "Nasty Vape 9K",
    price: "R250.00",
    description: "Nasty 9K disposable vape with rich flavour and smooth hits.",
    mainImage: "/sales/nasty-bar/nasty1.webp",
    images: ["/sales/nasty-bar/nasty2.webp", "/sales/nasty-bar/9k_side.webp"]
  },
  {
    id: 8,
    name: "Nasty Vape 14K",
    price: "R300.00",
    description: "Nasty 14K disposable vape with extended puffs and bold taste.",
    mainImage: "/sales/nasty-bar2/nasty14k_side.webp",
    images: ["/sales/nasty-bar2/14k_side.webp", "/sales/nasty-bar2/nasty14_side2.webp"]
  },
  {
    id: 9,
    name: "Nasty Vape 14K X",
    price: "R350.00",
    description: "Nasty 14K X disposable vape with extended puffs and bold taste.",
    mainImage: "/sales/xbar.webp",
    images: ["/sales/nasty-bar2/nastybar.webp", "/sales/nasty-bar2/14X_side.webp", "/sales/nasty-bar2/14X_side2.webp", "/sales/nasty-bar2/14X_side3.webp"]
  },
  {
    id: 10,
    name: "Bugatti Vape 9K",
    price: "R250.00",
    description: "Luxurious Bugatti 9K vape designed for quality and style.",
    mainImage: "/sales/bugatti/bugatti4.webp",
    images: ["/sales/Bugatti9k.webp", "/sales/bugatti/bugg.webp", "/sales/bugmain.webp"]
  },
  {
    id: 11,
    name: "Velocity Vape 25K",
    price: "R350.00",
    description: "Long-lasting Velocity 25K disposable vape with premium feel.",
    mainImage: "/sales/velo.webp",
    images: ["/sales/velocity2.webp", "/sales/o-vape.webp", "/sales/velocity.webp", "/sales/volocity.webp", "/sales/velocity.webp"]
  },
  {
    id: 12,
    name: "Crystal Vape 600K",
    price: "R60.00",
    description: "Budget-friendly Crystal 600K vape for quick sessions.",
    mainImage: "/sales/grystal.webp",
    images: ["/sales/crystal.webp", "/sales/crystal2.webp"]
  },
  {
    id: 13,
    name: "Beast Vape 7K",
    price: "R140.00",
    description: "Beast 7K vape delivers powerful flavour in a compact body.",
    mainImage: "/sales/vapepen/FlavourBeast.webp",
    images: ["/sales/vapepen/flvbeast.webp", "/sales/beast.webp"]
  },
  {
    id: 14,
    name: "InnorBar Vape 20K",
    price: "R250.00",
    description: "InnorBar Vape 20K delivers powerful flavour in a compact body.",
    mainImage: "/sales/innobar.webp",
    images: ["/sales/inno.webp", "/sales/innobar.webp"]
  },
  {
    id: 15,
    name: "I-Joy Vape 10K",
    price: "R150.00",
    description: "I-Joy Vape 10K delivers powerful flavour in a compact body.",
    mainImage: "/sales/ijoy/ijoy_bar.webp",
    images: ["/sales/ijoy/iJoy_Bar1.webp", "/sales/ijoym.webp"]
  },
  {
    id: 16,
    name: "Vuse Refills",
    price: "R150.00",
    description: "Vuse refills deliver powerful flavour in a compact body.",
    mainImage: "/sales/vuse1.webp",
    images: ["/sales/vuse.webp", "/sales/vuse1.webp", "/sales/vuse4.webp", "/sales/v.webp"]
  },
  {
    id: 17,
    name: "Nesh Coil 1.5K",
    price: "R100.00",
    description: "High-performance Nesh Coil 1.5K for reliable vaping.",
    mainImage: "/sales/coil_side.webp",
    images: ["/sales/cm.webp", "/sales/c.webp"]
  },
  {
    id: 18,
    name: "Candy Vapour 100ml Vape Juice",
    price: "R100.00",
    description: "Flavour-packed 100ml vape juice from Candy Vapour.",
    mainImage: "/sales/100m4.webp",
    images: ["/sales/100m1.webp", "/sales/100m2.webp", "/sales/100m3.webp", "/sales/100m.webp", "/sales/100m5.webp"]
  },
  {
    id: 19,
    name: "Candy Vapour 60ml Vape Juice",
    price: "R60.00",
    description: "Candy Vapour 60ml vape juice with sweet flavour tones.",
    mainImage: "/sales/60m1.webp",
    images: ["/sales/60m.webp", "/sales/60m2.webp"]
  },
  {
    id: 20,
    name: "Ultra Cool 60ml Vape Juice",
    price: "R60.00",
    description: "Refreshing and cool vape juice for daily use.",
    mainImage: "/sales/ultra.webp",
    images: ["/sales/ultra3.webp", "/sales/ultra1.webp"]
  },
  {
    id: 21,
    name: "Pre-Rolled Joint – Indoor",
    price: "",
    description: "Premium indoor cannabis pre-roll for a clean high.",
    mainImage: "/sales/prerolled/indoor2.webp",
    images: ["/sales/prerolled/indoor.webp", "/sales/prerolled/indoor_side.webp"]
  },
  {
    id: 22,
    name: "Pre-Rolled Joint – Greenhouse",
    price: "",
    description: "Greenhouse-grown pre-rolled joint for a mellow vibe.",
    mainImage: "/sales/prerolled/cannproduct1.webp",
    images: ["/sales/prerolled/greenhouse.webp", "/sales/prerolled/bud.webp"]
  },
  {
    id: 23,
    name: "Red Straps Edibles",
    price: "R50.00",
    description: "Sweet and chewy cannabis-infused red straps.",
    mainImage: "/sales/edibles/redstraps.webp",
    images: ["/sales/edibles/redstraps1.webp", "/sales/edibles/redstraps.webp"]
  },
  {
    id: 24,
    name: "Cannabis Jelly Edibles",
    price: "R40.00",
    description: "Flavorful cannabis jelly treats for a mellow high.",
    mainImage: "/sales/edibles/jelly1.webp",
    images: ["/sales/edibles/jelly.webp", "/sales/edibles/jelly1.webp"]
  },
  {
    id: 25,
    name: "Lighter",
    price: "R10.00",
    description: "Reliable lighter for all your smoking needs.",
    mainImage: "/sales/sun/sun.webp",
    images: ["/sales/lighter/lighter.webp", "/sales/sun/sun.webp"]
  },
  {
    id: 26,
    name: "Cigarette Roller",
    price: "R60.00",
    description: "Durable cigarette roller for consistent, smooth rolls.",
    mainImage: "/sales/zig-zag/zig-zag.webp",
    images: ["/sales/roller1.webp", "/sales/roller2.webp"]
  },
  {
    id: 27,
    name: "Dot Refills",
    price: "R10.00",
    description: "Handy dot refills for quick, on-the-go use.",
    mainImage: "/sales/dot.webp",
    images: ["/sales/dot2.webp", "/sales/dot3.webp"]
  },
  {
    id: 28,
    name: "Pre-Rolled Joint Holder",
    price: "R15.00",
    description: "Branded pre-rolled holder to keep your joints fresh and safe.",
    mainImage: "/sales/holder.webp",
    images: ["/sales/holder.webp", "/sales/holder.webp"]
  },
  {
    id: 29,
    name: "Hookah Head",
    price: "R60.00",
    description: "Replacement hookah heads compatible with most pipes.",
    mainImage: "/sales/head1.webp",
    images: ["/sales/head.webp", "/sales/head1.webp"]
  },
  {
    id: 30,
    name: "Hookah Tray",
    price: "From R30.00",
    description: "Stylish and functional trays for hookah and accessories.",
    mainImage: "/sales/tray3.webp",
    images: ["/sales/tray2.webp", "/sales/tray1.webp"]
  },
  {
    id: 31,
    name: "Charcoal Block (Square)",
    price: "R2.00",
    description: "Blue Mix (Square) charcoal block ideal for hookahs.",
    mainImage: "/sales/squalcoal1.webp",
    images: ["/sales/squalcoal.webp", "/sales/squalcoal1.webp"]
  },
  {
    id: 32,
    name: "Charcoal (Blue)",
    price: "R10.00",
    description: "High-quality blue charcoal for smoking sessions.",
    mainImage: "/sales/coal1.webp",
    images: ["/sales/coal.webp", "/sales/coal1.webp"]
  },
  {
    id: 33,
    name: "Rollers",
    price: "From R30.00",
    description: "Efficient roller for fast, consistent joints every time.",
    mainImage: "/sales/roller1.webp",
    images: ["/sales/roller1.webp", "/sales/roller2.webp"]
  },
  {
    id: 34,
    name: "Grinder",
    price: "From R30.00",
    description: "Sharp, portable cannabis grinder for your sessions.",
    mainImage: "/sales/grinder1.webp",
    images: ["/sales/grinders.webp", "/sales/grinder2.webp", "/sales/grinder3.webp"]
  },
  {
    id: 35,
    name: "Pitbull Cannabis (Per Gram)",
    price: "",
    description: "Premium Pitbull cannabis strain known for its potency and smoothness.",
    mainImage: "/sales/cannabis/weed6.webp",
    images: ["/sales/cannabis/pit.webp", "/sales/cannabis/buds-dark.webp"]
  },
  {
    id: 36,
    name: "Heli Jelly Cannabis (Per Gram)",
    price: "",
    description: "Heli Jelly strain offering a relaxing and euphoric experience.",
    mainImage: "/sales/cannabis/weed3.webp",
    images: ["/sales/cannabis/indoor_side.webp", "/sales/cannabis/indoor.webp"]
  },
  {
    id: 37,
    name: "Dutch Magic Cannabis (Per Gram)",
    price: "",
    description: "Dutch Magic is a classic strain with a balanced hybrid effect.",
    mainImage: "/sales/cannabis/weed9.webp",
    images: ["/sales/cannabis/weed.webp", "/sales/cannabis/dutchmagic.webp"]
  },
  {
    id: 38,
    name: "Money Grapes Cannabis (Per Gram)",
    price: "",
    description: "Money Grapes has a sweet grape aroma and uplifting high.",
    mainImage: "/sales/cannabis/weed7.webp",
    images: ["/sales/cannabis/moneygrapes_side.webp", "/sales/cannabis/buds.webp"]
  },
  {
    id: 39,
    name: "Pop Tarts Cannabis (Per Gram)",
    price: "",
    description: "Pop Tarts strain with dessert-like flavor and mellow effects.",
    mainImage: "/sales/cannabis/buds.webp",
    images: ["/sales/cannabis/weed1.webp", "/sales/cannabis/buds.webp"]
  },
  {
    id: 40,
    name: "Purple Grape Cannabis (Per Gram)",
    price: "",
    description: "Fruity and fragrant Purple Grape strain great for relaxation.",
    mainImage: "/sales/cannabis/weed5.webp",
    images: ["/sales/cannabis/closeup.webp", "/sales/cannabis/purple.webp"]
  },
  {
    id: 41,
    name: "Loud Cake Cannabis (Per Gram)",
    price: "",
    description: "Potent Loud Cake strain, perfect for experienced users.",
    mainImage: "/sales/cannabis/buds-dark.webp",
    images: ["/sales/cannabis/loud.webp", "/sales/cannabis/buds-dark.webp"]
  },
  {
    id: 42,
    name: "Dead Jack (Per Gram)",
    price: "",
    description: "Dead Jack, perfect for experienced users.",
    mainImage: "/sales/cannabis/weed8.webp",
    images: ["/sales/cannabis/deadjack2.webp", "/sales/cannabis/buds-dark.webp"]
  }
];

export default products;
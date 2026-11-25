const TF_CONFIG = {
  waNumber: "6285793722634",
  ledPerUnit: 250000,
};

const PRICING_RATES = [
  {
    id: "kitchen",
    label: "Kitchen Set / Mini Bar",
    rates: { standard: 1650000, pro: 2100000, premium: 2650000 },
  },
  {
    id: "backdrop",
    label: "Backdrop TV & Wallboard",
    rates: { standard: 1450000, pro: 1850000, premium: 2350000 },
  },
  {
    id: "wardrobe",
    label: "Wardrobe / Lemari Custom",
    rates: { standard: 1750000, pro: 2200000, premium: 2750000 },
  },
  {
    id: "resepsionis",
    label: "Meja Resepsionis / Partisi Kantor",
    rates: { standard: 1600000, pro: 2050000, premium: 2600000 },
  },
];

const TIER_NAMES = {
  standard: "Standar",
  pro: "Favorit (HPL + Slow Motion)",
  premium: "Premium / Detail Khusus",
};

const CATEGORIES = [
  {
    id: "kitchen",
    title: "Kitchen Set & Mini Bar",
    desc: "Kabinet dapur & mini bar presisi sesuai ruang.",
    img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "backdrop",
    title: "Backdrop TV & Wallboard",
    desc: "Panel dinding rapi dengan aksen LED & rak.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "wardrobe",
    title: "Wardrobe & Dipan Custom",
    desc: "Lemari full plafon, pintu kamuflase & dipan.",
    img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "komersial",
    title: "Kantor, Klinik & Resepsionis",
    desc: "Meja resepsionis & interior tempat usaha.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80",
  },
];

const PROJECTS = [
  {
    id: 1,
    cat: "komersial",
    catLabel: "kursi coffee",
    title: "kursi coffee HpL, Big Burger Coffee",
    loc: "Pangandaran",
    mat: "Multiplek 18mm + HPL + Akrilik LED",
    size: "Custom 2.4m x 2.8m",
    desc: "Terimakasih A Trian sudah custom kursi coffee dari Trisandi furniture.",
    imgs: ["img_projects/komersial_1/kursi-coffee.jpg"],
  },
  {
    id: 2,
    cat: "backdrop",
    catLabel: "Backdrop TV",
    title: "Pesanan Backdrop TV ",
    loc: "Rancah",
    mat: "Multiplek + HPL Marmer + LED Strip",
    size: "Custom 3.0m x 2.6m",
    desc: "Ruang keluarga lebih mewah.",
    imgs: ["img_projects/backdrop_1/backdrop_tv.jpg"],
  },
  {
    id: 3,
    cat: "kitchen",
    catLabel: "Kitchen Set & Mini Bar",
    title: "Kitchen Set Modern, Kitchenset Bagian Atas, Mini Bar",
    loc: "Sumelap",
    mat: "Multiplek + HPL Doff + Top Granit",
    size: "Letter L (3.2m x 1.8m)",
    desc: "Terimakasih A Adeng sudah custom dari Trisandi furniture 🥰.",
    imgs: [
      "img_projects/kitchen_1/Kitchenset_1.jpg",
      "img_projects/kitchen_1/Kitchenset_2.jpg",
      "img_projects/kitchen_1/Kitchenset_3.jpg",
    ],
  },
  {
    id: 4,
    cat: "wardrobe",
    catLabel: "kamarset",
    title: "Pemasangan kamarset sudah beres 😍",
    loc: "Kawalu",
    mat: "Multiplek + HPL Putih + List Gold",
    size: "Custom 2.2m x 2.9m",
    desc: "Vibes nya ala hotel banget 🤩, Terimakasih Bu Hj Enung sudah custom furniture dari.",
    imgs: [
      "img_projects/wardrobe_1/kamarset_1.jpg",
      "img_projects/wardrobe_1/kamarset_2.jpg",
      "img_projects/wardrobe_1/kamarset_3.jpg",
      "img_projects/wardrobe_1/kamarset_4.jpg",
      "img_projects/wardrobe_1/kamarset_5.jpg",
    ],
  },
  {
    id: 5,
    cat: "kitchen",
    catLabel: "kitchenset",
    title: "kitchenset minimalis",
    loc: "Sukasirna",
    mat: "Rangka Kayu + HPL Serat Kayu",
    size: "Menyesuaikan Dinding",
    desc: "Pesanan kitchenset minimalis untuk Teh Neneng sudah beres 😍, Terimakasih Teh Neneng sudah custom kotchenset dari Trisandi Furniture barang berkualitas harga hemat 💯.",
    imgs: [
      "img_projects/kitchen_2/Kitchenset_1.jpg",
      "img_projects/kitchen_2/Kitchenset_2.jpg",
      "img_projects/kitchen_2/Kitchenset_3.jpg",
    ],
  },
  {
    id: 6,
    cat: "wardrobe",
    catLabel: "Lemari penyekat & Lemari baju",
    title: "2 set furniture Lemari penyekat & Lemari baju",
    loc: "Mangunreja",
    mat: "Kayu Keras + Busa High Density",
    size: "Custom Ukuran Ruang",
    desc: "Pesanan 2 set furniture untuk teh Widya, Terimakasih Teh Widya sudah order dari Trisandi furniture, barang berkualitas harga hemat.",
    imgs: [
      "img_projects/wardrobe_2/Lemari_1.jpg",
      "img_projects/wardrobe_2/Lemari_2.jpg",
      "img_projects/wardrobe_2/Lemari_3.jpg",
      "img_projects/wardrobe_2/Lemari_4.jpg",
    ],
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    type: "testimoni",
    typeLabel: "Testimoni Klien",
    quote:
      "Kitchen set dan mini bar pas dengan sudut dapur, pengerjaan rapi dan jelas alurnya.",
    name: "Widia Darma.",
    loc: "Tasikmalaya",
    imgs: ["img_testimoni/testimoni1/1.jpg"],
  },
  {
    id: 2,
    type: "pengiriman",
    typeLabel: "Pengiriman & Instalasi",
    quote: "Pemasangan Kitchenset pesanan A Egi.",
    name: "Pemasangan",
    loc: "Jakarta",
    imgs: [
      "img_testimoni/pengiriman1/1.jpg",
      "img_testimoni/pengiriman1/2.jpg",
      "img_testimoni/pengiriman1/3.jpg",
      "img_testimoni/pengiriman1/4.jpg",
    ],
  },
  {
    id: 3,
    type: "testimoni",
    typeLabel: "Testimoni Klien",
    quote: "Kursi empuk yang cocok untuk di ruang tamu.",
    name: "Reza",
    loc: "Bandung",
    imgs: ["img_testimoni/testimoni2/1.jpg"],
  },
  {
    id: 4,
    type: "pengiriman",
    typeLabel: "Pengiriman & Instalasi",
    quote: "Pesanan sofa L untuk Teh Nely 😍.",
    name: "Pengirima",
    loc: "Seluruh Indonesia",
    imgs: [
      "img_testimoni/pengiriman2/1.jpg",
      "img_testimoni/pengiriman2/2.jpg",
      "img_testimoni/pengiriman2/3.jpg",
    ],
  },
];

const LOOKBOOKS = [
  {
    tag: "Warm Minimalist",
    title: "Serat Kayu & Warm LED",
    desc: "Nyaman dan hangat untuk ruang keluarga serta kamar tidur.",
    img: "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "Modern Luxury",
    title: "Aksen Marmer & List Gold",
    desc: "Memberi kesan elegan pada backdrop TV maupun ruang tamu.",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "Compact Living",
    title: "Kabinet Full Plafon",
    desc: "Maksimalkan ruang simpan tanpa memakan banyak tempat.",
    img: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80",
  },
];

const TIPS = [
  {
    tag: "Material",
    title: "Multiplek + HPL untuk Ketahanan Harian",
    desc: "Lebih tahan terhadap kelembapan dan mudah dibersihkan dibanding bahan partikel.",
    img: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=700&q=80",
  },
  {
    tag: "Ukuran",
    title: "Catat Lebar, Tinggi & Titik Stop Kontak",
    desc: "Memudahkan pembuatan sketsa awal dan penempatan kabel/lampu sejak awal.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80",
  },
  {
    tag: "Pemesanan",
    title: "Konsultasi, Survei, DP & Produksi",
    desc: "Alur jelas dari estimasi awal hingga pengiriman dan instalasi di lokasi.",
    img: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=700&q=80",
  },
];

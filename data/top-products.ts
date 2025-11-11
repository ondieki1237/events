export type TopProduct = {
  id: string
  slug: string
  title: string
  category: string
  impressions: number
  excerpt?: string
  priceRange?: string
  image?: string
  brochure?: string
  specs?: Record<string, string | number>
}

const TOP_PRODUCTS: TopProduct[] = [
  {
    id: '1',
    slug: 'fully-automated-chemistry-analyzer',
    title: 'Fully Automated Chemistry Analyzer',
    category: 'Laboratory Equipment',
    impressions: 27,
    excerpt: 'High-throughput clinical chemistry analyzer for central labs.',
    priceRange: 'Contact for pricing',
  image: '/productlist/laboratory.png',
    brochure: '',
    specs: { throughput: '200 tests/hour', sampleType: 'Serum/Plasma', warranty: '1 year' },
  },
  {
    id: '2',
    slug: 'fully-automatic-biochemistry-analyzer',
    title: 'Fully Automatic Biochemistry Analyzer',
    category: 'Laboratory Equipment',
    impressions: 24,
    excerpt: 'Reliable biochemical assays with minimal operator intervention.',
    priceRange: 'Contact for pricing',
  image: '/productlist/diagnostic.png',
    brochure: '',
    specs: { throughput: '150 tests/hour', sampleType: 'Serum/Plasma', warranty: '1 year' },
  },
  {
    id: '3',
    slug: 'haematology-analyzer',
    title: 'Haematology Analyzer',
    category: 'Laboratory Equipment',
    impressions: 18,
    excerpt: 'Automated hematology analysis for CBC and differential.',
    priceRange: 'Contact for pricing',
  // use category cover for laboratory equipment
  image: '/productlist/laboratory.png',
    brochure: '',
    specs: { channels: '5-part differential', throughput: '60 samples/hour' },
  },
  {
    id: '4',
    slug: 'dry-chemistry-analyzer',
    title: 'Dry Chemistry Analyzer',
    category: 'Laboratory Equipment',
    impressions: 12,
    excerpt: 'Compact dry chemistry system ideal for point-of-care labs.',
    priceRange: 'Contact for pricing',
  image: '/productlist/laboratory.png',
    brochure: '',
    specs: { throughput: '80 tests/hour', sampleType: 'Cassette-based' },
  },
  {
    id: '5',
    slug: 'c-arm-x-ray-machine',
    title: 'C-Arm X-ray Machine',
    category: 'Imaging Equipment',
    impressions: 2,
    excerpt: 'High-resolution mobile C-Arm for surgical imaging.',
    priceRange: 'Contact for pricing',
  image: '/productlist/imaging.png',
    brochure: '',
    specs: { generator: '65 kW', detector: 'Flat-panel' },
  },
  {
    id: '6',
    slug: 'patient-monitor',
    title: 'Patient Monitor',
    category: 'Hospital Equipment',
    impressions: 3,
    excerpt: 'Multi-parameter patient monitors for ICU and OR.',
    priceRange: 'Contact for pricing',
  // patient monitors use the theatre/ICU cover
  image: '/productlist/theatre.png',
    brochure: '',
    specs: { parameters: 'ECG, SpO2, NIBP, Temp' },
  },
  {
    id: '7',
    slug: 'delivery-beds',
    title: 'Delivery Beds',
    category: 'Hospital Furniture',
    impressions: 2,
    excerpt: 'Ergonomic delivery beds for labour and delivery wards.',
    priceRange: 'Contact for pricing',
  image: '/productlist/furniture.jpeg',
    brochure: '',
    specs: { adjustments: 'Electric/manual', material: 'Stainless steel' },
  },
  {
    id: '8',
    slug: 'incubators-and-warmers',
    title: 'Incubators & Warmers',
    category: 'Maternity Equipment',
    impressions: 2,
    excerpt: 'Neonatal incubators and infant warmers for NICU.',
    priceRange: 'Contact for pricing',
  image: '/productlist/maternity.jpeg',
    brochure: '',
    specs: { tempRange: '25-37°C', monitoring: 'Built-in' },
  },
  {
    id: '9',
    slug: 'ecg-machine',
    title: 'ECG Machine',
    category: 'Diagnostic Equipment',
    impressions: 3,
    excerpt: 'Portable 12-lead ECG machines with digital storage.',
    priceRange: 'Contact for pricing',
  image: '/productlist/diagnostic.png',
    brochure: '',
    specs: { leads: '12', storage: 'Internal/USB' },
  },
]

export default TOP_PRODUCTS

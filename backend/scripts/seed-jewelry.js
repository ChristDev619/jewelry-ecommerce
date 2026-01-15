'use strict';

/**
 * Jewelry Data Seed Script
 * Migrates jewelry data from frontend static file to Strapi
 */

async function seedJewelryData() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('🚀 Starting jewelry data migration...');
      await importSeedData();
      console.log('✅ Jewelry data migration completed successfully!');
    } catch (error) {
      console.log('❌ Could not import jewelry seed data');
      console.error(error);
    }
  } else {
    console.log(
      '⚠️  Seed data has already been imported. Clear your database first to reimport.'
    );
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const jewelryInitHasRun = await pluginStore.get({ key: 'jewelryInitHasRunV2' });
  await pluginStore.set({ key: 'jewelryInitHasRunV2', value: true });
  return !jewelryInitHasRun;
}

// Helper function to generate slugs
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: {
      type: 'public',
    },
  });

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

// Create an entry and publish it
async function createEntry({ model, entry, publish = true }) {
  try {
    const created = await strapi.documents(`api::${model}.${model}`).create({
      data: entry,
      status: publish ? 'published' : 'draft',
    });
    console.log(`  ✓ Created ${model}: ${entry.name || entry.month || entry.code}`);
    return created;
  } catch (error) {
    console.error(`  ✗ Error creating ${model}:`, error.message);
    throw error;
  }
}

// Metal types data
const metalsData = [
  {
    name: '14K White Gold',
    slug: '14k-white-gold',
    code: '14K_WHITE_GOLD',
    description: 'Beautiful white gold with rhodium plating',
    purity: '14K',
    color: '#E8E8E8',
    order: 1,
  },
  {
    name: '14K Yellow Gold',
    slug: '14k-yellow-gold',
    code: '14K_YELLOW_GOLD',
    description: 'Classic yellow gold with warm tones',
    purity: '14K',
    color: '#FFD700',
    order: 2,
  },
  {
    name: '14K Rose Gold',
    slug: '14k-rose-gold',
    code: '14K_ROSE_GOLD',
    description: 'Romantic rose gold with copper alloy',
    purity: '14K',
    color: '#B76E79',
    order: 3,
  },
  {
    name: '18K White Gold',
    slug: '18k-white-gold',
    code: '18K_WHITE_GOLD',
    description: 'Premium white gold with higher purity',
    purity: '18K',
    color: '#F0F0F0',
    order: 4,
  },
  {
    name: '18K Yellow Gold',
    slug: '18k-yellow-gold',
    code: '18K_YELLOW_GOLD',
    description: 'Premium yellow gold with richer color',
    purity: '18K',
    color: '#FFE55C',
    order: 5,
  },
  {
    name: '18K Rose Gold',
    slug: '18k-rose-gold',
    code: '18K_ROSE_GOLD',
    description: 'Premium rose gold with elegant appeal',
    purity: '18K',
    color: '#C48793',
    order: 6,
  },
  {
    name: 'Platinum',
    slug: 'platinum',
    code: 'PLATINUM',
    description: 'Luxurious and durable precious metal',
    purity: '950',
    color: '#E5E4E2',
    order: 7,
  },
  {
    name: 'Sterling Silver',
    slug: 'sterling-silver',
    code: 'STERLING_SILVER',
    description: 'Affordable and elegant silver',
    purity: '925',
    color: '#C0C0C0',
    order: 8,
  },
];

// Style types data
const stylesData = [
  { name: 'Solitaire', slug: 'solitaire', code: 'SOLITAIRE', description: 'Classic single stone design', order: 1 },
  { name: 'Halo', slug: 'halo', code: 'HALO', description: 'Center stone surrounded by smaller diamonds', order: 2 },
  { name: 'Vintage', slug: 'vintage', code: 'VINTAGE', description: 'Inspired by historical designs', order: 3 },
  { name: 'Cluster', slug: 'cluster', code: 'CLUSTER', description: 'Multiple stones clustered together', order: 4 },
  { name: 'Stackable', slug: 'stackable', code: 'STACKABLE', description: 'Designed to be worn with other rings', order: 5 },
  { name: 'Eternity', slug: 'eternity', code: 'ETERNITY', description: 'Continuous band of stones', order: 6 },
  { name: 'Three Stone', slug: 'three-stone', code: 'THREE_STONE', description: 'Three stones representing past, present, future', order: 7 },
  { name: 'Bypass', slug: 'bypass', code: 'BYPASS', description: 'Band that wraps around with crossover design', order: 8 },
  { name: 'Wide Band', slug: 'wide-band', code: 'WIDE_BAND', description: 'Bold, wide band design', order: 9 },
  { name: 'Spike', slug: 'spike', code: 'SPIKE', description: 'Edgy design with spike elements', order: 10 },
  { name: 'Marquise', slug: 'marquise', code: 'MARQUISE', description: 'Elongated boat-shaped stones', order: 11 },
];

// Birthstone data
const birthstonesData = [
  { month: 'JANUARY', name: 'Garnet', slug: 'garnet', color: '#AA0000', description: 'Symbolizes protection and strength' },
  { month: 'FEBRUARY', name: 'Amethyst', slug: 'amethyst', color: '#9966CC', description: 'Represents peace and tranquility' },
  { month: 'MARCH', name: 'Aquamarine', slug: 'aquamarine', color: '#7FFFD4', description: 'Signifies courage and communication' },
  { month: 'APRIL', name: 'Diamond', slug: 'diamond', color: '#B9F2FF', description: 'Symbol of eternal love and strength' },
  { month: 'MAY', name: 'Emerald', slug: 'emerald', color: '#50C878', description: 'Represents rebirth and love' },
  { month: 'JUNE', name: 'Pearl', slug: 'pearl', color: '#F0EAD6', description: 'Signifies purity and wisdom' },
  { month: 'JULY', name: 'Ruby', slug: 'ruby', color: '#E0115F', description: 'Symbol of passion and vitality' },
  { month: 'AUGUST', name: 'Peridot', slug: 'peridot', color: '#E6E200', description: 'Represents strength and healing' },
  { month: 'SEPTEMBER', name: 'Sapphire', slug: 'sapphire', color: '#0F52BA', description: 'Signifies wisdom and royalty' },
  { month: 'OCTOBER', name: 'Opal', slug: 'opal', color: '#A8C3BC', description: 'Symbol of hope and creativity' },
  { month: 'NOVEMBER', name: 'Topaz', slug: 'topaz', color: '#FFAA00', description: 'Represents friendship and strength' },
  { month: 'DECEMBER', name: 'Turquoise', slug: 'turquoise', color: '#40E0D0', description: 'Signifies good fortune and success' },
];

// Category data
const categoriesData = [
  { name: 'Rings', slug: 'rings', description: 'Engagement rings, wedding bands, and fashion rings', order: 1 },
  { name: 'Necklaces', slug: 'necklaces', description: 'Pendants, chains, and statement necklaces', order: 2 },
  { name: 'Earrings', slug: 'earrings', description: 'Studs, hoops, and drop earrings', order: 3 },
  { name: 'Bracelets', slug: 'bracelets', description: 'Tennis bracelets, bangles, and cuffs', order: 4 },
  { name: 'Watches', slug: 'watches', description: 'Luxury timepieces', order: 5 },
];

// Jewelry products data from frontend
const productsData = [
  {
    name: '14K White Gold Diamond Cluster Marquis Station Ring',
    sku: 'RING-001',
    category: 'RINGS',
    price: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop',
    metal: '14K_WHITE_GOLD',
    style: 'CLUSTER',
    birthstoneMonth: null,
    deliveryDays: 7,
    inStock: true,
    description: 'Elegant cluster design with brilliant round diamonds arranged in a timeless pattern.',
    specifications: {
      weight: '3.2g',
      diamonds: '0.75ct',
      width: '4mm',
    },
    isNew: false,
    popularity: 95,
  },
  {
    name: '14K White Gold Bujukan Marquise Station Diamond Stackable Ring',
    sku: 'RING-002',
    category: 'RINGS',
    price: 675,
    imageUrl: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&auto=format&fit=crop',
    metal: '14K_WHITE_GOLD',
    style: 'STACKABLE',
    birthstoneMonth: null,
    deliveryDays: 5,
    inStock: true,
    description: 'Delicate stackable design perfect for layering with other rings.',
    specifications: {
      weight: '1.8g',
      diamonds: '0.25ct',
      width: '2mm',
    },
    isNew: false,
    popularity: 88,
  },
  {
    name: '14K White Gold Diamond Wide Open Band Ring',
    sku: 'RING-003',
    category: 'RINGS',
    price: 3800,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop',
    metal: '14K_WHITE_GOLD',
    style: 'WIDE_BAND',
    birthstoneMonth: null,
    deliveryDays: 10,
    inStock: true,
    description: 'Contemporary wide band design with diamond accents for a modern aesthetic.',
    specifications: {
      weight: '5.5g',
      diamonds: '1.2ct',
      width: '8mm',
    },
    isNew: true,
    popularity: 92,
  },
  {
    name: '14K White Gold Diamond Spike Bypass Ring',
    sku: 'RING-004',
    category: 'RINGS',
    price: 2600,
    imageUrl: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&auto=format&fit=crop',
    metal: '14K_WHITE_GOLD',
    style: 'SPIKE',
    birthstoneMonth: null,
    deliveryDays: 8,
    inStock: true,
    description: 'Edgy spike design with a modern bypass construction for a unique look.',
    specifications: {
      weight: '4.1g',
      diamonds: '0.85ct',
      width: '5mm',
    },
    isNew: false,
    popularity: 78,
  },
  {
    name: '18K White Gold Solitaire Diamond Engagement Ring',
    sku: 'RING-005',
    category: 'RINGS',
    price: 8900,
    imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&auto=format&fit=crop',
    metal: '18K_WHITE_GOLD',
    style: 'SOLITAIRE',
    birthstoneMonth: null,
    deliveryDays: 14,
    inStock: true,
    description: 'Classic solitaire setting with a brilliant round diamond, timeless elegance.',
    specifications: {
      weight: '3.8g',
      diamonds: '2.0ct',
      width: '2.5mm',
    },
    isNew: false,
    popularity: 98,
  },
  {
    name: '18K White Gold Halo Diamond Ring',
    sku: 'RING-006',
    category: 'RINGS',
    price: 12500,
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop',
    metal: '18K_WHITE_GOLD',
    style: 'HALO',
    birthstoneMonth: 'APRIL',
    deliveryDays: 12,
    inStock: true,
    description: 'Stunning halo design with a center diamond surrounded by smaller brilliants.',
    specifications: {
      weight: '4.5g',
      diamonds: '2.5ct',
      width: '8mm',
    },
    isNew: true,
    popularity: 96,
  },
  {
    name: '14K Yellow Gold Eternity Diamond Band',
    sku: 'RING-007',
    category: 'RINGS',
    price: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1588444650700-c5886e270aff?w=800&auto=format&fit=crop',
    metal: '14K_YELLOW_GOLD',
    style: 'ETERNITY',
    birthstoneMonth: null,
    deliveryDays: 9,
    inStock: true,
    description: 'Continuous circle of diamonds symbolizing eternal love and commitment.',
    specifications: {
      weight: '3.9g',
      diamonds: '1.5ct',
      width: '3mm',
    },
    isNew: false,
    popularity: 89,
  },
  {
    name: '14K Rose Gold Vintage Inspired Diamond Ring',
    sku: 'RING-008',
    category: 'RINGS',
    price: 5800,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop',
    metal: '14K_ROSE_GOLD',
    style: 'VINTAGE',
    birthstoneMonth: null,
    deliveryDays: 11,
    inStock: true,
    description: 'Vintage-inspired design with intricate details and romantic rose gold setting.',
    specifications: {
      weight: '4.2g',
      diamonds: '1.1ct',
      width: '6mm',
    },
    isNew: false,
    popularity: 85,
  },
  {
    name: '18K Yellow Gold Three Stone Diamond Ring',
    sku: 'RING-009',
    category: 'RINGS',
    price: 9200,
    imageUrl: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&auto=format&fit=crop',
    metal: '18K_YELLOW_GOLD',
    style: 'THREE_STONE',
    birthstoneMonth: null,
    deliveryDays: 13,
    inStock: true,
    description: 'Three stone design representing past, present, and future together.',
    specifications: {
      weight: '5.0g',
      diamonds: '2.2ct',
      width: '5mm',
    },
    isNew: false,
    popularity: 91,
  },
  {
    name: 'Platinum Diamond Marquise Cluster Ring',
    sku: 'RING-010',
    category: 'RINGS',
    price: 15800,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop',
    metal: 'PLATINUM',
    style: 'MARQUISE',
    birthstoneMonth: null,
    deliveryDays: 15,
    inStock: true,
    description: 'Luxurious platinum setting with marquise-cut diamonds in cluster arrangement.',
    specifications: {
      weight: '6.5g',
      diamonds: '3.0ct',
      width: '7mm',
    },
    isNew: true,
    popularity: 94,
  },
  {
    name: '14K White Gold Stackable Diamond Band',
    sku: 'RING-011',
    category: 'RINGS',
    price: 890,
    imageUrl: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&auto=format&fit=crop',
    metal: '14K_WHITE_GOLD',
    style: 'STACKABLE',
    birthstoneMonth: null,
    deliveryDays: 5,
    inStock: true,
    description: 'Delicate stackable band perfect for everyday elegance.',
    specifications: {
      weight: '1.5g',
      diamonds: '0.15ct',
      width: '1.5mm',
    },
    isNew: false,
    popularity: 82,
  },
  {
    name: '14K White Gold Bypass Diamond Ring',
    sku: 'RING-012',
    category: 'RINGS',
    price: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&auto=format&fit=crop',
    metal: '14K_WHITE_GOLD',
    style: 'BYPASS',
    birthstoneMonth: null,
    deliveryDays: 7,
    inStock: true,
    description: 'Modern bypass design with diamond accents creating fluid movement.',
    specifications: {
      weight: '3.6g',
      diamonds: '0.65ct',
      width: '4mm',
    },
    isNew: false,
    popularity: 80,
  },
  {
    name: '18K Rose Gold Halo Sapphire Ring',
    sku: 'RING-013',
    category: 'RINGS',
    price: 7600,
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop',
    metal: '18K_ROSE_GOLD',
    style: 'HALO',
    birthstoneMonth: 'SEPTEMBER',
    deliveryDays: 12,
    inStock: true,
    description: 'Beautiful sapphire center stone with diamond halo in romantic rose gold.',
    specifications: {
      weight: '4.8g',
      diamonds: '0.8ct',
      gemstones: '1.5ct sapphire',
      width: '7mm',
    },
    isNew: false,
    popularity: 87,
  },
  {
    name: 'Sterling Silver Cluster Ring',
    sku: 'RING-014',
    category: 'RINGS',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1588444650700-c5886e270aff?w=800&auto=format&fit=crop',
    metal: 'STERLING_SILVER',
    style: 'CLUSTER',
    birthstoneMonth: null,
    deliveryDays: 5,
    inStock: true,
    description: 'Affordable elegance with cubic zirconia cluster in sterling silver.',
    specifications: {
      weight: '2.2g',
      gemstones: '0.5ct CZ',
      width: '5mm',
    },
    isNew: false,
    popularity: 75,
  },
  {
    name: '14K Yellow Gold Wide Band Diamond Ring',
    sku: 'RING-015',
    category: 'RINGS',
    price: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop',
    metal: '14K_YELLOW_GOLD',
    style: 'WIDE_BAND',
    birthstoneMonth: null,
    deliveryDays: 8,
    inStock: true,
    description: 'Bold wide band with channel-set diamonds in warm yellow gold.',
    specifications: {
      weight: '6.0g',
      diamonds: '1.0ct',
      width: '7mm',
    },
    isNew: false,
    popularity: 83,
  },
  {
    name: '18K White Gold Emerald Halo Ring',
    sku: 'RING-016',
    category: 'RINGS',
    price: 11200,
    imageUrl: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&auto=format&fit=crop',
    metal: '18K_WHITE_GOLD',
    style: 'HALO',
    birthstoneMonth: 'MAY',
    deliveryDays: 14,
    inStock: true,
    description: 'Stunning emerald center stone surrounded by brilliant diamonds.',
    specifications: {
      weight: '5.2g',
      diamonds: '0.9ct',
      gemstones: '1.8ct emerald',
      width: '8mm',
    },
    isNew: true,
    popularity: 93,
  },
];

async function importMetals() {
  console.log('\n📦 Importing Metals...');
  const created = [];
  for (const metal of metalsData) {
    const entry = await createEntry({ model: 'metal', entry: metal });
    created.push(entry);
  }
  return created;
}

async function importStyles() {
  console.log('\n💎 Importing Styles...');
  const created = [];
  for (const style of stylesData) {
    const entry = await createEntry({ model: 'style', entry: style });
    created.push(entry);
  }
  return created;
}

async function importBirthstones() {
  console.log('\n🎂 Importing Birthstones...');
  const created = [];
  for (const birthstone of birthstonesData) {
    const entry = await createEntry({ model: 'birthstone', entry: birthstone });
    created.push(entry);
  }
  return created;
}

async function importCategories() {
  console.log('\n📂 Importing Categories...');
  const created = [];
  for (const category of categoriesData) {
    // Check if category already exists
    const existing = await strapi.documents('api::category.category').findMany({
      filters: { name: category.name },
    });
    
    if (existing.length > 0) {
      console.log(`  ⊙ Category already exists: ${category.name}`);
      created.push(existing[0]);
    } else {
      const entry = await createEntry({ model: 'category', entry: category });
      created.push(entry);
    }
  }
  return created;
}

async function importRetailer() {
  console.log('\n🏪 Importing Default Retailer...');
  
  const retailerData = {
    name: 'Gabriel & Co',
    slug: 'gabriel-and-co',
    email: 'info@gabrielco.com',
    phone: '+1 (555) 123-4567',
    website: 'https://www.gabrielny.com',
    description: 'Premier jewelry retailer specializing in fine diamonds and precious metals. Established tradition of excellence in craftsmanship.',
    isActive: true,
    rating: 4.8,
    establishedYear: 1989,
    address: {
      street: '123 Diamond District',
      city: 'New York',
      state: 'NY',
      postalCode: '10036',
      country: 'USA',
    },
    shippingPolicy: {
      domesticShipping: true,
      internationalShipping: true,
      freeShippingThreshold: 1000,
      shippingCost: 25,
      averageDeliveryDays: 7,
      details: 'Free shipping on orders over $1,000. International shipping available to most countries.',
    },
    returnPolicy: {
      returnWindow: 30,
      refundAvailable: true,
      exchangeAvailable: true,
      restockingFee: 0,
      details: '30-day return policy with full refund or exchange. Items must be in original condition.',
    },
  };

  const retailer = await createEntry({ model: 'retailer', entry: retailerData, publish: true });
  return retailer;
}

async function importProducts(retailer, categories, metals, styles, birthstones) {
  console.log('\n💍 Importing Products...');
  
  // Create lookup maps
  const metalMap = {};
  metals.forEach(m => {
    metalMap[m.code] = m.documentId;
  });
  
  const styleMap = {};
  styles.forEach(s => {
    styleMap[s.code] = s.documentId;
  });
  
  const birthstoneMap = {};
  birthstones.forEach(b => {
    birthstoneMap[b.month] = b.documentId;
  });
  
  const categoryMap = {};
  categories.forEach(c => {
    categoryMap[c.name.toUpperCase()] = c.documentId;
  });

  for (const productData of productsData) {
    try {
      const productEntry = {
        name: productData.name,
        slug: generateSlug(productData.name),
        sku: productData.sku,
        description: productData.description,
        price: productData.price,
        inStock: productData.inStock,
        isNew: productData.isNew,
        popularity: productData.popularity,
        deliveryDays: productData.deliveryDays,
        retailer: retailer.documentId,
        category: categoryMap[productData.category],
        metal: metalMap[productData.metal],
        style: styleMap[productData.style],
        birthstoneMonth: productData.birthstoneMonth ? birthstoneMap[productData.birthstoneMonth] : null,
        specifications: productData.specifications,
      };

      await createEntry({ model: 'product', entry: productEntry, publish: true });
    } catch (error) {
      console.error(`  ✗ Error importing product: ${productData.name}`, error.message);
    }
  }
}

async function importSeedData() {
  // Set public permissions for all jewelry-related content types
  await setPublicPermissions({
    product: ['find', 'findOne'],
    retailer: ['find', 'findOne'],
    category: ['find', 'findOne'],
    metal: ['find', 'findOne'],
    style: ['find', 'findOne'],
    birthstone: ['find', 'findOne'],
  });

  // Import data in correct order (dependencies first)
  const metals = await importMetals();
  const styles = await importStyles();
  const birthstones = await importBirthstones();
  const categories = await importCategories();
  const retailer = await importRetailer();
  await importProducts(retailer, categories, metals, styles, birthstones);
  
  console.log('\n✨ All data imported successfully!');
  console.log('\n📊 Summary:');
  console.log(`  • Metals: ${metals.length}`);
  console.log(`  • Styles: ${styles.length}`);
  console.log(`  • Birthstones: ${birthstones.length}`);
  console.log(`  • Categories: ${categories.length}`);
  console.log(`  • Retailers: 1`);
  console.log(`  • Products: ${productsData.length}`);
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedJewelryData();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


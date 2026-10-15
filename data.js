/* ============================================================
 * 服装商城 - 静态数据
 * ============================================================ */

var AppData = {
  // 购物车角标初始数字（分类页 Add to cart 会在此基础上累加）
  cartBadge: 2,

  /* ---------- 首页：限时秒杀 ---------- */
  flashSale: {
    endsIn: 5048, // 倒计时秒数 01:24:08
  },

  // 优惠券（横滑卡片第一张）
  voucher: {
    label: "CONSUMER VOUCHER",
    amount: "$15 OFF",
    condition: "On orders over $80",
    status: "Ready to use",
  },

  // 首页第一模块 & 分类页横幅的“买一送一”特价商品：
  // 直接在下方 productCatalog 中给商品加 promo: true（每分类 1 件，共 7 件）。
  // 分类商品列表自动隐藏这些商品，首页第一模块自动收集展示，无需再维护 id 清单。

  // Today's Picks
  todaysPicks: ["p1", "p2", "p3", "p8", "p5", "p7", "p12", "p13", "p14", "p11"],

  // Recommendations
  recommendations: [
    "p4",
    "p5",
    "p6",
    "p7",
    "p8",
    "p9",
    "p10",
    "p11",
    "p1",
    "p2",
    "p3",
    "p12",
  ],

  /* ---------- 分类页 ---------- */
  // 左侧分类栏
  categories: [
    { id: "all", name: "All", icon: "category/all.png" },
    { id: "men", name: "Men's", icon: "category/6.png" },
    { id: "women", name: "Women's", icon: "category/7.png" },
    { id: "shoes", name: "Shoes", icon: "category/1.png" },
    { id: "bags", name: "Bags", icon: "category/2.png" },
    { id: "makeup", name: "Makeup", icon: "category/10.png" },
    { id: "jewelry", name: "Jewelry", icon: "category/11.png" },
    { id: "sport", name: "Sport", icon: "category/5.png" },
  ],

  // 分类页紫色活动横幅：全站文案统一（每个分类都一样：买一送一）
  categoryPromo: {
    tag: "SPECIAL OFFER",
    title: "Buy 1 Get 1 Free",
    desc: "Limited time only",
  },

  /* ---------- 购物车页 ---------- */
  // 首次进入时的默认购物车
  cart: [],

  // 购物车满减优惠券（选中金额达到 threshold 时自动生效）
  cartVoucher: {
    title: "Consumption voucher",
    desc: "Save 10% on selected items",
    threshold: 400, // 满 $400
    discountRate: 0.1, // 减 10%（9 折）
  },

  /* ---------- 结算页 ---------- */
  address: {
    label: "Home",
    lines: ["12 Merdeka Street, Salatiga City", "Central Java 50711"],
  },

  /* ---------- 信用卡支付：3 张信用卡（写死，可随意改） ----------  */
  creditCards: [
    { id: "c1", brand: "Visa",       label: "Visa ending in 2048",       limit: 5000, debt: 0, monthlyDebt: 0 },
    { id: "c2", brand: "Mastercard", label: "Mastercard ending in 1024", limit: 3000, debt: 0, monthlyDebt: 0 },
    { id: "c3", brand: "Amex",       label: "Amex ending in 3072",       limit: 8000, debt: 0, monthlyDebt: 0 },
  ],

  // 服务费固定
  totals: {
    serviceFee: 3.5,
    monthlyRepayment: 600, // My currently monthly expenses（写死，不随订单变化）
    monthlyBudget: 2400,   // 每月还款预算（弹窗3：剩余月预算 = 它 − 月供）
  },

  /* ---------- 底部 Tab 导航 ---------- */
  tabs: [
    {
      name: "Home",
      icon: "home",
      link: "index.html",
      ico: "tabs/1-1.png",
      icoActive: "tabs/1-2.png",
    },
    {
      name: "Category",
      icon: "grid",
      link: "category.html",
      ico: "tabs/2-1.png",
      icoActive: "tabs/2-2.png",
    },
    {
      name: "shopping",
      icon: "cart",
      link: "cart.html",
      ico: "tabs/3-2.png",
      icoActive: "tabs/3-1.png",
    },
    {
      name: "Order",
      icon: "order",
      link: "checkout.html",
      ico: "tabs/4-1.png",
      icoActive: "tabs/4-2.png",
    },
  ],

  /* ---------- 全部商品（按分类逐层细分，图片均来自 images/ 下中文文件夹） ---------- */
  productCatalog: [
    {
      id: "men",
      name: "Men's",
      products: [
        { id: "p10", name: "Cream Stand-Collar Jacket", price: 89, stock: 500, img: "男生衣服/Container@2x.png" },
        { id: "p15", name: "Ivory Crewneck Knit Sweater", price: 95, stock: 500, promo: true, img: "男生衣服/Container@2x(1).png" },
        { id: "p16", name: "Blue Striped Cotton Shirt", price: 49, stock: 500, img: "男生衣服/Container@2x(2).png" },
        { id: "p17", name: "Navy Tipped Knit Cardigan", price: 89, stock: 500, img: "男生衣服/Container@2x(3).png" },
        { id: "p18", name: "Olive Utility Overshirt", price: 89, stock: 500, img: "男生衣服/Container@2x(4).png" },
        { id: "p19", name: "Light Gray Pullover Hoodie", price: 65, stock: 500, img: "男生衣服/Container@2x(5).png" },
        { id: "p20", name: "Beige Pique Polo Shirt", price: 40, stock: 500, img: "男生衣服/Container@2x(6).png" },
        { id: "p21", name: "Black Straight Cargo Pants", price: 79, stock: 500, img: "男生衣服/Container@2x(7).png" },
        { id: "p6",  name: "Khaki Pants", price: 89, stock: 128, img: "男生衣服/Container@2x(8).png" },
        { id: "p9",  name: "Green Knit Sweater", price: 159, stock: 0, img: "男生衣服/Container@2x(9).png" },
        { id: "p22", name: "Dark Khaki Chino Pants", price: 75, stock: 500, img: "男生衣服/Container@2x(10).png" },
        { id: "p14", name: "Dark Hooded Jacket", price: 99, stock: 80, img: "男生衣服/Container@2x(11).png" },
      ],
    },
    {
      id: "women",
      name: "Women's",
      products: [
        { id: "p2",  name: "Yellow Knit Cardigan", price: 69, stock: 2000, img: "女生衣服/Container@2x.png" },
        { id: "p23", name: "Pink Bow Cardigan", price: 59, stock: 800, img: "女生衣服/Container@2x(1).png" },
        { id: "p24", name: "Blue Floral Mini Dress", price: 72, stock: 800, promo: true, img: "女生衣服/Container@2x(2).png" },
        { id: "p25", name: "Sage Tweed Lady Jacket", price: 98, stock: 800, img: "女生衣服/Container@2x(3).png" },
        { id: "p26", name: "Cream Tiered Ruffle Skirt", price: 49, stock: 800, img: "女生衣服/Container@2x(4).png" },
        { id: "p27", name: "Pink Bow Knit Top", price: 32, stock: 800, img: "女生衣服/Container@2x(5).png" },
        { id: "p28", name: "Wide-Leg Denim Culottes", price: 58, stock: 800, img: "女生衣服/Container@2x(6).png" },
        { id: "p29", name: "Ivory Bow Tie Blouse", price: 45, stock: 800, img: "女生衣服/Container@2x(7).png" },
        { id: "p30", name: "Red Gingham Peplum Top", price: 38, stock: 800, img: "女生衣服/Container@2x(8).png" },
        { id: "p3",  name: "Sage Cropped Jacket", price: 89, stock: 800, img: "女生衣服/Container@2x(9).png" },
        { id: "p8",  name: "Blue Ruffle Blouse", price: 24, stock: 198, img: "女生衣服/Container@2x(10).png" },
      ],
    },
    {
      id: "shoes",
      name: "Shoes",
      products: [
        { id: "p7",  name: "Beige Suede Ankle Boots", price: 119, stock: 5, img: "鞋子/Container@2x.png" },
        { id: "p11", name: "Grey Suede Penny Loafers", price: 59, stock: 200, img: "鞋子/Container@2x(1).png" },
        { id: "p13", name: "Green Canvas High Tops", price: 62, stock: 150, img: "鞋子/Container@2x(2).png" },
        { id: "p12", name: "Light Green Slip-on Sneakers", price: 42, stock: 300, img: "鞋子/Container@2x(3).png" },
        { id: "p1",  name: "Pink Block Heel Sandals", price: 129, stock: 9999, img: "鞋子/Container@2x(4).png" },
        { id: "p5",  name: "White Bow Ballet Flats", price: 112, stock: 9999, img: "鞋子/Container@2x(5).png", liked: true },
        { id: "p31", name: "Grey Chunky Dad Sneakers", price: 78, stock: 600, img: "鞋子/Container@2x(6).png" },
        { id: "p32", name: "Pink White Court Sneakers", price: 68, stock: 600, img: "鞋子/Container@2x(7).png" },
        { id: "p33", name: "Blue Canvas Espadrille Slip-ons", price: 49, stock: 600, img: "鞋子/Container@2x(8).png" },
        { id: "p34", name: "Brown Horsebit Platform Loafers", price: 108, stock: 600, img: "鞋子/Container@2x(9).png" },
        { id: "p35", name: "Blush Satin Slingback Heels", price: 139, stock: 600, promo: true, img: "鞋子/Container@2x(10).png" },
        { id: "p4",  name: "Navy White Low-top Sneakers", price: 24, stock: 10000, img: "鞋子/Container@2x(11).png" },
      ],
    },
    {
      id: "bags",
      name: "Bags",
      products: [
        { id: "p36", name: "Quilted Flap Shoulder Bag", price: 89, stock: 300, promo: true, img: "包包/Container@2x.png" },
        { id: "p37", name: "Chain Hobo Shoulder Bag", price: 95, stock: 300, img: "包包/Container@2x(1).png" },
        { id: "p38", name: "C-Clasp Saddle Crossbody Bag", price: 78, stock: 300, img: "包包/Container@2x(2).png" },
        { id: "p39", name: "Canvas Mini Backpack", price: 55, stock: 300, img: "包包/Container@2x(3).png" },
        { id: "p40", name: "Leather Work Tote Bag", price: 139, stock: 300, img: "包包/Container@2x(4).png" },
        { id: "p41", name: "Chain Zip Shoulder Bag", price: 85, stock: 300, img: "包包/Container@2x(5).png" },
        { id: "p42", name: "Nylon Mini Backpack", price: 55, stock: 300, img: "包包/Container@2x(6).png" },
        { id: "p43", name: "Bow Charm Satchel Bag", price: 89, stock: 300, img: "包包/Container@2x(7).png" },
        { id: "p44", name: "Canvas Beach Tote Bag", price: 69, stock: 300, img: "包包/Container@2x(8).png" },
        { id: "p45", name: "Canvas Messenger Bag", price: 65, stock: 300, img: "包包/Container@2x(9).png" },
      ],
    },
    {
      id: "makeup",
      name: "Makeup",
      products: [
        { id: "p46", name: "Coral Pink Lipstick", price: 24, stock: 2000, img: "化妆品/Container@2x.png" },
        { id: "p47", name: "Pink Ribbon Eau de Parfum", price: 78, stock: 2000, promo: true, img: "化妆品/Container@2x(1).png" },
        { id: "p48", name: "Cushion Foundation Compact", price: 38, stock: 2000, img: "化妆品/Container@2x(2).png" },
        { id: "p49", name: "Black Volumizing Mascara", price: 18, stock: 2000, img: "化妆品/Container@2x(3).png" },
        { id: "p50", name: "Four Shade Eyeshadow Palette", price: 32, stock: 2000, img: "化妆品/Container@2x(4).png" },
        { id: "p51", name: "Pink Glow Face Serum", price: 46, stock: 2000, img: "化妆品/Container@2x(5).png" },
        { id: "p52", name: "Pink Pump Liquid Foundation", price: 36, stock: 2000, img: "化妆品/Container@2x(6).png" },
        { id: "p53", name: "Moisturizing Face Cream Jar", price: 34, stock: 2000, img: "化妆品/Container@2x(7).png" },
        { id: "p54", name: "Gentle Cleansing Foam Tube", price: 15, stock: 2000, img: "化妆品/Container@2x(8).png" },
        { id: "p55", name: "Hydrating Facial Sheet Mask", price: 16, stock: 2000, img: "化妆品/Container@2x(9).png" },
      ],
    },
    {
      id: "jewelry",
      name: "Jewelry",
      products: [
        { id: "p56", name: "Pink Flower Pearl Necklace", price: 58, stock: 200, promo: true, img: "首饰/Container@2x.png" },
        { id: "p57", name: "Silver Teardrop Link Bracelet", price: 69, stock: 200, img: "首饰/Container@2x(1).png" },
        { id: "p58", name: "Moon Star Crystal Necklace", price: 75, stock: 200, img: "首饰/Container@2x(2).png" },
        { id: "p59", name: "White Enamel Gold Hoop Earrings", price: 45, stock: 200, img: "首饰/Container@2x(3).png" },
        { id: "p60", name: "Rose Gold Enamel Ring Set", price: 119, stock: 200, img: "首饰/Container@2x(4).png" },
        { id: "p61", name: "Pave Diamond Rose Gold Bangle", price: 259, stock: 200, img: "首饰/Container@2x(5).png" },
        { id: "p62", name: "Mother of Pearl Flower Studs", price: 49, stock: 200, img: "首饰/Container@2x(6).png" },
        { id: "p63", name: "Pink Clover Pearl Charm Bracelet", price: 79, stock: 200, img: "首饰/Container@2x(7).png" },
        { id: "p64", name: "Crystal Pearl Drop Earrings", price: 69, stock: 200, img: "首饰/Container@2x(8).png" },
        { id: "p65", name: "Diamond Snake Emerald Bracelet", price: 259, stock: 200, img: "首饰/Container@2x(9).png" },
      ],
    },
    {
      id: "sport",
      name: "Sport",
      products: [
        { id: "p66", name: "Purple Yoga Mat", price: 39, stock: 800, promo: true, img: "运动/Container@2x.png" },
        { id: "p67", name: "Purple Foam Roller", price: 45, stock: 800, img: "运动/Container@2x(1).png" },
        { id: "p68", name: "Pink Sports Water Bottle", price: 19, stock: 800, img: "运动/Container@2x(2).png" },
        { id: "p69", name: "Pink Kettlebell 8KG", price: 55, stock: 800, img: "运动/Container@2x(3).png" },
        { id: "p70", name: "Pink Hex Dumbbell Pair", price: 35, stock: 800, img: "运动/Container@2x(4).png" },
        { id: "p71", name: "Fabric Resistance Bands Set", price: 22, stock: 800, img: "运动/Container@2x(5).png" },
        { id: "p72", name: "Pink Jump Rope", price: 18, stock: 800, img: "运动/Container@2x(6).png" },
        { id: "p73", name: "Purple Pilates Ring", price: 29, stock: 800, img: "运动/Container@2x(7).png" },
        { id: "p74", name: "Blue Yoga Exercise Ball", price: 32, stock: 800, img: "运动/Container@2x(8).png" },
        { id: "p75", name: "Pink Badminton Racket Set", price: 42, stock: 800, img: "运动/Container@2x(9).png" },
      ],
    },
  ],
};

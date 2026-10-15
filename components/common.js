/* ============================================================
 * 公共函数：价格格式化、商品查找、占位图、角标、底部导航
 * 依赖：data.js、icons.js（需先引入）
 * ============================================================ */

// 价格格式化：69 -> "$69.00"
function money(n) {
  return '$' + Number(n).toFixed(2);
}

// 按 id 查找商品（遍历“分类 -> 商品”两层嵌套）
function getProduct(id) {
  for (var i = 0; i < AppData.productCatalog.length; i++) {
    var list = AppData.productCatalog[i].products;
    for (var j = 0; j < list.length; j++) {
      if (list[j].id === id) return list[j];
    }
  }
  return null;
}

// 取某个分类下的全部商品；空分类或不存在的分类返回空数组
function getProductsByCat(catId) {
  for (var i = 0; i < AppData.productCatalog.length; i++) {
    if (AppData.productCatalog[i].id === catId) return AppData.productCatalog[i].products;
  }
  return [];
}

// 取“买一送一”特价活动商品（商品带 promo: true）：
// 不传 catId -> 全部分类的活动商品（首页第一模块用，共 7 件）
// 传 catId   -> 仅该分类的活动商品（分类页横幅用，1 件）
function getPromoProducts(catId) {
  var result = [];
  AppData.productCatalog.forEach(function (c) {
    if (catId && c.id !== catId) return;
    c.products.forEach(function (p) {
      if (p.promo) result.push(p);
    });
  });
  return result;
}

// 反查商品所属分类 id（嵌套后商品自身不带 cat，需要向上层找）
function getCatByProductId(id) {
  for (var i = 0; i < AppData.productCatalog.length; i++) {
    var c = AppData.productCatalog[i];
    for (var j = 0; j < c.products.length; j++) {
      if (c.products[j].id === id) return c.id;
    }
  }
  return '';
}

// 库存文案：128 -> "In Stock:128"，10000 -> "In Stock:1w+"，0 -> "Sold Out"
function stockText(stock) {
  if (stock === 0) return 'Sold Out';
  return 'In Stock:' + (stock >= 10000 ? '1w+' : stock);
}

// 交易时间格式化：-> "2026/09/27 14:35"（月/日/时/分均补 0）
function formatPayTime(d) {
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  return d.getFullYear() + '/' + pad(d.getMonth() + 1) + '/' + pad(d.getDate()) +
    ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
}

// 保存最近一笔支付结果供成功页读取（sessionStorage：关闭网页即失效）
function savePayResult(result) {
  sessionStorage.setItem('demo_pay_result', JSON.stringify(result));
}

/* 商品图片：
 * 商品有 img 文件名 -> 显示 images/ 下的真实图片
 * 没有素材 -> 显示灰色占位图（等素材收集后无需改这里，只改 data.js）
 */
function productImage(p, cls) {
  cls = cls ? ' ' + cls : '';
  if (p.img) {
    return '<img class="p-img' + cls + '" src="images/' + p.img + '" alt="' + p.name + '">';
  }
  return '<div class="ph' + cls + '"><span class="ph-ico">' + Icon.image + '</span></div>';
}

// 右上角购物车小标：点它才把商品加入购物车（点图片本身不加购）
// 角标本身无点击反馈；同容器内带一个绿色蒙版 .add-veil，加购时显示 Added。
// 注意：需放在带 position:relative + overflow:hidden + 圆角 的图片容器里。
function cartCornerButton(p) {
  return '<button type="button" class="cart-corner" data-cart-add="' + p.id + '" aria-label="add to cart"></button>' +
    '<span class="add-veil">Added</span>';
}

/* ---------- 购物车角标（localStorage 跨页面共享） ----------
 * 角标数字直接派生自 CartStore：购物车内所有商品数量之和。
 * 加购、删除、步进器加减都会随之联动，不再维护独立计数器。
 */

function getBadge() {
  return CartStore.init().reduce(function (sum, i) {
    return sum + (Number(i.qty) || 0);
  }, 0);
}

// 已废弃：角标由 CartStore 单一数据源派生，无需手动 +1（保留函数避免旧调用报错）
function addBadge() {}

// 把角标数字渲染到页面所有 [data-badge] 元素上
function renderBadges() {
  var n = getBadge();
  var els = document.querySelectorAll('[data-badge]');
  for (var i = 0; i < els.length; i++) {
    els[i].textContent = n;
    els[i].style.display = n > 0 ? 'flex' : 'none';
  }
}

/* ---------- 底部 Tab 导航 ----------
 * active：当前页面的英文标识 Home / Category / shopping / Order
 */
function renderTabBar(active) {
  var el = document.getElementById('tabbar');
  if (!el) return;
  el.innerHTML = AppData.tabs.map(function (t) {
    var on = t.name === active;
    return '<a class="tab' + (on ? ' active' : '') + '" href="' + t.link + '">' +
      '<span class="ico"><img src="images/' + (on ? t.icoActive : t.ico) +
      '" alt=""></span>' + t.name + '</a>';
  }).join('');
}

/* ---------- 禁止 App 界面选中文本 / 拖拽图片 ----------
 * App 式界面，鼠标按下拖动不应出现文字选中的蓝块
 */
(function () {
  var s = document.createElement('style');
  s.textContent =
    '.app, .app * { -webkit-user-select: none; -moz-user-select: none; user-select: none; }' +
    '.app img { -webkit-user-drag: none; }' +
    // 全局加粗上限：b/strong 浏览器默认 bold(700)，统一压到 600
    '.app b, .app strong, .app b *, .app strong * { font-weight: 600 !important; }';
  document.head.appendChild(s);
})();

/* ---------- PC 端鼠标按住拖拽滚动（横向列表用） ----------
 * 用法：enableDragScroll(document.getElementById('xxx'))
 * 手机端触摸滑动由浏览器原生处理，与此无关
 */
function enableDragScroll(el) {
  var down = false, startX = 0, startScroll = 0, moved = false;

  el.addEventListener('mousedown', function (e) {
    if (e.button !== 0) return; // 只响应鼠标左键
    down = true; moved = false;
    startX = e.pageX;
    startScroll = el.scrollLeft;
  });

  window.addEventListener('mousemove', function (e) {
    if (!down) return;
    var dx = e.pageX - startX;
    if (Math.abs(dx) > 4) moved = true; // 移动超过 4px 视为拖拽，而非点击
    el.scrollLeft = startScroll - dx;
  });

  window.addEventListener('mouseup', function () { down = false; });

  // 拖拽后阻止按钮被误点（如爱心），并阻止图片被拖出幽灵图
  el.addEventListener('click', function (e) {
    if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; }
  }, true);
  el.addEventListener('dragstart', function (e) { e.preventDefault(); });
}

/* ---------- CartStore：跨页面购物车存储（localStorage） ----------
 * 首次访问用 AppData.cart 初始化；搜索页加购、购物车页
 * 勾选/删除都读写这里，保证页面间数据一致。
 */
var CartStore = {
  KEY: 'demo_cart_v1',

  _read: function () {
    try {
      var v = JSON.parse(localStorage.getItem(this.KEY));
      return Array.isArray(v) ? v : null;
    } catch (e) { return null; }
  },

  // 首次进入时用静态数据播种，之后返回存储内容
  init: function () {
    var items = this._read();
    if (items === null) {
      items = AppData.cart.map(function (i) {
        return { id: i.id, qty: i.qty, selected: i.selected };
      });
      this.save(items);
    }
    return items;
  },

  getAll: function () { return this._read() || []; },

  save: function (items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
  },

  // 加入购物车：已存在则数量 +1，并默认勾选
  add: function (id) {
    // 先 init：保证首次访问（还没进过购物车页）时默认种子数据已存在
    var items = this.init();
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].qty += 1;
        items[i].selected = true;
        this.save(items);
        return;
      }
    }
    items.push({ id: id, qty: 1, selected: true });
    this.save(items);
  }
};

/* ---------- CardStore：信用卡额度/欠款持久化（localStorage） ----------
 * 首次访问用 AppData.creditCards 播种；之后一直读存储。
 * 每次用卡支付 -> debt 增加，可用额度减少，跨页面、二次购物都能看到变化。
 */
var CardStore = {
  KEY: 'demo_cards_v1',

  _read: function () {
    try {
      var v = JSON.parse(localStorage.getItem(this.KEY));
      return Array.isArray(v) ? v : null;
    } catch (e) { return null; }
  },

  // 首次进入时用静态信用卡播种，之后返回存储内容
  init: function () {
    var cards = this._read();
    if (cards === null) {
      cards = AppData.creditCards.map(function (c) {
        return { id: c.id, brand: c.brand, label: c.label, limit: c.limit, debt: c.debt, monthlyDebt: c.monthlyDebt };
      });
      this.save(cards);
    }
    return cards;
  },

  save: function (cards) {
    localStorage.setItem(this.KEY, JSON.stringify(cards));
  },

  // 按 id 取一张卡
  get: function (id) {
    var cards = this.init();
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id === id) return cards[i];
    }
    return null;
  },

  // 用卡支付：欠款增加 amount，返回更新后的卡（额度不足返回 null，不扣款）
  charge: function (id, amount) {
    var cards = this.init();
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id === id) {
        if (cards[i].limit - cards[i].debt < amount) return null;
        cards[i].debt = Number((cards[i].debt + amount).toFixed(2));
        // 分期后每月应还款同步增加
        cards[i].monthlyDebt = Number(((cards[i].monthlyDebt || 0) + amount).toFixed(2));
        this.save(cards);
        return cards[i];
      }
    }
    return null;
  }
};

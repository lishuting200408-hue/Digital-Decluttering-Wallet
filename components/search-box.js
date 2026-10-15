/* ============================================================
 * 搜索框组件 SearchBox
 * 用法：SearchBox.mount(document.getElementById('xxx'))
 * 功能：输入内容实时模糊匹配商品名（不区分大小写），
 *       下拉列表最多显示 5 个商品；无结果显示提示。
 * 尺寸：高 46px，宽 100% 自适应父容器
 * 依赖：data.js（AppData.productCatalog）、icons.js（Icon）
 * ============================================================ */
var SearchBox = (function () {

  // 组件样式（全局只注入一次）
  var styleInjected = false;
  function injectStyle() {
    if (styleInjected) return;
    styleInjected = true;
    var s = document.createElement('style');
    s.textContent =
      '.sb-wrap { position: relative; width: 100%; }' +
      '.sb-box {' +
        'width: 100%; height: 46px;' +
        'border: 1.5px solid #ededf0; border-radius: 14px;' +
        'display: flex; align-items: center; gap: 10px;' +
        'padding: 0 14px; background: #fff;' +
      '}' +
      '.sb-wrap.focus .sb-box { border-color: #ff2d55; }' +
      '.sb-ico { width: 20px; height: 20px; color: #aaa; flex-shrink: 0; }' +
      '.sb-ico svg { width: 100%; height: 100%; display: block; }' +
      '.sb-input {' +
        'flex: 1; min-width: 0; height: 100%;' +
        'border: none; outline: none; background: none;' +
        'font-family: inherit; font-size: 15px; color: #1d1d1f;' +
        '-webkit-user-select: text; user-select: text;' +
      '}' +
      '.sb-input::placeholder { color: #aaa; }' +
      '.sb-clear { width: 18px; height: 18px; padding: 0; color: #c4c4cc; flex-shrink: 0; display: none; }' +
      '.sb-clear svg { width: 100%; height: 100%; display: block; }' +
      '.sb-wrap.has-text .sb-clear { display: block; }' +
      '.sb-dropdown {' +
        'position: absolute; top: 52px; left: 0; right: 0;' +
        'background: #fff; border-radius: 14px;' +
        'box-shadow: 0 8px 28px rgba(0,0,0,.12);' +
        'padding: 6px; z-index: 50; display: none;' +
      '}' +
      '.sb-item {' +
        'display: flex; align-items: center; gap: 10px;' +
        'padding: 8px 10px; margin-bottom: 4px; border-radius: 10px; cursor: pointer;' +
      '}' +
      '.sb-item:last-child { margin-bottom: 0; }' +
      '.sb-item:hover { background: #f5f5f7; }' +
      '.sb-item.added {' +
        'justify-content: center; color: #17b679;' +
        'font-size: 13.5px; font-weight: 600;' +
      '}' +
      '.sb-item-img {' +
        'width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;' +
        'object-fit: cover;' +
      '}' +
      '.sb-ph { background: #f5f5f7; display: flex; align-items: center; justify-content: center; }' +
      '.sb-ph-ico { width: 18px; height: 18px; color: #d3d3d8; }' +
      '.sb-ph-ico svg { width: 100%; height: 100%; display: block; }' +
      '.sb-item-name {' +
        'flex: 1; min-width: 0; font-size: 13.5px; color: #1d1d1f;' +
        'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' +
      '}' +
      '.sb-item-price { font-size: 13px; font-weight: 600; color: #1d1d1f; flex-shrink: 0; }' +
      '.sb-empty { padding: 18px 10px; text-align: center; color: #aaa; font-size: 13px; }';
    document.head.appendChild(s);
  }

  function formatPrice(n) {
    return '$' + Number(n).toFixed(2);
  }

  // 模糊匹配商品名，最多返回 5 个
  function searchProducts(keyword) {
    var kw = keyword.trim().toLowerCase();
    if (!kw) return [];
    var out = [];
    for (var i = 0; i < AppData.productCatalog.length; i++) {
      var list = AppData.productCatalog[i].products;
      for (var j = 0; j < list.length; j++) {
        if (list[j].name.toLowerCase().indexOf(kw) !== -1) {
          out.push(list[j]);
          if (out.length >= 5) return out;
        }
      }
    }
    return out;
  }

  // 结果项缩略图：有素材显示图片，没有显示占位
  function itemImage(p) {
    if (p.img) {
      return '<img class="sb-item-img" src="images/' + p.img + '" alt="">';
    }
    return '<span class="sb-item-img sb-ph"><span class="sb-ph-ico">' + Icon.image + '</span></span>';
  }

  // 挂载到指定容器
  // options.onSelect(p)：点击结果项时回调（例如加入购物车）
  function mount(el, options) {
    options = options || {};
    injectStyle();
    el.innerHTML =
      '<div class="sb-wrap">' +
        '<div class="sb-box">' +
          '<span class="sb-ico">' + Icon.search + '</span>' +
          '<input class="sb-input" type="text" placeholder="Search here ..." autocomplete="off">' +
          '<button type="button" class="sb-clear" aria-label="clear">' + Icon.close + '</button>' +
        '</div>' +
        '<div class="sb-dropdown"></div>' +
      '</div>';

    var wrap = el.querySelector('.sb-wrap');
    var input = el.querySelector('.sb-input');
    var dropdown = el.querySelector('.sb-dropdown');
    var blurTimer = null;

    function renderList() {
      var hasText = input.value.trim() !== '';
      wrap.classList.toggle('has-text', hasText);
      if (!hasText) {
        wrap.classList.remove('open');
        dropdown.innerHTML = '';
        return;
      }

      var results = searchProducts(input.value);
      if (results.length === 0) {
        dropdown.innerHTML = '<div class="sb-empty">No matching products</div>';
      } else {
        dropdown.innerHTML = results.map(function (p) {
          return '<div class="sb-item" data-id="' + p.id + '">' +
            itemImage(p) +
            '<span class="sb-item-name">' + p.name + '</span>' +
            '<span class="sb-item-price">' + formatPrice(p.price) + '</span>' +
          '</div>';
        }).join('');
      }
      wrap.classList.add('open');
      dropdown.style.display = 'block';
    }

    function closeList() {
      wrap.classList.remove('open');
      dropdown.style.display = '';
    }

    // 输入实时搜索
    input.addEventListener('input', renderList);
    input.addEventListener('focus', function () {
      wrap.classList.add('focus');
      if (input.value.trim()) renderList();
    });
    // 失焦延迟关闭，给结果项点击留时间（点击下拉项时不关闭）
    var suppressBlurClose = false;
    input.addEventListener('blur', function () {
      wrap.classList.remove('focus');
      // 失焦是由点击下拉项引起的：保留下拉，不启动关闭定时器
      if (suppressBlurClose) { suppressBlurClose = false; return; }
      blurTimer = setTimeout(closeList, 160);
    });

    // 清除按钮
    el.querySelector('.sb-clear').addEventListener('click', function () {
      input.value = '';
      dropdown.innerHTML = '';
      wrap.classList.remove('has-text');
      closeList();
      input.focus();
    });

    // 鼠标在下拉项按下时：标记本次失焦不要关闭下拉（不阻止默认行为，保证 click 正常触发）
    dropdown.addEventListener('mousedown', function () {
      suppressBlurClose = true;
      if (blurTimer) { clearTimeout(blurTimer); blurTimer = null; }
    });

    // 点击搜索框组件以外的区域：关闭下拉
    // （点过下拉项后 input 已失焦，此后点空白处不会再触发 blur，需由此兜底）
    document.addEventListener('mousedown', function (e) {
      if (!wrap.contains(e.target)) closeList();
    });

    // 点击结果项：执行 onSelect 回调（加入购物车），不回填输入框
    var lastSelectId = null, lastSelectAt = 0;
    function handleSelect(itemEl) {
      var id = itemEl.getAttribute('data-id');
      var now = Date.now();
      // 同一次物理点击会先后触发 pointerup 和 click：500ms 内同一商品的
      // 第二次事件视为重复事件丢弃；用户间隔后的再次点击不受影响（允许重复添加）
      if (id === lastSelectId && now - lastSelectAt < 500) return;
      lastSelectId = id; lastSelectAt = now;

      var p = getProduct(id);
      if (!p) return;
      if (typeof options.onSelect === 'function') options.onSelect(p);

      // 双保险：清掉任何待执行的关闭，保持搜索结果展开
      if (blurTimer) { clearTimeout(blurTimer); blurTimer = null; }
      dropdown.style.display = 'block';
      wrap.classList.add('open');

      // 短暂显示 Added to cart ✓，1 秒后恢复（连续点击时刷新计时，不影响加购）
      var origHtml = itemEl.classList.contains('added')
        ? itemEl._origHtml : itemEl.innerHTML;
      itemEl._origHtml = origHtml;
      itemEl.classList.add('added');
      itemEl.textContent = 'Added to cart ✓';
      if (itemEl._fbTimer) clearTimeout(itemEl._fbTimer);
      itemEl._fbTimer = setTimeout(function () {
        itemEl.classList.remove('added');
        itemEl.innerHTML = itemEl._origHtml;
      }, 1000);
    }

    // pointerup：鼠标 / 触摸 / 触控板都会触发
    // 记录本次手势真正命中的商品，供 click 核对，防止交界处
    // pointerup 命中 A、合成 click 却落在相邻的 B 上导致两件同时加购
    var gestureId = null, gestureAt = 0;
    dropdown.addEventListener('pointerup', function (e) {
      var item = e.target.closest('.sb-item');
      if (item) {
        gestureId = item.getAttribute('data-id');
        gestureAt = Date.now();
        handleSelect(item);
      }
    });

    // click：兜底（键盘/部分合成点击只产生 click）
    dropdown.addEventListener('click', function (e) {
      var item = e.target.closest('.sb-item');
      if (!item) return;
      var id = item.getAttribute('data-id');
      // 紧跟在一次 pointer 手势之后、但命中了另一个商品：
      // 这是交界处错位的合成事件，丢弃（键盘/普通点击不受影响）
      if (gestureId && id !== gestureId && Date.now() - gestureAt < 500) return;
      handleSelect(item);
    });

    return { input: input, search: searchProducts };
  }

  return { mount: mount };
})();

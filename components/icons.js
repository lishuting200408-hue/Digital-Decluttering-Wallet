/* ============================================================
 * 图标库（内联 SVG，不依赖任何图片文件）
 * 用法：Icon.search、Icon.cart ...
 * 图标颜色跟随 CSS 的 color 属性（currentColor）
 * ============================================================ */

var Icon = (function () {

  // 统一的 SVG 外壳
  function svg(inner, filled) {
    return '<svg viewBox="0 0 24 24" fill="' + (filled ? 'currentColor' : 'none') +
      '" stroke="' + (filled ? 'none' : 'currentColor') +
      '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }

  return {
    // 放大镜
    search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),

    // 购物车
    cart: svg('<circle cx="9" cy="20.5" r="1.2"/><circle cx="18" cy="20.5" r="1.2"/>' +
      '<path d="M2.5 3.5h2l2.3 12.4a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.3L21 7.5H6"/>'),

    // 铃铛
    bell: svg('<path d="M18 8.5a6 6 0 0 0-12 0c0 6.5-2.5 7.5-2.5 7.5h17S18 15 18 8.5z"/>' +
      '<path d="M13.7 18.8a2 2 0 0 1-3.4 0"/>'),

    // 返回箭头
    back: svg('<path d="m14.5 18-6-6 6-6"/>'),

    // 向右箭头
    right: svg('<path d="m9.5 6 6 6-6 6"/>'),

    // 爱心（空心）
    heart: svg('<path d="M19.6 4.8a5.4 5.4 0 0 0-7.6 0L12 4.8l-1-.05a5.4 5.4 0 0 0-7.6 7.6l1.1 1.1L12 20.4l7.5-7 1.1-1a5.4 5.4 0 0 0-1-7.6z"/>'),

    // 爱心（实心底色，CSS 控制颜色）
    heartFilled: svg('<path d="M19.6 4.8a5.4 5.4 0 0 0-7.6 0L12 4.8l-1-.05a5.4 5.4 0 0 0-7.6 7.6l1.1 1.1L12 20.4l7.5-7 1.1-1a5.4 5.4 0 0 0-1-7.6z"/>', true),

    // 关闭 X
    close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),

    // 勾选
    check: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),

    // 图片占位（山 + 太阳）
    image: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/>' +
      '<circle cx="8.8" cy="8.8" r="1.4"/>' +
      '<path d="m20.5 15.5-5-5L4 22"/>'),

    // 房子
    home: svg('<path d="m3.5 10 8.5-7 8.5 7"/>' +
      '<path d="M5.5 9v10a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5V9"/>' +
      '<path d="M9.5 20.5v-6h5v6"/>'),

    // 九宫格
    grid: svg('<rect x="3" y="3" width="18" height="18" rx="2.2"/>' +
      '<path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>'),

    // 订单 / 清单
    order: svg('<path d="M6 2.8h9.5L20 7.3v13a1.4 1.4 0 0 1-1.4 1.4H6A1.4 1.4 0 0 1 4.6 20.3V4.2A1.4 1.4 0 0 1 6 2.8z"/>' +
      '<path d="M15 2.8v4.5h4.5"/>' +
      '<path d="M8.5 12h7M8.5 16h7"/>'),

    // 四瓣花（分类页 All 图标）
    flower: svg('<circle cx="12" cy="6.6" r="3"/><circle cx="17.4" cy="12" r="3"/>' +
      '<circle cx="12" cy="17.4" r="3"/><circle cx="6.6" cy="12" r="3"/>', true),

    // 四芒星（优惠券）
    sparkle: svg('<path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z"/>', true),

    // 定位靶心
    crosshair: svg('<circle cx="12" cy="12" r="6.6"/>' +
      '<path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/>' +
      '<circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>'),

    // 锁
    lock: svg('<rect x="5" y="10.5" width="14" height="9.5" rx="2"/>' +
      '<path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>')
  };
})();

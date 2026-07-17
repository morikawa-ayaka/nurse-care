/*
 * 商品を編集するファイルです。
 * price は数字だけ、colors と sizes は ["項目1", "項目2"] の形で入力します。
 */
window.PRODUCTS = [
  { id: 1, name: "Airy Walk ナースシューズ", category: "ナースシューズ", price: 4980, tag: "人気 No.1", description: "軽量エアクッションで、一日中歩く足元をやさしく支えます。", colors: ["ホワイト", "ピンクベージュ"], sizes: ["22.5", "23.0", "23.5", "24.0", "24.5"], art: "shoe" },
  { id: 2, name: "Daily Fit 着圧ソックス", category: "着圧ソックス", price: 1980, tag: "日勤におすすめ", description: "立ち仕事の日に。ほどよい着圧感で勤務中の足元をサポート。", colors: ["ホワイト", "ブラック", "ネイビー"], sizes: ["S-M", "M-L"], art: "socks" },
  { id: 3, name: "Night Ease 着圧ソックス", category: "着圧ソックス", price: 2180, tag: "夜勤におすすめ", description: "長時間でも取り入れやすい、やさしい着圧設計。", colors: ["グレー", "ネイビー", "ブラック"], sizes: ["S-M", "M-L"], art: "socks night" },
  { id: 4, name: "Cloud Step インソール", category: "インソール", price: 1480, tag: "ふんわりクッション", description: "足裏全体を包む、やわらかなクッションインソール。", colors: ["ベージュ"], sizes: ["S", "M", "L"], art: "insole" },
  { id: 5, name: "Breeze Fit ナースシューズ", category: "ナースシューズ", price: 5280, tag: "通気性タイプ", description: "軽やかなメッシュ素材で、蒸れが気になる勤務日に。", colors: ["ホワイト", "ライトグレー"], sizes: ["22.5", "23.0", "23.5", "24.0", "24.5"], art: "shoe breeze" },
  { id: 6, name: "Heel Hug パッド", category: "靴ずれ対策", price: 780, tag: "新人さんにも", description: "かかとにそっとフィットするサイズ調整パッド。", colors: ["ベージュ"], sizes: ["フリー"], art: "pad" },
  { id: 7, name: "Fresh Shoe 除湿ケア", category: "消臭・除湿", price: 980, tag: "繰り返し使える", description: "勤務後のシューズに入れるだけの消臭・除湿ケア。", colors: ["ピンク", "グレー"], sizes: ["フリー"], art: "fresh" },
  { id: 8, name: "Rest Foot リフレッシュシート", category: "フットケア", price: 880, tag: "勤務後のご褒美", description: "頑張った日の足元を、ひんやり心地よく包みます。", colors: ["ラベンダー"], sizes: ["6枚入り"], art: "care" }
];

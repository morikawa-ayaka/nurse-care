/* Nurse care の画面と操作をまとめたファイルです。外部ライブラリは使っていません。 */
const products = window.PRODUCTS;
const app = document.querySelector("#app");
const state = { page: "home", category: "", selected: 1, favorites: [], cart: {}, color: "", size: "", checkoutStep: 1, menu: false };

const money = (number) => `${number.toLocaleString("ja-JP")}円（税込）`;
const productById = (id) => products.find((product) => product.id === Number(id));
const cartCount = () => Object.values(state.cart).reduce((sum, quantity) => sum + quantity, 0);
const colorTone = (color = "") => color.includes("ピンク") ? "pink" : color.includes("ネイビー") ? "navy" : color.includes("ブラック") ? "black" : color.includes("グレー") ? "gray" : color.includes("ラベンダー") ? "lavender" : color.includes("ベージュ") ? "beige" : "white";

const productImages = {
  shoe: { "ホワイト": "images/product-shoe.png", "ピンクベージュ": "images/product-shoe-pink-beige.png" },
  socks: { "ホワイト": "images/product-day-socks.png", "ブラック": "images/product-day-socks-black.png", "ネイビー": "images/product-day-socks-navy.png" },
  "socks night": { "グレー": "images/product-night-socks.png", "ネイビー": "images/product-night-socks-navy.png", "ブラック": "images/product-night-socks-black.png" },
  insole: { "ベージュ": "images/product-insole.png" },
  "shoe breeze": { "ホワイト": "images/product-breeze-shoe-white.png", "ライトグレー": "images/product-breeze-shoe-light-gray.png" },
  fresh: { "ピンク": "images/product-fresh-pink.png", "グレー": "images/product-fresh-gray.png" }
};

function productArt(type, large = false, tone = "") {
  const images = productImages[type];
  if (!images) return `<div class="product-art ${type} ${large ? "large" : ""}" role="img" aria-label="商品イメージ"><span></span><i></i></div>`;
  const active = images[tone] || Object.values(images)[0];
  return `<div class="product-art ${type} photo ${large ? "large" : ""}" role="img" aria-label="${tone || "商品"}の商品イメージ">${Object.values(images).map((image) => `<div class="product-photo-layer ${image === active ? "active" : ""}" style="background-image:url('${image}')"></div>`).join("")}</div>`;
}

function header() {
  return `<div class="notice">本サイトはポートフォリオ用の架空ECサイトです　<span>5,000円以上で送料無料</span></div>
  <header class="header"><button class="logo" data-page="home"><b>Nurse care</b><small>看護師の足元を守るフットケア専門店</small></button>
  <nav class="${state.menu ? "open" : ""}"><button data-page="home">ホーム</button><button data-page="products">商品一覧</button><button data-page="about">私たちについて</button></nav>
  <div class="actions"><button aria-label="検索">⌕</button><button aria-label="お気に入り">♡</button><button class="cart-icon" data-page="cart" aria-label="ショッピングカート ${cartCount()}点"><svg class="cart-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.4 8H6.1M9.5 20a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Zm8 0a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z"></path></svg><em>${cartCount()}</em></button><button class="menu" data-action="menu" aria-label="メニュー">${state.menu ? "×" : "☰"}</button></div></header>`;
}

function footer() {
  return `<footer><div class="footer-brand"><b>Nurse care</b><p>勤務中も、勤務が終わった後も。<br>毎日頑張る看護師の足元に、やさしい選択を。</p></div><div><b>商品を探す</b><button data-page="products">商品一覧</button><button data-page="concerns">悩みから探す</button><button>セット商品</button></div><div><b>サポート</b><button>ご利用ガイド</button><button>配送・送料</button><button>返品・サイズ交換</button></div><div><b>ショップ情報</b><button data-page="about">Nurse careについて</button><button>コラム</button><button>お問い合わせ</button></div><p class="copyright">© 2026 Nurse care — Portfolio demo site</p></footer>`;
}

function productCard(product) {
  return `<article class="product-card"><div class="art-wrap"><span class="tag">${product.tag}</span><button class="heart ${state.favorites.includes(product.id) ? "active" : ""}" data-favorite="${product.id}" aria-label="お気に入り">♡</button>${productArt(product.art)}</div><p class="category">${product.category}</p><h3>${product.name}</h3><p>${product.description}</p><b class="price">${money(product.price)}</b><button class="text-link" data-product="${product.id}">商品を見る →</button></article>`;
}

function homePage() {
  const concerns = [["長時間立つと足がつらい","一日中歩く足元に"],["足裏やかかとが気になる","やわらかなクッションを"],["脚の重さが気になる","勤務時間に合わせたケア"],["靴ずれが気になる","足にやさしくフィット"],["蒸れ・においが気になる","シューズをもっと快適に"],["勤務後にケアしたい","頑張った足をいたわる"]];
  return `<section class="hero"><div class="hero-copy"><p class="eyebrow">FOR YOUR EVERY STEP</p><h1>毎日立ち続ける、<br><em>看護師の足元</em>を守る。</h1><p>立つ、歩く、走る。<br>長時間勤務を頑張る看護師のために、<br>足元を支える商品を集めました。</p><div class="hero-buttons"><button class="primary" data-category="ナースシューズ">ナースシューズを見る</button><button class="secondary" data-category="着圧ソックス">着圧ソックスを見る</button></div></div><div class="hero-photo" role="img" aria-label="明るい病院内をナースシューズで歩く看護師"><span>やさしさを、足元から。</span></div></section>
  <section class="features"><article><i>01</i><h3>看護師の足元に特化</h3><p>長時間立ち続ける働き方を考えた商品を提案します。</p></article><article><i>02</i><h3>勤務中から勤務後まで</h3><p>働く時間も、自分をいたわる時間も支えます。</p></article><article><i>03</i><h3>悩みから選べる</h3><p>商品名が分からなくても、悩みから探せます。</p></article></section>
  <section class="section concerns"><div class="section-head"><div><p class="eyebrow">FIND YOUR CARE</p><h2>足元の悩みから探す</h2></div><button class="text-link" data-page="concerns">すべての悩みを見る →</button></div><div class="concern-grid">${concerns.map((item, index) => `<button data-page="concerns"><i>${["♢","◌","♧","⌁","○","♡"][index]}</i><span>${item[0]}</span><small>${item[1]}</small></button>`).join("")}</div></section>
  <section class="section products-section"><div class="section-head"><div><p class="eyebrow">OUR FAVORITES</p><h2>Nurse careのおすすめ商品</h2></div><button class="text-link" data-page="products">商品一覧を見る →</button></div><div class="product-grid">${products.slice(0,4).map(productCard).join("")}</div></section>
  <section class="shoe-feature"><div class="feature-art">${productArt("shoe", true)}</div><div><p class="eyebrow">AIR CUSHION SHOES</p><h2>一日中歩く足に、<br>軽さとクッションを。</h2><p>病棟内を何度も行き来する一日。軽量設計とかかとのエアクッションが、一歩一歩をやさしく支えます。</p><ul><li>軽量設計</li><li>滑りにくい靴底</li><li>通気性素材</li><li>脱ぎ履きしやすい</li></ul><button class="primary" data-product="1">詳しく見る</button></div></section>
  <section class="story"><div><p class="eyebrow">OUR STORY</p><h2>看護師の足元を、<br>もっと大切にしたい。</h2></div><div><p>患者さんのケアや記録を優先し、自分自身の足元をいたわることは、どうしても後回しになりがちです。</p><p>Nurse careは、毎日現場で働く看護師が、自分の足を大切にするきっかけを届けたいという思いから生まれました。</p><button class="text-link" data-page="about">私たちについて →</button></div></section>`;
}

function productsPage() {
  const categories = ["すべて","ナースシューズ","着圧ソックス","インソール","靴ずれ対策","消臭・除湿","フットケア"];
  const visible = !state.category || state.category === "すべて" ? products : products.filter((product) => product.category === state.category);
  return `<main class="page"><p class="breadcrumb">ホーム　/　商品一覧</p><div class="page-title"><p class="eyebrow">ALL PRODUCTS</p><h1>商品一覧</h1><p>勤務中に使うナースシューズから、勤務後のフットケア用品まで。<br>看護師の足元を支える商品を揃えました。</p></div><div class="filters">${categories.map((category) => `<button class="${(state.category || "すべて") === category ? "active" : ""}" data-filter="${category}">${category}</button>`).join("")}</div><div class="result-row"><b>${visible.length} items</b><select aria-label="並び替え"><option>おすすめ順</option><option>価格の安い順</option><option>新着順</option></select></div><div class="product-grid">${visible.map(productCard).join("")}</div></main>`;
}

function detailPage() {
  const product = productById(state.selected); state.color ||= product.colors[0]; state.size ||= product.sizes[0];
  return `<main class="page"><p class="breadcrumb">ホーム　/　${product.category}　/　${product.name}</p><section class="detail"><div class="detail-images"><div class="main-image">${productArt(product.art,true,state.color)}</div><div class="thumbs"><button>${productArt(product.art,false,state.color)}</button><button>DETAIL</button><button>STYLE</button></div></div><div class="detail-info"><span class="tag inline">${product.tag}</span><p class="category">${product.category}</p><h1>${product.name}</h1><p class="lead">${product.description}</p><div class="rating">★★★★★ <span>4.8（24件）</span></div><b class="detail-price">${money(product.price)}</b><hr><label>カラー　<b>${state.color}</b></label><div class="choices color-choices">${product.colors.map((color) => `<button class="${state.color === color ? "active" : ""}" data-color="${color}"><span class="color-swatch swatch-${colorTone(color)}"></span>${color}</button>`).join("")}</div><label>サイズ　<b>${state.size}</b></label><div class="choices">${product.sizes.map((size) => `<button class="${state.size === size ? "active" : ""}" data-size="${size}">${size}</button>`).join("")}</div><button class="size-guide">サイズ選びガイドを見る →</button><div class="buy-row"><button class="primary add" data-add="${product.id}">カートに入れる</button><button class="fav ${state.favorites.includes(product.id) ? "active" : ""}" data-favorite="${product.id}">♡</button></div><p class="shipping">✓ 5,000円以上で送料無料　　✓ 初回サイズ交換無料</p></div></section><section class="description"><p class="eyebrow">DESIGNED FOR NURSES</p><h2>忙しい一日の足元に、<br>やさしい心地よさを。</h2><div class="description-grid"><article><b>01</b><h3>長時間使いやすい</h3><p>立つ、歩くが続く勤務を想定し、毎日の使いやすさを大切にしています。</p></article><article><b>02</b><h3>シンプルなお手入れ</h3><p>忙しい日々にも取り入れやすい、扱いやすい素材と設計です。</p></article><article><b>03</b><h3>勤務に馴染むデザイン</h3><p>医療現場で使いやすい、清潔感のある落ち着いたカラーです。</p></article></div></section></main>`;
}

function concernsPage() {
  const items = [{t:"長時間立つと足がつらい",d:"クッション性や軽さを意識したアイテムで、一日中歩く足元を支えます。",c:"ナースシューズ"},{t:"足裏やかかとが気になる",d:"足裏をやわらかく包むインソールやパッドを選びました。",c:"インソール"},{t:"脚の重さが気になる",d:"勤務時間に合わせて選べる着圧ソックスで足元をサポート。",c:"着圧ソックス"},{t:"靴ずれが気になる",d:"サイズ調整や摩擦対策に取り入れやすいアイテムです。",c:"靴ずれ対策"},{t:"蒸れ・においが気になる",d:"通気性と勤務後のシューズケアを、無理なく習慣に。",c:"消臭・除湿"},{t:"勤務後に足をいたわりたい",d:"頑張った日の終わりに、自分をいたわるフットケアを。",c:"フットケア"}];
  return `<main class="page concern-page"><div class="page-title"><p class="eyebrow">FIND YOUR CARE</p><h1>足元の悩みから探す</h1><p>「どの商品を選べばいいか分からない」そんなときは、<br>今感じていることから、あなたに合う足元ケアを探してみてください。</p></div><div class="concern-list">${items.map((item,index) => `<article><span>0${index+1}</span><div><h2>${item.t}</h2><p>${item.d}</p></div><button class="secondary" data-category="${item.c}">おすすめ商品を見る →</button></article>`).join("")}</div><p class="care-note">※ 本サイトの商品は、疾病の診断・治療・予防を目的としたものではありません。日々の快適な勤務とセルフケアを支える商品としてご紹介しています。</p></main>`;
}

function aboutPage() { return `<main class="about-page"><section class="about-hero"><p class="eyebrow">ABOUT NURSE CARE</p><h1>看護師の足元を、<br>もっと大切にしたい。</h1><p>忙しい毎日の中で、いつも後回しになってしまう自分自身のこと。<br>Nurse careは、そんな看護師の足元に寄り添うためのショップです。</p></section><section class="about-story"><div class="quote">“<br><b>勤務が終わる頃には、<br>足が重く感じる。</b><br>それは、いつしか<br>当たり前になっていました。</div><div><p>看護師として働く中で、長時間の立ち仕事や病棟内の移動によって、勤務が終わる頃には足がつらいと感じることが何度もありました。</p><p>けれど、患者さんのケアや記録業務を優先し、自分の足元をいたわることは後回しになりがちです。</p><p>だからこそ、勤務中に使うものから、帰宅後のセルフケアまで、看護師の働き方に寄り添って選べる場所をつくりたいと考えました。</p></div></section><section class="values"><p class="eyebrow">OUR STANDARD</p><h2>商品選びで大切にしていること</h2><div>${["長時間使いやすいこと","看護師の勤務に取り入れやすいこと","お手入れがしやすいこと","シンプルで使いやすいこと","商品情報が分かりやすいこと"].map((text,index) => `<article><span>0${index+1}</span><b>${text}</b></article>`).join("")}</div></section></main>`; }

function cartPage() {
  const lines = Object.entries(state.cart).filter(([,quantity]) => quantity > 0); const subtotal = lines.reduce((sum,[id,quantity]) => sum + productById(id).price * quantity, 0); const shipping = subtotal >= 5000 ? 0 : 550;
  if (!lines.length) return `<main class="page cart-page"><div class="page-title"><p class="eyebrow">YOUR CART</p><h1>ショッピングカート</h1></div><div class="empty"><p>カートは空です。</p><button class="primary" data-page="products">商品を探す</button></div></main>`;
  return `<main class="page cart-page"><div class="page-title"><p class="eyebrow">YOUR CART</p><h1>ショッピングカート</h1></div><div class="cart-layout"><div class="cart-lines">${lines.map(([id,quantity]) => { const product=productById(id); return `<article>${productArt(product.art)}<div><p class="category">${product.category}</p><h3>${product.name}</h3><p>カラー：${product.colors[0]}　サイズ：${product.sizes[0]}</p><b>${money(product.price)}</b></div><div class="qty"><button data-quantity="${id}" data-change="-1">−</button><span>${quantity}</span><button data-quantity="${id}" data-change="1">＋</button></div></article>`; }).join("")}</div><aside class="summary"><h2>ご注文内容</h2><p>商品小計 <b>${money(subtotal)}</b></p><p>送料 <b>${shipping ? "550円" : "無料"}</b></p><hr><p class="total">合計 <b>${money(subtotal+shipping)}</b></p><button class="primary" data-page="checkout">購入手続きへ</button><small>実際の決済は行われません</small></aside></div></main>`;
}

function checkoutPage() {
  const subtotal=Object.entries(state.cart).reduce((sum,[id,quantity]) => sum+productById(id).price*quantity,0); const total=subtotal+(subtotal>=5000?0:550);
  if(state.checkoutStep===3) return `<main class="complete"><span>✓</span><p class="eyebrow">THANK YOU</p><h1>ご注文ありがとうございます</h1><p>架空の注文手続きが完了しました。<br>実際の注文・決済・商品の発送は行われません。</p><div><small>注文番号</small><b>NC-20260716-001</b></div><button class="primary" data-page="home">トップページへ戻る</button></main>`;
  const body=state.checkoutStep===1 ? `<h1>購入手続き</h1><form id="checkout-form"><label>お名前<span>必須</span><input required placeholder="山田 花子"></label><div class="form-row"><label>郵便番号<span>必須</span><input required placeholder="123-4567"></label><label>電話番号<span>必須</span><input required placeholder="090-1234-5678"></label></div><label>住所<span>必須</span><input required placeholder="東京都〇〇区〇〇 1-2-3"></label><label>メールアドレス<span>必須</span><input required type="email" placeholder="sample@example.com"></label><label>お支払い方法<select><option>クレジットカード（デモ）</option><option>代金引換（デモ）</option></select></label><button class="primary" type="submit">注文内容を確認する</button></form>` : `<div class="confirm"><h1>注文内容の確認</h1><div class="confirm-box"><p>商品合計 <b>${money(subtotal)}</b></p><p>送料 <b>${subtotal>=5000?"無料":"550円"}</b></p><hr><p class="total">お支払い合計 <b>${money(total)}</b></p></div><button class="primary" data-checkout="3">注文を確定する（デモ）</button><button class="text-link" data-checkout="1">入力画面に戻る</button></div>`;
  return `<main class="page checkout"><div class="demo-alert">こちらはポートフォリオ用のデモ画面です。入力内容は送信・保存されません。</div><div class="steps"><b class="${state.checkoutStep===1?"active":""}">1 お客様情報</b><i></i><b class="${state.checkoutStep===2?"active":""}">2 注文確認</b><i></i><b>3 完了</b></div>${body}</main>`;
}

function render() {
  const pages={home:homePage,products:productsPage,detail:detailPage,concerns:concernsPage,about:aboutPage,cart:cartPage,checkout:checkoutPage};
  document.title=`${state.page==="home"?"Nurse care":state.page==="products"?"商品一覧":state.page==="detail"?productById(state.selected).name:state.page==="concerns"?"悩みから探す":state.page==="about"?"私たちについて":"ご購入手続き"} | Nurse care`;
  app.innerHTML=header()+pages[state.page]()+ (state.page!=="checkout"?footer():"");
}

function navigate(page,category="") { state.page=page; state.category=category; state.menu=false; window.scrollTo({top:0,behavior:"smooth"}); render(); }

app.addEventListener("click",(event)=>{
  const target=event.target.closest("button"); if(!target)return;
  if(target.dataset.page) navigate(target.dataset.page);
  if(target.dataset.category) navigate("products",target.dataset.category);
  if(target.dataset.product){const product=productById(target.dataset.product);state.selected=product.id;state.color=product.colors[0];state.size=product.sizes[0];navigate("detail");}
  if(target.dataset.favorite){const id=Number(target.dataset.favorite);state.favorites=state.favorites.includes(id)?state.favorites.filter(item=>item!==id):[...state.favorites,id];render();}
  if(target.dataset.filter!==undefined){state.category=target.dataset.filter;render();}
  if(target.dataset.color){state.color=target.dataset.color;render();}
  if(target.dataset.size){state.size=target.dataset.size;render();}
  if(target.dataset.add){const id=Number(target.dataset.add);state.cart[id]=(state.cart[id]||0)+1;target.textContent="カートに追加しました ✓";setTimeout(render,1200);}
  if(target.dataset.quantity){const id=Number(target.dataset.quantity);state.cart[id]=Math.max(0,(state.cart[id]||0)+Number(target.dataset.change));render();}
  if(target.dataset.checkout){state.checkoutStep=Number(target.dataset.checkout);render();}
  if(target.dataset.action==="menu"){state.menu=!state.menu;render();}
});

app.addEventListener("submit",(event)=>{if(event.target.id==="checkout-form"){event.preventDefault();state.checkoutStep=2;render();}});
render();

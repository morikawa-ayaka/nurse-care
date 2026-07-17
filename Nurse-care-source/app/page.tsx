"use client";

import { type Dispatch, type ReactNode, type SetStateAction, useEffect, useMemo, useState } from "react";

type Product = {
  id: number; name: string; category: string; price: number; tag: string;
  description: string; colors: string[]; sizes: string[]; art: string; rank?: number;
};

const products: Product[] = [
  { id: 1, name: "Airy Walk ナースシューズ", category: "ナースシューズ", price: 4980, tag: "人気 No.1", description: "軽量エアクッションで、一日中歩く足元をやさしく支えます。", colors: ["ホワイト", "ピンクベージュ"], sizes: ["22.5", "23.0", "23.5", "24.0", "24.5"], art: "shoe", rank: 1 },
  { id: 2, name: "Daily Fit 着圧ソックス", category: "着圧ソックス", price: 1980, tag: "日勤におすすめ", description: "立ち仕事の日に。ほどよい着圧感で勤務中の足元をサポート。", colors: ["ホワイト", "ブラック", "ネイビー"], sizes: ["S-M", "M-L"], art: "socks", rank: 2 },
  { id: 3, name: "Night Ease 着圧ソックス", category: "着圧ソックス", price: 2180, tag: "夜勤におすすめ", description: "長時間でも取り入れやすい、やさしい着圧設計。", colors: ["グレー", "ネイビー", "ブラック"], sizes: ["S-M", "M-L"], art: "socks night" },
  { id: 4, name: "Cloud Step インソール", category: "インソール", price: 1480, tag: "ふんわりクッション", description: "足裏全体を包む、やわらかなクッションインソール。", colors: ["ベージュ"], sizes: ["S", "M", "L"], art: "insole", rank: 3 },
  { id: 5, name: "Breeze Fit ナースシューズ", category: "ナースシューズ", price: 5280, tag: "通気性タイプ", description: "軽やかなメッシュ素材で、蒸れが気になる勤務日に。", colors: ["ホワイト", "ライトグレー"], sizes: ["22.5", "23.0", "23.5", "24.0", "24.5"], art: "shoe breeze" },
  { id: 6, name: "Heel Hug パッド", category: "靴ずれ対策", price: 780, tag: "新人さんにも", description: "かかとにそっとフィットするサイズ調整パッド。", colors: ["ベージュ"], sizes: ["フリー"], art: "pad" },
  { id: 7, name: "Fresh Shoe 除湿ケア", category: "消臭・除湿", price: 980, tag: "繰り返し使える", description: "勤務後のシューズに入れるだけの消臭・除湿ケア。", colors: ["ピンク", "グレー"], sizes: ["フリー"], art: "fresh" },
  { id: 8, name: "Rest Foot リフレッシュシート", category: "フットケア", price: 880, tag: "勤務後のご褒美", description: "頑張った日の足元を、ひんやり心地よく包みます。", colors: ["ラベンダー"], sizes: ["6枚入り"], art: "care" },
];

const money = (n: number) => `${n.toLocaleString("ja-JP")}円（税込）`;
type Navigate = (page: string, category?: string) => void;
type CatalogProps = {
  openProduct: (id: number) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
};
type ProductMap = Record<string, Product>;

const colorTone = (color = "") => {
  if (color.includes("ピンク")) return "pink";
  if (color.includes("ネイビー")) return "navy";
  if (color.includes("ブラック")) return "black";
  if (color.includes("グレー")) return "gray";
  if (color.includes("ラベンダー")) return "lavender";
  if (color.includes("ベージュ")) return "beige";
  return "white";
};

function CartIcon() {
  return <svg className="cart-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.4 8H6.1M9.5 20a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Zm8 0a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z" /></svg>;
}

function ProductArt({ type, large = false, tone = "white" }: { type: string; large?: boolean; tone?: string }) {
  const productImages: Record<string, Record<string, string>> = {
    shoe: { "ホワイト": "/product-shoe.png", "ピンクベージュ": "/product-shoe-pink-beige.png" },
    socks: { "ホワイト": "/product-day-socks.png", "ブラック": "/product-day-socks-black.png", "ネイビー": "/product-day-socks-navy.png" },
    "socks night": { "グレー": "/product-night-socks.png", "ネイビー": "/product-night-socks-navy.png", "ブラック": "/product-night-socks-black.png" },
    insole: { "ベージュ": "/product-insole.png" },
    "shoe breeze": { "ホワイト": "/product-breeze-shoe-white.png", "ライトグレー": "/product-breeze-shoe-light-gray.png" },
    fresh: { "ピンク": "/product-fresh-pink.png", "グレー": "/product-fresh-gray.png" },
  };
  const imageSet = productImages[type];
  const activeImage = imageSet?.[tone] ?? (imageSet ? Object.values(imageSet)[0] : "");
  return <div className={`product-art ${type} ${imageSet ? "photo" : ""} ${large ? "large" : ""}`} role="img" aria-label={`${tone}の商品イメージ`}>{imageSet ? Object.values(imageSet).map((image) => <div key={image} className={`product-photo-layer ${image === activeImage ? "active" : ""}`} style={{ backgroundImage: `url('${image}')` }} />) : <><span /><i /></>}</div>;
}

function Notice() { return <div className="notice">本サイトはポートフォリオ用の架空ECサイトです　<span>5,000円以上で送料無料</span></div>; }

function Header({ navigate, cartCount }: { navigate: Navigate; cartCount: number }) {
  const [open, setOpen] = useState(false);
  return <>
    <Notice />
    <header className="header">
      <button className="logo" onClick={() => navigate("home")}><b>Nurse care</b><small>看護師の足元を守るフットケア専門店</small></button>
      <nav className={open ? "open" : ""}>
        <button onClick={() => navigate("home")}>ホーム</button>
        <button onClick={() => navigate("products")}>商品一覧</button>
        <button onClick={() => navigate("about")}>私たちについて</button>
      </nav>
      <div className="actions">
        <button aria-label="検索">⌕</button><button aria-label="お気に入り">♡</button>
        <button className="cart-icon" onClick={() => navigate("cart")} aria-label={`ショッピングカート ${cartCount}点`}><CartIcon /><em>{cartCount}</em></button>
        <button className="menu" onClick={() => setOpen(!open)} aria-label="メニュー">{open ? "×" : "☰"}</button>
      </div>
    </header>
  </>;
}

function Footer({ navigate }: { navigate: Navigate }) {
  return <footer><div className="footer-brand"><b>Nurse care</b><p>勤務中も、勤務が終わった後も。<br />毎日頑張る看護師の足元に、やさしい選択を。</p></div><div><b>商品を探す</b><button onClick={() => navigate("products")}>商品一覧</button><button onClick={() => navigate("concerns")}>悩みから探す</button><button>セット商品</button></div><div><b>サポート</b><button>ご利用ガイド</button><button>配送・送料</button><button>返品・サイズ交換</button></div><div><b>ショップ情報</b><button onClick={() => navigate("about")}>Nurse careについて</button><button>コラム</button><button>お問い合わせ</button></div><p className="copyright">© 2026 Nurse care — Portfolio demo site</p></footer>;
}

function ProductCard({ p, open, favorite, onFavorite }: { p: Product; open: () => void; favorite: boolean; onFavorite: () => void }) {
  return <article className="product-card"><div className="art-wrap"><span className="tag">{p.tag}</span><button className={`heart ${favorite ? "active" : ""}`} onClick={onFavorite} aria-label="お気に入り">♡</button><ProductArt type={p.art} /></div><p className="category">{p.category}</p><h3>{p.name}</h3><p>{p.description}</p><b className="price">{money(p.price)}</b><button className="text-link" onClick={open}>商品を見る →</button></article>;
}

function Home({ navigate, openProduct, favorites, toggleFavorite }: CatalogProps & { navigate: Navigate }) {
  const concerns = [
    ["長時間立つと足がつらい", "一日中歩く足元に"], ["足裏やかかとが気になる", "やわらかなクッションを"],
    ["脚の重さが気になる", "勤務時間に合わせたケア"], ["靴ずれが気になる", "足にやさしくフィット"],
    ["蒸れ・においが気になる", "シューズをもっと快適に"], ["勤務後にケアしたい", "頑張った足をいたわる"],
  ];
  return <>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">FOR YOUR EVERY STEP</p><h1>毎日立ち続ける、<br /><em>看護師の足元</em>を守る。</h1><p>立つ、歩く、走る。<br />長時間勤務を頑張る看護師のために、<br />足元を支える商品を集めました。</p><div className="hero-buttons"><button className="primary" onClick={() => navigate("products", "ナースシューズ")}>ナースシューズを見る</button><button className="secondary" onClick={() => navigate("products", "着圧ソックス")}>着圧ソックスを見る</button></div></div><div className="hero-photo" role="img" aria-label="明るい病院内をナースシューズで歩く看護師"><span>やさしさを、足元から。</span></div></section>
    <section className="features"><article><i>01</i><h3>看護師の足元に特化</h3><p>長時間立ち続ける働き方を考えた商品を提案します。</p></article><article><i>02</i><h3>勤務中から勤務後まで</h3><p>働く時間も、自分をいたわる時間も支えます。</p></article><article><i>03</i><h3>悩みから選べる</h3><p>商品名が分からなくても、悩みから探せます。</p></article></section>
    <section className="section concerns"><div className="section-head"><div><p className="eyebrow">FIND YOUR CARE</p><h2>足元の悩みから探す</h2></div><button className="text-link" onClick={() => navigate("concerns")}>すべての悩みを見る →</button></div><div className="concern-grid">{concerns.map((c, i) => <button key={c[0]} onClick={() => navigate("concerns")}><i>{["♢", "◌", "♧", "⌁", "○", "♡"][i]}</i><span>{c[0]}</span><small>{c[1]}</small></button>)}</div></section>
    <section className="section products-section"><div className="section-head"><div><p className="eyebrow">OUR FAVORITES</p><h2>Nurse careのおすすめ商品</h2></div><button className="text-link" onClick={() => navigate("products")}>商品一覧を見る →</button></div><div className="product-grid">{products.slice(0,4).map(p => <ProductCard key={p.id} p={p} open={() => openProduct(p.id)} favorite={favorites.includes(p.id)} onFavorite={() => toggleFavorite(p.id)} />)}</div></section>
    <section className="shoe-feature"><div className="feature-art"><ProductArt type="shoe" large /></div><div><p className="eyebrow">AIR CUSHION SHOES</p><h2>一日中歩く足に、<br />軽さとクッションを。</h2><p>病棟内を何度も行き来する一日。軽量設計とかかとのエアクッションが、一歩一歩をやさしく支えます。</p><ul><li>軽量設計</li><li>滑りにくい靴底</li><li>通気性素材</li><li>脱ぎ履きしやすい</li></ul><button className="primary" onClick={() => openProduct(1)}>詳しく見る</button></div></section>
    <section className="story"><div><p className="eyebrow">OUR STORY</p><h2>看護師の足元を、<br />もっと大切にしたい。</h2></div><div><p>患者さんのケアや記録を優先し、自分自身の足元をいたわることは、どうしても後回しになりがちです。</p><p>Nurse careは、毎日現場で働く看護師が、自分の足を大切にするきっかけを届けたいという思いから生まれました。</p><button className="text-link" onClick={() => navigate("about")}>私たちについて →</button></div></section>
  </>;
}

function ProductsPage({ openProduct, favorites, toggleFavorite, initialCategory }: CatalogProps & { initialCategory: string }) {
  const cats = ["すべて", "ナースシューズ", "着圧ソックス", "インソール", "靴ずれ対策", "消臭・除湿", "フットケア"];
  const [cat, setCat] = useState(initialCategory || "すべて");
  const visible = cat === "すべて" ? products : products.filter(p => p.category === cat);
  return <main className="page"><p className="breadcrumb">ホーム　/　商品一覧</p><div className="page-title"><p className="eyebrow">ALL PRODUCTS</p><h1>商品一覧</h1><p>勤務中に使うナースシューズから、勤務後のフットケア用品まで。<br />看護師の足元を支える商品を揃えました。</p></div><div className="filters">{cats.map(c => <button key={c} className={cat === c ? "active" : ""} onClick={() => setCat(c)}>{c}</button>)}</div><div className="result-row"><b>{visible.length} items</b><select aria-label="並び替え"><option>おすすめ順</option><option>価格の安い順</option><option>新着順</option></select></div><div className="product-grid">{visible.map(p => <ProductCard key={p.id} p={p} open={() => openProduct(p.id)} favorite={favorites.includes(p.id)} onFavorite={() => toggleFavorite(p.id)} />)}</div></main>;
}

function Detail({ p, addCart, favorites, toggleFavorite }: { p: Product; addCart: (id: number) => void; favorites: number[]; toggleFavorite: (id: number) => void }) {
  const [color, setColor] = useState(p.colors[0]); const [size, setSize] = useState(p.sizes[0]); const [added, setAdded] = useState(false);
  return <main className="page"><p className="breadcrumb">ホーム　/　{p.category}　/　{p.name}</p><section className="detail"><div className="detail-images"><div className="main-image"><ProductArt type={p.art} large tone={color} /></div><div className="thumbs"><button><ProductArt type={p.art} tone={color} /></button><button><span>DETAIL</span></button><button><span>STYLE</span></button></div></div><div className="detail-info"><span className="tag inline">{p.tag}</span><p className="category">{p.category}</p><h1>{p.name}</h1><p className="lead">{p.description}</p><div className="rating">★★★★★ <span>4.8（24件）</span></div><b className="detail-price">{money(p.price)}</b><hr /><label>カラー　<b>{color}</b></label><div className="choices color-choices">{p.colors.map((c: string) => <button className={color === c ? "active" : ""} onClick={() => setColor(c)} key={c} aria-label={`${c}を選択`}><span className={`color-swatch swatch-${colorTone(c)}`} />{c}</button>)}</div><label>サイズ　<b>{size}</b></label><div className="choices">{p.sizes.map((s: string) => <button className={size === s ? "active" : ""} onClick={() => setSize(s)} key={s}>{s}</button>)}</div><button className="size-guide">サイズ選びガイドを見る →</button><div className="buy-row"><button className="primary add" onClick={() => { addCart(p.id); setAdded(true); setTimeout(() => setAdded(false), 2200); }}>{added ? "カートに追加しました ✓" : "カートに入れる"}</button><button className={`fav ${favorites.includes(p.id) ? "active" : ""}`} onClick={() => toggleFavorite(p.id)}>♡</button></div><p className="shipping">✓ 5,000円以上で送料無料　　✓ 初回サイズ交換無料</p></div></section><section className="description"><p className="eyebrow">DESIGNED FOR NURSES</p><h2>忙しい一日の足元に、<br />やさしい心地よさを。</h2><div className="description-grid"><article><b>01</b><h3>長時間使いやすい</h3><p>立つ、歩くが続く勤務を想定し、毎日の使いやすさを大切にしています。</p></article><article><b>02</b><h3>シンプルなお手入れ</h3><p>忙しい日々にも取り入れやすい、扱いやすい素材と設計です。</p></article><article><b>03</b><h3>勤務に馴染むデザイン</h3><p>医療現場で使いやすい、清潔感のある落ち着いたカラーです。</p></article></div></section></main>;
}

function Concerns({ navigate }: { navigate: Navigate }) { const items = [{t:"長時間立つと足がつらい",d:"クッション性や軽さを意識したアイテムで、一日中歩く足元を支えます。",c:"ナースシューズ"},{t:"足裏やかかとが気になる",d:"足裏をやわらかく包むインソールやパッドを選びました。",c:"インソール"},{t:"脚の重さが気になる",d:"勤務時間に合わせて選べる着圧ソックスで足元をサポート。",c:"着圧ソックス"},{t:"靴ずれが気になる",d:"サイズ調整や摩擦対策に取り入れやすいアイテムです。",c:"靴ずれ対策"},{t:"蒸れ・においが気になる",d:"通気性と勤務後のシューズケアを、無理なく習慣に。",c:"消臭・除湿"},{t:"勤務後に足をいたわりたい",d:"頑張った日の終わりに、自分をいたわるフットケアを。",c:"フットケア"}]; return <main className="page concern-page"><div className="page-title"><p className="eyebrow">FIND YOUR CARE</p><h1>足元の悩みから探す</h1><p>「どの商品を選べばいいか分からない」そんなときは、<br />今感じていることから、あなたに合う足元ケアを探してみてください。</p></div><div className="concern-list">{items.map((x,i)=><article key={x.t}><span>0{i+1}</span><div><h2>{x.t}</h2><p>{x.d}</p></div><button className="secondary" onClick={()=>navigate("products",x.c)}>おすすめ商品を見る →</button></article>)}</div><p className="care-note">※ 本サイトの商品は、疾病の診断・治療・予防を目的としたものではありません。日々の快適な勤務とセルフケアを支える商品としてご紹介しています。</p></main>; }

function About() { return <main className="about-page"><section className="about-hero"><p className="eyebrow">ABOUT NURSE CARE</p><h1>看護師の足元を、<br />もっと大切にしたい。</h1><p>忙しい毎日の中で、いつも後回しになってしまう自分自身のこと。<br />Nurse careは、そんな看護師の足元に寄り添うためのショップです。</p></section><section className="about-story"><div className="quote">“<br /><b>勤務が終わる頃には、<br />足が重く感じる。</b><br />それは、いつしか<br />当たり前になっていました。</div><div><p>看護師として働く中で、長時間の立ち仕事や病棟内の移動によって、勤務が終わる頃には足がつらいと感じることが何度もありました。</p><p>けれど、患者さんのケアや記録業務を優先し、自分の足元をいたわることは後回しになりがちです。</p><p>だからこそ、勤務中に使うものから、帰宅後のセルフケアまで、看護師の働き方に寄り添って選べる場所をつくりたいと考えました。</p></div></section><section className="values"><p className="eyebrow">OUR STANDARD</p><h2>商品選びで大切にしていること</h2><div>{["長時間使いやすいこと","看護師の勤務に取り入れやすいこと","お手入れがしやすいこと","シンプルで使いやすいこと","商品情報が分かりやすいこと"].map((x,i)=><article key={x}><span>0{i+1}</span><b>{x}</b></article>)}</div></section></main>; }

function Cart({ cart, setCart, productsById, navigate }: { cart: Record<number, number>; setCart: Dispatch<SetStateAction<Record<number, number>>>; productsById: ProductMap; navigate: Navigate }) { const lines = Object.entries(cart).filter(([,q]) => (q as number)>0); const total = lines.reduce((s,[id,q])=>s+productsById[id].price*(q as number),0); return <main className="page cart-page"><div className="page-title"><p className="eyebrow">YOUR CART</p><h1>ショッピングカート</h1></div>{lines.length===0?<div className="empty"><p>カートは空です。</p><button className="primary" onClick={()=>navigate("products")}>商品を探す</button></div>:<div className="cart-layout"><div className="cart-lines">{lines.map(([id,q])=>{const p=productsById[id]; return <article key={id}><ProductArt type={p.art}/><div><p className="category">{p.category}</p><h3>{p.name}</h3><p>カラー：{p.colors[0]}　サイズ：{p.sizes[0]}</p><b>{money(p.price)}</b></div><div className="qty"><button onClick={()=>setCart({...cart,[id]:Math.max(0,(q as number)-1)})}>−</button><span>{q as number}</span><button onClick={()=>setCart({...cart,[id]:(q as number)+1})}>＋</button></div></article>})}</div><aside className="summary"><h2>ご注文内容</h2><p>商品小計 <b>{money(total)}</b></p><p>送料 <b>{total>=5000?"無料":"550円"}</b></p><hr/><p className="total">合計 <b>{money(total+(total>=5000?0:550))}</b></p><button className="primary" onClick={()=>navigate("checkout")}>購入手続きへ</button><small>実際の決済は行われません</small></aside></div>}</main>; }

function Checkout({ navigate, cart, productsById }: { navigate: Navigate; cart: Record<number, number>; productsById: ProductMap }) { const [step,setStep]=useState(1); const total=Object.entries(cart).reduce((s,[id,q])=>s+productsById[id].price*(q as number),0); if(step===3)return <main className="complete"><span>✓</span><p className="eyebrow">THANK YOU</p><h1>ご注文ありがとうございます</h1><p>架空の注文手続きが完了しました。<br/>実際の注文・決済・商品の発送は行われません。</p><div><small>注文番号</small><b>NC-20260716-001</b></div><button className="primary" onClick={()=>navigate("home")}>トップページへ戻る</button></main>; return <main className="page checkout"><div className="demo-alert">こちらはポートフォリオ用のデモ画面です。入力内容は送信・保存されません。</div><div className="steps"><b className={step===1?"active":""}>1 お客様情報</b><i/><b className={step===2?"active":""}>2 注文確認</b><i/><b>3 完了</b></div>{step===1?<><h1>購入手続き</h1><form onSubmit={e=>{e.preventDefault();setStep(2)}}><label>お名前<span>必須</span><input required placeholder="山田 花子" /></label><div className="form-row"><label>郵便番号<span>必須</span><input required placeholder="123-4567" /></label><label>電話番号<span>必須</span><input required placeholder="090-1234-5678" /></label></div><label>住所<span>必須</span><input required placeholder="東京都〇〇区〇〇 1-2-3" /></label><label>メールアドレス<span>必須</span><input required type="email" placeholder="sample@example.com" /></label><label>お支払い方法<select><option>クレジットカード（デモ）</option><option>代金引換（デモ）</option></select></label><button className="primary" type="submit">注文内容を確認する</button></form></>:<div className="confirm"><h1>注文内容の確認</h1><div className="confirm-box"><p>商品合計 <b>{money(total)}</b></p><p>送料 <b>{total>=5000?"無料":"550円"}</b></p><hr/><p className="total">お支払い合計 <b>{money(total+(total>=5000?0:550))}</b></p></div><button className="primary" onClick={()=>setStep(3)}>注文を確定する（デモ）</button><button className="text-link" onClick={()=>setStep(1)}>入力画面に戻る</button></div>}</main>; }

export default function App() {
  const [page, setPage] = useState("home"); const [category,setCategory]=useState(""); const [selected,setSelected]=useState(1); const [favorites,setFavorites]=useState<number[]>([]); const [cart,setCart]=useState<Record<number,number>>({});
  const productsById=useMemo(()=>Object.fromEntries(products.map(p=>[p.id,p])),[]);
  const navigate=(p:string,c="")=>{setPage(p);setCategory(c);window.scrollTo({top:0,behavior:"smooth"});};
  const openProduct=(id:number)=>{setSelected(id);navigate("detail")}; const toggleFavorite=(id:number)=>setFavorites(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]); const addCart=(id:number)=>setCart(v=>({...v,[id]:(v[id]||0)+1})); const count=Object.values(cart).reduce((a,b)=>a+b,0);
  useEffect(()=>{document.title=`${page==="home"?"Nurse care":page==="products"?"商品一覧":page==="detail"?productsById[selected].name:page==="concerns"?"悩みから探す":page==="about"?"私たちについて":"ご購入手続き"} | Nurse care`},[page,selected,productsById]);
  let content: ReactNode; if(page==="home")content=<Home navigate={navigate} openProduct={openProduct} favorites={favorites} toggleFavorite={toggleFavorite}/>; else if(page==="products")content=<ProductsPage openProduct={openProduct} favorites={favorites} toggleFavorite={toggleFavorite} initialCategory={category}/>; else if(page==="detail")content=<Detail p={productsById[selected]} addCart={addCart} favorites={favorites} toggleFavorite={toggleFavorite}/>; else if(page==="concerns")content=<Concerns navigate={navigate}/>; else if(page==="about")content=<About/>; else if(page==="cart")content=<Cart cart={cart} setCart={setCart} productsById={productsById} navigate={navigate}/>; else content=<Checkout navigate={navigate} cart={cart} productsById={productsById}/>;
  return <><Header navigate={navigate} cartCount={count}/>{content}{page!=="checkout"&&<Footer navigate={navigate}/>}</>;
}

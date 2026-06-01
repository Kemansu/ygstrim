/* ===========================================================
   Секции: Каталог · Почему мы · Заводы
   =========================================================== */
import { useState, useEffect, useRef } from "react";
import { Icon } from "../icons.jsx";
import { Reveal, PhotoPH } from "../components.jsx";
import imgSausage from "../assets/categories/sausage.jpg";
import imgDairy from "../assets/categories/dairy.jpg";
import imgMeat from "../assets/categories/meat.jpg";
import imgGrocery from "../assets/categories/grocery.jpg";
import imgSweets from "../assets/categories/sweets.jpg";
import imgDrinks from "../assets/categories/drinks.jpg";
import { CATS, PRODUCTS } from "../data/products.js";

// Фото-обложки категорий (по ключу) — отдельно от данных каталога
const CAT_IMG = {
  sausage: imgSausage,
  dairy: imgDairy,
  meat: imgMeat,
  grocery: imgGrocery,
  sweets: imgSweets,
  drinks: imgDrinks,
};

const CAT_LABEL = Object.fromEntries(CATS.map((c) => [c.key, c.title]));

const PAGE = 12; // сколько карточек показывать за раз

/* Фото товара с запасным плейсхолдером, если картинка не загрузилась */
function ProdImg({ src, alt }) {
  const [err, setErr] = useState(false);
  if (!src || err) return <PhotoPH label="фото" className="prod__photo" />;
  return (
    <img className="prod__photo" src={src} alt={alt} loading="lazy" onError={() => setErr(true)} />
  );
}

export function Catalog({ onPrice }) {
  const [active, setActive] = useState("all");
  const [limit, setLimit] = useState(PAGE);

  const select = (key) => { setActive(key); setLimit(PAGE); };

  const visible = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);
  const shown = visible.slice(0, limit);

  return (
    <section className="section catalog" id="catalog">
      <div className="container">
        <Reveal className="sec-head">
          <span className="eyebrow">Каталог продукции</span>
          <div className="sec-head__row">
            <h2 className="section-title">Шесть категорий, более 500&nbsp;наименований</h2>
            <p className="lead">Всё с прямых поставок белорусских заводов. Выберите категорию — покажем актуальные позиции, полный прайс вышлем по запросу.</p>
          </div>
        </Reveal>

        {/* Категории-плитки */}
        <div className="cat__grid">
          {CATS.map((c, i) => (
            <Reveal key={c.key} delay={String((i % 3) + 1)}
              className={`cat__card ${active === c.key ? "is-active" : ""}`}>
              <button className="cat__btn" onClick={() => select(active === c.key ? "all" : c.key)}>
                <img className="cat__photo" src={CAT_IMG[c.key]} alt={c.title} loading="lazy" />
                <div className="cat__meta">
                  <div>
                    <h3 className="cat__title">{c.title}</h3>
                    <span className="cat__count">{c.count}</span>
                  </div>
                  <span className="cat__go"><Icon.arrow /></span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Интерактивный фильтр товаров */}
        <Reveal className="explorer">
          <div className="explorer__bar">
            <div className="chips">
              <button className={`chip ${active === "all" ? "is-on" : ""}`} onClick={() => select("all")}>
                Все позиции <em>{PRODUCTS.length}</em>
              </button>
              {CATS.map((c) => {
                const n = PRODUCTS.filter((p) => p.cat === c.key).length;
                return (
                  <button key={c.key} className={`chip ${active === c.key ? "is-on" : ""}`} onClick={() => select(c.key)}>
                    {c.title} <em>{n}</em>
                  </button>
                );
              })}
            </div>
            <button className="btn btn-outline btn-sm explorer__price" onClick={onPrice}>
              <Icon.tag /> Прайс {active === "all" ? "целиком" : `«${CAT_LABEL[active]}»`}
            </button>
          </div>

          <div className="prod__grid">
            {shown.map((p, i) => (
              <div key={`${active}-${i}`} className="prod__card">
                <ProdImg src={p.img} alt={p.name} />
                <div className="prod__info">
                  <span className="prod__cat">{CAT_LABEL[p.cat]}</span>
                  <h4 className="prod__name">{p.name}</h4>
                  <span className="prod__note">{p.note}</span>
                </div>
              </div>
            ))}
          </div>

          {visible.length > limit && (
            <div className="explorer__more">
              <button className="btn btn-outline" onClick={() => setLimit((l) => l + PAGE)}>
                Показать ещё <em>{Math.min(PAGE, visible.length - limit)}</em>
              </button>
              <span className="explorer__shown">Показано {shown.length} из {visible.length}</span>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Почему мы (цифры) ---------- */
/* Укажите число полных лет на рынке, чтобы показать этот показатель.
   Пока значение null — вместо выдуманной цифры выводится достоверный факт. */
const YEARS_ON_MARKET = 17;

const STATS = [
  { ic: "users", n: "1000+", l: "клиентов — магазины, сети и ИП" },
  { ic: "factory", n: "15+", l: "заводов-партнёров в Беларуси" },
  { ic: "box", n: "300+", l: "наименований в ассортименте" },
  YEARS_ON_MARKET
    ? { ic: "clock", n: `${YEARS_ON_MARKET}+`, l: "лет на рынке оптовых поставок" }
    : { ic: "route", n: "Свой", l: "автопарк с температурным режимом" },
];

const FACTS = [
  { ic: "shield", t: "Прямые поставки с заводов", d: "Работаем без посредников — это честная цена и контроль качества на каждом этапе." },
  { ic: "route", t: "Собственная логистика", d: "Свой автопарк с температурным режимом: доставляем точно в срок по всему Югу." },
  { ic: "scale", t: "Гибкие условия под объём", d: "Индивидуальные цены, отсрочка платежа и поддержка персонального менеджера." },
];

export function WhyUs({ onCallback }) {
  return (
    <section className="section why" id="why">
      <div className="container">
        <Reveal className="sec-head sec-head--dark">
          <span className="eyebrow on-dark">Почему нас выбирают</span>
          <div className="sec-head__row">
            <h2 className="section-title" style={{ color: "#fff" }}>Надёжный поставщик, а&nbsp;не&nbsp;перекупщик</h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.85)" }}>За цифрами — выстроенная система: прямые контракты с заводами, свой транспорт и команда, которая отвечает за результат.</p>
          </div>
        </Reveal>

        <div className="why__stats">
          {STATS.map((s, i) => {
            const I = Icon[s.ic];
            return (
              <Reveal key={s.l} delay={String(i + 1)} className="why__stat">
                <span className="why__stat-ic"><I /></span>
                <strong>{s.n}</strong>
                <span>{s.l}</span>
              </Reveal>
            );
          })}
        </div>

        <div className="why__facts">
          {FACTS.map((f, i) => {
            const I = Icon[f.ic];
            return (
              <Reveal key={f.t} delay={String(i + 1)} className="why__fact">
                <span className="why__fact-ic"><I /></span>
                <div>
                  <h4>{f.t}</h4>
                  <p>{f.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="why__cta">
          <span>Хотите обсудить условия для вашего объёма?</span>
          <button className="btn btn-cream" onClick={onCallback}><Icon.phone /> Заказать обратный звонок</button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Логотипы заводов-партнёров (карусель) ----------
   Логотипы лежат в src/assets/brands и подхватываются автоматически —
   чтобы добавить/убрать партнёра, просто положите/удалите файл там
   (и при желании впишите красивое имя в BRAND_NAMES для alt-текста). */
const brandFiles = import.meta.glob("../assets/brands/*.{png,jpg,jpeg}", {
  eager: true,
  query: "?url",
  import: "default",
});

const BRAND_NAMES = {
  bellakt: "Беллакт",
  "minsk-milk-1": "Минский молочный завод №1",
  kamako: "Камако",
  "borisovsky-mk": "Борисовский мясокомбинат",
  rogachev: "Рогачёвъ",
  "brestsky-mk": "Брестский мясокомбинат",
  "grodnensky-mk": "Гродненский мясокомбинат",
  milkavita: "Милкавита",
  "krasny-pischevik": "Красный пищевик",
  "pinsky-pikant": "Пинский мясокомбинат «Пикант»",
  "syrny-dvor": "Сырный двор",
  "recepty-bulbasha": "Рецепты Бульбаша",
  "molochnye-gorki": "Молочные горки",
  "sytyy-smolyanin": "Сытый смолянин",
  romanishin: "Романишин",
  avs: "ABC",
  "volkovyssky-mk": "Волковысский мясокомбинат",
  "mogilevsky-mk": "Могилёвский мясокомбинат",
  "bulba-chips": "Бульба Chips",
  "bulba-sticks": "Бульба Sticks",
  "bryansky-mk": "Брянский мясокомбинат",
  "mega-chips": "Mega Chips",
  "velikoe-knyazhestvo": "Великое княжество",
};

const BRANDS = Object.entries(brandFiles)
  .map(([path, url]) => {
    const slug = path.split("/").pop().replace(/\.\w+$/, "");
    return { url, name: BRAND_NAMES[slug] || slug };
  })
  .sort((a, b) => a.name.localeCompare(b.name, "ru"));

export function Brands() {
  const trackRef = useRef(null);
  const loop = [...BRANDS, ...BRANDS];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf;
    let paused = false;
    let inited = false;
    let pos = el.scrollLeft; // дробный аккумулятор позиции (Safari округляет scrollLeft → копим сами)
    const md = { active: false, startX: 0, startScroll: 0, moved: false };

    // Бесшовная прокрутка по кругу: лента продублирована, поэтому при выходе
    // за половину ширины сдвигаем позицию на половину назад (и поправляем
    // аккумулятор и точку отсчёта перетаскивания, чтобы не было рывка).
    const wrap = () => {
      const h = el.scrollWidth / 2;
      if (h <= 0) return;
      if (el.scrollLeft >= h) { el.scrollLeft -= h; pos -= h; md.startScroll -= h; }
      else if (el.scrollLeft < 0) { el.scrollLeft += h; pos += h; md.startScroll += h; }
    };

    const SPEED = 0.5; // px за кадр — мягкая автопрокрутка влево
    const tick = () => {
      if (!inited && el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth / 4; // старт со «свободой» в обе стороны
        pos = el.scrollLeft;
        inited = true;
      }
      if (paused || md.active) {
        pos = el.scrollLeft;        // следим за ручной/нативной прокруткой — без скачка при возобновлении
      } else {
        pos += SPEED;               // конвейер едет сам, пока его не трогают
        el.scrollLeft = pos;
      }
      wrap();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Пауза при наведении мышью и во время касания (нативный свайп)
    const onEnter = () => { paused = true; };
    const onLeave = () => { if (!md.active) paused = false; };
    const onTouchStart = () => { paused = true; };
    const onTouchEnd = () => { paused = false; };

    // Перетаскивание мышью (на тач-устройствах работает нативная прокрутка)
    const onDown = (e) => {
      if (e.pointerType !== "mouse") return;
      md.active = true;
      md.moved = false;
      md.startX = e.clientX;
      md.startScroll = el.scrollLeft;
      paused = true;
      el.classList.add("is-grab");
    };
    const onMove = (e) => {
      if (!md.active) return;
      const dx = e.clientX - md.startX;
      if (Math.abs(dx) > 3) md.moved = true;
      el.scrollLeft = md.startScroll - dx;
    };
    const endDrag = () => {
      if (!md.active) return;
      md.active = false;
      paused = false;
      el.classList.remove("is-grab");
    };
    // Гасим клик, если это было перетаскивание (на случай ссылок внутри)
    const onClickCapture = (e) => { if (md.moved) { e.preventDefault(); e.stopPropagation(); } };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", endDrag);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", endDrag);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <section className="section-tight brands" id="brands">
      <div className="container">
        <Reveal className="brands__head">
          <span className="eyebrow centered">Заводы-производители</span>
          <h2 className="section-title">Поставляем продукцию напрямую от&nbsp;заводов-производителей</h2>
        </Reveal>
      </div>
      <div className="marquee">
        <div className="marquee__track" ref={trackRef}>
          {loop.map((b, i) => (
            <div className="brand__tile" key={i}>
              <img className="brand__logo" src={b.url} alt={b.name} loading="lazy" draggable="false" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

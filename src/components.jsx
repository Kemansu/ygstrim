/* ===========================================================
   Переиспользуемые компоненты
   =========================================================== */
import { useState, useEffect, useRef } from "react";
import { Icon } from "./icons.jsx";
import { submitLead } from "./lib/leads.js";

/* Плейсхолдер под фото */
export function PhotoPH({ label, dark, style, className = "" }) {
  return (
    <div className={`ph ${dark ? "on-dark" : ""} ${className}`} style={style}>
      <span className="ph__label">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8.5" cy="10" r="1.6" /><path d="m21 16-5-4-9 7" />
        </svg>
        {label}
      </span>
    </div>
  );
}

/* Reveal-обёртка для scroll-анимаций.
   Состояние видимости держим в React (а не через classList напрямую),
   иначе при ре-рендере с динамическим className класс "in" затирается
   и элемент пропадает. */
export function Reveal({ children, delay, as: Tag = "div", className = "", style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setShown(true); io.unobserve(el); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} data-d={delay} style={style}>
      {children}
    </Tag>
  );
}

/* Поле ввода с валидацией */
export function Field({ label, type = "text", value, onChange, placeholder, error, name }) {
  return (
    <div className={`field ${error ? "err" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name} name={name} type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      {error && <span className="field__err">{error}</span>}
    </div>
  );
}

/* Форма заявки (звонок / прайс) */
export function LeadForm({ withConsent = true, submitLabel, onDone, compact, source = "price" }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const fmtPhone = (raw) => {
    let d = raw.replace(/\D/g, "");
    if (d.startsWith("8")) d = "7" + d.slice(1);
    if (!d.startsWith("7")) d = "7" + d;
    d = d.slice(0, 11);
    let out = "+7";
    if (d.length > 1) out += " (" + d.slice(1, 4);
    if (d.length >= 4) out += ") " + d.slice(4, 7);
    if (d.length >= 7) out += "-" + d.slice(7, 9);
    if (d.length >= 9) out += "-" + d.slice(9, 11);
    return out;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    const err = {};
    if (name.trim().length < 2) err.name = "Укажите имя";
    if (phone.replace(/\D/g, "").length < 11) err.phone = "Введите телефон полностью";
    if (withConsent && !consent) err.consent = true;
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSendError("");
    setSending(true);
    try {
      await submitLead({ source, name: name.trim(), phone });
      onDone({ name: name.trim(), phone });
    } catch (_) {
      setSendError("Не удалось отправить. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <div style={{ display: "flex", flexDirection: "column", gap: compact ? 14 : 16 }}>
        <Field label="Ваше имя" name="lead-name" value={name} placeholder="Иван"
               onChange={setName} error={errors.name} />
        <Field label="Телефон" name="lead-phone" type="tel" value={phone} placeholder="+7 (___) ___-__-__"
               onChange={(v) => setPhone(fmtPhone(v))} error={errors.phone} />
        {withConsent && (
          <label className={`consent ${errors.consent ? "err" : ""}`}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>Согласен на обработку персональных данных в соответствии с <a href="#" onClick={(e)=>e.preventDefault()}>политикой конфиденциальности</a></span>
          </label>
        )}
        {sendError && <span className="field__err" role="alert">{sendError}</span>}
        <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={sending}>
          {sending ? "Отправляем…" : <>{submitLabel} <Icon.arrow /></>}
        </button>
      </div>
    </form>
  );
}

/* Модальное окно */
export function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("no-scroll");
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.documentElement.classList.remove("no-scroll"); window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal__close" onClick={onClose} aria-label="Закрыть"><Icon.close /></button>
        {children}
      </div>
    </div>
  );
}

/* Тост-уведомление */
export function Toast({ message, onHide }) {
  useEffect(() => {
    const t = setTimeout(onHide, 4200);
    return () => clearTimeout(t);
  }, [onHide]);
  return (
    <div className="toast"><Icon.checkCircle /> {message}</div>
  );
}

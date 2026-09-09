"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const PAY_METHODS = ["Cash", "Card", "UPI", "Other"];
const fmt = (n) => "₹" + (Number(n) || 0).toFixed(2);
const effectivePrice = (p) => {
  const sp = Number(p.sp) || 0;
  const mrp = Number(p.mrp) || 0;
  return sp > 0 && sp < mrp ? sp : mrp;
};

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [settings, setSettings] = useState(null);

  const [cart, setCart] = useState([]); // {product_id,name,unit_price,qty,stock,product_type,category_id,subcategory_id,gst_rate,price_overridden}
  const [scanQuery, setScanQuery] = useState("");
  const [scanResults, setScanResults] = useState([]);
  const scanInputRef = useRef(null);

  const [isGuest, setIsGuest] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerResults, setCustomerResults] = useState([]);
  const [customerMatchNote, setCustomerMatchNote] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState("");

  const [payments, setPayments] = useState([{ method: "Cash", amount: "0.00" }]);
  const [userEditedPayments, setUserEditedPayments] = useState(false);
  const [promisedDate, setPromisedDate] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);

  useEffect(() => {
    fetch("/api/admin/billing")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setProducts(data.products);
          setCoupons(data.coupons);
          setCustomers(data.customers);
          setSettings(data.settings);
        } else {
          setError(data.error || "Could not load billing data.");
        }
      })
      .catch(() => setError("Network error loading billing data."))
      .finally(() => setLoading(false));
    scanInputRef.current?.focus();
  }, []);

  // ── Totals ────────────────────────────────────────────────────────────────
  const subtotal = useMemo(() => cart.reduce((s, c) => s + c.unit_price * c.qty, 0), [cart]);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    let eligible = 0;
    for (const c of cart) {
      let matches = false;
      if (appliedCoupon.applies_to === "all") matches = true;
      else if (appliedCoupon.applies_to === "product" && c.product_id === appliedCoupon.product_id) matches = true;
      else if (appliedCoupon.applies_to === "category" && c.category_id === appliedCoupon.category_id) matches = true;
      else if (appliedCoupon.applies_to === "subcategory" && c.subcategory_id === appliedCoupon.subcategory_id) matches = true;
      if (matches) eligible += c.unit_price * c.qty;
    }
    if (eligible <= 0) return 0;
    let d = appliedCoupon.type === "percentage" ? eligible * (Number(appliedCoupon.value) / 100) : Math.min(Number(appliedCoupon.value), eligible);
    if (appliedCoupon.max_discount) d = Math.min(d, Number(appliedCoupon.max_discount));
    return d;
  }, [cart, appliedCoupon]);

  const gst = useMemo(() => {
    let total = 0;
    for (const c of cart) {
      const lineTotal = c.unit_price * c.qty;
      const share = subtotal > 0 ? discount * (lineTotal / subtotal) : 0;
      const taxable = Math.max(0, lineTotal - share);
      total += taxable * ((Number(c.gst_rate) || 0) / 100);
    }
    return total;
  }, [cart, subtotal, discount]);

  const grandTotal = Math.max(0, subtotal - discount) + gst;

  // Until the user edits payments themselves, the single Cash row always
  // tracks the current grand total — derived at render time (no effect
  // needed) so it never fights with the user's own edits.
  const displayedPayments = userEditedPayments
    ? payments
    : [{ method: payments[0]?.method || "Cash", amount: grandTotal > 0 ? grandTotal.toFixed(2) : "0.00" }];

  const paidTotal = displayedPayments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
  const due = Math.max(0, grandTotal - paidTotal);

  // ── Barcode / product search ────────────────────────────────────────────────
  function handleScanChange(v) {
    setScanQuery(v);
    if (!v.trim()) {
      setScanResults([]);
      return;
    }
    const q = v.trim().toLowerCase();
    // Exact barcode/SKU match → add straight to cart, like a real scanner gun.
    const exact = products.find((p) => (p.barcode && p.barcode.toLowerCase() === q) || (p.sku && p.sku.toLowerCase() === q));
    if (exact) {
      addToCart(exact);
      setScanQuery("");
      setScanResults([]);
      return;
    }
    const matches = products.filter(
      (p) => p.title.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q)) || (p.barcode && p.barcode.toLowerCase().includes(q))
    );
    setScanResults(matches.slice(0, 8));
  }

  function addToCart(product) {
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.product_id === product.id);
      if (idx >= 0) {
        const existing = prev[idx];
        if (product.product_type === "physical" && product.stock !== null && existing.qty + 1 > product.stock) {
          alert(`Only ${product.stock} in stock for "${product.title}".`);
          return prev;
        }
        const next = [...prev];
        next[idx] = { ...existing, qty: existing.qty + 1 };
        return next;
      }
      return [
        ...prev,
        {
          product_id: product.id,
          name: product.title,
          unit_price: effectivePrice(product),
          qty: 1,
          stock: product.stock,
          product_type: product.product_type,
          category_id: product.category_id,
          subcategory_id: product.subcategory_id,
          gst_rate: Number(product.gst_rate) || 0,
          price_overridden: false,
        },
      ];
    });
  }

  function changeQty(idx, delta) {
    setCart((prev) => {
      const item = prev[idx];
      const newQty = item.qty + delta;
      if (newQty < 1) return prev.filter((_, i) => i !== idx);
      if (item.product_type === "physical" && item.stock !== null && newQty > item.stock) {
        alert(`Only ${item.stock} in stock.`);
        return prev;
      }
      const next = [...prev];
      next[idx] = { ...item, qty: newQty };
      return next;
    });
  }

  function setQty(idx, val) {
    const qty = Math.max(1, parseInt(val, 10) || 1);
    setCart((prev) => {
      const item = prev[idx];
      if (item.product_type === "physical" && item.stock !== null && qty > item.stock) {
        alert(`Only ${item.stock} in stock.`);
        return prev;
      }
      const next = [...prev];
      next[idx] = { ...item, qty };
      return next;
    });
  }

  function setPrice(idx, val) {
    const price = Math.max(0, parseFloat(val) || 0);
    setCart((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], unit_price: price, price_overridden: true };
      return next;
    });
  }

  function removeFromCart(idx) {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  }

  // ── Customer match by phone ─────────────────────────────────────────────────
  function handlePhoneChange(v) {
    setCustomerPhone(v);
    setCustomerId("");
    setCustomerMatchNote("");
    if (!v.trim()) {
      setCustomerResults([]);
      return;
    }
    const exact = customers.find((c) => c.phone === v.trim());
    if (exact) {
      setCustomerId(exact.id);
      setCustomerName(exact.name);
      setCustomerMatchNote(`Existing customer found: ${exact.name}`);
      setCustomerResults([]);
      return;
    }
    const matches = customers.filter((c) => c.phone && c.phone.includes(v.trim()));
    setCustomerResults(matches.slice(0, 6));
  }

  function selectCustomer(c) {
    setCustomerId(c.id);
    setCustomerName(c.name);
    setCustomerPhone(c.phone || "");
    setCustomerMatchNote(`Existing customer found: ${c.name}`);
    setCustomerResults([]);
  }

  function toggleGuestBill(checked) {
    setIsGuest(checked);
    if (checked) {
      setCustomerPhone("");
      setCustomerName("");
      setCustomerId("");
      setCustomerMatchNote("");
      setCustomerResults([]);
    }
  }

  // ── Coupon ───────────────────────────────────────────────────────────────
  function applyCoupon() {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    const c = coupons.find((x) => x.code === code);
    if (!c) {
      setCouponMsg("Invalid or inactive coupon.");
      setAppliedCoupon(null);
      return;
    }
    if (c.number_of_times != null && Number(c.usage_count) >= Number(c.number_of_times)) {
      setCouponMsg("This coupon has reached its usage limit.");
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(c);
    setCouponMsg(`Applied "${c.code}" — ${c.type === "percentage" ? `${c.value}% off` : `₹${c.value} off`}`);
  }

  // ── Payment rows (split payment) ────────────────────────────────────────────
  // The first edit "promotes" the auto-filled row (whatever amount is
  // currently displayed) into real state, so switching to manual mode never
  // silently discards the auto-computed total.
  function addPaymentRow() {
    const base = userEditedPayments ? payments : displayedPayments;
    setUserEditedPayments(true);
    setPayments([...base, { method: "Cash", amount: "0.00" }]);
  }
  function updatePaymentRow(idx, field, value) {
    const base = userEditedPayments ? payments : displayedPayments;
    setUserEditedPayments(true);
    setPayments(base.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));
  }
  function removePaymentRow(idx) {
    const base = userEditedPayments ? payments : displayedPayments;
    setUserEditedPayments(true);
    setPayments(base.length > 1 ? base.filter((_, i) => i !== idx) : base);
  }

  // ── Complete sale ─────────────────────────────────────────────────────────
  async function completeSale() {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }
    if (isGuest && due > 0.004) {
      alert("Guest bills must be paid in full. Turn off Guest Bill to record a due amount against a customer.");
      return;
    }
    if (!isGuest && due > 0.004 && !customerId && !customerName.trim()) {
      alert("This sale has a due amount — please select an existing customer or enter a walk-in customer name so it can be tracked.");
      return;
    }

    const payload = {
      items: cart.map((c) => ({ product_id: c.product_id, qty: c.qty, price_override: c.price_overridden ? c.unit_price : null })),
      customer_id: isGuest ? 0 : customerId || 0,
      customer_name: isGuest ? "" : customerName.trim(),
      customer_phone: isGuest ? "" : customerPhone.trim(),
      is_guest: isGuest,
      payments: displayedPayments.map((p) => ({ method: p.method, amount: parseFloat(p.amount) || 0 })),
      promised_date: promisedDate || null,
      coupon_code: appliedCoupon ? appliedCoupon.code : "",
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) {
        alert(data.error || "Checkout failed.");
        return;
      }
      printOrder(data.order_id);
      setLastOrderId(data.order_id);
      // Reset for next sale
      setCart([]);
      setAppliedCoupon(null);
      setCouponCode("");
      setCouponMsg("");
      setUserEditedPayments(false);
      setPromisedDate("");
      setCustomerName("");
      setCustomerPhone("");
      setCustomerId("");
      setCustomerMatchNote("");
      setIsGuest(false);
      scanInputRef.current?.focus();
    } catch {
      alert("Checkout failed — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function printOrder(orderId) {
    window.open(`/admin/billing-invoice/${orderId}`, "_blank");
  }

  // ── Keyboard shortcuts ───────────────────────────────────────────────────
  useEffect(() => {
    if (!settings) return;
    function onKeydown(e) {
      if (e.key === settings.shortcut_complete_sale) {
        e.preventDefault();
        completeSale();
      } else if (e.key === settings.shortcut_print) {
        e.preventDefault();
        if (lastOrderId) printOrder(lastOrderId);
      } else if (e.key === settings.shortcut_new_sale) {
        e.preventDefault();
        setCart([]);
        scanInputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, cart, isGuest, customerId, customerName, customerPhone, displayedPayments, appliedCoupon, promisedDate, lastOrderId]);

  if (loading) return <p style={{ color: "var(--gray-500)" }}>Loading POS…</p>;
  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;

  return (
    <div>
      <div className="section-label" style={{ margin: "0 0 1rem" }}>
        <i className="fas fa-cash-register" /> Billing / POS
      </div>

      <div className="pos-grid">
        {/* LEFT: Scan + Cart */}
        <div className="pos-col-main">
          <div className="gd-card">
            <div className="gd-card-body">
              <label className="pos-label"><i className="fas fa-barcode" /> Scan Barcode or Search Product</label>
              <div style={{ position: "relative" }}>
                <input
                  ref={scanInputRef}
                  type="text"
                  className="pos-scan-box"
                  placeholder="Scan barcode or type product name / SKU…"
                  autoComplete="off"
                  value={scanQuery}
                  onChange={(e) => handleScanChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && scanResults.length > 0) {
                      addToCart(scanResults[0]);
                      setScanQuery("");
                      setScanResults([]);
                    }
                  }}
                />
                {scanResults.length > 0 && (
                  <div className="pos-search-results">
                    {scanResults.map((p) => (
                      <div
                        key={p.id}
                        className="pos-search-item"
                        onClick={() => {
                          addToCart(p);
                          setScanQuery("");
                          setScanResults([]);
                        }}
                      >
                        {p.title} <small>({fmt(effectivePrice(p))} · stock {p.stock ?? "—"})</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="gd-card">
            <div className="gd-card-body">
              <h3 className="pos-h"><i className="fas fa-shopping-basket" style={{ color: "var(--primary)" }} /> Cart</h3>
              <div style={{ overflowX: "auto" }}>
                <table className="atable pos-cart-table">
                  <thead>
                    <tr><th>Product</th><th>Price</th><th width="140">Qty</th><th>Subtotal</th><th></th></tr>
                  </thead>
                  <tbody>
                    {cart.length === 0 ? (
                      <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--gray-400)", padding: "2rem 0" }}>Cart is empty — scan a product to begin.</td></tr>
                    ) : (
                      cart.map((c, idx) => (
                        <tr key={c.product_id}>
                          <td>{c.name}</td>
                          <td>
                            <input type="number" step="0.01" min="0" value={c.unit_price} className="pos-mini-input" onChange={(e) => setPrice(idx, e.target.value)} />
                          </td>
                          <td>
                            <div className="pos-qty-controls">
                              <button type="button" onClick={() => changeQty(idx, -1)}>−</button>
                              <input type="number" value={c.qty} min="1" onChange={(e) => setQty(idx, e.target.value)} />
                              <button type="button" onClick={() => changeQty(idx, 1)}>+</button>
                            </div>
                          </td>
                          <td>{fmt(c.unit_price * c.qty)}</td>
                          <td><button type="button" className="pos-remove-btn" onClick={() => removeFromCart(idx)}><i className="fas fa-trash-alt" /></button></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Customer, Coupon, Payment */}
        <div className="pos-col-side">
          <div className="gd-card">
            <div className="gd-card-body">
              <div className="pos-row-between" style={{ marginBottom: "0.9rem" }}>
                <h3 className="pos-h" style={{ margin: 0 }}><i className="fas fa-user" style={{ color: "var(--primary)" }} /> Customer</h3>
                <label className="pos-guest-toggle">
                  <input type="checkbox" checked={isGuest} onChange={(e) => toggleGuestBill(e.target.checked)} />
                  <span className="pos-guest-track"><span className="pos-guest-thumb" /></span>
                  <span className="pos-guest-label">Guest Bill</span>
                </label>
              </div>

              <div style={{ position: "relative", marginBottom: "0.6rem", opacity: isGuest ? 0.4 : 1, pointerEvents: isGuest ? "none" : "auto" }}>
                <label className="pos-label-sm">Mobile Number</label>
                <input type="text" className="pos-input" placeholder="Enter mobile number" autoComplete="off" inputMode="numeric" value={customerPhone} onChange={(e) => handlePhoneChange(e.target.value)} />
                {customerResults.length > 0 && (
                  <div className="pos-search-results">
                    {customerResults.map((c) => (
                      <div key={c.id} className="pos-search-item" onClick={() => selectCustomer(c)}>
                        {c.name} <small>({c.phone})</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ opacity: isGuest ? 0.4 : 1, pointerEvents: isGuest ? "none" : "auto" }}>
                <label className="pos-label-sm">Customer Name</label>
                <input type="text" className="pos-input" placeholder="Name will appear automatically, or type it" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
              </div>
              {customerMatchNote && !isGuest && (
                <div className="pos-note pos-note-success"><i className="fas fa-check-circle" /> {customerMatchNote}</div>
              )}
              {isGuest && (
                <div className="pos-note"><i className="fas fa-info-circle" /> No customer details needed — this bill must be paid in full.</div>
              )}
            </div>
          </div>

          <div className="gd-card">
            <div className="gd-card-body">
              <h3 className="pos-h"><i className="fas fa-tag" style={{ color: "var(--primary)" }} /> Coupon</h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input type="text" className="pos-input" style={{ textTransform: "uppercase" }} placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <button type="button" className="abtn" onClick={applyCoupon}>Apply</button>
              </div>
              {couponMsg && <div className="pos-note" style={{ marginTop: "0.4rem" }}>{couponMsg}</div>}
            </div>
          </div>

          <div className="gd-card">
            <div className="gd-card-body">
              <div className="pos-row-between" style={{ marginBottom: "0.9rem" }}>
                <h3 className="pos-h" style={{ margin: 0 }}><i className="fas fa-money-bill-wave" style={{ color: "var(--primary)" }} /> Payment</h3>
                <button type="button" className="abtn" onClick={addPaymentRow}><i className="fas fa-plus" /> Add</button>
              </div>

              {displayedPayments.map((p, idx) => (
                <div key={idx} className="pos-payment-row">
                  <select className="pos-input pos-pay-method" value={p.method} onChange={(e) => updatePaymentRow(idx, "method", e.target.value)}>
                    {PAY_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <input type="number" step="0.01" min="0" className="pos-input" value={p.amount} onChange={(e) => updatePaymentRow(idx, "amount", e.target.value)} />
                  {displayedPayments.length > 1 && (
                    <button type="button" className="pos-remove-btn" onClick={() => removePaymentRow(idx)}><i className="fas fa-times" /></button>
                  )}
                </div>
              ))}

              <div className="pos-totals">
                <div><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                <div><span>Discount</span><span>-{fmt(discount)}</span></div>
                <div><span>GST</span><span>+{fmt(gst)}</span></div>
                <div className="pos-totals-grand"><span>Total</span><span>{fmt(grandTotal)}</span></div>
              </div>

              <div className="pos-row-between" style={{ fontSize: "0.85rem", margin: "0.75rem 0 0.5rem" }}>
                <span style={{ color: "var(--gray-500)" }}>Amount Received</span>
                <span style={{ fontWeight: 700 }}>{fmt(paidTotal)}</span>
              </div>

              {due > 0.004 && (
                <div className="pos-due-box">
                  <div className="pos-row-between" style={{ fontWeight: 700 }}><span>Due</span><span>{fmt(due)}</span></div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <label className="pos-label-sm">Promise to pay by (optional)</label>
                    <input type="date" className="pos-input" value={promisedDate} onChange={(e) => setPromisedDate(e.target.value)} />
                  </div>
                </div>
              )}

              <button className="abtn abtn-primary" style={{ width: "100%", padding: "0.75rem", fontSize: "1rem", marginTop: "0.25rem" }} onClick={completeSale} disabled={submitting}>
                <i className="fas fa-check-circle" /> {submitting ? "Processing…" : "Complete Sale"}{" "}
                {settings && <small style={{ opacity: 0.75 }}>({settings.shortcut_complete_sale})</small>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pos-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
        @media (min-width: 992px) { .pos-grid { grid-template-columns: 2fr 1fr; gap: 1.5rem; align-items: start; } }
        .pos-h { font-size: 1rem; font-weight: 700; margin: 0 0 0.9rem; display: flex; align-items: center; gap: 0.5rem; }
        .pos-label { font-size: 0.8125rem; font-weight: 600; color: var(--gray-700); display: block; margin-bottom: 0.5rem; }
        .pos-label-sm { font-size: 0.75rem; font-weight: 600; color: var(--gray-600); display: block; margin-bottom: 0.25rem; }
        .pos-row-between { display: flex; align-items: center; justify-content: space-between; }
        .pos-scan-box { width: 100%; font-size: 1.15rem; padding: 0.9rem 1.1rem; border: 2px solid var(--primary); border-radius: var(--radius-lg); font-family: inherit; }
        .pos-scan-box:focus { outline: none; box-shadow: 0 0 0 3px var(--primary-lighter); }
        .pos-input { width: 100%; border: 1px solid var(--gray-300); border-radius: var(--radius); padding: 0.55rem 0.7rem; font-size: 0.875rem; font-family: inherit; }
        .pos-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-lighter); }
        .pos-mini-input { width: 90px; border: 1px solid var(--gray-300); border-radius: var(--radius); padding: 0.35rem 0.5rem; font-size: 0.875rem; }
        .pos-search-results { position: absolute; z-index: 50; background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius); box-shadow: 0 8px 20px rgba(0,0,0,.1); max-height: 260px; overflow-y: auto; width: 100%; margin-top: 2px; }
        .pos-search-item { padding: 0.6rem 0.9rem; cursor: pointer; font-size: 0.875rem; }
        .pos-search-item:hover { background: var(--gray-50); }
        .pos-search-item small { color: var(--gray-400); }
        .pos-cart-table th, .pos-cart-table td { vertical-align: middle; }
        .pos-qty-controls { display: flex; align-items: center; gap: 0.4rem; }
        .pos-qty-controls button { width: 28px; height: 28px; border: 1px solid var(--gray-200); background: var(--gray-50); border-radius: 4px; cursor: pointer; font-size: 1rem; }
        .pos-qty-controls input { width: 46px; text-align: center; border: 1px solid var(--gray-200); border-radius: 4px; padding: 0.3rem; }
        .pos-remove-btn { border: none; background: #fee2e2; color: #ef4444; width: 30px; height: 30px; border-radius: 6px; cursor: pointer; }
        .pos-remove-btn:hover { background: #fecaca; }
        .pos-guest-toggle { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; user-select: none; }
        .pos-guest-toggle input { display: none; }
        .pos-guest-track { width: 34px; height: 18px; background: var(--gray-200); border-radius: 9999px; position: relative; transition: background 0.2s; flex-shrink: 0; display: inline-block; }
        .pos-guest-thumb { position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; background: #fff; border-radius: 50%; box-shadow: 0 1px 2px rgba(0,0,0,.25); transition: transform 0.2s; }
        .pos-guest-toggle input:checked + .pos-guest-track { background: var(--primary); }
        .pos-guest-toggle input:checked + .pos-guest-track .pos-guest-thumb { transform: translateX(16px); }
        .pos-guest-label { font-size: 0.8rem; font-weight: 600; color: var(--gray-500); }
        .pos-note { font-size: 0.8125rem; color: var(--gray-500); margin-top: 0.5rem; }
        .pos-note-success { color: #10b981; font-weight: 600; }
        .pos-payment-row { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; }
        .pos-pay-method { max-width: 110px; flex-shrink: 0; }
        .pos-totals div { display: flex; justify-content: space-between; padding: 0.35rem 0; font-size: 0.9rem; }
        .pos-totals-grand { font-size: 1.25rem; font-weight: 800; border-top: 2px solid var(--gray-800); padding-top: 0.6rem; margin-top: 0.3rem; }
        .pos-due-box { background: #fffbeb; border: 1px solid #fde68a; border-radius: var(--radius); padding: 0.65rem 0.85rem; margin-bottom: 0.75rem; font-size: 0.875rem; color: #92400e; }
      `}</style>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, ShoppingBag, Search, Menu, X, Leaf, Truck,
  ShieldCheck, Headphones, Plus, Minus, Trash2, ShoppingCart, UserRound,
  ChevronRight, MapPin, CreditCard, CheckCircle2, LogOut, Sparkles
} from "lucide-react";
import "./App.css";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/auth";

const products = [
  { id: 1, name: "Fresh Bananas", category: "Fruits", price: 42, unit: "6 pcs", tag: "Fresh pick", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=700&q=85" },
  { id: 2, name: "Red Apples", category: "Fruits", price: 129, unit: "1 kg", tag: "Popular", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=700&q=85" },
  { id: 3, name: "Farm Oranges", category: "Fruits", price: 79, unit: "1 kg", tag: "", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=700&q=85" },
  { id: 4, name: "Garden Tomatoes", category: "Vegetables", price: 35, unit: "500 g", tag: "Daily deal", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=700&q=85" },
  { id: 5, name: "Fresh Carrots", category: "Vegetables", price: 45, unit: "500 g", tag: "", image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=700&q=85" },
  { id: 6, name: "Farm Potatoes", category: "Vegetables", price: 32, unit: "1 kg", tag: "", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&q=85" },
  { id: 7, name: "Fresh Milk", category: "Dairy", price:  thirtyFive(), unit: "500 ml", tag: "Everyday", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=700&q=85" },
  { id: 8, name: "Greek Yogurt", category: "Dairy", price: 65, unit: " cup", tag: "", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&q=85" },
  { id: 9, name: "Cheddar Cheese", category: "Dairy", price: 110, unit: "200 g", tag: "", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=700&q=85" },
  { id: 10, name: "Classic Potato Chips", category: "Snacks", price: 20, unit: " pack", tag: "Hostel fave", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=700&q=85" },
  { id: 11, name: "Dark Chocolate", category: "Snacks", price: 85, unit: " bar", tag: "", image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=700&q=85" },
  { id: 12, name: "Oat Cookies", category: "Snacks", price: 55, unit: " pack", tag: "", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&q=85" },
  { id: 13, name: "Orange Juice", category: "Beverages", price: 75, unit: "1 L", tag: "", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=700&q=85" },
  { id: 14, name: "Mineral Water", category: "Beverages", price: 20, unit: "1 L", tag: "", image: "https://images.unsplash.com/photo-1606168094336-48f2057b0b5b?w=700&q=85" },
  { id: 15, name: "Instant Noodles", category: "Hostel Essentials", price: 15, unit: " pack", tag: "Quick meal", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&q=85" },
  { id: 16, name: "Whole Wheat Bread", category: "Hostel Essentials", price: 42, unit: " loaf", tag: "", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=85" },
  { id: 17, name: "Farm Fresh Eggs", category: "Hostel Essentials", price: 72, unit: "6 pcs", tag: "", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=700&q=85" },
  { id: 18, name: "Peanut Butter", category: "Hostel Essentials", price: 145, unit: " jar", tag: "", image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=700&q=85" }
];

function thirtyFive() { return 35; }
const categories = ["All", "Fruits", "Vegetables", "Dairy", "Snacks", "Beverages", "Hostel Essentials"];
const money = (value) => `₹${value.toFixed(2)}`;

export default function App() {
  const [page, setPage] = useState("home");
  const [student, setStudent] = useState(() => {
    try { return JSON.parse(localStorage.getItem("campuscart_student") || "null"); }
    catch { return null; }
  });
  const [cart, setCart] = useState({});
  const [toast, setToast] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2600);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const cartItems = useMemo(() => products
    .filter((p) => cart[p.id])
    .map((p) => ({ ...p, quantity: cart[p.id] })), [cart]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCart((old) => ({ ...old, [product.id]: (old[product.id] || 0) + 1 }));
    setToast(`${product.name} added to your cart`);
  };
  const changeQty = (id, amount) => setCart((old) => {
    const next = { ...old };
    const qty = (next[id] || 0) + amount;
    if (qty <= 0) delete next[id]; else next[id] = qty;
    return next;
  });
  const logout = () => {
    localStorage.removeItem("campuscart_student");
    setStudent(null);
    setPage("home");
    setToast("You have been logged out");
  };

  const go = (next) => { setPage(next); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => go("home")} aria-label="CampusCart home">
          <span className="brand-mark"><ShoppingBag size={19} /></span>
          <span>campus<span>cart</span><small>STUDENT GROCERY HUB</small></span>
        </button>
        <button className="mobile-toggle" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation">
          {mobileNav ? <X /> : <Menu />}
        </button>
        <nav className={mobileNav ? "nav-links open" : "nav-links"}>
          <button className={page === "home" ? "nav-active" : ""} onClick={() => go("home")}>Home</button>
          <button className={page === "shop" ? "nav-active" : ""} onClick={() => go("shop")}>Shop</button>
          <button onClick={() => go("home")}>About us</button>
          <button onClick={() => go("home")}>Contact</button>
        </nav>
        <div className="header-actions">
          {student ? (
            <div className="user-chip"><UserRound size={16} /><span>{student.name || student.fullName || "Student"}</span><button onClick={logout} title="Log out"><LogOut size={15} /></button></div>
          ) : (
            <button className="login-link" onClick={() => go("login")}>Log in</button>
          )}
          <button className="cart-button" onClick={() => go("cart")}><ShoppingCart size={17} /><span>Cart</span><b>{cartCount}</b></button>
        </div>
      </header>

      <main>
        {page === "home" && <HomePage go={go} />}
        {page === "register" && <RegisterPage go={go} notify={setToast} onRegistered={() => go("login")} />}
        {page === "login" && <LoginPage go={go} notify={setToast} onLogin={(data) => {
          const profile = { name: data.name || data.fullName || data.student?.name || "Student", email: data.email || data.student?.email || "" };
          setStudent(profile); localStorage.setItem("campuscart_student", JSON.stringify(profile)); go("shop");
        }} />}
        {page === "shop" && <ShopPage go={go} addToCart={addToCart} />}
        {page === "cart" && <CartPage items={cartItems} subtotal={subtotal} changeQty={changeQty} go={go} />}
        {page === "checkout" && <CheckoutPage items={cartItems} subtotal={subtotal} go={go} notify={setToast} onComplete={() => { setCart({}); go("shop"); }} />}
      </main>
      <footer className="footer"><span>© 2026 CampusCart</span><span>Fresh finds. Student prices. <Leaf size={13} /></span></footer>
      {toast && <div className="toast"><CheckCircle2 size={17} />{toast}</div>}
    </div>
  );
}

function HomePage({ go }) {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span></span> FRESH FROM THE FARM, MADE FOR CAMPUS</div>
          <h1>Good food.<br /><em>Good mood.</em><br />Great student prices.</h1>
          <p>Your everyday groceries, delivered simply. Fresh picks, hostel essentials and little treats — all in one place.</p>
          <div className="hero-actions"><button className="primary-btn" onClick={() => go("shop")}>Explore groceries <ArrowUpRight size={17} /></button><button className="text-btn" onClick={() => go("register")}>Join CampusCart <ArrowRight size={16} /></button></div>
          <div className="hero-proof"><div className="avatar-stack"><i>R</i><i>S</i><i>A</i></div><span><b>Made for campus life</b><small>Fresh picks, fair prices, easy ordering</small></span></div>
        </div>
        <div className="hero-visual">
          <img className="hero-main-img" src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=90" alt="Fresh vegetables in a grocery market" />
          <div className="hero-image-label"><span className="label-icon"><Leaf size={18} /></span><span><b>Fresh every day</b><small>Picked with care</small></span></div>
          <div className="floating-note"><Sparkles size={17} /><span><b>Student-friendly</b><small>Prices you'll love</small></span></div>
        </div>
      </section>
      <section className="benefits">
        <Benefit icon={<Leaf />} title="Fresh quality" text="Carefully selected daily" />
        <Benefit icon={<Truck />} title="Campus delivery" text="Convenience at your door" />
        <Benefit icon={<ShieldCheck />} title="Easy & secure" text="A simple shopping experience" />
        <Benefit icon={<Headphones />} title="Here to help" text="Support when you need it" />
      </section>
      <section className="home-feature">
        <div><div className="eyebrow">YOUR CAMPUS PANTRY</div><h2>Everything you need.<br /><em>Nothing you don't.</em></h2><p>From breakfast basics to late-night snacks, stock up without leaving your study zone.</p></div>
        <div className="feature-pictures">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=85" alt="Healthy meal" />
          <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=85" alt="Fresh vegetables" />
          <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=85" alt="Fresh bread" />
        </div>
        <button className="primary-btn" onClick={() => go("shop")}>Shop all products <ArrowRight size={17} /></button>
      </section>
      <section className="join-strip"><div><span className="eyebrow">A BETTER WAY TO SHOP ON CAMPUS</span><h2>Your next grocery run starts here.</h2></div><button className="light-btn" onClick={() => go("register")}>Create student account <ArrowUpRight size={17} /></button></section>
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return <div className="benefit-item"><span>{icon}</span><div><b>{title}</b><small>{text}</small></div></div>;
}

function AuthShell({ children, mode, go }) {
  return (
    <div className="auth-layout">
      <div className="auth-art">
        <div className="art-grid"></div>
        <div className="art-orb orb-one"></div><div className="art-orb orb-two"></div>
        <button className="auth-logo" onClick={() => go("home")}><span className="brand-mark"><ShoppingBag size={18} /></span> campus<span>cart</span></button>
        <div className="art-content"><span className="art-kicker">YOUR CAMPUS. YOUR CART.</span><h2>Make room for<br /><em>more good</em> days.</h2><p>Groceries made simple for student life. Shop smart, eat well and spend more time on what matters.</p><div className="art-tags"><span>✦ Fresh finds</span><span>✦ Student prices</span><span>✦ Easy ordering</span></div></div>
        <div className="art-bottom"><span>01 / 03</span><span>FRESH THINKING FOR CAMPUS LIVING</span></div>
      </div>
      <div className="auth-panel">
        <button className="back-home" onClick={() => go("home")}>← Back to home</button>
        {children}
        <div className="auth-foot">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</div>
      </div>
    </div>
  );
}

function RegisterPage({ go, notify, onRegistered }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "", department: "", year: "1", collegeName: "", address: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must contain at least 6 characters.");
    if (!/^\d{10}$/.test(form.phone)) return setError("Enter a valid 10-digit phone number.");
    setBusy(true);
    try {
      const { confirmPassword, ...payload } = form;
      const response = await fetch(`${API}/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, year: Number(payload.year) }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || data.error || "Registration failed. Please check your details.");
      notify(data.message || "Account created successfully.");
      onRegistered();
    } catch (err) { setError(err.message || "Cannot connect to the backend. Check that Spring Boot is running."); }
    finally { setBusy(false); }
  };
  return (
    <AuthShell mode="register" go={go}>
      <div className="auth-heading"><span className="eyebrow">START YOUR CAMPUSCART JOURNEY</span><h1>Create your<br /><em>account.</em></h1><p>One quick sign-up and your campus pantry is sorted.</p></div>
      <form className="auth-form register-form" onSubmit={submit}>
        <div className="form-two"><Field label="Full name" name="name" value={form.name} onChange={update} placeholder="Your full name" required /><Field label="Email address" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required /></div>
        <div className="form-two"><Field label="Phone number" name="phone" value={form.phone} onChange={update} placeholder="10-digit mobile number" required /><Field label="College name" name="collegeName" value={form.collegeName} onChange={update} placeholder="Your college" required /></div>
        <div className="form-two"><Field label="Department" name="department" value={form.department} onChange={update} placeholder="e.g. Computer Science" required /><div className="field"><label htmlFor="year">Current year</label><select id="year" name="year" value={form.year} onChange={update}><option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option></select></div></div>
        <Field label="Hostel / delivery address" name="address" value={form.address} onChange={update} placeholder="Hostel name, room number or address" required />
        <div className="form-two"><Field label="Password" name="password" type="password" value={form.password} onChange={update} placeholder="At least 6 characters" required /><Field label="Confirm password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} placeholder="Re-enter password" required /></div>
        {error && <div className="form-error">{error}</div>}
        <button className="auth-submit" disabled={busy}>{busy ? "Creating account..." : "Create account"} <ArrowRight size={17} /></button>
      </form>
      <p className="auth-switch">Already have an account? <button onClick={() => go("login")}>Log in</button></p>
    </AuthShell>
  );
}

function LoginPage({ go, notify, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch(`${API}/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || data.error || "Invalid email or password.");
      onLogin(data); notify(data.message || "Welcome back!");
    } catch (err) { setError(err.message || "Cannot connect to the backend. Check that Spring Boot is running."); }
    finally { setBusy(false); }
  };
  return (
    <AuthShell mode="login" go={go}>
      <div className="auth-heading login-heading"><span className="eyebrow">WELCOME BACK</span><h1>Good to see<br /><em>you again.</em></h1><p>Log in to pick up where you left off.</p></div>
      <form className="auth-form login-form" onSubmit={submit}>
        <Field label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        <Field label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
        {error && <div className="form-error">{error}</div>}
        <button className="auth-submit" disabled={busy}>{busy ? "Logging in..." : "Log in to CampusCart"} <ArrowRight size={17} /></button>
      </form>
      <p className="auth-switch">New to CampusCart? <button onClick={() => go("register")}>Create an account</button></p>
    </AuthShell>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder, required }) {
  const id = name || label.toLowerCase().replaceAll(" ", "-");
  return <div className="field"><label htmlFor={id}>{label}</label><input id={id} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} /></div>;
}

function ShopPage({ go, addToCart }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = products.filter((p) => (category === "All" || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="shop-page">
      <section className="shop-banner"><div><span className="eyebrow">THE CAMPUS PANTRY</span><h1>Good things,<br /><em>in your basket.</em></h1><p>Everyday essentials and fresh favourites, just a few clicks away.</p></div><div className="shop-banner-image"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=85" alt="Fresh produce" /><span>FRESH PICKS<br /><b>FOR YOU</b></span></div></section>
      <div className="shop-toolbar"><div><span className="eyebrow">BROWSE THE GOOD STUFF</span><h2>Popular products <span>({filtered.length})</span></h2></div><label className="search-box"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your products..." /></label></div>
      <div className="category-row">{categories.map((c) => <button key={c} className={category === c ? "category-active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
      <div className="product-grid">{filtered.map((p) => <article className="product-card" key={p.id}><div className="product-image"><img src={p.image} alt={p.name} loading="lazy" />{p.tag && <span>{p.tag}</span>}<button className="quick-add" onClick={() => addToCart(p)} aria-label={`Add ${p.name}`}><Plus size={18} /></button></div><div className="product-info"><small>{p.category}</small><h3>{p.name}</h3><div className="product-bottom"><span><b>{money(p.price)}</b><small> / {p.unit}</small></span><button onClick={() => addToCart(p)}>Add <Plus size={14} /></button></div></div></article>)}</div>
      {filtered.length === 0 && <div className="empty-state">No products found. Try another search.</div>}
      <div className="shop-help"><span><Leaf size={17} /> Fresh picks for campus living</span><button onClick={() => go("cart")}>View your basket <ArrowRight size={16} /></button></div>
    </div>
  );
}

function CartPage({ items, subtotal, changeQty, go }) {
  return (
    <div className="checkout-page">
      <div className="page-heading"><span className="eyebrow">YOUR CAMPUSCART BASKET</span><h1>Your <em>cart.</em></h1><p>Take a look at your picks before checking out.</p></div>
      {items.length === 0 ? <div className="empty-cart"><ShoppingBag size={36} /><h2>Your basket is waiting.</h2><p>Add a few fresh favourites to get started.</p><button className="primary-btn" onClick={() => go("shop")}>Explore products <ArrowRight size={17} /></button></div> :
        <div className="cart-layout"><div className="cart-list"><div className="cart-list-head"><span>PRODUCT</span><span>QUANTITY</span><span>SUBTOTAL</span></div>{items.map((item) => <div className="cart-line" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-product"><b>{item.name}</b><small>{item.unit}</small></div><div className="qty-control"><button onClick={() => changeQty(item.id, -1)}><Minus size={13} /></button><b>{item.quantity}</b><button onClick={() => changeQty(item.id, 1)}><Plus size={13} /></button></div><b className="line-total">{money(item.price * item.quantity)}</b><button className="remove-item" onClick={() => changeQty(item.id, -item.quantity)} aria-label="Remove item"><Trash2 size={16} /></button></div>)}</div>
          <OrderSummary subtotal={subtotal} go={go} /></div>}
    </div>
  );
}

function OrderSummary({ subtotal, go }) {
  const delivery = subtotal >= 499 ? 0 : 25;
  return <aside className="order-summary"><span className="eyebrow">ORDER SUMMARY</span><h2>Almost yours.</h2><div className="summary-row"><span>Subtotal</span><b>{money(subtotal)}</b></div><div className="summary-row"><span>Delivery</span><b>{delivery === 0 ? "FREE" : money(delivery)}</b></div><div className="summary-row total"><span>Total</span><b>{money(subtotal + delivery)}</b></div><small className="delivery-note">{delivery === 0 ? "You've unlocked free delivery!" : `Add ${money(499 - subtotal)} more for free delivery.`}</small><button className="auth-submit" onClick={() => go("checkout")}>Continue to checkout <ArrowRight size={17} /></button><button className="continue-shopping" onClick={() => go("shop")}>Continue shopping</button></aside>;
}

function CheckoutPage({ items, subtotal, go, notify, onComplete }) {
  const [delivery, setDelivery] = useState({ name: "", phone: "", address: "", notes: "" });
  const [payment, setPayment] = useState("Cash on delivery");
  const [error, setError] = useState("");
  const deliveryFee = subtotal >= 499 ? 0 : 25;
  const total = subtotal + deliveryFee;
  const submit = (e) => {
    e.preventDefault();
    if (!items.length) return setError("Your cart is empty.");
    if (!/^\d{10}$/.test(delivery.phone)) return setError("Enter a valid 10-digit phone number.");
    setError("");
    notify("Demo checkout complete. No order was saved to the backend.");
    onComplete();
  };
  return (
    <div className="checkout-page">
      <div className="page-heading"><span className="eyebrow">ONE LAST STEP</span><h1>Checkout <em>time.</em></h1><p>Where should we bring your groceries?</p></div>
      {items.length === 0 ? <div className="empty-cart"><ShoppingCart size={34} /><h2>Your cart is empty.</h2><button className="primary-btn" onClick={() => go("shop")}>Go shopping <ArrowRight size={17} /></button></div> :
      <form className="checkout-layout" onSubmit={submit}>
        <div className="checkout-form-panel">
          <div className="checkout-section-title"><span>01</span><div><h2>Delivery details</h2><p>We'll bring your order right to you.</p></div></div>
          <div className="form-two"><Field label="Full name" value={delivery.name} onChange={(e) => setDelivery({ ...delivery, name: e.target.value })} placeholder="Your name" required /><Field label="Phone number" value={delivery.phone} onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })} placeholder="10-digit mobile number" required /></div>
          <div className="field"><label htmlFor="delivery-address">Delivery address</label><textarea id="delivery-address" value={delivery.address} onChange={(e) => setDelivery({ ...delivery, address: e.target.value })} placeholder="Hostel, block, room number or full address" required /></div>
          <div className="field"><label htmlFor="delivery-notes">Delivery notes <small>(optional)</small></label><textarea id="delivery-notes" value={delivery.notes} onChange={(e) => setDelivery({ ...delivery, notes: e.target.value })} placeholder="Any directions for finding you?" /></div>
          <div className="checkout-section-title payment-title"><span>02</span><div><h2>Payment method</h2><p>Choose how you'd like to pay.</p></div></div>
          <div className="payment-options">{["Cash on delivery", "Pay online (demo)"].map((p) => <label className={payment === p ? "payment-option selected" : "payment-option"} key={p}><input type="radio" name="payment" checked={payment === p} onChange={() => setPayment(p)} /><CreditCard size={18} /><span>{p}</span><CheckCircle2 size={17} /></label>)}</div>
          {error && <div className="form-error">{error}</div>}
          <button className="auth-submit place-order" type="submit">Place demo order <ArrowRight size={17} /></button>
          <p className="demo-note">Demo only: this checkout does not charge a payment method or save an order.</p>
        </div>
        <aside className="order-summary checkout-summary"><span className="eyebrow">YOUR ORDER</span><h2>Order summary</h2><div className="mini-order-items">{items.map((item) => <div key={item.id}><img src={item.image} alt="" /><span><b>{item.name}</b><small>Qty: {item.quantity}</small></span><strong>{money(item.price * item.quantity)}</strong></div>)}</div><div className="summary-row"><span>Subtotal</span><b>{money(subtotal)}</b></div><div className="summary-row"><span>Delivery</span><b>{deliveryFee ? money(deliveryFee) : "FREE"}</b></div><div className="summary-row total"><span>Total</span><b>{money(total)}</b></div><div className="secure-note"><ShieldCheck size={17} /> Your details are used for this demo checkout only.</div></aside>
      </form>}
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Shop from './components/Shop'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { About, FAQ, Contact } from './components/StaticPages'
import { apiGet, apiPost } from './api'

function Layout({ children, lang, setLang, cartCount }){
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      <Navbar lang={lang} setLang={setLang} cartCount={cartCount} />
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      <Footer lang={lang} />
    </div>
  )
}

export default function App(){
  const [lang, setLang] = useState('ar')
  const [cart, setCart] = useState(()=>{
    try { return JSON.parse(localStorage.getItem('cart')||'[]') } catch { return [] }
  })
  const [phone, setPhone] = useState(()=>localStorage.getItem('phone')||'')

  useEffect(()=>localStorage.setItem('cart', JSON.stringify(cart)),[cart])
  useEffect(()=>localStorage.setItem('phone', phone||''),[phone])

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(x => x.id===p.id)
      if (ex) return prev.map(x => x.id===p.id? {...x, quantity: x.quantity+1 } : x)
      return [...prev, { id: p.id, name: p.name, price_syp: p.price_syp, price_usd: p.price_usd, quantity: 1 }]
    })
  }

  const updateQty = (id, q) => setCart(prev => prev.map(x => x.id===id? {...x, quantity:q}:x))
  const clearCart = () => setCart([])

  return (
    <Layout lang={lang} setLang={setLang} cartCount={cart.length}>
      <Routes>
        <Route path="/" element={<Home lang={lang} phone={phone} />} />
        <Route path="/shop" element={<Shop lang={lang} />} />
        <Route path="/shop/:id" element={<ProductDetails lang={lang} addToCart={addToCart} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/contact" element={<Contact lang={lang} />} />
        <Route path="/faq" element={<FAQ lang={lang} />} />
        <Route path="/cart" element={<Cart lang={lang} cart={cart} updateQty={updateQty} checkout={()=>window.location.href='/checkout'} />} />
        <Route path="/checkout" element={<Checkout lang={lang} cart={cart} phone={phone} setPhone={setPhone} clearCart={clearCart} />} />
      </Routes>
    </Layout>
  )
}

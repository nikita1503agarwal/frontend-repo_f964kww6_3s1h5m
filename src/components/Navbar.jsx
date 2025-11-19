import { useEffect, useState } from 'react'
import { ShoppingBag, Globe } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const labels = {
  ar: {
    home: 'الرئيسية', shop: 'المتجر', about: 'من نحن', contact: 'تواصل', faq: 'الأسئلة والسياسات', cart: 'السلة', brand: 'Handmade by Rama'
  },
  en: {
    home: 'Home', shop: 'Shop', about: 'About', contact: 'Contact', faq: 'FAQ / Policies', cart: 'Cart', brand: 'Handmade by Rama'
  }
}

export default function Navbar({ lang = 'ar', setLang, cartCount = 0 }) {
  const t = labels[lang]
  const [rtl, setRtl] = useState(lang === 'ar')
  const location = useLocation()

  useEffect(() => { setRtl(lang === 'ar') }, [lang])

  return (
    <header className={`w-full sticky top-0 z-30 backdrop-blur bg-white/80 border-b ${rtl ? 'rtl' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-wide text-amber-800">{t.brand}</Link>
        <nav className="hidden md:flex items-center gap-6 text-amber-900">
          <Link to="/" className={location.pathname==='/'?'text-amber-700 font-medium':''}>{t.home}</Link>
          <Link to="/shop" className={location.pathname.startsWith('/shop')?'text-amber-700 font-medium':''}>{t.shop}</Link>
          <Link to="/about" className={location.pathname.startsWith('/about')?'text-amber-700 font-medium':''}>{t.about}</Link>
          <Link to="/contact" className={location.pathname.startsWith('/contact')?'text-amber-700 font-medium':''}>{t.contact}</Link>
          <Link to="/faq" className={location.pathname.startsWith('/faq')?'text-amber-700 font-medium':''}>{t.faq}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang==='ar'?'en':'ar')} className="text-amber-900 hover:text-amber-700 flex items-center gap-1">
            <Globe size={18} /> {lang==='ar'?'EN':'AR'}
          </button>
          <Link to="/cart" className="relative inline-flex items-center">
            <ShoppingBag />
            {cartCount>0 && <span className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full text-xs px-1">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  )
}

import { useEffect, useState } from 'react'
import { apiGet } from '../api'

export default function Home({ lang='ar', phone='' }){
  const [featured, setFeatured] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [notice, setNotice] = useState(null)
  const rtl = lang==='ar'

  useEffect(() => {
    apiGet('/api/products', { featured: true }).then(d => setFeatured(d.items || [])).catch(()=>{})
    apiGet('/api/products', { new_arrival: true }).then(d => setNewArrivals(d.items || [])).catch(()=>{})
    if (phone) {
      apiGet('/api/orders/notifications', { phone }).then(setNotice).catch(()=>{})
    }
  }, [phone])

  return (
    <div dir={rtl?'rtl':'ltr'} className="text-amber-900">
      {notice?.on_delivery && (
        <div className="bg-amber-100 border border-amber-200 text-amber-900 p-3 text-sm rounded mb-4">
          {rtl? 'طلبك قيد التوصيل. موعد التوصيل المتوقع: ' : 'Your order is on the way. Expected delivery: '}<b>{notice.expected_delivery_date || '—'}</b>
        </div>
      )}

      <section className="relative bg-gradient-to-br from-amber-50 to-white rounded-xl overflow-hidden border">
        <div className="p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-serif text-amber-900">{rtl? 'مجوهرات يدوية بأناقة بسيطة' : 'Elegant, Handmade Jewelry'}</h1>
          <p className="mt-3 opacity-80 max-w-xl">{rtl? 'تصاميم بسيطة ودافئة بألوان البيج والذهبي.' : 'Minimal designs in warm beige and gold tones.'}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">{rtl? 'منتجات مميزة' : 'Featured Products'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map(p => <ProductCard key={p.id} p={p} rtl={rtl} />)}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">{rtl? 'وصل حديثاً' : 'New Arrivals'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals.map(p => <ProductCard key={p.id} p={p} rtl={rtl} />)}
        </div>
      </section>

      <section className="mt-12 bg-amber-50 border rounded-lg p-6">
        <h3 className="text-lg font-semibold">{rtl? 'حكاية العلامة' : 'Our Story'}</h3>
        <p className="opacity-80 mt-2">{rtl? 'تُصنع كل قطعة بحب في سوريا، بروح من البساطة والدفء.' : 'Each piece is handcrafted in Syria with a spirit of warmth and simplicity.'}</p>
      </section>

      <section className="mt-12">
        <h3 className="text-lg font-semibold">Instagram</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {Array.from({length:6}).map((_,i)=> <div key={i} className="aspect-square bg-amber-100 rounded" />)}
        </div>
      </section>
    </div>
  )
}

function ProductCard({ p, rtl }){
  const usd = p.price_usd?.toFixed(2)
  const syp = p.price_syp?.toLocaleString('en-US')
  return (
    <a href={`/shop/${p.id}`} className="block border rounded-lg overflow-hidden bg-white hover:shadow transition">
      <div className="aspect-square bg-amber-100" />
      <div className="p-3">
        <div className="font-medium text-amber-900">{p.name}</div>
        <div className="text-sm opacity-80">{rtl? 'السعر':'Price'}: {syp} SYP · ~${usd} USD</div>
      </div>
    </a>
  )
}

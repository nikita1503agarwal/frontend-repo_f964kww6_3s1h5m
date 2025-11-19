import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../api'

export default function ProductDetails({ lang='ar', addToCart }){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const rtl = lang==='ar'

  useEffect(() => {
    apiGet(`/api/products/${id}`).then(setP)
  }, [id])

  if (!p) return <div className="py-10 text-center">{rtl?'جار التحميل...':'Loading...'}</div>

  return (
    <div dir={rtl?'rtl':'ltr'} className="text-amber-900 grid md:grid-cols-2 gap-6">
      <div className="aspect-square rounded border bg-amber-100" />
      <div>
        <h1 className="text-2xl font-semibold">{p.name}</h1>
        <div className="opacity-80 mt-2">{p.description}</div>
        <div className="mt-3 text-lg">{rtl? 'السعر':'Price'}: {p.price_syp?.toLocaleString('en-US')} SYP · ~${p.price_usd?.toFixed(2)} USD</div>
        <button onClick={()=>addToCart(p)} className="mt-4 px-5 py-2 rounded bg-amber-700 text-white hover:bg-amber-800">{rtl? 'أضف إلى السلة':'Add to Cart'}</button>
      </div>
    </div>
  )
}

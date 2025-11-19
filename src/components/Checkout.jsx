import { useEffect, useMemo, useState } from 'react'
import { apiGet, apiPost } from '../api'

const cities = ['Damascus','Aleppo','Homs','Hama','Latakia','Tartus','Idlib','Daraa','Sweida','Deir ez-Zor','Raqqa','Hasakah']

export default function Checkout({ lang='ar', cart=[], phone, setPhone, clearCart }){
  const rtl = lang==='ar'
  const [addresses, setAddresses] = useState([])
  const [useSaved, setUseSaved] = useState('')
  const [fullName, setFullName] = useState('')
  const [city, setCity] = useState(cities[0])
  const [street, setStreet] = useState('')
  const [notes, setNotes] = useState('')
  const [placing, setPlacing] = useState(false)
  const totalSyp = useMemo(()=>cart.reduce((s,i)=>s+i.price_syp*i.quantity,0),[cart])
  const totalUsd = useMemo(()=>cart.reduce((s,i)=>s+i.price_usd*i.quantity,0),[cart])

  useEffect(() => {
    if (phone) apiGet('/api/user/'+encodeURIComponent(phone)+'/addresses').then(d=>setAddresses(d.addresses||[]))
  }, [phone])

  useEffect(() => {
    if (!useSaved) return
    const a = addresses.find(x => (x.id||x.street)===useSaved)
    if (a){
      setFullName(a.full_name)
      setCity(a.city)
      setStreet(a.street)
    }
  }, [useSaved])

  const validatePhone = (p) => {
    const v = p.trim()
    if (v.startsWith('+963')) return true
    if (v.startsWith('09') && v.length===10) return true
    return false
  }

  const placeOrder = async () => {
    if (cart.length===0) return
    if (!validatePhone(phone)) { alert(rtl?'يرجى إدخال رقم سوري صحيح':'Please enter a valid Syrian phone'); return }
    setPlacing(true)
    try{
      const body = {
        full_name: fullName || 'Guest',
        phone,
        city,
        street,
        notes,
        items: cart.map(i=>({ product_id: i.id, quantity: i.quantity }))
      }
      const res = await apiPost('/api/orders', body)
      clearCart()
      alert(rtl?'تم إنشاء الطلب بحالة انتظار الدفع عند الاستلام':'Order placed with status Pending COD')
    }catch(e){
      alert('Error')
    }finally{
      setPlacing(false)
    }
  }

  return (
    <div dir={rtl?'rtl':'ltr'} className="text-amber-900">
      <h1 className="text-2xl font-semibold mb-4">{rtl?'الدفع عند الاستلام':'Cash on Delivery'}</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-3">
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder={rtl?'+963 رقم الهاتف':'Phone (+963...)'} className="w-full border rounded px-3 py-2" />
            {addresses.length>0 && (
              <select value={useSaved} onChange={e=>setUseSaved(e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="">{rtl?'اختر عنواناً محفوظاً':'Select saved address'}</option>
                {addresses.map((a,i)=> <option key={i} value={a.id||a.street}>{a.full_name} - {a.city} - {a.street}</option>)}
              </select>
            )}
            <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder={rtl?'الاسم الكامل':'Full Name'} className="w-full border rounded px-3 py-2" />
            <select value={city} onChange={e=>setCity(e.target.value)} className="w-full border rounded px-3 py-2">
              {cities.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={street} onChange={e=>setStreet(e.target.value)} placeholder={rtl?'الشارع / البناء / الشقة':'Street / Building / Apartment'} className="w-full border rounded px-3 py-2" />
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder={rtl?'ملاحظات (اختياري)':'Notes (optional)'} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="bg-amber-50 border rounded p-4 h-fit">
          <div className="font-medium mb-2">{rtl?'مراجعة الطلب':'Order Review'}</div>
          <div className="space-y-2">
            {cart.map(i => (
              <div key={i.id} className="flex justify-between text-sm">
                <span>{i.name} × {i.quantity}</span>
                <span>{(i.price_syp*i.quantity).toLocaleString('en-US')} SYP</span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t pt-2 flex justify-between font-medium">
            <span>{rtl?'الإجمالي':'Total'}</span>
            <span>{totalSyp.toLocaleString('en-US')} SYP · ~${totalUsd.toFixed(2)} USD</span>
          </div>
          <div className="mt-3 text-sm opacity-80">{rtl?'الدفع عند الاستلام داخل سوريا فقط.':'Cash on delivery within Syria only.'}</div>
          <button disabled={placing} onClick={placeOrder} className="mt-4 w-full px-5 py-2 rounded bg-amber-700 text-white disabled:opacity-60">{placing?(rtl?'جاري الإرسال...':'Placing...'):(rtl?'إرسال الطلب':'Place Order')}</button>
        </div>
      </div>
    </div>
  )
}

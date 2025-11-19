import { useMemo } from 'react'

export default function Cart({ lang='ar', cart=[], updateQty, checkout }){
  const rtl = lang==='ar'
  const totalSyp = useMemo(()=>cart.reduce((s,i)=>s+i.price_syp*i.quantity,0),[cart])
  const totalUsd = useMemo(()=>cart.reduce((s,i)=>s+i.price_usd*i.quantity,0),[cart])
  return (
    <div dir={rtl?'rtl':'ltr'} className="text-amber-900">
      <h1 className="text-2xl font-semibold mb-4">{rtl?'السلة':'Cart'}</h1>
      {cart.length===0 && <div className="opacity-70">{rtl?'السلة فارغة':'Your cart is empty'}</div>}
      <div className="space-y-3">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-3 border rounded p-3">
            <div className="w-16 h-16 bg-amber-100 rounded" />
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm opacity-80">{item.price_syp.toLocaleString('en-US')} SYP · ~${item.price_usd.toFixed(2)} USD</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>updateQty(item.id, Math.max(1,item.quantity-1))} className="px-2 border rounded">-</button>
              <div>{item.quantity}</div>
              <button onClick={()=>updateQty(item.id, item.quantity+1)} className="px-2 border rounded">+</button>
            </div>
          </div>
        ))}
      </div>
      {cart.length>0 && (
        <div className="mt-4 border-t pt-4">
          <div className="mb-2">{rtl?'الإجمالي':'Total'}: {totalSyp.toLocaleString('en-US')} SYP · ~${totalUsd.toFixed(2)} USD</div>
          <button onClick={checkout} className="px-5 py-2 rounded bg-amber-700 text-white">{rtl?'إتمام الشراء':'Checkout'}</button>
        </div>
      )}
    </div>
  )
}

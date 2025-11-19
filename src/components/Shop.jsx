import { useEffect, useState } from 'react'
import { apiGet } from '../api'

const categories = [
  { id: 'all', ar: 'الكل', en: 'All' },
  { id: 'necklaces', ar: 'قلادات', en: 'Necklaces' },
  { id: 'bracelets', ar: 'أساور', en: 'Bracelets' },
  { id: 'earrings', ar: 'أقراط', en: 'Earrings' },
  { id: 'rings', ar: 'خواتم', en: 'Rings' },
]

export default function Shop({ lang='ar' }){
  const rtl = lang==='ar'
  const [items, setItems] = useState([])
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('new')

  useEffect(() => {
    const params = {}
    if (category !== 'all') params.category = category
    if (search) params.search = search
    if (sort) params.sort = sort
    apiGet('/api/products', params).then(d => setItems(d.items||[]))
  }, [category, search, sort])

  return (
    <div dir={rtl?'rtl':'ltr'} className="text-amber-900">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        {categories.map(c => (
          <button key={c.id} onClick={()=>setCategory(c.id)} className={`px-3 py-1 rounded-full border ${category===c.id?'bg-amber-100 border-amber-300':''}`}>
            {rtl? c.ar : c.en}
          </button>
        ))}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={rtl?'بحث...':'Search...'} className="ml-auto px-3 py-2 border rounded w-full md:w-64" />
        <select value={sort} onChange={e=>setSort(e.target.value)} className="px-3 py-2 border rounded">
          <option value="new">{rtl?'الأحدث':'Newest'}</option>
          <option value="name_asc">{rtl?'الاسم تصاعدي':'Name A-Z'}</option>
          <option value="name_desc">{rtl?'الاسم تنازلي':'Name Z-A'}</option>
          <option value="price_asc">{rtl?'السعر الأقل':'Price Low'}</option>
          <option value="price_desc">{rtl?'السعر الأعلى':'Price High'}</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(p => <Card key={p.id} p={p} rtl={rtl} />)}
      </div>
    </div>
  )
}

function Card({ p, rtl }){
  return (
    <a href={`/shop/${p.id}`} className="block border rounded-lg overflow-hidden bg-white hover:shadow transition">
      <div className="aspect-square bg-amber-100" />
      <div className="p-3">
        <div className="font-medium text-amber-900">{p.name}</div>
        <div className="text-sm opacity-80">{rtl? 'السعر':'Price'}: {p.price_syp?.toLocaleString('en-US')} SYP · ~${p.price_usd?.toFixed(2)} USD</div>
      </div>
    </a>
  )
}

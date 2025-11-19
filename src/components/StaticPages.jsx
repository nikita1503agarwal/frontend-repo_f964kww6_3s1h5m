export function About({ lang='ar' }){
  const rtl = lang==='ar'
  return (
    <div dir={rtl?'rtl':'ltr'} className="prose max-w-none prose-amber">
      <h1>{rtl? 'من نحن':'About'}</h1>
      <p>{rtl? 'Handmade by Rama علامة سورية للمجوهرات اليدوية بتصاميم بسيطة ودافئة.':'Handmade by Rama is a Syrian handmade jewelry brand with minimal, warm designs.'}</p>
    </div>
  )
}

export function FAQ({ lang='ar' }){
  const rtl = lang==='ar'
  return (
    <div dir={rtl?'rtl':'ltr'} className="prose max-w-none prose-amber">
      <h1>{rtl? 'الأسئلة والسياسات':'FAQ / Policies'}</h1>
      <h3>{rtl?'الشحن':'Shipping'}</h3>
      <p>{rtl? 'داخل سوريا فقط. الدفع عند الاستلام.':'Within Syria only. Cash on delivery (COD).'}
      </p>
      <h3>{rtl?'الإرجاع':'Return Policy'}</h3>
      <p>{rtl? 'يمكن الإرجاع خلال 3 أيام إذا كانت الحالة كما هي.':'Returns accepted within 3 days if item is in original condition.'}</p>
      <h3>{rtl?'العناية':'Care Guide'}</h3>
      <p>{rtl? 'احفظ القطع بعيداً عن الماء والعطور لتدوم أطول.':'Keep pieces away from water and perfumes for longevity.'}</p>
    </div>
  )
}

export function Contact({ lang='ar' }){
  const rtl = lang==='ar'
  return (
    <div dir={rtl?'rtl':'ltr'} className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">{rtl? 'تواصل معنا':'Contact Us'}</h1>
      <form className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder={rtl?'الاسم':'Name'} />
        <input className="w-full border rounded px-3 py-2" placeholder={rtl?'البريد أو الهاتف':'Email or Phone'} />
        <textarea className="w-full border rounded px-3 py-2" rows={4} placeholder={rtl?'رسالتك':'Your message'} />
        <button type="button" className="px-5 py-2 rounded bg-amber-700 text-white">{rtl?'إرسال':'Send'}</button>
      </form>
      <div className="mt-6 opacity-80">Instagram / Facebook / WhatsApp</div>
    </div>
  )
}

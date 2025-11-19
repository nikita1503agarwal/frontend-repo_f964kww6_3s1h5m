export default function Footer({ lang='ar' }){
  const t = {
    ar: {
      rights: '© جميع الحقوق محفوظة', brand: 'Handmade by Rama', follow: 'تابعونا',
    },
    en: {
      rights: '© All rights reserved', brand: 'Handmade by Rama', follow: 'Follow us',
    }
  }[lang]

  return (
    <footer className="bg-amber-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-amber-900">
        <div>
          <div className="font-semibold text-amber-800">{t.brand}</div>
          <p className="text-sm mt-2 opacity-80">Handmade jewelry crafted with love in Syria.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">{t.follow}</div>
          <div className="flex gap-3">
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">WhatsApp</a>
          </div>
        </div>
        <div className="text-sm md:text-right">{t.rights}</div>
      </div>
    </footer>
  )
}

import { useState } from 'react';
import InputField from './components/InputField.jsx';
import Card from './components/Card.jsx';
import ResultRow from './components/ResultRow.jsx';

export default function App() {
  const [input, setInput] = useState({hpp:'',markup:'',hargaJual:'',diskon:'',biayaAdmin:'',biayaIklan:''});
  const n=v=>Number(v)||0;
  const f=v=>Number(v).toLocaleString('id-ID');

  const h=n(input.hargaJual)-n(input.diskon);
  const g=h-n(input.hpp);
  const net=g-n(input.biayaAdmin)-n(input.biayaIklan);
  const m=n(input.hpp)?(g/n(input.hpp))*100:0;
  const mp=n(input.hpp)*(1+n(input.markup)/100);
  const roas=n(input.biayaIklan)?(h/n(input.biayaIklan))*100:0;
  const on=e=>setInput({...input,[e.target.name]:e.target.value});

  return <div className='min-h-screen flex justify-center p-4'>
    <div className='w-full max-w-3xl grid gap-4'>
      <Card title='Input Data Produk'>
        <div className='grid grid-cols-2 gap-4'>
          <InputField label='HPP' name='hpp' value={input.hpp} onChange={on} suffix='Rp'/>
          <InputField label='Markup' name='markup' value={input.markup} onChange={on} suffix='%'/>
          <InputField label='Harga Jual' name='hargaJual' value={input.hargaJual} onChange={on} suffix='Rp'/>
          <InputField label='Diskon' name='diskon' value={input.diskon} onChange={on} suffix='Rp'/>
          <InputField label='Biaya Admin' name='biayaAdmin' value={input.biayaAdmin} onChange={on} suffix='Rp'/>
          <InputField label='Biaya Iklan' name='biayaIklan' value={input.biayaIklan} onChange={on} suffix='Rp'/>
        </div>
      </Card>

      <Card title='Hasil Perhitungan'>
        <ResultRow label='Harga Setelah Diskon' value={`Rp ${f(h)}`}/>
        <ResultRow label='Gross Profit' value={`Rp ${f(g)}`}/>
        <ResultRow label='Net Profit' value={`Rp ${f(net)}`}/>
        <ResultRow label='Margin' value={`${m.toFixed(2)} %`}/>
        <ResultRow label='Harga Sesuai Markup' value={`Rp ${f(mp)}`}/>
        <ResultRow label='ROAS' value={`${roas.toFixed(2)} %`}/>
      </Card>
    </div>
  </div>;
}
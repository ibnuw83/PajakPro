import { type InfoContentItem } from '@/lib/types';

const INFO_CONTENT_KEY = 'pajakpro-info-content';

export const initialInfoContent: InfoContentItem[] = [
  {
    id: 'pph21',
    title: 'PPh 21',
    description: 'Informasi komprehensif mengenai Pajak Penghasilan Pasal 21.',
    sections: [
      {
        trigger: 'Dasar Hukum',
        content: `UU No. 7/1983 s.t.d.t.d UU No. 7 TAHUN 2021 (UU HPP);PP No. 58 TAHUN 2023;PERATURAN MENTERI KEUANGAN REPUBLIK INDONESIA NOMOR 168 TAHUN 2023;PERATURAN DIREKTUR JENDERAL PAJAK NOMOR PER-2/PJ/2024`,
        type: 'list',
      },
      {
        trigger: 'Objek Pajak',
        content: `Penghasilan yang diterima oleh wajib pajak orang pribadi sehubungan dengan pekerjaan, jasa, atau kegiatan, termasuk:|Gaji, upah, tunjangan, dan pembayaran lain sejenisnya|Honorarium, uang saku, dan imbalan sejenisnya|Hadiah atau penghargaan|Dan lain-lain`,
        type: 'paragraph',
      },
      {
        trigger: 'Penghasilan Tidak Kena Pajak (PTKP)',
        content: `Wajib Pajak Orang Pribadi;Rp 54.000.000|Tambahan untuk Wajib Pajak kawin;Rp 4.500.000|Tambahan untuk setiap tanggungan (maks. 3);Rp 4.500.000`,
        type: 'table',
      },
      {
        trigger: 'Tarif Pajak (Pasal 17)',
        content: `sampai dengan Rp60.000.000;5%|di atas Rp60.000.000 s.d. Rp250.000.000;15%|di atas Rp250.000.000 s.d. Rp500.000.000;25%|di atas Rp500.000.000 s.d. Rp5.000.000.000;30%|di atas Rp5.000.000.000;35%`,
        type: 'table',
      },
       {
        trigger: 'Catatan Tambahan',
        content: `Bagi Wajib Pajak yang tidak memiliki NPWP, dikenakan tarif 20% lebih tinggi.`,
        type: 'paragraph',
      }
    ],
  },
   {
    id: 'pph22',
    title: 'PPh 22',
    description: 'Informasi komprehensif mengenai Pajak Penghasilan Pasal 22.',
    sections: [],
   },
   {
    id: 'pph23',
    title: 'PPh 23',
    description: 'Informasi komprehensif mengenai Pajak Penghasilan Pasal 23.',
    sections: [],
   },
    {
    id: 'pasal4ayat2',
    title: 'Pasal 4 ayat 2',
    description: 'Informasi komprehensif mengenai PPh Final Pasal 4 ayat 2.',
    sections: [],
   },
    {
    id: 'ppn',
    title: 'PPN',
    description: 'Informasi komprehensif mengenai Pajak Pertambahan Nilai.',
    sections: [],
   }
];


export const getInfoContent = (): InfoContentItem[] => {
  if (typeof window === 'undefined') {
      return initialInfoContent;
  }
  try {
      const storedData = localStorage.getItem(INFO_CONTENT_KEY);
      if (storedData) {
          return JSON.parse(storedData);
      } else {
          localStorage.setItem(INFO_CONTENT_KEY, JSON.stringify(initialInfoContent));
          return initialInfoContent;
      }
  } catch (error) {
      console.error("Failed to parse info content from localStorage", error);
      return initialInfoContent;
  }
};


export const updateInfoContent = (newData: InfoContentItem[]) => {
   if (typeof window !== 'undefined') {
      localStorage.setItem(INFO_CONTENT_KEY, JSON.stringify(newData));
   }
};

export const getInfoContentById = (id: string): InfoContentItem | undefined => {
    const data = getInfoContent();
    return data.find(item => item.id === id);
}

export const updateInfoContentById = (id: string, updatedItem: InfoContentItem) => {
    const data = getInfoContent();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = updatedItem;
        updateInfoContent(data);
    }
}

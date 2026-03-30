// Fungsi untuk memperbarui beberapa properti dinamis dalam array objek (misalnya meletakan po_no di setiap item)
export const updateUniqueCodeInItemDetail = (items: any[], properties: { [key: string]: any }): any[] => {
  return items.map((item: any) => {
    return { ...item, ...properties };
  });
};
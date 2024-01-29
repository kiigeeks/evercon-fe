// Function format rupiah
export const formatRupiah = (angka) => {
    // console.log(angka);
    if (angka === undefined) {return "Rp 0"}
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  
    return formatter.format(angka);
}
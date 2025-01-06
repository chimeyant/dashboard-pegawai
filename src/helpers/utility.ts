export function formatToRupiah(value: string | number): string {
  // Jika nilai tidak valid, kembalikan 'Rp0'
  if (!value) return "";

  // Pastikan hanya angka yang diformat
  const numericValue = String(value).replace(/[^0-9]/g, "");

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(numericValue));
}

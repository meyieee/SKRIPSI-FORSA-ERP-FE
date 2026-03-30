export const normalizeName = (raw: any) => {
  const s = String(raw ?? '')

  // Hapus " - " sebagai separator (yang biasanya bikin rancu)
  // contoh: "Eduard - Salindeho" -> "Eduard Salindeho"
  // contoh: "Eduard Salindeho - 254875" -> "Eduard Salindeho 254875" (atau kalau mau hilang id, lihat catatan di bawah)
  const noHyphenSep = s.replace(/\s*-\s*/g, ' ')

  // Rapihkan spasi berlebih
  return noHyphenSep.replace(/\s+/g, ' ').trim()
}

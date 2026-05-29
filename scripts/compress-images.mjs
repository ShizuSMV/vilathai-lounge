// Lance avec (dev server arrêté) : node scripts/compress-images.mjs
// Nécessite : npm install sharp -D
import sharp from 'sharp'
import { readdirSync, statSync, mkdirSync, copyFileSync } from 'fs'
import { join } from 'path'

const SRC  = './src/assets/img'
const OUT  = './src/assets/img-compressed'  // copie compressée ici, remplace manuellement
const QUALITY = 75

mkdirSync(OUT, { recursive: true })
const files = readdirSync(SRC).filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))

let totalBefore = 0, totalAfter = 0

for (const file of files) {
  const input  = join(SRC, file)
  const output = join(OUT, file)
  const before = statSync(input).size
  totalBefore += before

  try {
    const buf = await sharp(input).webp({ quality: QUALITY, effort: 6 }).toBuffer()
    const after = buf.length
    totalAfter += after

    if (after < before) {
      const { writeFileSync } = await import('fs')
      writeFileSync(output, buf)
      const saved = Math.round((1 - after / before) * 100)
      console.log(`✓ ${file.padEnd(38)} ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB  (-${saved}%)`)
    } else {
      totalAfter -= after
      totalAfter += before
      console.log(`= ${file.padEnd(38)} déjà optimisé`)
    }
  } catch (e) {
    totalAfter -= before
    totalAfter += before
    console.error(`✗ ${file}: ${e.message}`)
  }
}

const totalSaved = Math.round((1 - totalAfter / totalBefore) * 100)
console.log(`\n→ Total : ${Math.round(totalBefore/1024)}KB → ${Math.round(totalAfter/1024)}KB  (-${totalSaved}%)`)


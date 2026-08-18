const MBX_HOST = 'www.mbx.bg'

export type MbxImageSize = 256 | 512 | 1024 | 1920

/**
 * Switches only MBX image endpoints to the requested responsive size.
 * Query strings (including the cache-busting `unique` value) are preserved.
 */
export function getMbxImageAtSize(source: string, size: MbxImageSize) {
  if (!source.includes(MBX_HOST)) return source
  return source.replace(/\/image_\d+(?=\?|$)/, `/image_${size}`)
}

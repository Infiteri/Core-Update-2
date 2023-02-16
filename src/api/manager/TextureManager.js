import { Debug } from '../core.js'
import { Texture } from '../texture/Texture.js'

export class TextureManager {
  /** @type {Object.<string, Texture>} */
  static textures = {}

  static GetTexture(name) {
    const texture = TextureManager.textures[name]

    if (texture) {
      return texture
    } else {
      Debug.CFatal('Unable to get texture: ' + name)
    }
  }

  /**
   * @param {Texture} texture
   */
  static LoadTextures(name, src) {
    const exists = TextureManager.textures[name]

    if (exists) {
      Debug.CWarn('cannot load texture: ' + name + ' found duplicate')
      return
    } else {
      //Doesn't exist so add it
      TextureManager.textures[name] = new Texture(src)
    }
  }
}

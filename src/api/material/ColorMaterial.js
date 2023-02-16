import { ShaderManager } from '../core.js'
import { Color } from '../graphics/Color.js'
import { math } from '../math/math.js'
import { Material } from './Material.js'

export class ColorMaterial extends Material {
  /**
   *
   * @param {string} name
   * @param {Color} color
   */
  constructor(name, color = new Color(255, 255, 255, 1)) {
    super(name)

    this.color = color

    this.shader = ShaderManager.GetShader('ColorShader')
  }

  Init() {}

  Upload(node) {
    super.Upload(node)
  }

  Render() {
    this.shader.Use()
    this.shader.UploadVec4v('uColor', this.color.ToFloat32Array())
  }
}

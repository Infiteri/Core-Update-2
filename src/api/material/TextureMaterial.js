import { ShaderManager } from '../core.js'
import { Color } from '../graphics/Color.js'
import { TextureManager } from '../manager/TextureManager.js'
import { Material } from './Material.js'

export class TextureMaterial extends Material {
  constructor(name, textureName, tint = new Color(255, 255, 255, 1)) {
    super(name)

    this.shader = ShaderManager.GetShader('TextureShader')

    this.texture = TextureManager.GetTexture(textureName)

    this.tint = tint
  }

  Init() {}

  Upload(node) {
    super.Upload(node)
  }

  Render() {
    this.shader.Use()

    this.shader.UploadVec4v('uTint', this.tint.ToFloat32Array())
    this.texture.ActivateAndBind(0)
    this.texture.UploadUnit(this.shader)
  }
}

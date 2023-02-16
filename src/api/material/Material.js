import { math } from '../math/math.js'

export class Material {
  constructor(name) {
    this.name = name

    this.shader
  }

  Init() {}

  Upload(node) {
    node.UploadData(
      this.shader,
      math.Matrix4x4.Multiply(node.parent.worldMatrix, node.worldMatrix)
    )
  }

  Render() {}
}

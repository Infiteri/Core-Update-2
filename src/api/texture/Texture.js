import { gl } from '../core.js'

export class Texture {
  static unit = -1

  constructor(src) {
    //Update unit index
    Texture.unit++

    this.handler = gl.createTexture()
    this.Bind()

    //Tex it
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([255, 255, 255, 255])
    )

    this.image = new Image()
    this.image.onload = this.ImageHandler.bind(this)
    this.image.src = src
  }

  UploadUnit(shader) {
    shader.Upload1i('sampler', Texture.unit)
  }

  /** @private */
  ImageHandler() {
    this.Bind()

    //Get the image size
    const { width, height } = this.image
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      this.image
    )

    if (this.IsVPowerOf2(width) && this.IsVPowerOf2(height)) {
      gl.generateMipmap(gl.TEXTURE_2D)
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }

    //Min / Mag filter for both
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  }

  /** @private */
  IsVPowerOf2(v) {
    return (v & (v - 1)) === 0
  }

  Bind() {
    gl.bindTexture(gl.TEXTURE_2D, this.handler)
  }

  Unbind() {
    gl.bindTexture(gl.TEXTURE_2D, undefined)
  }

  ActivateAndBind() {
    gl.activeTexture(gl.TEXTURE0 + Texture.unit)
    this.Bind()
  }
}

import * as core from '../../api/core.js'
import { Color } from '../graphics/Color.js'
import { MaterialManager } from '../manager/MaterialManager.js'
import { TextureManager } from '../manager/TextureManager.js'
import { ColorMaterial } from '../material/ColorMaterial.js'
import { TextureMaterial } from '../material/TextureMaterial.js'
import { Node2D } from '../objects/Node2D.js'

export class Mesh extends Node2D {
  static nameID = 0

  constructor(name = 'Mesh' + Mesh.nameID) {
    super(name)

    //Graphics
    this.color = new Color(0, 125, 255, 1)

    //This makes it easy to reuse (and makes it more performant) resources
    TextureManager.LoadTextures('crate', '/assets/crate.png') //Load the texture
    MaterialManager.LoadMaterial(
      //Use the texture that was just loaded
      new TextureMaterial('Color', 'crate', this.color)
    )

    this.material = MaterialManager.GetMaterial('Color')

    this.size = 50
    this.buffer = new core.Buffer(5)
  }

  Init() {
    this.data = [
      0,
      0,
      0,
      0,
      0,

      0,
      this.size,
      0,
      0,
      1,

      this.size,
      this.size,
      0,
      1,
      1,

      this.size,
      this.size,
      0,
      1,
      1,

      this.size,
      0,
      0,
      1,
      0,

      0,
      0,
      0,
      0,
      0,
    ]

    //Upload to GPU
    this.buffer.PushBackData(this.data)
    this.buffer.AddAttribute(new core.AttributeInfo(0, 0, 3))
    this.buffer.AddAttribute(new core.AttributeInfo(1, 3, 2))
    this.buffer.Upload()

    super.Init()
  }

  Render() {
    //Drawing
    this.material.Upload(this) //Uploads the global transformation to the shader
    this.material.Render()

    this.buffer.Bind()
    this.buffer.Draw()

    super.Render()
  }

  Update() {
    super.Update()
  }
}

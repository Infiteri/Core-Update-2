import { Shader } from '../graphics/Shader.js'

const vs = `
  attribute vec3 aVertexPosition;
  attribute vec2 aTexCoords;

  uniform mat4 uCameraMatrix;
  uniform mat4 uMeshMatrix;

  varying vec2 vTexCoords;

  void main() {
    gl_Position = uCameraMatrix * uMeshMatrix * vec4(aVertexPosition, 1);

    vTexCoords = aTexCoords;
  }
`

const fs = `
  precision mediump float;

  uniform vec4 uTint;
  uniform sampler2D sampler;

  varying vec2 vTexCoords;

  void main() {
    gl_FragColor = uTint * texture2D(sampler, vTexCoords);
  }
`

export class TextureShader extends Shader {
  constructor() {
    super('TextureShader', vs, fs)
  }
}

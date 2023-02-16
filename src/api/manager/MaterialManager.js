import { Debug } from '../core.js'
import { Material } from '../material/Material.js'

export class MaterialManager {
  /** @type {Object.<string, Material>} */
  static materials = {}

  /**
   * @param {Material} material
   */
  static LoadMaterial(material) {
    const exists = MaterialManager.materials[material.name]

    if (exists) {
      Debug.CWarn(`Cannot add a material: ${material.name} found a duplicate`)
    } else {
      MaterialManager.materials[material.name] = material
    }
  }

  /**
   *
   * @param {string} name
   * @returns {Material}
   */
  static GetMaterial(name) {
    const exists = MaterialManager.materials[name]

    if (!exists) {
      Debug.CFatal('Unable to find the material named: ' + name)
    } else {
      return MaterialManager.materials[name]
    }
  }
}

import { lines } from 'mrm-core'
import fsExtra from 'fs-extra'
import { join } from 'path'
import { hasVscodeFramework } from '../util'

module.exports = async () => {
    let gitignore = fsExtra.readFileSync(join(__dirname, '_gitignore'), 'utf-8')

    if (await hasVscodeFramework()) gitignore = [...gitignore.split('\n'), 'src/generated.ts', 'src/configurationTypeCache.jsonc'].join('\n')
    lines('.gitignore').set([gitignore]).save()
}

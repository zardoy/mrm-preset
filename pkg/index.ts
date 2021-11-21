import { json, packageJson } from 'mrm-core'
import { basename } from 'path'
import { PackageJson } from 'type-fest'

module.exports = () => {
    if (packageJson().exists()) {
        console.warn('package.json already exists')
        return
    }
    json('package.json', {
        name: basename(process.cwd()),
        version: '0.0.0',
        private: true,
        scripts: {},
        dependencies: {},
        license: 'MIT',
    } as PackageJson).save()
}

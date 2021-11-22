import { file, packageJson } from 'mrm-core'
import { basename } from 'path'
import { PackageJson } from 'type-fest'
import userMeta from 'user-meta'

module.exports = () => {
    if (packageJson().exists()) {
        console.warn('package.json already exists')
        return
    }

    file('package.json').save(
        JSON.stringify(
            {
                name: basename(process.cwd()),
                version: '0.0.0-dev',
                author: `${userMeta.name} <${userMeta.email}>`,
                license: 'MIT',
                scripts: {},
                dependencies: {},
                devDependencies: {},
            } as PackageJson,
            undefined,
            4,
        ),
    )
}

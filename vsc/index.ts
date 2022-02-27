import { file, install, packageJson } from 'mrm-core'
import { basename } from 'path'
import { PackageJson } from 'type-fest'
import fsExtra from 'fs-extra'

/** New VSCode Extension */
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
                // have no idea how to retrive name like that
                author: 'zardoy',
                categories: [],
                contributes: {} as any,
                license: 'MIT',
                scripts: {
                    start: 'vscode-framework start',
                },
                dependencies: {},
                devDependencies: {},
            } as PackageJson,
            undefined,
            4,
        ),
    )
    install(['vscode-framework', '@types/vscode'], {
        pnpm: true,
    })
    fsExtra.ensureFileSync(`src/extension.ts`)
}

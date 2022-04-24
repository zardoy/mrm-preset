import { file, install, packageJson } from 'mrm-core'
import { basename } from 'path'
import { PackageJson } from 'type-fest'
import fsExtra from 'fs-extra'
import { capitalCase } from 'change-case'
import { ensureGitignore } from '../util'

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
                displayName: capitalCase(basename(process.cwd())),
                // have no idea how to retrive name like that
                publisher: 'zardoy',
                version: '0.0.0-dev',
                license: 'MIT',
                categories: null, // let IDE highlight incorrect type so user specifies correct one
                contributes: {} as any,
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
    ensureGitignore()
    fsExtra.ensureFileSync(`src/extension.ts`)
}

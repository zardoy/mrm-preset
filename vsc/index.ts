import { file, install, packageJson } from 'mrm-core'
import { basename } from 'path'
import { PackageJson } from 'type-fest'
import fsExtra from 'fs-extra'
import { capitalCase } from 'change-case'
import { copyAllFiles, ensureGitignore, ensureLicense, ensureTs } from '../util'
import { modifyTsConfigJsonFile } from 'modify-json-file'

/** New VSCode Extension */
module.exports = () => {
    if (packageJson().exists()) {
        console.warn('package.json already exists')
        return
    }

    ensureLicense()
    const name = basename(process.cwd()).replace(/^vscode-/, '')
    file('package.json').save(
        JSON.stringify(
            {
                name,
                displayName: capitalCase(name),
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
    copyAllFiles(__dirname)
    install(['vscode-framework', '@types/vscode', '@zardoy/vscode-utils'], {
        pnpm: true,
    })
    ensureGitignore()
    ensureTs({ preset: 'tsconfig' })
    modifyTsConfigJsonFile(
        { dir: '.' },
        {
            compilerOptions: {
                // disable window and other dom suggestions
                lib: ['ESNext'],
            },
        },
    )
    if (!fsExtra.existsSync('src/extension.ts')) {
        fsExtra.writeFileSync('src/extension.ts', 'export const activate = () => {\n\t\n}\n', 'utf8')
    }
}

import { oneOf } from '@zardoy/utils'
import fs from 'fs'
import { install, lines } from 'mrm-core'
import { join } from 'path'
import { readPackageJsonFile } from 'typed-jsonfile'

export const copyAllFiles = (__dirname: string, patchFiles: Record<string, (contents: string) => string | undefined> = {}, copySet: string[] | null = null) => {
    const files =
        copySet ?? fs.readdirSync(__dirname).filter(name => !fs.lstatSync(join(__dirname, name)).isDirectory() && !oneOf(name, 'index.ts', 'index.js'))
    for (const file of files) {
        const patchFn = patchFiles[file] ?? (contents => contents)
        const contents = patchFn(fs.readFileSync(join(__dirname, file), 'utf-8'))
        if (contents === undefined) continue
        lines(file).set([contents]).save()
    }
}

export const ensureLicense = () => {
    if (fs.existsSync('LICENSE') || fs.existsSync('LICENSE.md')) return
    require('./license/index')()
}

export const ensureGitignore = () => {
    if (fs.existsSync('.gitignore')) return
    require('./gitignore/index')()
}

export const ensureTs = (...args) => {
    if (fs.existsSync('tsconfig.json')) return
    require('./ts/index')(...args)
}

export const hasVscodeFramework = async () => {
    const packageJson = await readPackageJsonFile({ dir: '.' }).catch(() => null)
    if (packageJson) {
        if (Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies }).includes('vscode-framework')) {
            return true
        }
    }
    return false
}

export const installPackages = (packages: string[], { dev = false } = {}) => {
    try {
        install(packages, {
            pnpm: true,
            dev,
        })
    } catch (err) {
        if (process.argv.includes('--exit-install-failure')) throw err
        console.error(err, `Failed to install packages, try yourself: pnpm i ${packages.join(' ')}`)
    }
}

import { oneOf } from '@zardoy/utils'
import fs from 'fs'
import { lines } from 'mrm-core'
import { join } from 'path'

export const copyAllFiles = (__dirname: string) => {
    const files = fs.readdirSync(__dirname).filter(name => !fs.lstatSync(join(__dirname, name)).isDirectory() && !oneOf(name, 'index.ts', 'index.js'))
    for (const file of files) {
        lines(file)
            .set([fs.readFileSync(join(__dirname, file), 'utf-8')])
            .save()
    }
}

export const ensureLicense = () => {
    if (fs.existsSync('LICENSE') || fs.existsSync('LICENSE.md')) return
    require('./license/index')()
}

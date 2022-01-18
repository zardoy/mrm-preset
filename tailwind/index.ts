import { install } from 'mrm-core'
import { copyAllFiles } from '../util'

module.exports = (installPostcss = true) => {
    copyAllFiles(__dirname)
    const packages = 'tailwindcss autoprefixer'.split(' ')
    if (installPostcss) packages.push('postcss')
    install(packages, {
        pnpm: true,
    })
}

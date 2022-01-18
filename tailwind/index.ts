import { install } from 'mrm-core'
import { copyAllFiles } from '../util'

module.exports = () => {
    copyAllFiles(__dirname)
    install('tailwindcss postcss autoprefixer'.split(' '), {
        pnpm: true,
    })
}

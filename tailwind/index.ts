import { copyAllFiles, installPackages } from '../util'

module.exports = (installPostcss = true) => {
    copyAllFiles(__dirname)
    const packages = 'tailwindcss autoprefixer'.split(' ')
    if (installPostcss) packages.push('postcss')
    installPackages(packages, {})
}

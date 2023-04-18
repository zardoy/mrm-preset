import { packageJson } from 'mrm-core'
import { copyAllFiles, installPackages } from '../util'

module.exports = ({ isReact }: { isReact?: boolean } = {}) => {
    installPackages(['eslint', 'eslint-config-zardoy', ...(isReact ? ['eslint-plugin-react', 'eslint-plugin-react-hooks'] : [])], {
        dev: true,
    })

    copyAllFiles(__dirname, {}, [isReact ? '.eslintrc-react.json' : '.eslintrc.json'])

    packageJson().appendScript('lint', 'eslint src/**').save()
}

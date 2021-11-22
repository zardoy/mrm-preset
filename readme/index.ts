import { capitalCase } from 'change-case'
import { file } from 'mrm-core'
import { basename } from 'path'

module.exports = () => {
    const readme = file('README.MD')
    if (readme.exists()) {
        console.warn('README already exists')
        return
    }

    readme.save(`# ${capitalCase(basename(process.cwd()))}\n\n`)
}

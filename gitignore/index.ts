import { lines } from 'mrm-core'
import fsExtra from 'fs-extra'
import { join } from 'path'

module.exports = () => {
    lines('.gitignore')
        .set([fsExtra.readFileSync(join(__dirname, '_gitignore'), 'utf-8')])
        .save()
}

import taskLicense from 'mrm-task-license'

module.exports = () => {
    taskLicense({
        license: 'MIT',
        name: taskLicense.parameters.name.default(),
        email: taskLicense.parameters.email.default,
        licenseFile: 'LICENSE',
    })
}

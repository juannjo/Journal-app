export const fileUpload = async(file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/juanjo/image/upload'

    const formData = new FormData()
    formData.append('upload_preset', 'React-journal')
    formData.append('file', file)

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })
        console.log(resp)

        const cloudResp = await resp.json()
        console.log({ cloudResp })

        if(!resp.ok) throw new Error('No se pudo subir imagen')

        return cloudResp.secure_url

    } catch (error) {
        throw new Error(error.message)
    }
}
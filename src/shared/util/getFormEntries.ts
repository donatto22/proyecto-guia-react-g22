export const getFormEntries = (formulario) => {
    const form = new FormData(formulario)
    const formObject = Object.fromEntries(form.entries())

    return formObject
}

export function handleEnter(event) {
    if (event.keyCode === 13) {
        const form = event.target.form
        const index = Array.prototype.indexOf.call(form, event.target)
        form.elements[index + 1].focus()
        event.preventDefault()
    }
}

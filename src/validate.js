const validate = (reqds, scroll = true) => {
    for (let req of reqds) {
        const field = document.querySelector(`input[name='${req}']`)
            ? document.querySelector(`input[name='${req}']`)
            : document.querySelector(`textarea[name='${req}']`);

        if (field.value.trim() === "") {
            if (scroll) {
                field.previousElementSibling.previousElementSibling
                    .previousElementSibling
                    ? field.previousElementSibling.previousElementSibling.previousElementSibling.scrollIntoView()
                    : field.previousElementSibling.previousElementSibling.scrollIntoView();
            }
            field.classList.add("shake-anim");
            field.style.borderColor = "#ff6b6b";
            field.focus();

            setTimeout(() => {
                field.classList.remove("shake-anim");
                field.style.borderColor = "#eee";
            }, 1000);
            return false;
        }
    }

    return true;
};

const shake = (field) => {
    field.classList.add("shake-anim");
    field.style.borderColor = "#ff6b6b";

    setTimeout(() => {
        field.classList.remove("shake-anim");
        field.style.borderColor = "#eee";
    }, 1000);
};

export { validate, shake };

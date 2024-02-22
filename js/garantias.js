const main = () => {
    window.addEventListener("load", () => {
        const form = document.querySelector("#contact-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log(event.target.elements.name.value)
            console.log(event.target.elements.emailAdress.value)
            console.log(event.target.elements.terminos.value)
        });
    });
};

main();
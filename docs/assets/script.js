feather.replace();

document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        });
    });
});

function blur() {
    const backDrop = document.getElementsByClassName("backdrop")[0];
    const scrollTop = Math.ceil(document.getElementsByTagName('html')[0].scrollTop);
    if (scrollTop > 300) return backDrop.style.filter = `blur(50px)`;
    const blurVal = Math.round(scrollTop / 6);
    backDrop.style.filter = `blur(${blurVal}px)`
}
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

const backDrop = document.getElementsByClassName("backdrop")[0];

const random = Math.floor(Math.random() * (8 - 0 + 1) + 0);
backDrop.classList.add(`hero-${random}`);

function blur() {
    const scrollTop = Math.ceil(document.getElementsByTagName('html')[0].scrollTop);
    let blurVal = 50;
    if (scrollTop < 300) blurVal = Math.round(scrollTop / 6);
    blurVal = String(blurVal).padStart(2, '0');
    backDrop.style.filter = `blur(${blurVal}px)`
    backDrop.style.transform = `scale(1.${blurVal})`
}
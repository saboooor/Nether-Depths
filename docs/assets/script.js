const backDrop = document.getElementsByClassName("backdrop")[0];
const copyResponse = document.getElementById('copy-response');
const notificationList = document.getElementById('notifications');
const random = Math.floor(Math.random() * (8 - 0 + 1) + 0);
const root = document.querySelector(':root');
let effectEnabled = true;
backDrop.classList.add(`hero-${random}`);

function blur() {
    if (!effectEnabled) {
        return backDrop.style.filter = ``;
    }
    const scrollTop = Math.ceil(document.getElementsByTagName('html')[0].scrollTop);
    let blurVal = 50;
    if (scrollTop < 300) blurVal = Math.round(scrollTop / 6);
    blurVal = String(blurVal).padStart(2, '0');
    backDrop.style.filter = `blur(${blurVal}px)`
    backDrop.style.transform = `scale(1.${blurVal})`
}

function hide(event) {
    event.srcElement.parentElement.style.display = 'none';
}

async function copy(text) {
    try {
        await navigator.clipboard.writeText(text);
        copyResponse.innerText = `Copied ${text} successfully!`;
    }
    catch (err) {
        copyResponse.innerText = `Failed to copy ${text}\n${err}`;
    }
}

function toggleEffects(event) {
    if (event.srcElement.checked) {
        effectEnabled = false;
        root.style.setProperty('--blur', 'blur(0)');
        root.style.setProperty('--light-blur', 'blur(0)');
        root.style.setProperty('--shadow', 'drop-shadow(0 0 0 black)');
        root.style.setProperty('--background-color', '#0A0A0A');
    }
    else {
        effectEnabled = true;
        root.style.setProperty('--blur', 'blur(50px)');
        root.style.setProperty('--light-blur', 'blur(20px)');
        root.style.setProperty('--shadow', 'drop-shadow(0 0 2rem black)');
        root.style.setProperty('--background-color', '#0A0A0A66');
    }
}

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

notificationList.innerHTML = `
    <div class="notification" style="margin: 0 10px 10px 0;">
        <a class="delete" onclick="hide(event)"></a>
        <p><strong style="color: white">The Zen server has released!</strong></p>
        <p>Join with zen.netherdepths.com!</p>
    </div>
    <div class="notification" style="margin: 0 10px 10px 0;">
        <a class="delete" onclick="hide(event)"></a>
        <input id="switchExample" type="checkbox" name="switchExample" class="switch is-outlined is-danger" onclick="toggleEffects(event)">
        <label for="switchExample" style="user-select: none;">Reduce Effects</label>
    </div>
`
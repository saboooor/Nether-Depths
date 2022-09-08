// Parse all cookies into a singular JSON
const cookieJSON = {};
const decodedCookie = decodeURIComponent(document.cookie);
const cookiesArray = decodedCookie.split(';');
cookiesArray.forEach(cookie => {
    const values = cookie.split('=');
    cookieJSON[values[0]] = values[1];
});

// Set a random hero backdrop
const backDrop = document.getElementsByClassName("backdrop")[0];
backDrop.classList.add(`hero-${Math.floor(Math.random() * (8 - 0 + 1) + 0)}`);

// Register all feather icons
feather.replace();

// Blur onscroll function and set effectEnabled to true by default
let effectEnabled = true;
function blur() {
    // Don't set filter if the effect is disabled
    if (!effectEnabled) return backDrop.style.filter = ``;

    // Check the scroll distance and round it up
    const scrollTop = Math.ceil(document.getElementsByTagName('html')[0].scrollTop);

    // Set the max blur value (300 / 6 = 50)
    let blurVal = 50;

    // Set the blur value to (scrollTop / 6) if scroll distance is under 300
    if (scrollTop < 300) blurVal = Math.round(scrollTop / 6);

    // Set blur value with padding for the zoom as well
    blurVal = String(blurVal).padStart(2, '0');
    
    // Set filter with blur valur and scale as a decimal: 1.{blur value}
    backDrop.style.filter = `blur(${blurVal}px)`;
    backDrop.style.transform = `scale(1.${blurVal})`;
}

// Hide the parent element of an x button
function hide(event) { event.srcElement.parentElement.style.display = 'none'; }

// Copy to clipboard function
const copyResponse = document.getElementById('copy-response');
async function copy(text) {
    try {
        // Copy the text
        await navigator.clipboard.writeText(text);

        // Respond on the copyResponse element defined in HTML with success
        copyResponse.innerText = `Copied ${text} successfully!`;
    }
    catch (err) {
        // Respond on the copyResponse element defined in HTML with error
        copyResponse.innerText = `Failed to copy ${text}\n${err}`;
    }
}

// Function to toggle effects
const root = document.querySelector(':root');
function toggleEffects(disable) {
    if (disable) {
        // Set noblur cookie
        const d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = `noblur=true; expires=${d.toUTCString()};`;
        
        // Set effectEnabled to false
        effectEnabled = false;
        
        // Set css properties to 0
        root.style.setProperty('--blur', 'null');
        root.style.setProperty('--light-blur', 'null');
        root.style.setProperty('--shadow', 'null');
        root.style.setProperty('--background-color', '#0A0A0A');
    }
    else {
        // Remove noblur cookie
        document.cookie = "noblur=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        
        // Set effectEnabled to true
        effectEnabled = true;

        // Set css properties to show blurs and shadows 
        root.style.setProperty('--blur', 'blur(50px)');
        root.style.setProperty('--light-blur', 'blur(20px)');
        root.style.setProperty('--shadow', 'drop-shadow(0 0 2rem black)');
        root.style.setProperty('--background-color', '#0A0A0A66');
    }
}

// Disable effects if noblur is set
if (cookieJSON.noblur) toggleEffects(true);

// Hamburger button
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

// Add the notifications
const notificationList = document.getElementById('notifications');
notificationList.innerHTML = `
    <div class="notification" style="margin: 0 10px 10px 0;">
        <a class="delete" onclick="hide(event)"></a>
        <p><strong style="color: white">The Zen server has released!</strong></p>
        <p>Join with zen.netherdepths.com!</p>
    </div>
    <div class="notification" style="margin: 0 10px 10px 0; user-select: none; -webkit-user-select: none;">
        <a class="delete" onclick="hide(event)"></a>
        <input id="toggleEffects" type="checkbox" name="toggleEffects" class="switch is-outlined is-danger"${cookieJSON.noblur ? ' checked' : ' '} onclick="toggleEffects(event.srcElement.checked)">
        <label for="toggleEffects">Reduce Effects</label>
    </div>
`
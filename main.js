const inputEl = document.getElementById('jsStateName');
if (inputEl) {
    console.log(inputEl)
    document.addEventListener("keydown", (e) => {
        e = e || window.event;
        if (+e.keyCode === 191) {
            e.preventDefault();
            inputEl.scrollIntoView(true, {behavior: "smooth"});
            // trigger search box
            inputEl.value = '';
            inputEl.focus();
            return false;
        }
    }, false);
}

const _settings = {
    matchedStateColor: '#b3b3b3',
    defaultStateColor: '#ececec',
    minLength:3, // GOA
}
// will use to reset the selected state on each matched search
let highlightedState = null;

inputEl.addEventListener('keyup', (e) => {
    const stateName = e.target.value.toLowerCase().trim();
    if (!stateName) return false;

    // min length check
    if (stateName.length < _settings.minLength) return false;
    console.log('State name length check passed');
    const svgObject = document.getElementById('jsIndiaMap').contentDocument;
    if (!svgObject) return false;
    for (const paths of svgObject.all) {
        const currentState = paths.getAttribute('name')?.toLowerCase()?.trim();
        if (currentState?.startsWith(stateName)) {
            if (highlightedState) highlightedState.style.fill = _settings.defaultStateColor;
            highlightedState = paths;
            console.log('STATE FOUND', currentState);
            paths.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            paths.style.fill = _settings.matchedStateColor;
        }
    }

}, false)

//get the toggle button
toggleButton = document.getElementById('check')

//for changigng theme
const themeSwitch = () => {
    if(document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        return;
    }
    document.documentElement.classList.add('dark');
}

//for click handeling 
toggleButton.addEventListener("click", () => {
    themeSwitch();
});

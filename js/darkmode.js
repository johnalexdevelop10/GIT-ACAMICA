'use strict'
/* Dark mode */
let darkMode = document.getElementById('darkMode');
darkMode.addEventListener('click', (e) =>{
    e.preventDefault();
    document.body.classList.toggle('dark');
    //localStorage for Dark Mode
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');
        darkMode.textContent = 'Modo Diurno';
    }else{
        localStorage.setItem('dark-mode', 'false');
        darkMode.textContent = 'Modo Nocturno';
    }
});
if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark');
    darkMode.textContent = 'Modo Diurno';
}else{
    document.body.classList.remove('dark');
    darkMode.textContent = 'Modo Nocturno';
}
/* Dark mode */

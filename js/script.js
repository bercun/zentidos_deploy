console.log('Script loaded');


menu_switch = document.querySelector('#menu_h');
navbar = document.querySelector('#navbar');

menu_switch.addEventListener('click', function() {
    console.log('Menu switch clicked');
    if (navbar.classList.contains('hidden')) {
        navbar.classList.remove('hidden');
        } else {
        navbar.classList.add('hidden');
        menu_switch.classList.remove('active');
        console.log('Menu closed');
    }
});
// Close the menu when clicking outside of it   

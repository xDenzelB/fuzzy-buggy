import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelectorAll('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener(e => {
    e.preventDefault();

    const formData = new FormData(form);

    const familyId = formData.get('family-id');
    const name = formData.get('bunny-name');

    await createBunny({
        name: name,
        family_id: familyId
    });

    form.reset();
});

window.addEventListener('load', async() => {
    const select = document.querySelector('select');
    const families = getFamilies();

    for (let family of families) {
        option.value = family.id;
        option.textContent = family.name;
        
        select.append(option);
    }
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});

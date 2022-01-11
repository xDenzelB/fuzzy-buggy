const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function getFamilies() {
    const response = await client
        .from('loving_families')
        .select('*, fuzzy_bunnies (*)')
        // this will only fetch bunnies that were created by the current account
        // this lets us use the same database for everybody in the cohort  without everybody stepping on each others' toes (since everybody will be adding bunnies to these families)
        .match({ 'fuzzy_bunnies.user_id':  client.auth.session().user.id });

    return checkError(response);    
}

export async function deleteBunny() {
    const response = await client
        .from('fuzzy_bunnies')
        .match({ id: id })
        .single();

    return checkError(response);    
}


export function createBunny() {
    const response = await client
        .from('fuzzy_bunnies')
        .insert({
            ...bunny,
            user_id: client.auth.session().user.id,
        });

    return checkError(response);    
}



export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./families');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

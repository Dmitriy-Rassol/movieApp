
export default {
    KEY : "?api_key=81c95d469f46ed667a73300bcb821603",  
    baseURL :`https://api.themoviedb.org/3`,
    firebaseDB: `https://moviedb-vue3-7dad0-default-rtdb.firebaseio.com`,
    langDefault:  localStorage.getItem('langDB') || 'ru-RU'
}
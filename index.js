window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nj-image-gallery').forEach(gallery => {
        gallery.addEventListener('change', (e) => {
            console.log('Gallery ID:', gallery.id, 'Selected image:', e.detail.value);
        document.getElementById("home-button").classList.add("hide")
        });
    });
    document.querySelectorAll('wa-tab-group').forEach(gallery => {
        gallery.addEventListener('wa-tab-show', (e) => {
            console.log(e)
             if (e.detail.name == "") {
                return
             }
             showHomeButton()
        });
    });
});
const base = import.meta.env.BASE_URL;
function galleryNav (page) {
    sessionStorage.setItem('gallery', page)
}

function detailNav (item) {
    sessionStorage.setItem('detail', item)
}

function navigate(type, num) {
    switch (type) {
        case "gallery": galleryNav(num); break;
        case "detail": detailNav(num); break;
    }
    sessionStorage.setItem(type, num);
    window.location.assign(`${base}${type}.html`);
}

function parseNum(num) {
    switch (num) {
        case '1': return "one"
        case '2': return "two"
        case '3': return "three"
        default: return "one"
    }
}
function goHome(e) {
    e.classList.add("hide");
    document.getElementById("tab-group").active = "";
}

function showGallery(gallery) {
    document.getElementById("tab-group").active = gallery;
}

window.galleryNav = galleryNav;
window.detailNav = detailNav;
window.navigate = navigate;
window.parseNum = parseNum;
window.goHome = goHome;
window.showGallery = showGallery;
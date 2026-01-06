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

export function galleryNav (page) {
    sessionStorage.setItem('gallery', page)
}

export function detailNav (item) {
    sessionStorage.setItem('detail', item)
}

export function navigate(type, num) {
    switch (type) {
        case "gallery": galleryNav(num); break;
        case "detail": detailNav(num); break;
    }
    sessionStorage.setItem(type, num);
    window.location.href = `/${type}`;
}

export function parseNum(num) {
    switch (num) {
        case '1': return "one"
        case '2': return "two"
        case '3': return "three"
        default: return "one"
    }
}
export function goHome(e) {
    e.classList.add("hide");
    document.getElementById("tab-group").active = "";
}

export function showHomeButton() {
    document.getElementById("home-button").classList.remove("hide")
}

export function showGallery(gallery) {
    document.getElementById("tab-group").active = gallery;
}

export function showDetails(imageId) {
    
}
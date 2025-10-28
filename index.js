window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nj-image-gallery').forEach(gallery => {
        gallery.addEventListener('change', (e) => {
        console.log('Gallery ID:', gallery.id, 'Selected image:', e.detail.value);
        // You can also do something specific for each gallery here
        });
    });
    document.querySelectorAll('wa-tab-group').forEach(gallery => {
        gallery.addEventListener('wa-tab-show', (e) => {
        console.log('Gallery ID:', gallery.id, 'Selected image:', e.detail.name);
        // You can also do something specific for each gallery here
        });
    });
});


function showHome() {
    
}

function showGallery(gallery) {

}

function showDetails(imageId) {
    
}
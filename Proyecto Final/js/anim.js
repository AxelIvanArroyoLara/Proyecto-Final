document.getElementById('button-modal').addEventListener('click', () => {
    const modalBg = document.getElementById('modal-bg');
    const modalButton = document.getElementById('button-modal');
    const modalBorder = document.getElementById('container-button-modal_welcome');
    modalBg.classList.add('hidden');
    modalButton.classList.add('hidden');
    modalBorder.classList.add('hidden');
    setTimeout(() => {
        modalBg.style.display = 'none';
    }, 500);
});

function toggleTree(id) {
    const treeContainer = document.getElementById(id);
    
    // Alternar la visibilidad de los sub-botones con animación
    if (treeContainer.classList.contains('active')) {
        treeContainer.classList.remove('active');
    } else {
        treeContainer.classList.add('active');
    }
}


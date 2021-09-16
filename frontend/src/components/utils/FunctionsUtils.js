const closeModal = (nameModal) => {
    let back = document.getElementsByClassName('modal-backdrop show')[0];
    let body = document.getElementsByTagName('body');
    let modal = document.getElementById(nameModal);
    try {
        //borra las clases y estilo (vuelve al principio)
        body[0].className='';
        body[0].style = '';
        back.parentNode.removeChild(back); //elimino el nodo que produce la pantalla opaca
        // vuelvo la clase a su estado cerrado
        modal.className='modal';
        modal.style.paddingRight = 0;
        modal.style.display = 'none'

        //queda modificar el problema del boton (mas adelante)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {closeModal}
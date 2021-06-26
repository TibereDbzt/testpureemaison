import '../styles/main.sass';
import bg from './../assets/images/dark_clouds.jpeg';

const init = () => {
    document.querySelector('[data-bgImage]').src = bg;
    const elem = document.querySelector('.target')
    console.log(elem);
    console.log(elem.getBoundingClientRect());
}

document.addEventListener('load', init());

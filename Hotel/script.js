const text = document.querySelector('.efeito-digitar');

let i = 0;
let contador = 0;
const originalText = text.innerHTML;

const typing = () => {
    if(i< originalText.length && contador < 2) {
        text.innerHTML = originalText.substring(0,i + 1) + "_";
        i++;
        setTimeout(typing, 100)
    } else {
        i = 0;
        contador++;
        text.innerHTML = originalText;
        setTimeout(typing,2000)
    }
}

typing();
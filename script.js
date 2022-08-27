const c = (el) => {
    return document.querySelector(el)
}

const cv = (el) => document.querySelectorAll(el)
//variável que armazena quantidade de itens:
let modalQuantity = 1

//LISTAGEM DAS PIZZAS:

//item é o próprio objeto de Json e index é a posição:
pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    //Evento ao clicar para abrir o modal:
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault() //--> previnir a ação padrão de atualizar a tela
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQuantity = 1
        //puxa do Json as informações do objeto e exibe quando abre o pop-up:
       c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
       c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
       c('.pizzaBig img').src = pizzaJson[key].img
       c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
       c('.pizzaInfo--size.selected').classList.remove('selected')
       cv('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
               
       })
       c('.pizzaInfo--qt').innetHTML = modalQuantity
        //quantidade padrão do contador de quantidade de pizza:
       

         //modo de abertura e exibição do pop-up:   
        c('.pizzaWindowArea').style.opacity = 0
        c('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1
        }, 250)
    })
    


    //Append para pegar o conteúdo que já tem em pizza-area e adicionar mais um conteúdo:
    document.querySelector('.pizza-area').append(pizzaItem)
})

//EVENTOS DO MODAL:

//Button cancelar:
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none'
    }, 500)   
}

cv('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})
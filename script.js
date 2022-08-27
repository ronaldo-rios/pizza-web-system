const c = (el) => {
    return document.querySelector(el)
}

const cv = (el) => document.querySelectorAll(el)


//variável que armazena quantidade de itens:
let modalQuantity = 1
//Carrinho:
let cart = []
//Armazena qual pizza(objeto) é selecionado ao carrinho no evento de click pizzaInfo--addButton:
let modalKey = 0

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
        modalKey = key

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

// Button de aumentar e diminuir quantidade de pizzas:
c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQuantity++
    c('.pizzaInfo--qt').innerHTML = modalQuantity
})

c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQuantity > 1){
        modalQuantity--
        c('.pizzaInfo--qt').innerHTML = modalQuantity
    }
    
})

//Seleção de tamanhos:
cv('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        c('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
       
})

//Adição ao carrinho:
c('.pizzaInfo--addButton').addEventListener('click', () => {

    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'))

    let identifier = pizzaJson[modalKey].id + '@' + size

    let verification = cart.findIndex((item) => {
        return item.identifier == identifier
    })
    if(verification > -1){
        cart[verification].qt += modalQuantity
    }
    else{
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQuantity
        })
    }
    updateCart()
    closeModal()
})


//Abrir menu carrinho se houver pelo menos 1 item:
c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){
        c('aside').style.left = '0'
    }    
})

//Button de fechar carrinho:
c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw'
})



//Mostra e atualiza através de cálculos o carrinho:
function updateCart(){
    
    c('.menu-openner span').innerHTML = cart.length //--> atualiza o carrinho no mobile

    if(cart.length > 0){
        c('aside').classList.add('show')
        c('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            subtotal += pizzaItem.price * cart[i].qt
            let cartItem = c('.models .cart--item').cloneNode(true)
            let pizzaSizeName;

            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P'
                    break;
                
                case 1:
                    pizzaSizeName = 'M'
                    break;

                case 2:
                    pizzaSizeName = 'G'
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-name').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1){
                    cart[i].qt--
                }
                else {
                    cart.splice(i, 1)
                }
                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++
                updateCart()
            })

            c('.cart').append(cartItem)
        }

        //Cálculo final do carrinho:
        desconto = subtotal * 0.1
        total = subtotal - desconto

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
    }
    else {//caso a quantidade em carrinho seja 0 remove o aside:
        c('aside').classList.remove('show')
        c('aside').style.left = '100vw'
    }
}
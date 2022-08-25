const c = (el) => {
    return document.querySelector(el)
}

const cv = (el) => document.querySelectorAll(el)


//item é o próprio objeto de Json e index é a posição:
pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    //Evento ao clicar:
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault() //--> previnir a ação padrão de atualizar a tela
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        
       c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
       c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
       c('.pizzaBig img').src = pizzaJson[key].img


        c('.pizzaWindowArea').style.opacity = 0
        c('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1
        }, 250)
    })
    


    //Append para pegar o conteúdo que já tem em pizza-area e adicionar mais um conteúdo:
    document.querySelector('.pizza-area').append(pizzaItem)
})
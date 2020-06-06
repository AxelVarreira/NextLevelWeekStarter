function populateUFs(){
    const ufSelect = document.querySelector("Select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") //faz uma promessa e pega os estados da API
    .then( res =>  res.json()) //função anonima, mais abreviada. "res" vai receber os dados da promesa (then) e converter pra Json
    .then( states => { 
        //States vai receber (then) o "res"
        for(const state of states){
            //state é uma variavel, states é a funcao anonima
            //Esse 'for' está colocando os estados no 'state' 
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            //Pega um valor de res e coloca como opção. Com o nome de 'Valor'
        }   
    })
}

populateUFs()

function getCities(event) {
    //É chamado toda vez que um estado é chamado no Event Listener da "funcao" abaixo
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")



    //console.log(event.target.value) informa a troca e o numero para o qual foi trocado
    //event.target.value vai procurar onde a funcao foi executada, nesse caso, Document
    //event.target.value vai pegar o state.id
    //state.id é o numero do estado que está setado
    const ufValue = event.target.value 
    //valor da UF (state.id)
    const indexOfSelectedState = event.target.selectedIndex 
    //Pega o numero exato do Index Selecionado do Event target
    stateInput.value = event.target.options[indexOfSelectedState].text
    //Vai pegar o texto e colocar no stateInputValue que detém o input[name=state] do HTML
    //Será atualizado com o client target options
    //options pega todos os estados, por isso precisa de um parametro para ser mais preciso
    //IndexOfSelectedState vai dizer qual o numero do estado selecionado

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    //url pega o numero do Estado e troca na URL da API, indo direto pras cidades do designado estado

    citySelect.innerHTML = "<option value>Selecione a cidade</option>" 
    //Limpa a lista de cidades em caso de troca de estado
    citySelect.disable = true 
    //Desabilita a lista de cidades antes de popular novamente em caso de troca de estado

    fetch(url) 
    //utilizamos a variavel url em vez do link
    .then( res =>  res.json())
    .then( cities => { 
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    }) 
}

 document
    .querySelector("Select[name=uf]") 
    //Procura o Select do HTML que tem o select
    .addEventListener("change", getCities) 
    //Quando mudar, a funcao vai ser executada

    //ITEMS DE COLETA
    //pegar todos os Li's

    const itemsToCollect = document.querySelectorAll(".items-grid li")

    
    for(const item of itemsToCollect){
        item.addEventListener("click", handleSelectedItem)
    }

    const collectedItems = document.querySelector("input[name=items]")
    let selectedItems = [] 
    //Colocar ou colocar retirar um dado do handleSelectedItems pra fazer a contagem de itens

    function handleSelectedItem(event){
        const itemLi = event.target
        //adicionar ou remover uma classe HTML com javaScript
        itemLi.classList.toggle("selected")
        //Se existir selected ele remove e se não existir, ele cria


        const itemId= itemLi.dataset.id //Pega os numeros das imagens
        console.log('ITEM ID: ', itemId)

        //Verificar se existem itens selecionados, se sim, pegar os itens selecionados
        const alreadySelected = selectedItems.findIndex(item => {
            const itemFound = item == itemId //Será true or false. Quando for falso ele faz a busca novamente
            return itemFound //retorna Verdadeiro ou falso
        })

        //console.log(alreadySelected)
        //Se já estiver selecionado, tirar da seleção
        if(alreadySelected>=0){
            
            //remover da seleção
            const filteredItems = selectedItems.filter(item => {
                //Caso ela ache "true" ele adiciona o item no filteredItems (será tornará um novo array)
                //Quando ela achar "false" ela tira do Array
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })

            selectedItems = filteredItems
        }else{
            //Se não estiver selecionado, adicionar a seleção
            selectedItems.push(itemId)
        }
        //console.log(selectedItems)

        console.log('selecetedItems: ', selectedItems)

        //atualizar o campo escondido do HTML com os dados selecionados
        collectedItems.value = selectedItems
    }
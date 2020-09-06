// Escolher o botão
document.querySelector("#add-time")

//Quando clicar no botão
.addEventListener('click', cloneField)

//Ação do botão
function cloneField(){
    //Duplica o campos. Quais?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    //Pegar os campos. Que Campos?
    const fields = newFieldContainer.querySelectorAll('input')

    //Para cada campo, limpar
    fields.forEach(function(field){
        //Pego o field e limpo
        field.value=""        
    })
    
    //Colar na página. Onde?
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}

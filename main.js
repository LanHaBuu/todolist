// const liElement = document.createElement('li')
//     liElement.setAttribute('class','main__item')
//     liElement.innerHTML = ` 
//                         <span>${todo.text}</span>
//                         <i class="bi bi-trash"></i>
//                         `

const ulElement = document.querySelector('.main__list')
const input = document.querySelector('input')
const form = document.querySelector('.form')

form.onsubmit = function(e) {
    e.preventDefault()
    render({
        text: input.value,
    })
    input.value = ''
    saveData()
}

function render(data) {
    /*
        text: input.value
        status : 'done'
    */
    const liElement = document.createElement('li')
    liElement.setAttribute('class', 'main__item')
    liElement.innerHTML = `
                            <span>${data.text}</span>
                            <i class="bi bi-trash"></i>
                            `
    if(data.status === 'done') {
        liElement.classList.add('done')
    }
    ulElement.appendChild(liElement)

    liElement.onclick = function() {
        this.classList.toggle('done')
        saveData()
    }
    
    liElement.querySelector('i').onclick = function() {
        this.parentElement.remove()
        saveData()
    }
}

function saveData() {
    const liAll = document.querySelectorAll('li')
    const local = Array.from(liAll).map(index => {
        const text = index.querySelector('span').innerText
        var status
        if(index.classList.contains('done')) {
            status = 'done'
        }else {
            status = ''
        }
        return {
            text: text,
            status
        }
    })
    localStorage.setItem('list', JSON.stringify(local))
}

function init() {
    const data = JSON.parse(localStorage.getItem('list'))
    data.map(list => {
        render(list)
    })
}
init()

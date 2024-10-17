

//save/store currently fetched pets data
let storedPetsData = []
//loading spinner
const loadingSpinner = show => {
    const spinner = document.getElementById('loader')
    if(show){
        spinner.classList.remove('hidden')
        document.getElementById('all-pets').innerHTML = ''
    }
    else{
        spinner.classList.add('hidden')
    }
}

//remove active button style
const removeActiveClasses = () => {
    const allButtons = document.querySelectorAll('.category-btn')
    for(const btn of allButtons){
        btn.classList.remove('bg-emerald-100', 'rounded-full', 'border-teal-800', 'border')
        btn.classList.add('rounded-xl')
    }
}

// add active classes 
const addActiveClasses = (category) => {
    const activeButton = document.getElementById(`btn-${category}`)
    activeButton.classList.remove('rounded-xl')
    activeButton.classList.add('bg-emerald-100', 'rounded-full', 'border-teal-800', 'border')
}

// handle like button 
const like = imageUrl => {
    const imageContainer = document.getElementById('liked-pets')
    const div = document.createElement('div')
    div.innerHTML = `
    <img class="rounded-lg" src="${imageUrl}"/>
    `;
    imageContainer.appendChild(div)
}

// handle sort data 
const sort = () => {
    loadingSpinner(true)
    const sortedData = storedPetsData.sort((a, b) => b.price - a.price)
    setTimeout(()=>{
        loadingSpinner(false)
        displayPets(sortedData)
    },500)
}

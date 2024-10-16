//load categories
const loadCategories = async() => {
  const res = await fetch(` https://openapi.programming-hero.com/api/peddy/categories`)
  const data = await res.json()
  displayCategories(data.categories)
}

//load all pets
const loadAllPets = async() => {
  loadingSpinner(true)
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
  const data = await res.json()
  setTimeout(()=>{
    displayPets(data.pets)
    loadingSpinner(false)
  },2000)
}

//load pets by category
const loadPetsByCategory = async(category) => {
  //remove active buttons if exit
  removeActiveClasses()
  // show active button 
  addActiveClasses(category)
  loadingSpinner(true)
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
  const data = await res.json()
  setTimeout(()=>{
    displayPets(data.data)
    loadingSpinner(false)
  },2000)
}

//display all pets
const displayPets = (pets) => {
  const petContainers = document.getElementById('all-pets')
  pets.forEach(pet => {
    const div = document.createElement('div')
    div.classList.add("flex", "flex-col", "gap-2", "p-4", "border", "rounded-xl", "font-bold",)
    div.innerHTML = `
    <img class="h-36 w-full rounded-xl object-cover" src="${pet.image}"/>
    <h3 class="text-xl">${pet.pet_name}</h3>
    <p class="text-sm text-gray-700">Breed: ${pet.breed ? pet.breed : 'Not Available'}</p>
    <p class="text-sm text-gray-700">Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not Available'}</p>
    <p class="text-sm text-gray-700">Gender: ${pet.gender ? pet.gender : 'Not Available'}</p>
    <p class="text-sm text-gray-700">Price:  ${pet.price ? "$" + pet.price : 'Not Available'}</p>
    <hr class="my-2"/>
    <div class="flex justify-between items-center px-2">
    <button class="btn bg-white text-teat-700 border rounded-lg py-1 px-4">
    <i class="fa-regular fa-thumbs-up"></i>
    </button>
    <button class="btn bg-white text-teat-700 border rounded-lg py-1 px-4">Adopt</button>
    <button class="btn bg-white text-teat-700 border rounded-lg py-1 px-4">Details</button>
    </div>
    `;
    petContainers.appendChild(div)
  })
}

//display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('pet-categories')
  categories.forEach((category) =>{
    const div = document.createElement('div')
    div.innerHTML = `
    <button id="btn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class="btn category-btn bg-white flex items-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full">
    <img class="w-10" src="${category.category_icon}"/>
    <p class="text-xl font-bold">${category.category}</p>
    </button>
    `;
    categoryContainer.appendChild(div)
  })
}

loadAllPets()
loadCategories()
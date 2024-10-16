//load categories
const loadCategories = async() => {
  const res = await fetch(` https://openapi.programming-hero.com/api/peddy/categories`)
  const data = await res.json()
  displayCategories(data.categories)
}

//load all pets
const loadAllPets = async() => {
  const res = fetch(``)
}

//display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('pet-categories')
  categories.forEach((category) =>{
    console.log(category)
    const div = document.createElement('div')
    div.innerHTML = `
    <button class="btn category-btn bg-white flex items-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full">
    <img class="w-10" src="${category.category_icon}"/>
    <p class="text-xl font-bold">${category.category}</p>
    </button>
    `;
    categoryContainer.appendChild(div)
  })
}

loadCategories()
//load categories
const loadCategories = async () => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  displayCategories(data.categories);
};

//load all pets
const loadAllPets = async () => {
  loadingSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();
  setTimeout(() => {
    displayPets(data.pets);
    storedPetsData = data.pets;
    loadingSpinner(false);
  }, 2000);
};

//load pets by category
const loadPetsByCategory = async (category) => {
  //remove active buttons if exit
  removeActiveClasses();
  // show active button
  addActiveClasses(category);
  loadingSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await res.json();
  setTimeout(() => {
    displayPets(data.data);
    storedPetsData = data.data;
    loadingSpinner(false);
  }, 2000);
};

//load pets details by id
const loadPetDetails= async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  displayPetDetails(data.petData)
};

// display pet details 
const displayPetDetails = data => {
  const modalBody = document.getElementById('details-container')
  modalBody.innerHTML = `
  <img class="h-60 rounded-xl object-cover w-full" src="${data.image}"/>
  <h3 class="text-xl font-bold my-2">${data.pet_name}<h3/>
  <div class="flex items-start gap-6">
  <div>
  <p class="text-gray-600 text-sm"><i class="fa-solid fa-paw"></i>Breed:
  ${
    data.breed ? data.breed : 'Not Available'
  }
  </p>
  <p class="text-gray-600 text-sm"><i class="fa-solid fa-venus-mars"></i>Gender:
  ${
    data.gender ? data.gender : 'Not Available'
  }
  </p>
  <p class="text-gray-600 text-sm"><i class="fa-solid fa-syringe"></i>Vaccinated_status:
  ${
    data.vaccinated_status ? data.vaccinated_status : 'Not Available'
  }
  </p>
  </div>
  <div>
  <p class="text-gray-600 text-sm"><i class="fa-solid fa-calendar-days"></i>Birth:
  ${
    data.date_of_birth ? data.date_of_birth : 'Not Available'
  }
  </p>
  <p class="text-gray-600 text-sm"><i class="fa-solid fa-dollar-sign"></i>Price:
  ${
    data.price ? "$" + data.price : 'Not Available'
  }
  </p>
  </div>
  </div>
  <hr class="my-2"/>
  <h3 class="font-semibold text-md">Details Information</h3>
  <p class="text-sm text-gray-600 my-2">
  ${
    data.pet_details ? data.pet_details : 'Not available'
  }
  </p>
  `;
  customModal.showModal()
} 

//display all pets
const displayPets = (pets) => {
  const petContainers = document.getElementById("all-pets");

  if (pets.length === 0) {
    petContainers.classList.remove("grid");
    petContainers.innerHTML = `
    <div class="bg-gray-100 p-20 rounded-xl text-center space-y-4">
    <img class="mx-auto" src="images/error.webp"/>
    <h3 class="text-3xl font-semibold">No Data Available</h3>
    <p class="text-gray-500"> There are a lots animals here. You can choose according your
     wishes and adoption cat or dog and also another animals from here.
     So, i am encouraging you from here to adopt animals and Your Path to Adoption Starts Here.
     </p>
    </div>
    `;
    return;
  } else {
    petContainers.classList.add("grid");
  }

  pets.forEach((pet) => {
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-col",
      "gap-2",
      "p-4",
      "border",
      "rounded-xl",
      "font-bold"
    );
    div.innerHTML = `
    <img class="h-36 w-full rounded-xl object-cover" src="${pet.image}"/>
    <h3 class="text-xl">${pet.pet_name}</h3>
    <p class="text-sm text-gray-700">Breed: ${
      pet.breed ? pet.breed : "Not Available"
    }</p>
    <p class="text-sm text-gray-700">Birth: ${
      pet.date_of_birth ? pet.date_of_birth : "Not Available"
    }</p>
    <p class="text-sm text-gray-700">Gender: ${
      pet.gender ? pet.gender : "Not Available"
    }</p>
    <p class="text-sm text-gray-700">Price:  ${
      pet.price ? "$" + pet.price : "Not Available"
    }</p>
    <hr class="my-2"/>
    <div class="flex justify-between items-center px-2">
    <button onclick="like('${
      pet.image
    }')" class="btn bg-white text-teat-700 border rounded-lg py-1 px-4">
    <i class="fa-regular fa-thumbs-up"></i>
    </button>
    <button onclick="adoptModal(this)" class="btn bg-white text-teat-700 border rounded-lg py-1 px-4">Adopt</button>
    <button onclick="loadPetDetails(${pet.petId})" class="btn bg-white text-teat-700 border rounded-lg py-1 px-4">Details</button>
    </div>
    `;
    petContainers.appendChild(div);
  });
};

//display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("pet-categories");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="btn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class="btn category-btn bg-white flex items-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full">
    <img class="w-10" src="${category.category_icon}"/>
    <p class="text-xl font-bold">${category.category}</p>
    </button>
    `;
    categoryContainer.appendChild(div);
  });
};

//adopt button functionality
const adoptModal = (event) => {
  let count = 3;
  const countContainer = document.getElementById("countdown-container");
  countContainer.innerHTML = count;
  my_modal_1.showModal();
  const interval = setInterval(() => {
    count--;
    if (count !== 0) countContainer.innerHTML = count;
    if (count < 1) {
      clearInterval(interval);
      my_modal_1.close();
      event.textContent = "Adopted";
      event.disabled = "true";
    }
  }, 1000);
};

loadAllPets();
loadCategories();

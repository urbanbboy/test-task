const BASE_URL = 'https://jsonplaceholder.typicode.com/users';
const refreshBtn = document.querySelector('.btn');
const searchInput = document.querySelector('.search__input')

let users = []

async function fetchData() {
    try {
        const response = await fetch(BASE_URL)
        if (!response.ok) {
            alert('Ошибка при загрузке пользователей')
        }
        const data = await response.json()
        users = data
        displayData(users)
    } catch (error) {
        alert('Ошибка: ', error)
    }
}

function displayData(data) {
    const container = document.querySelector('.card__wrapper')
    container.innerHTML = ''
    data.forEach(user => {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
            <div>
                <h2>${user.name}</h2>
                <p><i class="fa-solid fa-envelope"></i> ${user.email}</p>
                <p><i class="fa-solid fa-phone"></i> ${user.phone}</p>
            </div>
        `
        container.appendChild(card)
    })

}

function filterUsers(letter) {
    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(letter.toLowerCase()) ||
               user.email.toLowerCase().includes(letter.toLowerCase())
    })
    if(filterUsers.length < 1) {
        const card = document.createElement('div')
        card.innerHTML = `
            <div>Не найдено</div>
        `
        container.appendChild(card)
    }
    displayData(filteredUsers)
}

function sortUsers(key) {
    const sortedUsers = [...users].sort((a,b) => {
        if(a[key] < b[key]) return -1;
        if(a[key] > b[key]) return 1;
        return 0;
    });
    displayData(sortedUsers)
}

refreshBtn.addEventListener('click', () => {
    fetchData()
    searchInput.value = ''
})

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});
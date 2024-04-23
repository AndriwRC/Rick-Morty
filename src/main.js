// Nodes
const cardsContainer = document.querySelector('#cardsContainer');
const select = document.querySelector('#floatingSelect');

async function getCharacters() {
    try {
        const res = await fetch('https://rickandmortyapi.com/api/character/');

        if (res.status !== 200) {
            throw new Error(
                `Ocurrió un error: ${res.status} ${res.statusText}`
            );
        }

        const data = await res.json();

        const characters = data.results.slice(0, 15);

        // console.log(characters);

        // Create html elements
        characters.forEach((char) => {
            // Cards
            const characterContainer = document.createElement('div');
            characterContainer.classList.add('card', 'm-2', 'shadow');
            characterContainer.setAttribute('style', 'width: 288px;');

            characterContainer.innerHTML = `
                <img src="${char.image}" class="card-img-top"
                    alt="Imagen de ${char.name}">
                <div class="card-body">
                    <h3>${char.name}</h3>
                    <h5 class="text-body-secondary">Status: ${char.status}</h5>
                    <h5 class="text-body-secondary">Specie: ${char.species}</h5>
                </div>
            `;

            cardsContainer.appendChild(characterContainer);

            // Select Options
            const option = document.createElement('option');
            option.setAttribute('value', char.name);
            option.innerText = char.name;

            select.appendChild(option);
        });
    } catch (error) {
        console.error(error.message);
    }
}

getCharacters();

// Event Listeners
select.addEventListener('change', (event) => {
    const selectedName = event.target.value;
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        const characterName = card.querySelector('h3').innerText;
        if (
            characterName == selectedName ||
            selectedName == 'Select a character'
        ) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

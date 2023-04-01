// console.log('file connected');

const loadCard = async() => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    showCards(data.data.tools);
}

const showCards = (cards) => {
    console.log(cards);
    const cardContainer = document.getElementById('card-container');
    // phoneContainer.innerText = '';
    const seeMoreButton = document.getElementById('see-more');
    if (cards.length > 6) {
        // display specific number of phones
        cards = cards.slice(0, 6);
        seeMoreButton.classList.remove('d-none')
    } else {
        seeMoreButton.classList.add('d-none')
    }
    
    // display all phones
    cards.forEach(card => {
        console.log(card);
        console.log(card.name);
        console.log(card.features);
        let element;
        for (let i = 0; i < card.features.length; i++) {
            const element = card.features[i];
        }
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card p-2 h-100">
        <img src="${card.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
            <div class="card-title">
            <h5>Features:</h5>
            </div>
            <div class="">
            <ol id="feature-list">
            <li>${element}</li>
            </ol>
            <div class="card-footer d-flex justify-content-between">
                <div>
                    <h6>${card.name}</h6>
                </div>
                <button onclick="loadPhoneDetails('')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Phone Details</button>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
    });
}


loadCard();
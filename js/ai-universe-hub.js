const loadData = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
}

const displayData = (cards, dataLimit) => {
    console.log(cards);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    const seeMore = document.getElementById('see-more');
        if (dataLimit && cards.length > 0) {
            cards = cards.slice(0, 6)
            seeMore.classList.remove('d-none')
        } else {
            seeMore.classList.add('d-none')
        }
    cards.forEach(card => {
        console.log(card);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card p-2 h-100">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Features:</h5>
            <ul>
            <li><small>${card.features[0] ? card.features[0] : 'No data found'}</small></li>
            <li><small>${card.features[1] ? card.features[1] : 'No data found'}</small></li>
            <li><small>${card.features[2] ? card.features[2] : 'No data found'}</small></li>
        </ul>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <div>
                <h5 class="card-title">${card.name}</h5>
                <i class="font-awesome fa-solid fa-calendar-days fs-6">${card.published_in}</i>
                </div>
                <div>
                <button onclick="loadDetails('${card.id}')" class="btn btn-outline-primary rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
    });
    spinnerLoader(false)
}

document.getElementById('see-more').addEventListener('click', function () {
    spinnerLoader(true);
    loadData();    
})

const spinnerLoader = isLoading => {
    const spinner = document.getElementById('loader')
    if (isLoading) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}

const loadDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data.data);
}

const showDetails = (item) => {
    // console.log(item);
    const modalBody = document.getElementById('m-body');
    modalBody.textContent = '';
    const modalRow = document.createElement('div');
    modalRow.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'g-4');
    modalRow.innerHTML = `
    <div class="col px-1">
    <div class="card h-100 border-danger">
      <div class="card-body">
        <p class="card-text fw-bold">${item.description}</p>
      </div>
      <div class="d-flex">
      <div class="card w-100 px-2 d-flex justify-content-center align-items-center">
        <p class="text-success"><small>${item.pricing[0].price ? item.pricing[0].price : 'Free of cost'}</small></p>
      </div>
      <div class="card w-100 px-2 d-flex justify-content-center align-items-center">
        <p class="text-warning"><small>${item.pricing[1].price ? item.pricing[1].price : 'Free of cost'}</small></p>
      </div>
      <div class="card w-100 px-2 d-flex justify-content-center align-items-center">
        <p class="text-danger"><small>${item.pricing[2].price ? item.pricing[2].price : 'Free of cost'}</small></p>
      </div>
      </div>
      <div class="d-flex">
        <div>
            <h6 class="mt-2">Features</h6>
            <ul>
                <li><small>${item.features[1].feature_name ? item.features[1].feature_name : 'No data available'}</small></li>
                <li><small>${item.features[2].feature_name ? item.features[2].feature_name : 'No data available'}</small></li>
                <li><small>${item.features[2].feature_name ? item.features[2].feature_name : 'No data available'}</small></li>
            </ul>
        </div>
        <div>
            <h6 class="mt-2">Integration</h6>
            <ul>
                <li><small>${item.integrations[0] ? item.integrations[0] : 'No data available'}</small></li>
                <li><small>${item.integrations[1] ? item.integrations[1] : 'No data available'}</small></li>
                <li><small>${item.integrations[2] ? item.integrations[2] : 'No data available'}</small></li>
            </ul>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col">
    <div class="card h-100 border-warning">
      <img src="${item.image_link[0]}" class="card-img-top w-100 h-100" alt="...">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <h6 class="card-text">${item.input_output_examples[0].input ? item.input_output_examples
            [0].input : 'No data found'}</h6>
        <p><small>${item.input_output_examples[0].output ? item.input_output_examples
            [0].output : 'No data found'}</small></p>
      </div>
    </div>
  </div>
    `;
    modalBody.appendChild(modalRow);
}





loadData(6);
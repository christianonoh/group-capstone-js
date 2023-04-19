const Cards = document.querySelector('.container');

class TVShowCards {
  constructor() {
    this.collection = [];
  }

  fetchCardsData = async () => {
    const requests = [];

    for (let i = 1; i <= 22; i += 1) {
      requests.push(fetch(`https://api.tvmaze.com/shows/${i}`));
    }

    try {
      const responses = await Promise.all(requests);
      const data = await Promise.all(
        responses.map((response) => response.json()),
      );
      this.collection = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    return this.collection;
  };

  renderCards = (cardsData) => {
    Cards.innerHTML = '';
    cardsData.forEach((data) => {
      if (data.image) {
        Cards.innerHTML += `<div class='cards'>
              <div class='image-div'>
                <img src='${data.image.medium}' alt='#' class='image'>
              </div>
              <div class='name-like'>
                <h2 class='ch-nmae'>${data.name}</h2>
                <span class='heart'>&#x2764;</span>
                <span id='likeCount'>(0)</span>
              </div>
              <button class='comment-Btn'>Comments</button>
            </div>`;
      }
    });
  };

  async updateCards() {
    const cardsData = await this.fetchCardsData();
    this.renderCards(cardsData);
  }
}

export default TVShowCards;

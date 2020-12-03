async function getItems() {
    const response = await fetch('./offers.json');
    const data = await response.json();
    displayItems(data);
    slider();
}
getItems();


function displayItems(data) {
    const { offers } = data;
    const itemsArray = getThreeItems(offers);
    const sliderDiv = document.querySelector('.slider');

    sliderDiv.innerHTML += itemsArray.map((offer) => {
        const { name, price, currency, imgURL } = offer;
        const fixedPrice = formatPrice(price, currency);

        return `         
        <div class="slide">
                <div class="first">
                    <button class="btn closeBtn"></button>
                    <img class="product_img" src="${imgURL}" alt="${name} img">
                </div>
                <div class="second">
                    <p class="name">${name}</p>
                    <strong class="price">${fixedPrice}</strong>
                </div>
                <div class="third">
                    <button class="btn checkBtn">Check</button>
                </div>
            </div>  
     `;
    }).join('');
}


function formatPrice(price, currency) {
    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: `${currency}`,
    });

    return formatter.format(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


function getThreeItems(offers) {
    const offersArray = [];
    const offersAmount = offers.length;

    while (offersArray.length < 3) {
        let randomNumber = Math.floor(Math.random() * offersAmount);

        if (offersArray.indexOf(offers[randomNumber]) !== -1) {
            continue;
        } else {
            offersArray.push(offers[randomNumber]);
        }
    };
    return offersArray;
}

function slider() {
    let slidePosition = 0;
    const size = 158;
    const slides = document.querySelectorAll('.slide');
    const slidesLentgth = slides.length;

    const previousBtn = document.querySelector('.previous');
    const nextBtn = document.querySelector('.next');

    previousBtn.addEventListener('click', moveToPrevSlide);

    nextBtn.addEventListener('click', moveToNextSlide);

    function moveToNextSlide() {
        if (slidePosition === slidesLentgth - 1) {
            slidePosition = 0;
        } else {
            slidePosition++;
        };
        updatePosition();
    };

    function moveToPrevSlide() {
        if (slidePosition === 0) {
            slidePosition = slidesLentgth - 1;
        } else {
            slidePosition--;
        };
        updatePosition();
    };

    function updatePosition() {
        slides.forEach(slide => {
            slide.style.transition = "transform .4s ease-in-out";
            slide.style.transform = `translateX(-${size * slidePosition}px)`;
        });
    };

    setInterval(() => {
        moveToNextSlide();
    }, 5000);

}

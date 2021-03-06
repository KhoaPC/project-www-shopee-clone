const CONST_IMG_SAMPLE_RANDOM = 'https://picsum.photos/200';

async function fetchSampleProducts() {
    await fetch("assets/script/product-list-sample.json")
        .then(response => response.json())
        .then(data => {
            populateProductList(data);
        });
} // fetchSampleProducts

function populateProductList(products) {
    const productListContainer = document.querySelector('.content__product-list');
    const locations = ['Huế', 'Hà Nội', 'Tp. Hồ Chí Minh', 'Phú Yên'];
    const locationsCount = locations.length;

    products.forEach( (item, index) => {
        const { title, favorite, discount, priceFrom, priceTo, freeShip, sold, rating, location, img } = item;
        
        // Product element
        const product = document.createElement('div');
        product.classList.add('product-list__product');
        product.setAttribute('favorite', favorite);
        product.setAttribute('discount', discount > 0 ? '1' : '0');
        product.setAttribute('freeShip', freeShip);

        // Favorite
        const favoriteDiv = document.createElement('div');
        favoriteDiv.classList.add('product-list__product__favorite');
        favoriteDiv.innerText = 'Yêu thích';
        product.appendChild(favoriteDiv);

        // Discount
        const discountDiv = document.createElement('div');
        discountDiv.classList.add('product-list__product__discount');
        discountDiv.innerHTML = `<p>${discount}%</p><span>GIẢM</span>`;
        product.appendChild(discountDiv);

        // Image
        const image = document.createElement('img');
        image.src = `${CONST_IMG_SAMPLE_RANDOM}?${index}`; // HACK: Trailing index to request a different random image
        product.appendChild(image);

        // Below-image div
        const belowImageDiv = document.createElement('div');
        belowImageDiv.classList.add('product-list__product__below-img');
        let priceRandom1 = getRandomIntegerFromTo(5, 200) * 1000;
        let priceRandom2 = getRandomIntegerFromTo(10, 500) * 1000;
        const onePrice = getRandomIntegerFromTo(0, 1);
        const newPriceBetter = getRandomIntegerFromTo(0, 1) && onePrice;
        const priceFromRandom = Math.min(priceRandom1, priceRandom2);
        const priceToRandom = Math.max(priceRandom1, priceRandom2);
        const priceText = 
            onePrice ? 
            `₫${formatNumberWithThousandSeparator(priceFromRandom)}` :
            `₫${formatNumberWithThousandSeparator(priceFromRandom)} - ₫${formatNumberWithThousandSeparator(priceToRandom)}`;

        belowImageDiv.innerHTML = `
        <p role="product-list__product__name" class="lorem 50">${title}</p>
        <div>
            <p class="product-list__product__price ${newPriceBetter ? ' new-price-better' : ''}" old-price="₫${newPriceBetter ? formatNumberWithThousandSeparator(priceToRandom) : 0}">${priceText}</p>
            <p class="product-list__product__freeship">🚛</p>
        </div>
        <div>
            <p title="Thích" class="product-list__product__like">♡</p>
            <p class="product-list__product__sold" rating="${getRandomIntegerFromTo(1, 5)}">Đã bán ${sold}</p>
        </div>
        <p class=" product-list__product__location">${locations[getRandomIntegerFromTo(0, locationsCount - 1)]}</p>
        `;
        product.appendChild(belowImageDiv);

        productListContainer.appendChild(product);
    }); // forEach 
} // populateProductList

fetchSampleProducts();

// Top-pagination -------------------------------------------------------- START
// 2022.05.21
const paginationPageCurrentDisplay = document.querySelector('.content__filter__quantity--pick');
const paginationPagesTotalDisplay = document.querySelector('.content__filter__quantity--number');
const paginationNavPrev = document.querySelector('.content__filter__quantity__button__left'); paginationNavPrev.onclick = () => paginationPrev();
const paginationNavNext = document.querySelector('.content__filter__quantity__button__right'); paginationNavNext.onclick = () => paginationNext();

const CONST_PAGINATION_PAGES_TOTAL = 10;
let paginationPageCurrent = 1;

function paginationNext() {
    if (paginationPageCurrent < CONST_PAGINATION_PAGES_TOTAL)
        paginationPageCurrent++;

    paginationDisplay();
} // paginationNext

function paginationPrev() {
    if (paginationPageCurrent > 1)
        paginationPageCurrent--;

    paginationDisplay();
} // paginationPrev

function paginationDisplay() {
    paginationNavNext.querySelector('i').style.color = paginationPageCurrent < CONST_PAGINATION_PAGES_TOTAL ? 'black' : 'var(--color-black-level3)';
    paginationNavNext.style.cursor = paginationPageCurrent < CONST_PAGINATION_PAGES_TOTAL ? 'pointer' : 'no-drop';
    paginationNavPrev.querySelector('i').style.color = paginationPageCurrent > 1 ? 'black' : 'var(--color-black-level3)';
    paginationNavPrev.style.cursor = paginationPageCurrent > 1 ? 'pointer' : 'no-drop';

    paginationPageCurrentDisplay.innerText = `${paginationPageCurrent}`;
    // history.pushState(null, null, `/trang/${paginationPageCurrent}`);
} // paginationDisplay
// Top-pagination -------------------------------------------------------- START
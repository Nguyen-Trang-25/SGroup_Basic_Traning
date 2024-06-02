

const app = {
    API_URL: 'https://svc-0-staging-usf.hotyon.com/search?q=&apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83',
    async fetchData() {
        const response = await fetch(this.API_URL);
        const { data } = await response.json();
        return data;
    },

    handleEvent(selector, callback) {
        document.querySelector(selector).addEventListener('click', async function() {
            const result = document.querySelector('.act');
            result.innerHTML = await callback();
            app.attachEventHandlers(); // Gán sự kiện sau khi nội dung đã được cập nhật
        });
    },

    attachEventHandlers() {
        // Gán sự kiện cho các nút mới tạo
        const listItemsButton = document.getElementById('list__items');
        if (listItemsButton) {
            listItemsButton.addEventListener('click', async function() {
                const result = document.querySelector('.result');
                result.innerHTML = await app.getAllProducts();
            });
        }

        const lookButton = document.getElementById('look');
        if (lookButton) {
            lookButton.addEventListener('click', app.debounce(app.searchProduct));
        }

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', app.debounce(app.searchProduct));
        }
    },

    // Bai 1
    async getProduct() {
        const loadButton = document.querySelector('.loadButton'); 
        loadButton.textContent = 'Đang tải sản phẩm…';
        const data = await app.fetchData();
        console.log(data)
        if (data && data.items.length > 0) {
            loadButton.textContent = `Đã tải xong ${data.items.length} sản phẩm`;
        } else {
            loadButton.textContent = 'Không có sản phẩm nào';
        }

        return `
            <button id="list__items">Danh sách sản phẩm</button>
            <br>
            <p></p>
            <input type="text" id = "searchInput" placeholder="Nhập tên sản phẩm cần tìm">
            <button id = "look">Tìm kiếm</button>
        `;
    },

    bai1() {
        app.handleEvent('.loadButton', app.getProduct);
    },

    //Bai 2
    async getAllProducts() {
        const data = await app.fetchData();
        console.log("bai2")
        if (data && data.items && data.items.length > 0) {

            return data.items.map(item => {
                const priceInfo = item.variants.find(variant => variant.compareAtPrice > variant.price) || item.variants[0];
                const price = priceInfo.price;
                const discount = priceInfo.compareAtPrice ? Math.round(((priceInfo.compareAtPrice - price) / priceInfo.compareAtPrice) * 100) : 0;
                const options = item.options.map(option => `${option.name}: ${option.values.join(', ')}`).join('<br>');

                return `
                    <div class="product">
                        <h2>${item.title}</h2>
                        <p>${options}</p>
                        <p>Price: ${price}</p>
                        ${discount ? `<p>Discount: ${discount}%</p>` : ''}
                    </div>
                `;
            }).join('');
        } else {
            loadButton.textContent = 'Không có sản phẩm nào';
            return '';
        }
    },

    // Bai 3
    
    async searchProduct() {
        const searchInput = document.getElementById('searchInput');
        const searchResult = document.querySelector(".result");
        const query = searchInput.value.trim();

        if (query === '') {
            searchResult.innerHTML = '';
            return;
        }
    
        searchResult.innerHTML = 'Đang tìm kiếm...';
    
        try {
            const response = await fetch(`${app.API_URL}&q=${encodeURIComponent(query)}`);
            const {data}= await response.json();
            console.log(data)
    
            if (data && data.items && data.items.length > 0) {
                searchResult.innerHTML = data.items.map(item => {
                    return `<div>${item.title}</div>`;
                }).join('');
            } else {
                searchResult.innerHTML = 'Không có sản phẩm nào khớp với từ khóa cần tìm';
            }
        } catch (error) {
            console.error('Lỗi khi tìm kiếm sản phẩm:', error);
            searchResult.innerHTML = 'Đã xảy ra lỗi khi tìm kiếm sản phẩm';
        }
    },

    debounce(callback) {
        let timer;
        return function() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback();
            }, 300);
        }
    },

    init() {
        this.bai1();
    }
};

app.init();

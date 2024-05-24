const apiUrl = "https://svc-0-staging-usf.hotyon.com/search?apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83";

// Gửi yêu cầu đến API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data)
      let mostExpensiveProduct = null;
      let highestPrice = 0.0;

      // Duyệt qua các sản phẩm
      data.data.items.forEach(product => {
        product.variants.forEach(variant => {
          const priceValue = variant.price; 

          //Tìm sản phẩn đắt nhất
          if (priceValue > highestPrice) {
            highestPrice = priceValue;  
            mostExpensiveProduct = { ...product, variant };  
          }
        });
      });


      if (mostExpensiveProduct) {
        console.log(`${mostExpensiveProduct.title}`);
        console.log(`Price: $${highestPrice} USD`);
        console.log("Option:");
        console.log(` - Size: ${mostExpensiveProduct.variant.size || 'N/A'} - Color: ${mostExpensiveProduct.variant.color || 'N/A'}`);
      }
  })
  .catch(error => console.error('Error fetching products:', error));

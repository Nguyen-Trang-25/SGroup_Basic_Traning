const apiUrl = "https://svc-0-staging-usf.hotyon.com/search?apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83";

// btn.addEventListener("click",function(){
//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data)
//         let mostExpensiveProduct = null;
//         let highestPrice = 0.0;
  
//         // Duyệt qua các sản phẩm
//         data.data.items.forEach(product => {
//           product.variants.forEach(variant => {
//             const priceValue = variant.price; 
  
//             //Tìm sản phẩn đắt nhất
//             if (priceValue > highestPrice) {
//               highestPrice = priceValue;  
//               mostExpensiveProduct = { ...product, variant };  
//             }
//           });
//         });
  
  
//         if (mostExpensiveProduct) {
//           console.log(`${mostExpensiveProduct.title}`);
//           console.log(`Price: $${highestPrice} USD`);
//           console.log("Option:");
//           console.log(` - Size: ${mostExpensiveProduct.variant.size || 'N/A'} - Color: ${mostExpensiveProduct.variant.color || 'N/A'}`);
//           document.querySelector(".name").innerHTML = `${mostExpensiveProduct.title}`
//           document.querySelector(".price").innerHTML = `Price: $${highestPrice} USD`
//           // document.querySelector(".option p").innerHTML = "Option: "
//           // document.querySelector(".option .size").innerHTML = ` - Size: ${mostExpensiveProduct.variant.size} - Color: ${mostExpensiveProduct.variant.color}`

//         }
//     })
//     .catch(error => console.error('Error fetching products:', error));
// })

let data;
let items;

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
    console.log(data); // In ra dữ liệu sau khi đã lấy về và gán vào biến data
    items = data.data.items
    console.log(items);
    console.log(findIndexMaxPrice());
    maxPrice();
    totalPrice();
    findSoldOut();
    filterItemPrice();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

fetchData();


function maxPrice(){
  const btn = document.querySelector(".max_price button");
  let indexOptions = findIndexMaxPrice();
  let itemMaxPrice = getVariantOption(items[indexOptions.productIndex],indexOptions.variantIndex)

  //Sự kiện khi thực hiện tìm giá cao nhất
  btn.addEventListener("click",function(){
    document.querySelector(".name").innerHTML = `${itemMaxPrice.name}`
    document.querySelector(".price").innerHTML = `Price: $${itemMaxPrice.price} USD`
    document.querySelector(".option p").innerHTML = "Option: "
    document.querySelector(".option .size").innerHTML = ` - Size: ${itemMaxPrice.size || "No size"} - Color: ${itemMaxPrice.color || "No color"}`
  })
}
function findIndexMaxPrice(){
  let highestPrice = 0.0;
  let productIndex = -1;
  let variantIndex = -1;

  // Duyệt qua các sản phẩm
  items.forEach((product, pIndex) => {
    product.variants.forEach((variant, vIndex) => {
      const priceValue = parseFloat(variant.price); // Chuyển đổi giá trị về số thực

      // Tìm biến thể có giá cao nhất
      if (priceValue > highestPrice) {
        highestPrice = priceValue;
        productIndex = pIndex;
        variantIndex = vIndex;
      }
    });
  });
  // Trả về object chứa vị trí
  return {
    productIndex: productIndex,
    variantIndex: variantIndex,
  };
}

function getVariantOption(product, variantId){
  const variant = product.variants[variantId];
  const options = product.options;
  
  console.log(product.title);
  console.log(variant.price);

  const size = variant.options[0];
  const color = variant.options[1];

  if(options.length == 0){
    console.log("NO size");
    console.log("No color");
  } else{
    console.log(`Size: ${options[0].value[size] || 'Not'}`);
    console.log(`Color: ${options[1].value[color] || 'Not'}`);
  }

  return {
    name : product.title,
    price : variant.price,
    size : options[size],
    color : options[color]
  }
}

function totalPrice(){
  const btn = document.querySelector(".total_price button");
  let output = document.querySelector(".total_price .total")
  
  let item = items.find(item => item.title === "Test bundle")
  console.log(item)

  btn.addEventListener("click", function(){
    output.innerHTML = `${item.variants.reduce((total, variant) => {
      return total += variant.price;
    },0)} USD`
  })
}


function checkAvailable(variants){
  for(let i=0;i<variants.length;i++){
    if (variants[i].available != 0){
      return false
    }
  }
  return true
}

function findSoldOut(){
  const btn = document.querySelector(".sold_out button");
  const soldOutList = document.querySelector(".sold_out_list");

  let soldout = items.filter(item => checkAvailable(item.variants) == true)

  btn.addEventListener("click",function(){
    soldOutList.innerHTML = "";
    for (let i = 0; i < soldout.length; i++) {
      let listItem = document.createElement("li");
      listItem.textContent = soldout[i].title;
      soldOutList.appendChild(listItem);
    }
  })
}


function filterItemPrice() {
  const btn = document.querySelector(".filter_price button");
  
  btn.addEventListener("click", function() {
    const input = document.querySelectorAll(".filter_price input");
    const input1 = input[0].value; 
    const input2 = input[1].value;
    console.log(input1, input2);

    // Lọc các sản phẩm có giá trong khoảng từ input1 đến input2
    const filteredItems = items.filter(item => {
      const variants = item.variants;
      // Kiểm tra xem có biến thể nào có giá trong khoảng không
      return variants.some(variant => {
        const price = parseFloat(variant.price);
        return price >= input1 && price <= input2;
      });
    });
    console.log(filteredItems)
    const resultContainer = document.querySelector(".result");
    resultContainer.innerHTML = "";

    // Hiển thị danh sách sản phẩm và các biến thể có giá trong khoảng
    filteredItems.forEach(item => {
      const variants = item.variants.filter(variant => {
        const price = parseFloat(variant.price);
        return price >= input1 && price <= input2;
      });

      for(let i = 0;i<variants.length;i++){
        console.log(variants[i])
        const variantOption = getVariantOption(item, i);
        const listItem = document.createElement("div");
        listItem.innerHTML = `
          <p>Name: ${variantOption.name}</p>
          <p>Price: $${variantOption.price} USD</p>
          <p>Option: ${variantOption.size ? `Size: ${variantOption.size}` : "No size"} - ${variantOption.color ? `Color: ${variantOption.color}` : "No color"}</p>
        `;
        resultContainer.appendChild(listItem);
      }
    });

    console.log("đang tìm");
  });
}


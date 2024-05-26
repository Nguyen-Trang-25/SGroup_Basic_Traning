const apiUrl = "https://svc-0-staging-usf.hotyon.com/search?apiKey=1fedccb4-262f-4e65-ae6d-d01e8024fe83";

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
    filterSize();
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
    const resultContainer = document.querySelector(".filter_price .result");
    resultContainer.innerHTML = "";

    // Hiển thị danh sách sản phẩm và các biến thể có giá trong khoảng
    filteredItems.forEach(item => {
      console.log(item.title)
      const listItem = document.createElement("div");
      listItem.innerHTML = `
          <p>Name: ${item.title}</p>
        `;
      const variants = item.variants.filter(variant => {
        const price = parseFloat(variant.price);
        return price >= input1 && price <= input2;
      });

      for(let i = 0;i<variants.length;i++){
        console.log(variants[i])
        const variantOption = getVariantOption(item, i);
        const listVariant = document.createElement("div");
        listVariant.innerHTML = `
          <p></p>
          <p>Price: $${variantOption.price} USD | Option: ${variantOption.size ? `Size: ${variantOption.size}` : "No size"} | ${variantOption.color ? `Color: ${variantOption.color}` : "No color"}</p>
        `;
      listItem.appendChild(listVariant);
      }
      resultContainer.appendChild(listItem);
    });

    console.log("đang tìm");
  });
}

function getVariantOption(product, variantId){
  const variant = product.variants[variantId];
  const options = product.options;
  console.log(options)
  
  // console.log(product.title);
  // console.log(variant.price);
  let sizeIndex
  let colorIndex
  if(options && options.length > 0){
    sizeIndex = variant.options[0];
    colorIndex = variant.options[1];
    
  } else {
    console.log("NO size");
    console.log("No color");
  }

  let size;
  let color;
  if (options)   {
    if(options[0] && options[0].name === "Size"){
      size = options[0].values[sizeIndex];
    } else{
      if(options[1] && options[1].name === "Size"){
        size = options[1].values[sizeIndex];
      } else{
        size = null;
      }
    }
    
    if(options[0] && options[0].name === "Color"){
      color = options[0].values[sizeIndex];
    } else{
      if(options[1] && options[1].name === "Color"){
        color = options[1].values[sizeIndex];
      } else{
        color = null;
      }
    }
    
  }

  // let arrSize = options[0]
  return {
    name : product.title,
    price : variant.price,
    size : size,
    color : color
  }
}


function filterSize(){
  const btn = document.querySelector(".filter_size button");
  
  btn.addEventListener("click", function() {
    const input = document.querySelector(".filter_size input").value;
    console.log(input)
    // console.log(input1, input2);

    // Lọc các sản phẩm có size được nhập vào
    let filteredItems = items.filter(item => {
      // console.log(item.options)
      const arr_options = item.options;
      // Kiểm tra xem sản phẩm có size ko
      return arr_options.some(option =>{
        // console.log(option.name)
        return option.name === "Size"
      })
    });
    console.log(filteredItems)

    const resultContainer = document.querySelector(".filter_size .result");
    resultContainer.innerHTML = "";
    filteredItems = filteredItems.filter(item => {
      let arr_size = item.options.filter(option => option.name === "Size");
      return arr_size.some(size => {
          return size.values.includes(input);
      });
  });
    console.log(filteredItems)

    // Hiển thị danh sách sản phẩm và các biến thể có size thoa man 
    filteredItems.forEach(item => {
      const listItem = document.createElement("div");
      listItem.innerHTML = `<p>Name: ${item.title}</p>`;
      
      // Lọc các biến thể có size trùng với giá trị nhập vào
      const variants = item.variants.filter(variant => {
          return variant.options.some(option => {
            console.log(item.options.find(option => option.name ==="Size"))
              return item.options.find(option => option.name ==="Size").values[option] === input
          });
      });
      console.log(variants)
      // Hiển thị các biến thể
      variants.forEach(variant => {
          const variantItem = document.createElement("div");
          variantItem.innerHTML = `<p>Price: $${variant.price} USD | Option: ${variant.size ? `Size: ${variant.size}` : "No size"} | ${variant.color ? `Color: ${variant.color}` : "No color"}</p>
`;
          listItem.appendChild(variantItem);
      });

      resultContainer.appendChild(listItem);
    console.log("đang tìm");
  });
  })
}

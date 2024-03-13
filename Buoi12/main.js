// const API_URL = "https://pokeapi.co/api/v2/pokemon/ditto";

// const pokemonData = fetch(API_URL); //web API

// pokemonData.then(res => {
//     return res.json();
// })
// .then(data => {
//     console.log('fullfiled',data);
// })

//.json() => Chuyển data thuần thành object
//.finally => Luôn chạy ở cuối promise dù promise thành công hay thất bại.
//.all => Xử lý tất cả các bất đồng bộ

// const API_URL = "https://pokeapi.co/api/v2/pokemon/pikachu";

// const pokemonData = fetch(API_URL);



// Pikachu
setTimeout(() => {
    const a = document.getElementById('hihi');
    a.innerText = "PIKACHU";
    console.log(a);
    // document.getElementById('img').style.display='block'
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.getElementById('img').src = data.sprites.front_default
    })
    
},3000)
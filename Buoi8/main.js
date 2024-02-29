//Viết lại các hàm map, forEach, find, finIndex, reduce, filter sử dụng vòng lặp for/while
console.log("Viet lai cac ham\nMap")
const a = [1,3,5,4,8];   //map
for(let i=0;i<a.length;i++){
    a[i]*=3;
}
console.log(a);

console.log("ForEach");
const b = [1,3,5,4,8];  //forEach
let sum=0;
for(let i=0;i<b.length;i++){
    sum+=b[i]
}
console.log(sum);

console.log("Find");
const trees = ["dua","dau","chuoi","me"];  //find
for(let i=0;i<trees.length;i++){
    if(trees[i].startsWith("d")) {
        console.log(trees[i]);
        break;
    }
}

console.log("Filter");
const trees2 = ["dua","dau","chuoi","me"]; //filter
const trees3 = [];
let j=0;
for(let i=0;i<trees2.length;i++){
    if(trees2[i].startsWith("d")) {
        trees3[j] = trees2[i];
        j++;
    }
}
console.log(trees3);

console.log("FindIndex");
const trees4=[]; //findindex
for(let i=0;i<a.length;i++){
    if((a[i]%2)== 0) {
        console.log(i);
        break;
    }
}

console.log("Reduce");
const c = [1,3,5,4,8]; //reduce
var kt=true;
for(let i=0;i<c.length;i++){
    if(c[i]>=5){
        kt=false;
        break;
    }
}
console.log(kt,);

const a1=['a','b'];
const a2=[1,2,3];
console.log(a1,a2,'Noi mang',a1.concat(a2));

//Kiem tra so chan
const data1=[1,2,3,4,5];
const data2=[2,4,6];
console.log("Ham ",data1," deu la so chan ",data1.every(check))
function check(n) {
  return n%2==0;
}
console.log("Ham ",data2," deu la so chan ",data2.every(check))
function check(n) {
  return n%2==0;
}

//Kiem tra so chan
const data3=[1,2,3,4,5];
const data4=[1,1,3,1,5];
console.log("Ham ",data3," co so chan hay ko ",data3.some(check))
function check(n) {
  return n%2==0;
}
console.log("Ham ",data4," co so chan hay ko ",data4.some(check))
function check(n) {
  return n%2==0;
}

//In ra so duong
const amduong = [-1,9,4,3,-2]
const duong = amduong.filter(x => {
    return x>0;
})
console.log("Cac so duong trong ",amduong ," la ", duong);

//Tim so duong va vi tri
const data5 = [-1,-2,3,4,5];
const data6 = [-1,-2,-3];
if(data6.find(x => {return x>0;})==undefined){
    console.log("No result");
}
console.log("Vi tri so duong trong ",data5,"la",data5.findIndex(x => {return x>0;}),data5.find(x => {return x>0;}));

//In ra phan tu chia het cho 5
const data7 = [1,4,5,10,2];
console.log("Phan tu chia het cho 5 trong ",data7);
data7.forEach(x =>{
    if(x%5==0) console.log(x);
})

//Tim vi tri dau va cuoi cua 2
const vitri=[-1,2,3,-5,2,6];
console.log("Vi tri dau va cuoi cua so 2 trong",vitri);
console.log(vitri.indexOf(2),vitri.lastIndexOf(2));

//Noi va in cac phan tu trong mang
const noi = ["A",1,"3"];
console.log(noi," => ",noi.join(","));

//In ra gia tri tuyet doi
const arr2=[-1,2,-3];
console.log(arr2," => ",arr2.map(x => x=Math.abs(x)));

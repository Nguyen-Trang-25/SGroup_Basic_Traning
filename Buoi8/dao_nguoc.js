let n= prompt("Nhập số để tiến hành đảo ngược");
var daonguoc = function(n) {
    var kq = 0;
    var x = n;
    while (x !== 0) {
      kq = (kq * 10) + (x % 10);
      if(x>0) x=Math.floor(x / 10) 
      else x= Math.ceil(x / 10);
    }
    return kq;
  };
console.log("So dao nguoc cua", n, "La", daonguoc(n));
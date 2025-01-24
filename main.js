// convert base 10 to n 
function quotient(num, divisor) {

    let result = ( num - (num % 2)) / divisor;

    console.log(result);
    return  result;
}

function convertFromBase10ToBaseN(base10, n){
    
    console.log("convert from base 10 to base n", {base10, n});
    let x = base10; 
    let result ="";
    while(quotient(x, n) > 0){
        result = x % n  + result;
        x = quotient(x, n);


  
    }
    console.log(result);
    return result;
    
 }

  /* 
   2|10
   2|5  REM 0
   2|2 REM 1
   2|1 REM 0
   2|0 rem 1    
   
   1010

   declare my values ( result , base10 , n)
   declare value for remainder  (rem)
   base10 % n 
   re
*/ 
//convertFromBase10ToBaseN(10, 2);


const buttonone = document.querySelector(".btn1")
const inputbox = document.querySelector(".inputbox")
const buttontwo = document.querySelector(".btn2")
const buttonthree = document.querySelector(".btn3")

buttonone.addEventListener("click", () =>{
    inputbox.value += "0";
});

buttontwo.addEventListener("click", () =>{
    inputbox.value += "1";
});

buttonthree.addEventListener("click", () =>{
    inputbox.value = ""
})

function addBinary(num1, num2){

let carry = 0
let result = "";

//convert numbers to string

num1 = num1.toString();
num2 = num2.toString();

//pad shoorter string with zeros
while (num1.length < num2.length) num1 = '0' + num1
while (num2.length < num1.length) num2 = '0'+ num2

// add from the rigthmost 
 for (let i = num1.length - 1; i >= 0; i--) {
    const bit1 = parseInt(num1[i]);
    const bit2 = parseInt(num2[i]);

    const sum = bit1 + bit2 + carry;

    if (sum === 0) {
    result = "0" + result;
    carry = 0;
    }else if (sum === 1) {
    result = "1" + result;
    carry = 0;
    }else if (sum === 2){
    result = "0" + result;
    carry = 1
    } else if (sum === 3){
        result = "1" + result;
        carry = 1
    }
}

//talckes carry 
if (carry) {
  result = "1" + result;
}
 return result
}

//conecting the function to the buttons
const btnAdd = document.querySelector(".btnplus")
const  btnSub = document.querySelector(".btnminus")
const  btnMul = document.querySelector(".btnmul")
const btnDiv = document.querySelector(".btndiv")
const btnEqual = document.querySelector(".btn4");

let num1 = "";
let num2 = "";
let operator = "";
let divident ="";
let divisor="";

btnAdd.addEventListener("click", () => {
    num1 = inputbox.value;
    operator = "+"
    inputbox.value = "";
}) 

btnSub.addEventListener("click", () => {
    num1  = inputbox.value;
    operator = "-"
    inputbox.value = "";
})

btnMul.addEventListener("click", () => {
    num1 = inputbox.value;
    operator ="*";
    inputbox.value = "";
})
btnDiv.addEventListener("click",() => {
    divident = inputbox.value;
    operator ="/";
    inputbox.value ="";

})
btnEqual.addEventListener("click", () => {
    num2 = inputbox.value;
    if (operator === "+") {
        const sum = addBinary(num1, num2);
        inputbox.value = sum
    }else if(operator === "-"){
        const sub = subBinary(num1, num2)
        inputbox.value = sub
    }else if(operator === "*"){
        const mul = mulBinary(num1, num2)
        inputbox.value = mul
    }else if(operator === "/") {
        divisor = num2
        const div = divBinary(divident, divisor)
        inputbox.value = inputbox.value = `Q: ${div.quotient}, R: ${div.remainder}`;;
    }

});

//function for subtraction 
function subBinary(num1, num2){

let result = "";
let borrow = 0;

//convert numbers to string (easy to acces iot single handedly)
num1 = num1.toString();
num2 = num2.toString();

while (num1.length < num2.length) num1 = "0" + num1;
while (num2.length < num1.length) num2 = "0" + num2;

//subtract from the right most 
for (let j = num1.length - 1; j >= 0 ;j--){
    let bit1 = parseInt(num1[j]);
    let bit2 = parseInt(num2[j]);
    
    if (borrow) {
        bit1 -= 1;
        borrow = 0;
    }
    //if borrowing is needed
    if (bit1 < bit2) {
        bit1 += 2
        borrow = 1
    }
        
    const sub = bit1 - bit2
    result = sub + result
}

    result = result.replace (/^0+/, "")
    return result === ""? 0 : result

}
//function for multiplication 
function mulBinary(num1, num2){
  let result = 0;  

  //conversion to string
  num1 = num1.toString();
  num2 = num2.toString();
  
 //making sure you are starting from the right most position
 for(let i = num2.length-1; i>=0; i --){
      
    // checking the position of num2 so u can use the shift method
        if (num2[i]==="1"){
            let shiftedNum1 = num1 + "0".repeat(num2.length -1 - i) 
            result = addBinary(result, shiftedNum1)
        }
 }
    // remove leading zeros 
    result = result.replace(/^0+/, "")

    return result === "" ? "0" : result;
}


//function for division 
function divBinary(divident, divisor){
 let quotient =""
 let remainder = ""


 //check if the divisor is zero 
 if (divisor === "0") {
    return "error"
 }
 
 // start looping from the left hand side 
 for(let i = 0; i<divident.length; i++){
        remainder += divident[i]

    if (parseInt(remainder, 2) >= parseInt(divisor, 2)){
        remainder = subBinary(remainder, divisor)
        quotient += "1"
    }
    else {

        quotient += "0";
    }
 }
 //remove leading zeros from quoitent and remainder
 quotient = quotient.replace(/^0+/, "") || "0"
 remainder = remainder.replace(/^0+/, "") || "0"
 return {quotient, remainder}
}
console.log(divBinary("1101", "11")); 

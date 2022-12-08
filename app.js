
/*Bill-input value*/
const form = document.querySelector("form")
const billInput = document.querySelector("#bill-input");

let finallBill,finallTip,finallPeopleNum;

billInput.addEventListener("input",(e)=>{
    if(e.target.value !== ""){
        if(Number(e.target.value) && e.target.value > 0){
            let billVal =Number(e.target.value);
            /*Get Bill*/
            finallBill = billVal
            calcTips()
        }
    }
})



/*Select tips*/
const tibsBtns = document.querySelectorAll(".tips_btns .tips_btn")
const customTip = document.querySelector(".custom_tip_input")
tibsBtns.forEach(function(btn){
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        tibsBtns.forEach(btn => btn.classList.remove("active_tip"))
        btn.classList.add("active_tip");
        let tipAmout = btn.dataset.tip;
        /*Get Tip Amout*/
        finallTip = tipAmout
        calcTips()
        //Remove custome tip if it exist
        customTip.classList.remove("active-input")
        customTip.value=""
    })
})

customTip.addEventListener("input",(e)=>{
    if(e.target.value !== "" && Number(e.target.value) ){
        if(Number(e.target.value)>=0){
            let customTipAmount = e.target.value;
            // console.log(tip)
            /*Get Tip Amout*/
            finallTip = customTipAmount
            calcTips()
            //Remove Active Tip if it exist
            tibsBtns.forEach(btn => btn.classList.remove("active_tip"));
            customTip.classList.add("active-input")
        }
    }
})




/*Number of pepole*/
const peopleInput = document.querySelector(".people_input")
const erroMsg =  document.querySelector(".people_num .erro-msg")
peopleInput.addEventListener('input',(e)=>{
    if(e.target.value !== ""){
        if(Number(e.target.value)&&Number(e.target.value)>0){
            let pepoleVal =Number(e.target.value);
            /*People Num*/
            finallPeopleNum = pepoleVal
            calcTips()
        }
        if(Number(e.target.value)==0){
            // console.log("not");
            erroMsg.style.display="block";
            peopleInput.classList.add("invalid-input")
        }else{
            erroMsg.style.display="none";
            peopleInput.classList.remove("invalid-input")
        }
    }else{
        erroMsg.style.display="none";
        peopleInput.classList.remove("invalid-input")
    }
})


/*Calc Tips*/
const tipEle = document.querySelector(".tip-for-person")
const totalEle = document.querySelector(".total-for-person")
const resetInput = document.querySelector(".result input[type='reset']")
function calcTips(){
    if(finallBill&&finallTip&&finallPeopleNum){
        let allTipAmout_ = (finallBill * finallTip)/100;
        let allPriceAmout_ = finallBill+allTipAmout_;
        let totalAmoutForPerson = allPriceAmout_ / finallPeopleNum;
        let tipAmoutForPerson = allTipAmout_ / finallPeopleNum;

        tipEle.innerHTML = `$${tipAmoutForPerson.toFixed(2)}`
        totalEle.innerHTML = `$${totalAmoutForPerson.toFixed(2)}`
        resetInput.classList.add("result-showen")
    }
}

calcTips()
/*Form*/

form.addEventListener("reset",(e)=>{
    tibsBtns.forEach(btn => btn.classList.remove("active_tip"));
    customTip.classList.remove("active-input");
    tipEle.innerHTML = "$0.00";
    totalEle.innerHTML = "$0.00";
    finallBill = "";
    finallPeopleNum="";
    finallTip="";
    /*Reset input*/
    resetInput.classList.remove("result-showen")
})
const selectBox=document.querySelector(".select-box"),
selectXBox=selectBox.querySelector(".playerX"),
selectOBox=selectBox.querySelector(".playerO"),
playBoard=document.querySelector(".play-board");
allBox=document.querySelectorAll("section span");
players=document.querySelector(".players");
resultBox=document.querySelector(".result-box");
wonText=resultBox.querySelector(".won-text");
replayBtn=resultBox.querySelector("button");
window.onload=()=>{
    for(let i=0;i<allBox.length;i++){
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
    selectXBox.onclick=()=>{
      selectBox.classList.add("hide");
      playBoard.classList.add("show");
    }
    selectOBox.onclick=()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class","players active player")
    }
}
let playerXIcon="fas fa-times";
let playerOIcon="far fa-circle";
let playersSign="X";
let runBot=true;
function clickedBox(element){
     if(players.classList.contains("player")){
        playersSign="O";
        element.innerHTML=`<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        playersSign="O";
        element.setAttribute("id",playersSign)
     }else{
        element.innerHTML=`<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id",playersSign)
     }
     selectWinner();
    playBoard.style.pointerEvents="none";
    element.style.pointerEvents="none";
    let randomDelayTime=((Math.random()*1000)+200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    },randomDelayTime)
}
function bot(runBot){
   if(runBot){
    playersSign="O";
    let array=[];
    for(let i=0;i<allBox.length;i++){
        if(allBox[i].childElementCount==0){
            array.push(i);
          //  console.log(i+" "+"has no children");
        }
    }
    let randomBox=array[Math.floor(Math.random()*array.length)];
    if(array.length>0){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML=`<i class="${playerXIcon}"></i>`;
            players.classList.remove("active");
            playersSign="X";
            allBox[randomBox].setAttribute("id",playersSign)
        }else{
            allBox[randomBox].innerHTML=`<i class="${playerOIcon}"></i>`;
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id",playersSign);
        }
        // selectWinner();
    } 
    allBox[randomBox].style.pointerEvents="none";
    playBoard.style.pointerEvents="auto";
    playersSign="X";
   }
   
}
function getClass(idname){
    return document.querySelector(".box"+idname).id||"";
}
function checkClasses(val1,val2,val3,sign){
    if(getClass(val1)===sign && getClass(val2)===sign && getClass(val3)===sign){
        return true;
    }
}
function selectWinner(){
    if(checkClasses(1,2,3,playersSign)||checkClasses(4,5,6,playersSign)||checkClasses(7,8,9,playersSign)||checkClasses(1,4,7,playersSign)||checkClasses(2,5,8,playersSign)||checkClasses(3,6,9,playersSign)||checkClasses(1,5,9,playersSign)||checkClasses(3,5,7,playersSign)){
        console.log(playersSign+" "+"is the winner");
        runBot=false;
        bot(runBot);
        setTimeout(()=>{
          playBoard.classList.remove("show");
          resultBox.classList.add("show")
        },700);
        wonText.innerHTML=`Player <p>${playersSign}</p> won the game!`
    }else{
        if(getClass(1)!="" && getClass(2)!="" && getClass(3)!="" && getClass(4)!="" && getClass(5)!="" && getClass(6)!="" && getClass(7)!="" && getClass(8)!="" && getClass(9)!="" ){
            runBot=false;
            bot(runBot);
            setTimeout(()=>{
              playBoard.classList.remove("show");
              resultBox.classList.add("show")
        },700);
            wonText.textContent=`Match has been drawn!`;
        }
     }
}
replayBtn.onclick=()=>{
    window.location.reload();
}


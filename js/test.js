const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const about = document.querySelector("#about3H");

const endPoint = 20;
const select = [0,0,0,0];
const character = [0,0,0];
//const character ={Hustler:0, Hipster:0, Hacker:0};



function addAnswer(andswerText, qIdx, idx){
    var a = document.querySelector(".aBox");
    var answer = document.createElement('button');

    answer.classList.add('answerList');
    answer.classList.add('btn');
    
    answer.classList.add('fadeIn');

    a.appendChild(answer);

    answer.innerHTML = andswerText;

    answer.addEventListener("click",function(){
        var children = document.querySelectorAll('.answerList'); 
        for(let i=0;i<children.length;i++){
            children[i].disabled = true;

            children[i].style.WebkitAnimation = "fadeOut 0.5s"
            children[i].style.animation = "fadeOut 0.5s"
        }
        setTimeout(()=>{

            var target = qnaList[qIdx].a[idx].type;

            for(let i=0;i<target.length;i++){
                character[target[i]]+= 1;
            }

            for(let i=0;i<children.length;i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450)
        console.log(character);
    },false)
}

function getKeyByValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }

function calResult(){
    var sum = character[0]+character[1]+character[2];
    var HustlerPer = character[0]/sum *100;
    var HipsterPer = character[1]/sum *100;
    var HackerPer = character[2]/sum *100;
    var max_index = 0;
    for(i = 1;i<3;i++){
        if(character[i]>character[max_index]){
            max_index=i;
        }
        
    }
    var result = max_index;
    return result; 

}
function setResult(){
    let point = calResult();
    console.log(point);
    
    const resultNameIntro = document.querySelector('.resultIntro');
    resultNameIntro.innerHTML = infoList[point].nameIntro; 

    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    // var resultImg = document.createElement('img');
    // const imgDiv = document.querySelector("#resultImg");
    // var imgURL = 'img/image-' + point + '.png';

    // resultImg.src = imgURL;
    // resultImg.alt = point;
    // resultImg.classList.add('img-fluid');
    // imgDiv.appendChild(resultImg);
    var sum = character[0]+character[1]+character[2];
    var HustlerPer =  Math.floor( character[0]/sum *100 );
    var HipsterPer =  Math.floor( character[1]/sum *100 );
    var HackerPer = Math.floor( character[2]/sum *100 );
    const HusRes = document.querySelector('.title.percent0');
    const HipRes = document.querySelector('.title.percent1');
    const HackRes = document.querySelector('.title.percent2');
    HusRes.innerHTML = "Hustler: "+HustlerPer +"%";
    HipRes.innerHTML = "Hipster: "+HipsterPer +"%";
    HackRes.innerHTML = "Hacker:"+HackerPer +"%";
    
    const resultDesc1 = document.querySelector('.resultDesc1');
    const resultDescTitle1 = document.querySelector('.resultDescTitle1');
    resultDescTitle1.innerHTML = infoList[point].descTitle1;
    resultDesc1.innerHTML = infoList[point].desc1;
  
    const resultDesc2 = document.querySelector('.resultDesc2');
    const resultDescTitle2 = document.querySelector('.resultDescTitle2');
    resultDescTitle2.innerHTML = infoList[point].descTitle2;
    resultDesc2.innerHTML = infoList[point].desc2;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";            
        }, 450);
    },450);

    setResult();
}

function goNext(qIdx){
    if(qIdx == endPoint){
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    
    for(let i in qnaList[qIdx].a)
    {
        addAnswer(qnaList[qIdx].a[i].answer,qIdx,i);
    }
    var countStatusNum = document.querySelector('.countStatus');
    countStatusNum.innerHTML = (qIdx+1)+"/"+endPoint;

    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint)*(qIdx+1)+"%"

}

function start(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";            
        }, 450);
        let qIdx = 0;
        goNext(qIdx);
    },450);
}

const letters=document.querySelectorAll(".scoreboard-letter")
const loadingDiv= document.querySelector(".info-bar")
const answer_length=5;
let currentrow=0;
let done=false;
let isLoading;
 
 async function init()
 {
     let currentGuess='';

     const res=await fetch("https://words.dev-apis.com/word-of-the-day?random=1");
const resObj=await res.json();

const word=resObj.word.toUpperCase();
const wordParts=word.split("");

console.log(word);

    function addLetter(letter)
{
    if(currentGuess.length < answer_length) 
    {
        currentGuess+=letter;
    }
    else{
        //replace the last letter
        currentGuess = currentGuess.substring(0, currentGuess.length-1) +letter;
    }

    
    letters[answer_length*currentrow + currentGuess.length-1].innerText= letter;

}     


      document.addEventListener('keydown', function handlekeypress(event){
        if(done)
        return;
        const action=event.key; //learn more on this
        if(action==='Enter')
        commit(currentGuess);

        else if(action==='Backspace')
        {
            backspace();
        }

        else if(isLetter(action))
        {
            addLetter(action.toUpperCase())

        }
else{
    // do nothing;
}

      }); 

      function backspace()
      {
        letters[answer_length*currentrow + currentGuess.length-1].innerText= " ";
        currentGuess= currentGuess.substring(0, currentGuess.length-1);
        
      }

      function isLetter(letter)
      {
        return /^[a-zA-Z]$/.test(letter);
      }


      async function commit(word)
      {
        if(currentGuess.length!==answer_length)
        return;
  
       

        const guessParts=currentGuess.split("");
        const map=makeMap(wordParts);
        let allRight=true;
for(let i=0;i<answer_length;i++)
{
    if(guessParts[i]===wordParts[i])
    {
        letters[currentrow*answer_length + i].classList.add("correct");
        map[guessParts[i]]--;
    }
}


for(i=0;i<answer_length;i++)
{
    if(guessParts[i]===wordParts[i])
    continue;

    else if(wordParts.includes(guessParts[i]))
    {
        if(map[guessParts[i]]===0)
        continue;
        else
        {
    letters[currentrow*answer_length+i].classList.add("present");
    map[guessParts[i]]--;
    allRight=false;
        }
    }

    else 
    {
    letters[currentrow*answer_length+i].classList.add("incorrect")
    allRight=false;
    }
   

}    

currentrow++;

if(allRight)
{
alert('you win!')
done=true;

}
    
currentGuess=''; 


    if(currentrow===6)
   {
      alert(`you lose, the word was ${word}`);
      done=true;
   }


      
      }


      function makeMap(array)
      {
        const obj={};
        for(let i=0;i<array.length;i++)
        {
            const letter=array[i];
            if(obj[letter])
            obj[letter]++;
            else
            obj[letter]=1;
        }

        return obj;
      }

   
 }
   init();
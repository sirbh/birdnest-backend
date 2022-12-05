import exp from "constants"

function distance(x:number,y:number){
   x = 250-parseFloat((x/1000).toFixed(2))
   y = 250-parseFloat((y/1000).toFixed(2))

   return ((Math.sqrt(x*x+y*y)))
}

export{distance}







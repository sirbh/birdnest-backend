export default function distance(x:number,y:number){
   x = 250000-x
   y = 250000-y

   return Math.sqrt(x*x+y*y)
}


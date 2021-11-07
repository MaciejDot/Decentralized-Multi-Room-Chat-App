export const createIslands = <T>(array: T[],
     acceptableDiffrenceBeetweenToElements: (a: T, b:T) => boolean)  =>{
            const islands : T[][] = [];
            array.forEach((x, index)=> {
                if(index===0){
                    islands.push([x])
                    return;
                }
                const island = islands[islands.length -1]
                if(acceptableDiffrenceBeetweenToElements(island[island.length -1],x)){
                    island.push(x)
                    return;
                }
                islands.push([x])
            })
            return islands
     }
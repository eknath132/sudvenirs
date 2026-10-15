export function roundPriceUp(amount:number){const cents=Math.round(amount*100);const step=cents<100000?10000:50000;return Math.ceil(cents/step)*step/100;}
export function minimumPrice(cost:number){return cost>0?Math.ceil(Math.round(cost*300)/10000)*100:null;}
export function productionPrice(hours:number,grams:number,loss:number,kg:number,hourly=100,filaments=1,extraPct=5){
 const material=grams*kg/1000*(1+loss/100);
 const materialExtra=material*Math.max(0,filaments-1)*extraPct/100;
 const cost=Math.round((hours*hourly+material+materialExtra)*100)/100;
 return {cost,wholesale:cost>0?Math.ceil(Math.round(cost*300)/50000)*500:null,minimum:minimumPrice(cost),materialExtra:Math.round(materialExtra*100)/100};
}

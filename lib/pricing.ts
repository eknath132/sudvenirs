export function roundPriceUp(amount:number){const cents=Math.round(amount*100);const step=cents<100000?10000:50000;return Math.ceil(cents/step)*step/100;}
export function productionPrice(hours:number,grams:number,loss:number,kg:number,hourly=100){const cost=Math.round((hours*hourly+grams*kg/1000*(1+loss/100))*100)/100;return {cost,wholesale:cost>0?roundPriceUp(cost*3):null};}

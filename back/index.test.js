
import { sum } from "./index.js";
 
function separ(a,b) {
    const separar = a.split(b);
    return separar[0]
}
describe('test numeber one and number two  of a lot', () => {
    it("must returno the firs parameter less the secund", () =>{
        const a = "Você gosta de picancia";
        const b = "ncia";
        const oneLessOther = separ(a,b);
        console.log(oneLessOther);
        expect(oneLessOther).toBe("Você gosta de pica");
    })

    it("sum", () =>{
        const a = 1;
        const b = 2;
        const result = sum(a,b);
        console.log(result);
        expect(result).toBe(3);
    })
})





export const bgColor = (mode:'light'|'dark') => mode === 'light' ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)"

export const cardColor = (mode:'light'|'dark') => mode === 'light' ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)"

export const textColor = (mode:'light'|'dark') => mode === 'light' ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)"

export const numberComma = (number:number)=>{
    let string = number.toString()
    let array = string.split('')
    let mod = array.length % 3
    let indexToAddComma = mod === 0 ? 2 : mod-1
    let word = ""
    for (let index = 0; index < array.length; index++) {
        word += array[index];
        if(index === indexToAddComma && index!=array.length-1){
            indexToAddComma+=3
            word+=","
        }
    }
    return word
}


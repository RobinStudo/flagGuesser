export class ArrayUtil{
    static randomElement(array){
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}

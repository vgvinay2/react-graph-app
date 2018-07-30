export function *generateId () {
    let i = 0;
    while(true){
        yield i++
    }
}
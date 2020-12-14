const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if( a < 0 || b < 0){
                return reject("Numbers must be non-negative")
            }
            console.log(2)
            resolve(a + b)
        }, 2000)
    })
}


const doWork =  async() => {
    const sum1 = await add(1,2)
    const sum2 = await add(sum1, 10)
    const sum3 = await add(sum2, 12)
    const sum4 = await add(sum3, 2)
    return sum4

}

doWork().then((result) => {
    console.log('result', result)
}).catch((e) => {
    console.log("catch", e)
})
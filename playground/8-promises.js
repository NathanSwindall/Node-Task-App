const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        // resolve([7,3,2])
        reject("Things went wrong")
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log('Success', result)
}).catch((error) => {
    console.log("Failure")
})
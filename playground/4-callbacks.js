const doWorkCallback = (callback) => {
    setTimeout(()=>{
        callback("error", undefined)
        //callback(undefined, [1,2,3])
    },2000)

}

doWorkCallback((error, result) =>{
    if(error){
        return console.log("There was an error")
    }

    console.log("Hello, how are you")
})
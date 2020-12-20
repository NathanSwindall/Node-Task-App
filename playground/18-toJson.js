// This file will show you how to customize the json.stringfy method

const myObj = {
    catName : "Hal"
}

console.log(JSON.stringify(myObj))

const myObj2 = {
    dogname: "Hal 2.0",
}

myObj2.toJSON = function(){
    const myObj2 = this
    delete myObj2.dogname
    return myObj2
}

console.log(JSON.stringify(myObj2))



var enviro = process.env.NODE_ENV;
console.log(enviro);


const promise = new Promise((resolve, reject) => {

    resolve(vahdo);

    reject(new Error("Error"));
});


promise.then(result=>console.log('result:',result)).catch(err=>console.log('error:',err.message));
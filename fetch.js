//let explain await 
//async before a function means that it will return a promise
/**
 * 
 * the function will return promise  and wrap and non promise on it 
 * await is settled to wait for new Promise result
 *  
 * 
 */
// only works on async function 
async function showAvatar(){
    //read our JSON
    let response=await fetch('')
    let user =await  response.json()
    
}
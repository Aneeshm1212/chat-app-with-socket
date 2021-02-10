const genratemsg =(text)=>{
    const date = new Date().getTime()
    return {
        text,
        date
    }
}


module.exports={genratemsg}
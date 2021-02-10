const users =[]
const adduser  =  (id,username,roomno)=>{
    
    const usernamer = username.trim() 
    const roomnor = roomno.trim()

    if(!usernamer || !roomnor)
    {
       return ({error:'Username and RoomNo not Found'})
    }

    const existinguser = users.find((value)=>{
        return value.usernamer === usernamer && value.roomnor === roomnor
    })
        if(existinguser)
    {
        return({error:'Username  already in use'})
    }

    users.push({id,usernamer,roomnor})
    return {users}
}

const removeuser = (id)=>{

    const index = users.findIndex((val)=>{
        return val.id === id
    })

    if(index !== -1)
    {
        return users.splice(index , 1)[0]
    }
}

const getUser = (id)=>{

    const user = users.find((userr)=>{
        return userr.id === id
    })
    if(!user)
    {
        return({error:'User not found'})
    }
     return user
}


const getUsersInRoom =(roomno)=>{

    const user = users.filter((val)=>{
        return val.roomnor === roomno
    });
    if(!user)
    {
        return({error:'User not found'})
    }
     return user

}

module.exports = {
    adduser,
    getUser,
    getUsersInRoom,
    removeuser
}
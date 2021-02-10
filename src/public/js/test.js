const socket = io();
const msgtemplate = document.querySelector('#msg-temp').innerHTML;
const msgs = document.querySelector('#msg-con');
const loctemp=document.querySelector('#loc-temp').innerHTML;

const data = Qs.parse(location.search,{ignoreQueryPrefix:true}) 

socket.emit('join',data,(error)=>{
    if(error)
    {
        alert(error)
        location.href ='/join.html'
    }
})

socket.on('MessageRec',(val)=>{
    console.log(val)
    const html=Mustache.render(msgtemplate,{
        msg:val.text,
        created:moment(val.date).format('h:mm A')
    });
    msgs.insertAdjacentHTML('beforeend',html);
});

socket.on('LocationRec',(val)=>{
    console.log(val)
    const html=Mustache.render(loctemp,{
        text:val,
        value:'My Current Location',
        createdloc:moment(val.date).format('h:mm A')
    });
    msgs.insertAdjacentHTML('beforeend',html);
});

const button =document.querySelector('#submit');
const form =document.querySelector('#form');
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    button.setAttribute('disabled','disabled')
    const textFld = document.querySelector('#textfld');
    socket.emit('MessageSent',textFld.value,()=>{
        button.removeAttribute('disabled');
        textFld.value='';
        textFld.focus()
        console.log('Msg delivered')
    })
    
   
});

const loca =  document.querySelector('#sendloc');
loca.addEventListener('click' ,()=>{
    if(!navigator.geolocation)
    {
     return  alert('Feature not available on this device')
    }
    loca.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((loc)=>{
        const values = {
            lat:loc.coords.latitude,
            long:loc.coords.longitude
        }
    
        socket.emit('sendloc',values,()=>{
            loca.removeAttribute('disabled')
            console.log('Location Shared')
        });
    });
});


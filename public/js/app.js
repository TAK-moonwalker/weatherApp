console.log('client side javascript is successed!')

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
// response.json().then((data)=>{
// console.log(data);
// })
// })

// fetch('/weather?location=osaka').then((response)=>{
// response.json().then((data)=>{
//     if(data.error){
//        return console.log(data.error);
//     }
//     console.log(data.location);
//     console.log(data.Weatherforcase);
// })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message01 = document.querySelector('#message1')
const message02 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchValue = search.value;
message01.textContent = 'loading...'
message02.textContent = 'loading...'

    fetch(`/weather?location=${searchValue}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
               return message01.textContent = data.error;
            }
            message01.textContent = data.location;
            message02.textContent = data.Weatherforcase;
        })
        })
        


})
const authorSearch = document.getElementById('authorSearch');
authorSearch.addEventListener('keyup', e =>{
    let currentValue = e.target.value.toLowerCase();
    let authors = document.querySelectorAll('h2.title');
    authors.forEach(author =>{
        if(author.textContent.toLowerCase().includes(currentValue)){
            author.parentNode.style.display = 'block';
        }
        else{
             author.parentNode.style.display = 'none';
        }
    });
});














// const authorSearch = document.getElementById('authorSearch');
// authorSearch.addEventListener('keyup', e =>{
//     let currentValue =  e.target.value.toLowerCase();
//     // console.log(currentValue);
//     let authors = document.querySelectorAll('h2.title');
//      authors.forEach(authors =>{
//        if(authors.textContent.toLowerCase().includes(currentValue)){
//             authors.parentNode.parentNode.style.display = 'block';
//        }
//        else{
//             authors.parentNode.parentNode.style.display = 'none';
//        } 
//      });
// });
let cards = document.querySelector(".cards")

axios("http://localhost:8080/Fav").then((res)=>{
    data=res.data
    getFavorites(data)
})


function getFavorites(arr) {
    cards.innerHTML=""
    arr.forEach(el => {
        cards.innerHTML+=`
        <span class="col-lg-4 col-md-6 card">
                <div class="card-inner">
                    <div class="flaticon">
                        <img src="${el.image}" alt="" width="60px" height="60px">
                    </div>
                    <h4 class="mt-4 text-center">${el.job}</h4>
                    <p class="mt-4 text-center text-secondary">${el.desc}</p>
                    <p class="mt-4 text-center">Price: $<span class="text-danger">${el.price}</span></p>
                    <a href="#" class="more btn btn-danger text-dark mb-3" onclick=deleteFav("${el.id}",this)>Delete</a>
                </div>
            </span>
        `
    });
}

async function deleteFav(id,btn) {
    await axios.delete(`http://localhost:8080/Fav/${id}`)
    btn.closest("span").remove
}
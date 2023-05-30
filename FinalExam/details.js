let cards = document.querySelector(".cards")

let id = new URLSearchParams(window.location.search).get("id")

axios.get(`http://localhost:8080/Products/${id}`).then((res)=>{
    console.log(res.data);
    cards.innerHTML=""
    cards.innerHTML=`
    <div class="col-lg-4 col-md-6 card">
                <div class="card-inner">
                    <div class="flaticon">
                        <img src="${res.data.image}" alt="" width="60px" height="60px">
                    </div>
                    <h4 class="mt-4 text-center">${res.data.job}</h4>
                    <p class="mt-4 text-center text-secondary">${res.data.desc}</p>
                    <p class="mt-4 text-center">Price: $<span class="text-danger">${res.data.price}</span></p>
                    <p class="mt-4 text-center">Id: $<span class="text-success">${res.data.id}</span></p>
                </div>
            </div>
    `
})
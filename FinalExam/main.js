let header = document.querySelector("header")
let cards = document.querySelector(".cards")
let search = document.querySelector(".search")
let sortBtn = document.querySelector(".sortBtn")

window.addEventListener("scroll",function () {
    if (window.scrollY>100) {
        header.style.backgroundColor="rgba(0,0,0,0.8)"
        header.style.transition="0.8s"
    }else {
        header.style.backgroundColor="transparent"
    }
})

axios.get("http://localhost:8080/Products").then((res)=>{
    data=res.data
    console.log(data);
    getAllData(data)
})


function getAllData(arr) {
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
                    <a href="details.html?id=${el.id}" class="more btn btn-outline-danger text-dark">MORE DETAILS</a>
                    <div class="mt-3">
                        <a href="#" class="btn btn-danger" onclick=deleteCard("${el.id}",this)>Delete</a>
                        <a href="addEdit.html?id=${el.id}" class="btn btn-success">Edit</a>
                        <a href="#"  class="btn btn-primary" onclick=addFav("${el.id}")>Add to Fav</a>
                    </div>
                </div>
            </span>
        `
    });
}

async function deleteCard(id,btn) {
   await axios.delete(`http://localhost:8080/Products/${id}`)
   btn.closest("span").remove()
}

search.addEventListener("input" , async function (e) {
   const res = await axios("http://localhost:8080/Products")
   const data = await res.data
   let filtered=data.filter((el)=>el.job.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
   getAllData(filtered)
})


sortBtn.addEventListener("click",function () {
  if (this.innerHTML=="Ascending") {
    axios.get("http://localhost:8080/Products").then((res)=>{
        data=res.data
        let sortAsc=data.sort((a,b)=>a.price-b.price)
        getAllData(sortAsc)
    })
      this.innerHTML="Descending"
  } 
  else if(this.innerHTML=="Descending"){
    axios.get("http://localhost:8080/Products").then((res)=>{
        data=res.data
        let sortDsc=data.sort((a,b)=>b.price-a.price)
        getAllData(sortDsc)
    })
    this.innerHTML="Deafult"
  } else {
    axios.get("http://localhost:8080/Products").then((res)=>{
        data=res.data
        getAllData(data)
    })
    this.innerHTML="Ascending"
  }
})


async function addFav(id) {
    const res = await axios(`http://localhost:8080/Products/${id}`)
    const obj = await res.data

    await axios.post("http://localhost:8080/Fav",obj)
}
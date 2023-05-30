let form = document.querySelector("#form")
let jobInput = document.querySelector("#job")
let descInput = document.querySelector("#desc")
let priceInput = document.querySelector("#price")
let fileInput = document.querySelector(".file")
let Submitbtn = document.querySelector(".submit")
let add = document.querySelector(".add")

let id = new URLSearchParams(window.location.search).get("id")

axios(`http://localhost:8080/Products/${id}`).then((res)=>{
    data=res.data

    jobInput.value=data.job,
    descInput.value=data.desc,
    priceInput.value=data.price
})

form.addEventListener("submit",function (e) {
    e.preventDefault()

    let obj={
        job: jobInput.value,
        desc: descInput.value,
        price: priceInput.value,
        image: `./images/${fileInput.value.split("\\")[2]}`
    }

    if (obj.job && obj.desc && obj.price) {
        if (id) {
            axios.patch(`http://localhost:8080/Products/${id}`,obj)
        } else {
            axios.post("http://localhost:8080/Products",obj)
        }
        window.location="index.html"
    } else {
        alert("Pls,fill all the fields!")
    }
})

if (id) {
    Submitbtn.value="Edit"
    add.innerHTML="Edit a Card"
} else {
    add.innerHTML="Add a Card"
}

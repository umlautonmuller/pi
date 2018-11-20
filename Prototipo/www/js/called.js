var items = document.querySelectorAll("button.call-instances")

for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", ev => {
        if (ev.target.nextElementSibling.classList == "info open"){
            ev.target.nextElementSibling.classList.remove("open")
        }else{
            for (let j = 0; j < items.length; j++) {
                console.log(items[j].nextElementSibling.classList)
                if (items[j].nextElementSibling.classList=="info open"){
                    items[j].nextElementSibling.classList.remove("open")
                    j = items.length
                }
            }
            var info = ev.target.nextElementSibling
            info.classList.add("open")
            }
    })
}
const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    bvList()
    // getAllBeanVarieties()
    //     .then(beanVarieties => {
    //         console.log(beanVarieties);
    //     })
});

const bvList = () => {
    const bvEl = document.querySelector("#bv-info")
    let bvHTMLRep = ""
    getAllBeanVarieties()
    .then(allBv => {
        console.log(allBv)
        for (const bv of allBv) {
            bvHTMLRep += bvHTML(bv)
        }
        bvEl.innerHTML = `${bvHTMLRep}`
    })
}

const bvHTML = (bv) => {
    return `
        <div class="bv-card">
            <h2>Name: ${bv.name}</h2>
            <p>Region: ${bv.region}</p>
            <p>Notes: ${bv.notes}</p>
        </div>
    `
}

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}
const url = "https://localhost:5001/api/beanvariety/";

const stuffEl = document.querySelector("#stuff-goes-here")
const body = document.querySelector("body")

// ================================== show bean varities ==================================
const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    bvList()
});

const bvList = () => {
    let bvHTMLRep = ""
    getAllBeanVarieties()
    .then(allBv => {
        console.log(allBv)
        for (const bv of allBv) {
            bvHTMLRep += bvHTML(bv)
        }
        stuffEl.innerHTML = `${bvHTMLRep}`
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

// ================================== add bean varities ==================================
const addBVButton = document.querySelector("#addBV-button")
addBVButton.addEventListener("click", () => {
    stuffEl.innerHTML = `
        <div>
            <label for="name">Name :</label>
            <input type="text" name="name" id="name">
        </div>

        <div>
            <label for="region">Region:</label>
            <input type="text" name="region" id="region">
        </div>

        <div>
            <label for="notes">Notes:</label>
            <textarea name="notes" id="notes"></textarea>
        </div>

        <div>
            <button id="submit-bean-button">Submit Bean!</button>
        </div>
    `
})

// const submitBeanButton = document.querySelector("#submit-bean-button")
body.addEventListener("click", event => {
    event.preventDefault()
    if (event.target.id === "submit-bean-button") {
        console.log("FUCKIN BUTTON CLICKED")
        let name = document.querySelector("input[name='name']").value
        console.log(name)
        let region = document.querySelector("input[name='region']").value
        console.log(region)
        let notes = document.querySelector("textarea[name='notes']").value
        console.log(notes)
    
        const beanObj = {
            name: name,
            region: region,
            notes: notes
        }
    
        addBeanVariety(beanObj)
        // .then(bvList())
    }
})

function addBeanVariety(beanObj) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(beanObj) 
    })
    .then(response => response.json()) 
}
var pname = document.getElementById('pname')
var pprice = document.getElementById('pprice')
var pdesc = document.getElementById('pdesc')
var pcatagory = document.getElementById('pcatagory')
var tableBody = document.querySelector('.table tbody')
var form = document.querySelector('.form-section form')
var insertBtn = document.querySelector('form .btns .insert')
var updateBtn = document.querySelector('form .btns .update')

var pList = [];
if(localStorage.getItem('pList') !== null){
    pList = JSON.parse(localStorage.getItem('pList'));
    displayOnTable()
}

function addNewProduct(){

    if(pname.value != '' && pdesc.value != '' && pcatagory.value != '' && pprice.value != ''){
        row = {
            name: pname.value,
            price: pprice.value,
            catagory: pcatagory.value,
            desc: pdesc.value
        }
        
        pList.push(row);
        localStorage.setItem('pList', JSON.stringify(pList));
        displayOnTable()
        form.reset();
        document.querySelector(".alert").classList.add("d-none")
    }else{
        document.querySelector(".alert").classList.remove("d-none")
    }


}



function displayOnTable(){

    if(pList.length > 0){
        tableBody.innerHTML = ''
        pList.forEach((p, index)=>{
            tableBody.innerHTML += `              
            <tr>
                <th>${index +1}</th>
                <td>${p['name']}</td>
                <td>${p['price']}</td>
                <td>${p['catagory']}</td>
                <td>${p['desc']}</td>
                <td>
                    <button type="button" onclick="editProduct(${index})" class="btn btn-info"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" onclick="deleteProduct(${index})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
          `


        })
    }

}

function deleteProduct(id){
    if(confirm('Are you sure you want to delete this product?')){
        pList.splice(id);
        localStorage.setItem('pList', JSON.stringify(pList));
        displayOnTable()
    }
}

function editProduct(id){
    var product = pList[id];
    pname.value = product['name'];
    pprice.value = product['price'];
    pcatagory.value = product['catagory'];
    pdesc.value = product['desc'];
    insertBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')

    updateBtn.innerHTML = `
    <button type="button" onclick="updateProduct(${id})" class="btn btn-primary">Update</button>
    <button type="button" onclick="endUpdate()" class="btn btn-outline-primary">Cancel</button>
    `

}



function endUpdate(){
    form.reset();
    updateBtn.classList.add('d-none')
    insertBtn.classList.remove('d-none')
}

function updateProduct(id){
    var product = pList[id];

    product['name'] = pname.value;
    product['price'] = pprice.value;
    product['catagory'] = pcatagory.value;
    product['desc'] = pdesc.value;

    localStorage.setItem('pList', JSON.stringify(pList));
    displayOnTable();
    endUpdate();
}



function searchProduct(term){
    if(term != null){
        tableBody.innerHTML = ''
        pList.forEach((p, index) => {
        if(p['name'].toLowerCase().includes(term.toLowerCase())){
            tableBody.innerHTML += `              
            <tr>
                <th>${index +1}</th>
                <td>${p['name']}</td>
                <td>${p['price']}</td>
                <td>${p['catagory']}</td>
                <td>${p['desc']}</td>
                <td>
                    <button type="button" onclick="editProduct(${index})" class="btn btn-info"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" onclick="deleteProduct(${index})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
          `
        }
        })
    }
    else{
        displayOnTable()
    }
}



var data;
var page = 1;
let product_div = document.getElementById("dispro");
var filters = ["type=sunglass"];
sunglass_products();

function display_items(text){
   let items = document.getElementById(text);
   let item_arrow = document.getElementById(`${text}_chav`);
   if(item_arrow.attributes[2].value=="fas fa-caret-down"){
       item_arrow.removeAttribute('class');
       item_arrow.setAttribute('class', 'fas fa-caret-up');
       items.style.display='none';
    }
    else{
        item_arrow.removeAttribute('class');
        item_arrow.setAttribute('class', 'fas fa-caret-down')
        items.style.display='block';
        let item = document.querySelectorAll(`#${text}>div`);
        for(let i = 0; i < item.length; i++){
            item[i].style.display='flex';
        }
   }
}

function filterProducts(filter) {
    filters.push(filter);
    sunglass_products();
}

function scroll_div() {
    if (product_div.scrollHeight - 1 < product_div.clientHeight + product_div.scrollTop) {
        page++;
        sunglass_products();
    }
}
async function sunglass_products() {
    try {
        let fill = filters.join('&')
        console.log(filters)
        let res = await fetch(`https://anoxco0-product.herokuapp.com/specmakers?${fill}&_limit=${page*12}`);
        let res1 = await fetch('https://anoxco0-product.herokuapp.com/specmakers?type=sunglass');
        let data1 = await res1.json();
        document.getElementById("totalprod").innerHTML = ` Total ${data1.length} Products`
        data = await res.json();
        show_filter(data1);
        document.getElementById('dispro').innerHTML=""
        display(data)
    } catch (error) {
        console.log(error);
    }
}

function show_filter(data) {
    let frame_types = {};
    let frame_shapes = {};
    let frame_colors = new Set();
    let frame_sizes = new Set();
    for (let i = 0; i < data.length; i++) {
        frame_types[data[i].hashtagList[3].name]?frame_types[data[i].hashtagList[3].name]++:frame_types[data[i].hashtagList[3].name]=1;
        frame_shapes[data[i].hashtagList[1].name]?frame_shapes[data[i].hashtagList[1].name]++:frame_shapes[data[i].hashtagList[1].name]=1;
        frame_colors[data[i].color]?frame_colors[data[i].color]++:frame_colors[data[i].color]=1;
        for (let j = 0; j < data[i].color_options.length; j++) 
            frame_colors[data[i].color_options[j].color]?frame_colors[data[i].color_options[j].color]++:frame_colors[data[i].color_options[j].color]=1;
        frame_sizes[data[i].hashtagList[0].name]?frame_sizes[data[i].hashtagList[0].name]++:frame_sizes[data[i].hashtagList[0].name]=1
    }
    let frame_type = document.getElementById('frame_type');
    frame_type.innerHTML="";
    for(let i in frame_types){
        const main_div = document.createElement("div");
        const div1 = document.createElement("div");
        div1.innerHTML = `${i} (${frame_types[i]})`;
        const img = document.createElement("img");
        img.src = `https://static.lenskart.com/images/cust_mailer/Eyeglass/${i.split(' ').join('')}.png`
        main_div.append(div1, img);
        main_div.addEventListener('click', function(){
            filterProducts(`hashtagList.3.name=${i}`)
        });
        frame_type.append(main_div);
    }
    let frame_shape = document.getElementById("frame_shape")
    frame_shape.innerHTML="";
   for(let i in frame_shapes) {
        const main_div = document.createElement("div");
        const div1 = document.createElement("div");
        div1.innerHTML = `${i} (${frame_shapes[i]})`;
        const img = document.createElement("img");
        img.src = `https://static.lenskart.com/images/cust_mailer/Eyeglass/${i.split(' ').join('')}.png`
        main_div.append(div1, img);
        main_div.addEventListener('click', function(){filterProducts(`hashtagList.1.name=${i}`)});
        frame_shape.append(main_div);
    }
    let frame_color = document.getElementById("frame_color");
    frame_color.innerHTML="";
    for(let el in frame_colors){
        let color = ntc.name(el);
        const main_div = document.createElement("div");
        const div = document.createElement("div");
        div.setAttribute('class','main_color')
        const div1 = document.createElement("div");
        div1.innerHTML =  `${color[1]} (${frame_colors[el]})`;
        const div2 = document.createElement("div");
        div2.setAttribute("class","color_div")
        div2.style.backgroundColor=el;
        div.append(div2,div1)
        main_div.append(div);
        // main_div.addEventListener('click', filterProducts(`color=${el}`));
        frame_color.append(main_div)
    }
    let frame_size = document.getElementById("frame_size")
    frame_size.innerHTML="";
    for(let el in frame_sizes){
        const main_div = document.createElement("div");
        const div1 = document.createElement("div");
        div1.innerHTML = `${el} (${frame_sizes[el]})`;
        main_div.append(div1);
        // main_div.addEventListener('click', filterProducts(`hashtagList.0.name=${el}`));
        frame_size.append(main_div);
    }
}

function display(com_pro) {
    
    com_pro.forEach(function (elements, index) {
        let mainDiv = document.createElement("div");
        var img = document.createElement("img");
        img.src = elements.image_url;

        let div2 = document.createElement("div");
        let color = document.createElement("div");
        let div_col = document.createElement("div");
        if (elements.color_options.length == []) {
            div_col.style.backgroundColor = elements.color;
            color.append(div_col);
            //  console.log(elements.color)
        } else {
            let col_obj = {};
            let col = [];
            let img_obj = [];
            for (let i = 0; i < elements.color_options.length; i++) {

                if (col_obj[elements.color_options[i].color] == undefined) {
                    col_obj[elements.color_options[i].color] = 1;
                    col.push(elements.color_options[i].color);
                    img_obj.push(elements.color_options[i].image_urls);
                }

            }
            for (let x = 0; x < col.length; x++) {
                let div_col = document.createElement("div");
                div_col.style.backgroundColor = col[x]
                // console.log(img_obj[x][0])
                color.append(div_col);
                div_col.addEventListener("click", function () {
                    img.src = img_obj[x][0];
                })
            }
        }
        let img2 = document.createElement("img");
        img2.src = "https://cdn.shopify.com/s/files/1/0015/2879/1092/files/3dtryon-logo.png?v=1608188856"
        div2.append(color, img2)

        let div3 = document.createElement("div");
        let prname = document.createElement("div");
        prname.innerText = "BLUE ZERO";
        let price = document.createElement("div");
        price.innerText = `₹ ${elements.prices[0].price}`
        div3.append(prname, price);

        let div4 = document.createElement("div");
        let model = document.createElement("div");
        model.innerText = elements.model_name;
        let discount = document.createElement("div");
        discount.innerText = "Buy 1 Get 1 FREE";
        div4.append(model, discount);

        mainDiv.append(img, div2, div3, div4);
        document.getElementById("dispro").append(mainDiv)
        img.addEventListener("click", function () {
            let proarr = [];
            proarr.push(com_pro[index]);
            proarr.push(com_pro[index + 1]);
            proarr.push(com_pro[index + 2]);
            proarr.push(com_pro[index + 3]);
            localStorage.setItem("glass", JSON.stringify(proarr));
            window.location.href = "../collections/purchase.html";
        })
        img.addEventListener("mouseover", function () {
            img.src = elements.hover_image_url;
        })
        img.addEventListener("mouseout", function () {
            img.src = elements.image_url;
        })


    })
}
display(com_pro)
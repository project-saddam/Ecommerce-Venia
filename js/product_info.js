    const imgs = document.querySelectorAll('.img-select a');
    const plus = document.querySelector('[data-quantity="plus"]');
    const minus = document.querySelector('[data-quantity="minus"]');
    const addtoCart=document.getElementsByClassName('addtoCart')[0]; 
    const finalCartValue= document.getElementsByClassName('cartCircle')[0]
    const imgBtns = [...imgs];
    let imgId = 1;
   
    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });
    
    function slideImage(){
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }
    
    plus.addEventListener("click", function (e) {
        e.target
        e.preventDefault();       
        // Get the field name
        let fieldName =document.getElementById("plus").getAttribute("data-field");  
        // Get its current value
        var currentVal = parseInt(document.getElementById("quantity").value)
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            document.getElementById("quantity").value=currentVal+1
           // $('input[name='+fieldName+']').val(currentVal + 1);
           e.preventDefault();
        } else {
            // Otherwise put a 0 there
            document.getElementById("quantity").value=0
            e.preventDefault();
        }
      });

      minus.addEventListener("click", function (e) {
        e.preventDefault();
        // Get the field name
        let fieldName =document.getElementById("minus").getAttribute("data-field");
        // Get its current value
        var currentVal = parseInt(document.getElementById("quantity").value)
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            document.getElementById("quantity").value=currentVal-1
             e.preventDefault();
        } else {
            // Otherwise put a 0 there
            document.getElementById("quantity").value=0
        }
      });

    window.addEventListener('resize', slideImage);
   
    window.addEventListener('load', function() {         
        var selectedID=this.localStorage.getItem("id")              
        var productList=JSON.parse(localStorage.getItem("productData")) 
        let product = productList.filter(function(item){
            return item.id ==selectedID
        })[0];

        document.querySelectorAll(".thumbNailImg").forEach((item)=>{         
            item.src=product.image               
        }) 
        document.querySelectorAll(".clsProduct").forEach((item)=>{         
            item.src=product.image                 
        }) 
        document.getElementsByClassName("product-title")[0].innerText=product.title
        document.getElementsByClassName("footerTitle")[0].innerText=product.title
        document.getElementsByClassName("footerDesc")[0].innerText=product.description
        document.getElementsByClassName("new-price")[0].innerText='$'+product.price        
        document.getElementsByClassName("counts")[0].innerText=product.rating.count
        
     });
     addtoCart.addEventListener("click", function (e) {       
        var getcartValue=document.getElementById("quantity").value
        document.getElementsByClassName('cartvalue')[0].innerText=getcartValue
      });
     
   
     
    
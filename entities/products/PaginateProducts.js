module.exports={
    Paginate:(productArray,req)=>{
        
        var response={}
        var itemsPage=parseInt(req.query.itemsPage)
        var start=parseInt(req.query.page)*itemsPage
        var end=(parseInt(req.query.page)+1)*itemsPage
        var pageProducts=productArray.slice(start,end)
        var numberProducts=productArray.length
        var numberPages=(numberProducts%itemsPage===0?numberProducts/itemsPage:Math.floor((numberProducts/itemsPage)+1))
        response={products:pageProducts,pages:numberPages}

        return response
    }
}
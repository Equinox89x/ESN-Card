(function () {
    document.addEventListener('DOMContentLoaded', function () {
                
        UIHandler.setupApp({
            bodyClass: "#js-body",

            ordersContentHolderClass: '#js-content-holder--orders',
            ordersAcceptAllOrdersButtonClass: "#js-AcceptAllOrders--orders",
            ordersContinueButtonClass: "#js-continue--orders",
            ordersSmallviewTitleClass: "#js-small-view-title--orders",
            ordersSmallviewContentClass: "#js-small-view-content--orders",
            ordersFinalizedViewClass: "#js-finalized-view-holder--orders",

            placeOrderContentHolderClass: "#js-placeorder--content",
            placeOrderfinalizedViewClass: "#js-finalized-view-holder--placeorder",

            viewOrderContentHolderClass: "#js-vieworder--content",
            
            confirmOrdersShowHandledOrdersButtonClass: "#js-ShowHandledOrders--orderconfirmation",
            confirmOrdersAcceptAllOrdersButtonClass: "#js-AcceptAllOrders--orderconfirmation",
            confirmOrdersContentHolderClass: "#js-content-holder--orderconfirmation",
            confirmOrdersContinueButtonClass: "#js-continue--orderconfirmation",

            ordersNavClass: "#js-nav-orders",
            placeorderNavClass: "#js-nav-placeorder",
            vieworderNavClass: "#js-nav-vieworder",
            orderconfirmationNavClass: "#js-nav-orderconfirmation",
            requestsNavClass: "#js-nav-requests",
            
            ordersClass: "#js-orders",
            placeOrderClass: "#js-placeorder",
            viewOrderClass: "#js-vieworder", 
            orderConfirmationClass: "#js-orderconfirmation", 
            requestsClass: "#js-requests"
        });

    });
})();
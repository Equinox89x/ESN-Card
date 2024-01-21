const DataModule = (function () {

    const ESNSections = [
        "ESN Antwerp",
        "ESN VUB EhB Brussels",
        "ESN KULBrussels",
        "ESN ICHEC ECAM Brussels",
        "ESN Saint-Louis Brussels",
        "ESN ULB",
        "ESN Gent",
        "ESN Hasselt",
        "ESN Leonardo Kortrijk",
        "ESN Leuven",
        "ESN ULiège",
        "ESN HEC Liège",
        "ESN HELMo",
        "ESN HEPL",
        "ESN Louvain-la-Neuve",
        "ESN Mechelenl",
        "ESN Mons",
        "ESN Geel",
    ]

    const ENSCardPrice = 12.5;
    const CalculatePrice = (nrOfCards) => {
        return nrOfCards *= ENSCardPrice;
    }

    const navOptions = ["Orders", "PlaceOrder", "ViewOrder", "OrderConfirmation", "Requests"]

    const adminOptions = ["SECTION", "NO", "INT"]

    const data = {
        NO: {
            Orders: {
                Empty: "No pending orders",
                SmallView: {
                    Title: "Place extra order",
                    Message: "Place Extra NO order?"
                },
                ConfirmationView: {
                    Title: "Orders Confirmed",
                    Subtitle: "The orders of you and your sections have been sent to ESN International",
                },
            },
            PlaceOrder: {
                Label: "NO",
                NrLabel: "Nr of cards",
                PriceLabel: "00 Euro",
                ConfirmLabel: "Confirm Order?",
                SmallView: {
                    Message: "Confirm Order?"
                },
                ConfirmationView: {
                    Title: "Order Confirmed",
                    Subtitle: "Your order has been sent to ESN International",
                },
            },
            ViewOrder: {
                Empty: "No pending order",
                SectionValue: "",
                NrOfCardsValue: "",
                PriceValue: "",
                Data: [
                    {
                        Category: "Personal Order",
                        Prices: [
                            {
                                Name: "ESN Belgium",
                                NrOfCards: 200,
                                Price: 500,
                            },
                        ],
                    },
                    {
                        Category: "Section Order",
                        Prices: [
                            {
                                Name: "ESN Leonardo Kortrijk",
                                NrOfCards: 200,
                                Price: 500,
                            },
                            {
                                Name: "ESN Leonardo Kortrijk",
                                NrOfCards: 200,
                                Price: 500,
                            },
                            {
                                Name: "ESN Leonardo Kortrijk",
                                NrOfCards: 200,
                                Price: 500,
                            },
                            {
                                Name: "ESN Leonardo Kortrijk",
                                NrOfCards: 200,
                                Price: 500,
                            },
                            {
                                Name: "ESN Leonardo Kortrijk",
                                NrOfCards: 200,
                                Price: 500,
                            },
                            {
                                Name: "ESN Leonardo Kortrijk",
                                NrOfCards: 200,
                                Price: 500,
                            },
                            {
                                Name: "ESN Leonardo Kortrijk",
                                NrOfCards: 200,
                                Price: 500,
                            },
                        ],
                    },
                ]
            },
            OrderConfirmation: {
                Empty: "No orders to confirm"
            },
            Requests: {
                Empty: "No members pending",
            },


        },
        SECTION: {
            PlaceOrder: {
                Label: "ESN Section",
                NrLabel: "Nr of cards",
                PriceLabel: "00 Euro",
                ConfirmLabel: "Confirm Order?",

                ConfirmationView: {
                    Title: "Order Confirmed",
                    Subtitle: "Your order has been sent to your NO",
                },
            },
            ViewOrder: {
                Empty: "No pending order",
                SectionValue: "",
                NrOfCardsValue: "",
                PriceValue: "",
            },
            Requests: {
                Empty: "No members pending",
            },
        },
        INT: {
            OrderConfirmation: {
                Empty: "No orders to confirm"
            },
            Requests: {
                Empty: "No members pending",
            },
        }
    }

    const domElements = {
        Orders: {
            contentHolder: null,
            acceptAllOrdersButton: null,
            continueButton: null,
            smallviewTitleHolder: null,
            smallviewContentHolder: null,
            finalizedViewHolder: null,
        },

        PlaceOrder: {
            contentHolder: null,
            smallviewTitleHolder: null,
            smallviewContentHolder: null,
            finalizedViewHolder: null,
            confirmView: null,
            continueButton: null,
            requesterInput: null,
            nrOfCardsInput: null,
            priceInput: null,
        },

        ViewOrder: {
            contentHolder: null,
        },

        OrderConfirmations: {
            showHandledOrdersButton: null,
            acceptAllOrdersButton: null,
            contentHolder: null,
            continueButton: null,
        },

        Requests: {
            contentHolder: null,
            acceptAllMembersButton: null,
        },
    }

    const mainElements = {
        Orders: null,
        PlaceOrder: null,
        ViewOrder: null,
        OrderConfirmation: null,
        Requests: null,
    }

    let selectedAdmin = adminOptions[1]; //nav option of the app
    let selectedNav = navOptions[0]; //admin option of the app

    const SetNewNavOption = (navOption) =>{
        selectedNav = navOption;
    }

    const GetValidViewOrderData = () => {
         if(data[selectedAdmin].ViewOrder.SectionValue == "") return null;
         if(data[selectedAdmin].ViewOrder.NrOfCardsValue == "") return null;
         if(data[selectedAdmin].ViewOrder.PriceValue == "") return null;
         else return data[selectedAdmin].ViewOrder
    }

    return {
        ESNSections: ESNSections,
        data: data,
        navOptions: navOptions,
        adminOptions: adminOptions,
        domElements: domElements,
        selectedNav: selectedNav,
        selectedAdmin: selectedAdmin,
        mainElements: mainElements,
        SetNewNavOption: SetNewNavOption,
        GetValidViewOrderData: GetValidViewOrderData,
        CalculatePrice: CalculatePrice
    }

})();
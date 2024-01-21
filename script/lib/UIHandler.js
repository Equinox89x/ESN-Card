const UIHandler = (function () {

    //#region fields
    let selectedNavElement = null; //selected nav dom element

    let navElements = [ ];

    let body = null;

    const data = DataModule.data;
    const domElements = DataModule.domElements;
    //#endregion

    //#region setup
    const setupApp = function ({ bodyClass,
        ordersContentHolderClass, ordersAcceptAllOrdersButtonClass, ordersContinueButtonClass, ordersSmallviewTitleClass, ordersSmallviewContentClass, ordersFinalizedViewClass,
        placeOrderContentHolderClass, placeOrderfinalizedViewClass,
        viewOrderContentHolderClass, 
        confirmOrdersShowHandledOrdersButtonClass, confirmOrdersAcceptAllOrdersButtonClass, confirmOrdersContentHolderClass, confirmOrdersContinueButtonClass,
        ordersNavClass, placeorderNavClass, vieworderNavClass, orderconfirmationNavClass, requestsNavClass,
        ordersClass, placeOrderClass, viewOrderClass, orderConfirmationClass, requestsClass
    }) {
        body = document.querySelector(bodyClass);

        domElements.Orders.contentHolder = document.querySelector(ordersContentHolderClass);
        domElements.Orders.acceptAllOrdersButton = document.querySelector(ordersAcceptAllOrdersButtonClass);
        domElements.Orders.continueButton = document.querySelector(ordersContinueButtonClass);
        domElements.Orders.smallviewTitleHolder = document.querySelector(ordersSmallviewTitleClass);
        domElements.Orders.smallviewContentHolder = document.querySelector(ordersSmallviewContentClass);
        domElements.Orders.finalizedViewHolder = document.querySelector(ordersFinalizedViewClass);

        domElements.PlaceOrder.contentHolder = document.querySelector(placeOrderContentHolderClass);
        domElements.PlaceOrder.finalizedViewHolder = document.querySelector(placeOrderfinalizedViewClass);

        domElements.OrderConfirmations.showHandledOrdersButton = document.querySelector(confirmOrdersShowHandledOrdersButtonClass);
        domElements.OrderConfirmations.acceptAllOrdersButton = document.querySelector(confirmOrdersAcceptAllOrdersButtonClass);
        domElements.OrderConfirmations.contentHolder = document.querySelector(confirmOrdersContentHolderClass);
        domElements.OrderConfirmations.continueButton = document.querySelector(confirmOrdersContinueButtonClass);

        domElements.ViewOrder.contentHolder = document.querySelector(viewOrderContentHolderClass);

        navElements.push(document.querySelector(ordersNavClass));
        navElements.push(document.querySelector(placeorderNavClass));
        navElements.push(document.querySelector(vieworderNavClass));
        navElements.push(document.querySelector(orderconfirmationNavClass));
        navElements.push(document.querySelector(requestsNavClass));

        selectedNavElement = navElements[0];

        DataModule.mainElements.Orders = document.querySelector(ordersClass);
        DataModule.mainElements.PlaceOrder = document.querySelector(placeOrderClass);
        DataModule.mainElements.ViewOrder = document.querySelector(viewOrderClass);
        DataModule.mainElements.OrderConfirmation = document.querySelector(orderConfirmationClass);
        DataModule.mainElements.Requests = document.querySelector(requestsClass);

        InitNav();

        InitUI();

        RegisterClickListeners()
    }
    //#endregion

    //#region nav
    const InitNav = () => {
        for (let index = 0; index < navElements.length; index++) {
            const element = navElements[index];
            element.addEventListener("click", () => {
                HandleNavClick(navElements, element);
            });

            element.addEventListener("mouseover", () => {
                HandleNavHover(element, true);
            });

            element.addEventListener("mouseout", () => {
                HandleNavHover(element, false);
            });
        }
    }

    const HandleNavClick = (navElements, element) => {
        selectedNavElement = element;
        let index = navElements.indexOf(element);
        DataModule.selectedNav = DataModule.navOptions[navElements.indexOf(element)];
        for (let i = 0; i < navElements.length; i++) {
            if (i != index) {
                ESNcardModule.ToggleView(i, navElements[i], false);
            }         
        }
 
        ESNcardModule.ToggleView(index, navElements[index], true);
        ESNcardModule.ShowData(index);
    }

    const HandleNavHover = (item, isStartingHover) => {
        if (item != selectedNavElement) {
            if (isStartingHover) {
                item.classList.remove("c-nav__item--unselected");
            }
            else {
                item.classList.add("c-nav__item--unselected");
            }
        }
    }
    //#endregion

    //#region ui
    const InitUI = () => {
        // body.addEventListener("click", () => {
        //     // smallviewTitleHolder.parentElement.parentElement.parentElement.style.display = "none"
        //     // smallviewTitleHolder.parentElement.parentElement.style.visibility = "hidden"
        //     // finalizedViewHolder.style.visibility = "hidden"
        // });

        for (let index = 0; index < DataModule.ESNSections.length; index++) {
            let order = new Orders({ ESNSection: DataModule.ESNSections[index], nrOfCards: "200", date: "28/03/2024" });
            domElements.Orders.contentHolder.append(order.generateDOMNode());
        }

        for (let index = 0; index < DataModule.ESNSections.length; index++) {
            let orderConfirmation = new OrderConfirmations({ index: index, ESNSection: DataModule.ESNSections[index], nrOfCards: "200", date: "28/03/2024" });
            domElements.OrderConfirmations.contentHolder.append(orderConfirmation.generateDOMNode().card);
        }

        const FinalizedViewVars = { messageBig: data[DataModule.selectedAdmin].Orders.ConfirmationView.Title, messageSmall: data[DataModule.selectedAdmin].Orders.ConfirmationView.Subtitle };
        // let viewOrder = new PlaceOrder({ color: "u-ESNOrangePastel", isOrder: false, finalizedViewVars: FinalizedViewVars });
        // DataModule.domElements.ViewOrder.contentHolder.append(viewOrder.generateDOMNode().card);

        ESNcardModule.ToggleView(0, navElements[0], true);
    }
    //#endregion

    //#region click listeners
    const RegisterClickListeners = () => {
        for (let index = 0; index < DataModule.navOptions.length; index++) {
            const element = DataModule.navOptions[index];
            ClickRegisterFunctions[element]();
        }
    }

    const RegisterOrdersListeners = () => {
        const domElement = domElements.Orders;
        const dataItem = data[DataModule.selectedAdmin]["Orders"];

        domElement.acceptAllOrdersButton.addEventListener('click', () => {
            console.log("Accept All Orders");
        });

        domElement.continueButton.addEventListener('click', () => {
            const smallViewVars = { title: dataItem.SmallView.Title }
            ESNcardModule.ToggleSmallWindow(domElement.smallviewTitleHolder, smallViewVars, true);

            const FinalizedViewVars = { messageBig: dataItem.ConfirmationView.Title, messageSmall: dataItem.ConfirmationView.Subtitle };
            const FnVars = [FinalizedViewVars, domElement.finalizedViewHolder, true];

            ESNcardModule.ToggleSmallWindowContent( 
                domElement,
                {
                    confirmMsg: dataItem.SmallView.Message,
                    AcceptFn: { callback: () => { domElement.smallviewContentHolder.append(new PlaceOrder({ color: "u-ESNBluePastel", isOrder: true, finalizedViewVars: FinalizedViewVars }).generateDOMNode().AddListeners().card) }, callbackVars: FnVars },
                    DenyFn: { callback: ESNcardModule.ToggleFinalizedView, callbackVars: FnVars },
                },
                true,
            );
        });
    }

    const RegisterPlaceOrderListeners = () => {

    }

    const RegisterViewOrderListeners = () => {

    }

    const RegisterOrderConfirmationListeners = () => {
        // acceptAllOrdersButton.addEventListener('click', () => {
        //     console.log("Accept All Orders");
        // });

        // showHandledOrdersButton.addEventListener('click', () => {
        //     console.log("Show Handles Orders");
        // });
    }

    const RegisterRequestsListeners = () => {
        // acceptAllMembersButton.addEventListener('click', () => {
        //     console.log("Accept All Members");
        // });
    }

   //#endregion

    const ClickRegisterFunctions = {
        Orders: RegisterOrdersListeners,
        PlaceOrder: RegisterPlaceOrderListeners,
        ViewOrder: RegisterViewOrderListeners,
        OrderConfirmation: RegisterOrderConfirmationListeners,
        Requests: RegisterRequestsListeners,
    }

    return {
        setupApp: setupApp,
        InitUI: InitUI,
    }
})();
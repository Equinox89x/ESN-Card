const ESNcardModule = (function () {
    const ToggleView = (index, el, isOpened) => {
        const navOption = DataModule.navOptions[index];
        const selectedOption = DataModule.mainElements[navOption];
        
        if(isOpened){
            selectedOption.style.display = "flex";
            selectedOption.style.opacity = 1;
            if (selectedOption.children[0].classList.contains("c-content--small")){
                selectedOption.classList.add("c-content-small--animate");
            }
            else{
                selectedOption.classList.add("c-content--animate");
            }
            el.classList.remove("c-nav__item--unselected");
           
            if (DataModule.selectedNav == "PlaceOrder") {
                const FinalizedViewVars = { messageBig: DataModule.data[DataModule.selectedAdmin].PlaceOrder.ConfirmationView.Title, messageSmall: DataModule.data[DataModule.selectedAdmin].PlaceOrder.ConfirmationView.Subtitle };
                DataModule.domElements.PlaceOrder.contentHolder.append(new PlaceOrder({ color: "u-ESNGreenPastel", isOrder: true, finalizedViewVars: FinalizedViewVars }).generateDOMNode().AddListeners().card);
            }
            else{
                DataModule.domElements.PlaceOrder.contentHolder.innerHTML = "";
            }
        }
        else{
            selectedOption.style.opacity = 0;
            if (selectedOption.children[0].classList.contains("c-content--small")) {
                selectedOption.classList.remove("c-content-small--animate");
            }
            else {
                selectedOption.classList.remove("c-content--animate");
            }
            el.classList.add("c-nav__item--unselected");

            setTimeout(() => {
                selectedOption.style.display = "none";
            }, 250);
        }
    }

    const ShowData = (index) => {
        const navOption = DataModule.navOptions[index];
        const selectedData = DataModule.data[navOption];

        switch (navOption) {
            case "Orders":

                break;
            case "PlaceOrder":

                break;
            case "ViewOrder":
                // DataModule.domElements.ViewOrder.contentHolder.append(new PlaceOrder({""}))
                break;
            case "OrderConfirmation":

                break;
            case "Requests":

                break;
        
            default:
                break;
        }
    }

    //#region toggling windows
    const ToggleSmallWindow = (elementHolder, smallViewVars, isOpened) => {
        elementHolder.parentElement.parentElement.parentElement.style.display = isOpened ? "flex" : "none";
        elementHolder.parentElement.parentElement.style.visibility = isOpened ? "visible" : "hidden";

        if (isOpened){
            let smallViewTitle = new SmallViewTitle(smallViewVars)
            elementHolder.append(smallViewTitle.generateDOMNode())
        }
    }
    
    const ToggleSmallWindowContent = (domElement, smallViewContentVars, isOpened) => {
        domElement.smallviewContentHolder.parentElement.style.visibility = isOpened ? "visible" : "hidden";

        if(isOpened){
            let smallViewContent = new SmallViewContent(smallViewContentVars);
            domElement.smallviewContentHolder.append(smallViewContent.generateDOMNode());
        }
    }

    const ToggleFinalizedView = (finalizedViewVars, elementHolder, isOpened) => {
        elementHolder.style.visibility = isOpened ? "visible" : "hidden";
        
        if (isOpened){
            let finalizedView = new FinalizedView(finalizedViewVars);
            elementHolder.append(finalizedView.generateDOMNode());
            elementHolder.classList.add("c-finalized-view--animate");
        }
    }
    //#endregion

    return {
        ToggleSmallWindow: ToggleSmallWindow,
        ToggleSmallWindowContent: ToggleSmallWindowContent,
        ToggleFinalizedView: ToggleFinalizedView,
        ToggleView: ToggleView,
        ShowData: ShowData,
    }
})();
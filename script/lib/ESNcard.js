class FinalizedView{
    constructor({ messageBig, messageSmall }) {
        Object.assign(this, { messageBig, messageSmall });
    }
    generateDOMNode() {
        let card = document.createElement('div');
        card.classList.add("c-finalized-view__container")
        card.classList.add("c-finalized-view__container--animate")
        card.innerHTML += `
            <h1 class="c-finalized-view__title">${this.messageBig}</h1>
            <div class="c-finalized-view__confirm u-ESNGreen">
                <svg style="margin:24px" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 256"><path d="M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z"></path></svg>
            </div>
            <h3 class="c-finalized-view__subtitle">${this.messageSmall}</h3>
        `
        
        return card;
    }
}

class SmallViewTitle{
    constructor({ title }) {
        Object.assign(this, { title });
    }
    generateDOMNode() {
        let card = document.createElement('p');
        card.textContent += `
            ${this.title}
        `
        return card
    }
}

class SmallViewContent{
    constructor({ confirmMsg, AcceptFn, DenyFn }) {
        Object.assign(this, { confirmMsg, AcceptFn, DenyFn });
    }
    generateDOMNode() {
        let card = document.createElement('div');
        card.classList.add("c-confirmation-view__confirm-holder")
        card.innerHTML += `
            <p class="c-confirmation-view__confirm-title">${this.confirmMsg}</p>
            <div class="c-confirmation-view__buttons">
                <div id="js-confirm" class="c-confirmation-view__button u-ESNGreen">
                    <svg xmlns="http://www.w3.org/2000/svg" style="margin:8px" fill="#000000" viewBox="0 0 256 256"><path d="M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z"></path></svg>
                </div>
                <div id="js-deny" class="c-confirmation-view__button u-red">
                    <svg xmlns="http://www.w3.org/2000/svg" style="margin:8px" fill="#000000" viewBox="0 0 256 256"><path d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"></path></svg>
                </div>
            </div>
        `
        card.querySelector("#js-confirm").addEventListener("click", () => { 
            card.parentElement.textContent = "";
            this.AcceptFn.callback(...this.AcceptFn.callbackVars);
            if (this.AcceptFn.extra != undefined){
                this.AcceptFn.extra();
            }
        });
        card.querySelector("#js-deny").addEventListener("click", () => { 
            this.DenyFn.callback(...this.DenyFn.callbackVars);
            if (this.DenyFn.extra != undefined) {
                this.DenyFn.extra();
            }
        });
        return card
    }
}

class MemberRequests {
    // constructor({ title, category, status }) {
    //     Object.assign(this, { title, category, status });
    // }
}

class PlaceOrder{
    constructor({ color, isOrder, finalizedViewVars, card }) {
        Object.assign(this, { color, isOrder, finalizedViewVars, card });
    }

    generateDOMNode() {
        let card = document.createElement('div');
        card.classList.add("c-placeorder--overlay");
        card.id = "js-placeorder";

        const viewOrderData = DataModule.data[DataModule.selectedAdmin];
        
        let extraRequesterFieldData = "";
        let extraNrOfCardsFieldData = "";
        if (!this.isOrder) {
            if (DataModule.GetValidViewOrderData() == null){
                card.innerHTML += `<p class="c-data-empty">${viewOrderData.ViewOrder.Empty}</p>`;
                this.card = card;
                return this;
            }
            else{
                extraRequesterFieldData = `disabled value="${viewOrderData.ViewOrder.SectionValue}"`;
                extraNrOfCardsFieldData = `disabled value="${viewOrderData.ViewOrder.NrOfCardsValue}"`;
            }
        }

        card.innerHTML += `
            <div class="c-placeorder">
                <input id="js-placeorder-requester" ${extraRequesterFieldData} placeholder="ESN Section" class="c-inputfield" type="text">
                <input id="js-placeorder-nrofcards" ${extraNrOfCardsFieldData} placeholder="Nr of cards" class="c-inputfield" type="number">
                <p id="js-placeorder-price" class="c-placeorder__text">${!this.isOrder ? viewOrderData.ViewOrder.PriceValue :"00"} Euro</p>
                ${this.isOrder ? `<p id="js-placeorder-continue" class="c-placeorder__text c-buttons__item">Continue</p>` : "" }
            </div>
        `
        if (this.isOrder){
            card.innerHTML += `
            <aside id="js-placeorder-confirmation" class="u-absolute c-placeorder-confirmation">
            <div id="js-small-view-content--placeorder" class="c-placeorder-confirmation__container">
            </div>
            </aside>
            `
        }
        this.card = card;
        return this;
    }
    AddListeners() {
    
        const domElement = DataModule.domElements.PlaceOrder;
        const dataItem = DataModule.data[DataModule.selectedAdmin]["PlaceOrder"];
        domElement.requesterInput = this.card.querySelector("#js-placeorder-requester");
        domElement.nrOfCardsInput = this.card.querySelector("#js-placeorder-nrofcards");
        domElement.priceInput = this.card.querySelector("#js-placeorder-price");

        if (this.isOrder){
            const FinalizedViewVars = this.finalizedViewVars;

            domElement.continueButton = this.card.querySelector("#js-placeorder-continue");
            domElement.confirmView = this.card.querySelector("#js-placeorder-confirmation");
            domElement.smallviewContentHolder = this.card.querySelector("#js-small-view-content--placeorder");

            domElement.nrOfCardsInput.addEventListener("input", () => {
                const price = DataModule.CalculatePrice(domElement.nrOfCardsInput.value);
                domElement.priceInput.textContent = `${price} Euro`;
            })

            domElement.continueButton.addEventListener('click', () => {
                domElement.confirmView.style.visibility = "visible"
    
                const AcceptFnVars = [FinalizedViewVars, DataModule.domElements[DataModule.selectedNav].finalizedViewHolder, true];
                const DenyFnVars = [domElement, null, false];
    
                domElement.requesterInput.disabled = true;
                domElement.nrOfCardsInput.disabled = true;

                ESNcardModule.ToggleSmallWindowContent(
                    domElement,
                    {
                        confirmMsg: dataItem.SmallView.Message,
                        AcceptFn: {
                            callback: ESNcardModule.ToggleFinalizedView, callbackVars: AcceptFnVars, extra: () => {
                                const data = DataModule.data[DataModule.selectedAdmin];
                                const price = DataModule.CalculatePrice(domElement.nrOfCardsInput.value);
                                data.ViewOrder.SectionValue = domElement.requesterInput.value;
                                data.ViewOrder.NrOfCardsValue = domElement.nrOfCardsInput.value;
                                data.ViewOrder.PriceValue = price;

                                let viewOrder = new PlaceOrder({ color: "u-ESNOrangePastel", isOrder: false });
                                DataModule.domElements.ViewOrder.contentHolder.textContent = "";
                                DataModule.domElements.ViewOrder.contentHolder.append(viewOrder.generateDOMNode().card);
                        } },
                        DenyFn: {
                            callback: ESNcardModule.ToggleSmallWindowContent, callbackVars: DenyFnVars, extra: () => {
                            domElement.requesterInput.disabled = false;
                            domElement.nrOfCardsInput.disabled = false;
                        } },
                    },
                    true,
                );
            });
        }
        
        return this;
    }
}

class OrderConfirmations {
    constructor({ index, ESNSection, nrOfCards, date, card }) {
        Object.assign(this, { index, ESNSection, nrOfCards, date, card });
    }

    generateDOMNode() {
        let card = document.createElement('div');
        card.classList.add("c-card")
        card.id = `c-card--${this.index}`;
        card.innerHTML += `
            <p class="c-card__title">${this.ESNSection}</p>
            <div class="c-card-container">
                <div class="c-card-container-flex">
                    <p class="c-card__variable">${this.nrOfCards}</p>
                    <p class="c-card__item">cards</p>
                </div>
                <p class="c-card__date">${this.date}</p>
            </div>
            <aside class="c-card__buttons">
                <div class="c-card__buttons-container">
                    <div id="js-btn-orderconfirmation--accept-${this.index}" class="c-card__buttons-item u-ESNGreen">
                        <svg xmlns="http://www.w3.org/2000/svg" style="margin:8px" fill="#000000" viewBox="0 0 256 256"><path d="M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z"></path></svg>
                    </div>
                    <div id="js-btn-orderconfirmation--deny-${this.index}" class="c-card__buttons-item u-red">
                        <svg xmlns="http://www.w3.org/2000/svg" style="margin:8px" fill="#000000" viewBox="0 0 256 256"><path d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"></path></svg>
                    </div>
                </div>
            </aside>
        `
        this.card = card;
        this.AddListeners();
        return this;
    }

    AddListeners() {
        const confirmBtn = this.card.querySelector(`#js-btn-orderconfirmation--accept-${this.index}`);
        const denyBtn = this.card.querySelector(`#js-btn-orderconfirmation--deny-${this.index}`);

        confirmBtn.addEventListener("click", () => {
            denyBtn.style.opacity = "0"
            setTimeout(() => {
                denyBtn.style.display = "none"
            }, 250);
        })

        denyBtn.addEventListener("click", () => {
            denyBtn.style.transform = "translateX(-3rem)";
            confirmBtn.style.opacity = "0"
            setTimeout(() => {
                denyBtn.style.transition = "0ms";
                denyBtn.style.transform = "translateX(0rem)";
                confirmBtn.style.display = "none"
            }, 250);
        })

        return this;
    }
}

class Orders {
    constructor({ ESNSection, nrOfCards, date }){
        Object.assign(this, { ESNSection, nrOfCards, date });
    }

    generateDOMNode() {
        let card = document.createElement('div');
        card.classList.add("c-card")
        card.innerHTML += `
            <p class="c-card__title">${this.ESNSection}</p>
            <div class="c-card-container">
                <div class="c-card-container-flex">
                    <p class="c-card__variable">${this.nrOfCards}</p>
                    <p class="c-card__item">cards</p>
                </div>
                <p class="c-card__date">${this.date}</p>
            </div>
            <aside class="c-card__buttons">
                <div class="c-card__buttons-container">
                    <div class="c-card__buttons-item u-ESNGreen">
                        <svg xmlns="http://www.w3.org/2000/svg" style="margin:8px" fill="#000000" viewBox="0 0 256 256"><path d="M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z"></path></svg>
                    </div>
                    <div class="c-card__buttons-item u-red">
                        <svg xmlns="http://www.w3.org/2000/svg" style="margin:8px" fill="#000000" viewBox="0 0 256 256"><path d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"></path></svg>
                    </div>
                </div>
            </aside>
        `
        return card;
    }
}
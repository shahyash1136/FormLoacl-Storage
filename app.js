var formController = (function () {

    var FormData = function (id, fname, lname, email, password, occupation) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.occupation = occupation;
    }

    // var ;
    
    return {
        addItem: function (fname, lname, email, password, occupation) {
            var newItem, ID;

            data = localStorage.getItem("test") ? JSON.parse(localStorage.getItem("test")) : [];

            //Create a new ID
            if (data.length > 0) {
                ID = data[data.length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            //Create new Item 
            newItem = new FormData(ID, fname, lname, email, password, occupation);
            
            //Push New Item to data structure
            data.push(newItem);
            
            localStorage.setItem("test",JSON.stringify(data));

            
            
            return newItem;
        },

        testing: function () {
            console.log(data);
        }

    }



})();

var UIController = (function () {
    return {
        getInput: function () {
            return {
                fName: document.querySelector('#fName').value,
                lName: document.querySelector('#lName').value,
                email: document.querySelector('#mail').value,
                password: document.querySelector('#password').value,
                occupation: document.querySelector('#occupation').value
            }
        },

        listItem: function (obj) {
            var html , newHtml;

            // Create HTML string with placeholder text
            html = '<div class="tbl__row" id="data-%id%"> <div class="tbl__cell firstName">%firstName%</div><div class="tbl__cell lastName">%lastName%</div><div class="tbl__cell email">%email%</div><div class="tbl__cell password">%password%</div><div class="tbl__cell occupation">%occupation%</div></div>';

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%' , obj.id);
            newHtml = newHtml.replace('%firstName%', obj.fname);
            newHtml = newHtml.replace('%lastName%', obj.lname);
            newHtml = newHtml.replace('%email%', obj.email);
            newHtml = newHtml.replace('%password%', obj.password);
            newHtml = newHtml.replace('%occupation%', obj.occupation);

            // Insert the HTML into the DOM
            document.querySelector(".tbl__body").insertAdjacentHTML("beforeend",newHtml);
        }
    }

})();

var controller = (function (formCtrl, UICtrl) {

    var setUpEventListener = function () {
        document.querySelector('.submit').addEventListener("click", addItems);

        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                addItems();
            }
        });
    };


    var addItems = function () {
        //1. Get the field input data
        var input = UICtrl.getInput();

        //2. Add the items to the form controller
        var item = formCtrl.addItem(input.fName, input.lName, input.email, input.password, input.occupation);
        
        
        //3. Add the items to the UI
        UICtrl.listItem(item);

    };


    return {
        init: function () {
            setUpEventListener();
        },
    }

})(formController, UIController);

controller.init();
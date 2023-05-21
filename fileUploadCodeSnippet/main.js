var rhit = rhit || {};

rhit.UManager = null;

rhit.UploadController = class {
    constructor() {
        console.log("Added UploadController.");

        document.querySelector('#imageForm').addEventListener('submit', this.handleSubmit);
        document.querySelector("#imageFile").addEventListener('change', (event) => {
            console.log("Upload a main image!");
            rhit.ECGameManager.loadMainImage(event);
        });
    }

    // Handle upload event here. Credit: https://www.freecodecamp.org/news/upload-files-with-javascript/
    handleSubmit(event) {
        const form = event.currentTarget;
        const url = new URL(form.action);
        const formData = new FormData(form);
        const searchParams = new URLSearchParams(formData);

        if(form.method.toLowerCase() == 'post') {
            if(form.enctype === 'multipart/form-data') {
                fetchOptions.body = formData;
            } else {
                fetchOptions.body = searchParams;
            }
        } else {
            url.search = searchParams;
        }

        fetch(url, {
            method: form.method,
            body: formData,
        });

        // Any JS that could fail goes here
        event.preventDefault();

    }
}

rhit.UploadManager = class {
    // Handle image upload display here
    loadMainImage(event) {
        var image = document.getElementById('uploadImage');
        //image.src = URL.createObjectURL(event.target.files[0]);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = function() {
            const base64 = reader.result;
            image.src = base64;
        };

        image.src = reader.readAsDataURL(file);
    }
}

rhit.main = function () {
    document.querySelector('#imageForm').addEventListener('submit', this.handleSubmit);
    document.querySelector("#imageFile").addEventListener('change', (event) => {
        console.log("Upload a main image!");
        rhit.UManager.loadMainImage(event);
    });

    new rhit.UploadController();
    rhit.ECGameManager = new rhit.UploadManager();

    console.log("Ready!");
}

rhit.main();
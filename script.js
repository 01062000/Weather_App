window.addEventListener('load', () => {
    let long;
    let lat;
    let temp_Degree = document.querySelector(".tempreature-degree");
    let time_zone = document.querySelector(".location-timezone");
    let temp_des = document.querySelector(".tempreature-description");
    let temp_section = document.querySelector(".tempreature");
    let temp_section_span = document.querySelector(".tempreature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/48d1858f6402ae6531ba7d6a037326b8/${lat},${long}`;

            fetch(api)
                .then(response => {
                   return response.json();
                })
                .then(data => {
                   // console.log(data);
                    const {temperature, summary, icon} = data.currently;

                    temp_Degree.textContent = temperature;
                    temp_des.textContent = summary;
                    time_zone.textContent = data.timezone;

                    //set icon
                    setIcons(icon, document.querySelector(".icon"));

                    //formula for conversion
                    let Celsius = (temperature - 32) * (5/9);

                    //change tempreature to Celsius/Farenheit
                    temp_section.addEventListener('click', () => {
                        if(temp_section_span.textContent === "F"){
                            temp_section_span.textContent = "C";
                            temp_Degree.textContent = Math.floor(Celsius);
                        }
                        else{
                            temp_section_span.textContent = "F";
                            temp_Degree.textContent = temperature;
                        }
                    });
                });
        });
    }
    else{
        console.log("not supported !!");
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color : "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});

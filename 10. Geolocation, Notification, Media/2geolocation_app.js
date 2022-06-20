if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (data) {
      const { latitude, longitude } = data.coords;

      console.log("lat " + latitude);
      console.log("long " + longitude);
    },
    function (err) {
      console.log(err);
    },
    { enableHighAccuracy: true }
  );
}

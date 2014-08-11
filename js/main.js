(function() {

  $(document).ready(function() {
    $('.rainbow').each(function() {
      $(this).rainbow({
        colors: [
          '#FF0000',
          '#f26522',
          '#fff200',
          '#00a651',
          '#28abe2',
          '#2e3192',
          '#6868ff'
        ],
        animate: true,
        animateInterval: 100,
        pad: false,
        pauseLength: 100,
      })
    });

    var options = {
      meetingDay: "Wednesday",
      srcFolder:  "meetings/",
      fileExt:    ".txt",
      fileFormat: "YYYY-MM-DD"
    };
    $("[data-meetings]").meetingsNavigator(options);
    $("[data-recent-meeting]").recentMeeting(options);
  });

  $.fn.recentMeeting = function(options) {
    // Sets the desired <iframe>'s src to the most recent meeting
    $(this).attr("src", options.srcFolder + moment().day(options.meetingDay).format(options.fileFormat) + options.fileExt);
  };

  $.fn.meetingsNavigator = function(options) {
    var container = $(this),
        frame     = $(this).find("iframe"),
        prevLink  = container.find(".previous a"),
        nextLink  = container.find(".next a"),
        currentDate;

    var update = function() {
      // Update "currentDate" variable according to location hash
      var hashDate = window.location.href.split('#')[1];
      currentDate = moment(hashDate);

      if (typeof hashDate === "undefined" || !currentDate.isValid())
        currentDate = moment().day(options.meetingDay).subtract(1, "week")

      // Update links
      prevLink.attr("href", "#" + currentDate.clone().subtract(1, "week").format(options.fileFormat));
      nextLink.attr("href", "#" + currentDate.clone().add(1, "week").format(options.fileFormat));

      // Update frame
      frame.attr("src", options.srcFolder + currentDate.format(options.fileFormat) + options.fileExt);
    };

    var initialize = function() {
      $(window).on("hashchange", update);
      $(window).trigger("hashchange");
    };

    initialize();
  };

}).call(this);

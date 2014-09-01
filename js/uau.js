$(document).ready(function() {
    var switched = false;
    var updateTables = function() {
        if (($(window).width() < 768) && !switched) {
            switched = true;
            $("table.responsive").each(function(i, element) {
                splitTable($(element));
            });
            return true;
        } else if (switched && ($(window).width() > 768)) {
            switched = false;
            $("table.responsive").each(function(i, element) {
                unsplitTable($(element));
            });
        }
    };
    $(window).load(updateTables);
    $(window).bind("resize", updateTables);

    function splitTable(original) {
        original.wrap("<div class='table-wrapper' />");
        var copy = original.clone();
        copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
        copy.removeClass("responsive");
        original.closest(".table-wrapper").append(copy);
        copy.wrap("<div class='pinned' />");
        original.wrap("<div class='scrollable' />");
    }

    function unsplitTable(original) {
        original.closest(".table-wrapper").find(".pinned").remove();
        original.unwrap();
        original.unwrap();
    }
});
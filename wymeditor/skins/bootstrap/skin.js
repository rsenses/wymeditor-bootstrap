WYMeditor.SKINS.bootstrap = {

    init: function(wym) {

        //add some elements to improve the rendering
        jQuery(wym._box)
            .append('<div class="clear"></div>')
            .wrapInner('<div class="wym_inner"></div>');

        //render following sections as buttons
        jQuery(wym._box).find(wym._options.toolsSelector)
            .addClass("wym_buttons");

        //render following sections as dropdown menus
        jQuery(wym._box).find(wym._options.containersSelector)
            .addClass("dropdown")
            .selectify()
            .prepend('<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">Formating <span class="caret"></span></button>');
        jQuery(wym._box).find(wym._options.containersSelector + ' ul')
            .addClass("dropdown-menu")
            .attr("role", "menu")
            .attr("aria-labelledby", "dropdownMenu1");
        jQuery(wym._box).find(wym._options.containersSelector + ' li')
            .attr("role", "presentation");
        jQuery(wym._box).find(wym._options.containersSelector + ' a')
            .attr("role", "menuitem");

        //render following sections as dropdown menus
        jQuery(wym._box).find(wym._options.classesSelector)
            .addClass("dropdown")
            .selectify()
            .prepend('<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">Styles <span class="caret"></span></button>');
        jQuery(wym._box).find(wym._options.classesSelector + ' ul')
            .addClass("dropdown-menu")
            .attr("role", "menu")
            .attr("aria-labelledby", "dropdownMenu1");
        jQuery(wym._box).find(wym._options.classesSelector + ' li')
            .attr("role", "presentation");
        jQuery(wym._box).find(wym._options.classesSelector + ' a')
            .attr("role", "menuitem");

        // auto add some margin to the main area sides if left area
        // or right area are not empty (if they contain sections)
        jQuery(wym._box).find("div.wym_area_right ul")
            .parents("div.wym_area_right").show()
            .parents(wym._options.boxSelector)
            .find("div.wym_area_main")
            .css({
                "margin-right": "155px"
            });

        jQuery(wym._box).find("div.wym_area_left ul")
            .parents("div.wym_area_left").show()
            .parents(wym._options.boxSelector)
            .find("div.wym_area_main")
            .css({
                "margin-left": "155px"
            });

        //make hover work under IE < 7
        jQuery(wym._box).find(".wym_section").hover(function() {
            var section = this;
            jQuery(section).addClass("hover");
        }, function() {
            var section = this;
            jQuery(section).removeClass("hover");
        });
    }
};

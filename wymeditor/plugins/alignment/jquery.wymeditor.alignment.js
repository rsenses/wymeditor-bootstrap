/*jslint evil: true */
/**
    WYMeditor.alignment
    ====================

    A plugin to add a class to a container which can be used to set the alignment
	for it.

	by Patabugen ( patabugen.co.uk )
    modified by rsenses
*/

WYMeditor.editor.prototype.alignment = function() {
    var wym = this,
        box = jQuery(this._box);

    options = {};

    //construct the buttons' html
    var button_left = String() +
        "<li class='wym_tools_alignment_left'>" +
        "<a name='AlignLeft' href='#'>" +
        "{left}" +
        "</a>" +
        "</li>";
    var button_center = String() +
        "<li class='wym_tools_alignment_center'>" +
        "<a name='AlignCenter'>" +
        "{Center}" +
        "</a>" +
        "</li>";
    var button_right = String() +
        "<li class='wym_tools_alignment_right'>" +
        "<a name='AlignRight'>" +
        "{right}" +
        "</a>" +
        "</li>";
    var button_justify = String() +
        "<li class='wym_tools_alignment_justify'>" +
        "<a name='AlignJustify' href='#'>" +
        "{justify}" +
        "</a>" +
        "</li>";

    var html = button_left + button_center + button_right + button_justify;
    //add the button to the tools box
    box
        .find(wym._options.toolsSelector + wym._options.toolsListSelector)
        .append(html);

    box.find('li.wym_tools_alignment_left a').click(function() {
        var container = wym.selectedContainer();
        $(container).removeClass('text-left text-right text-justify text-center');
        $(container).addClass('text-left');
        return false;
    });
    box.find('li.wym_tools_alignment_center a').click(function() {
        var container = wym.selectedContainer();
        $(container).removeClass('text-left text-right text-justify text-center');
        $(container).addClass('text-center');
        return false;
    });
    box.find('li.wym_tools_alignment_right a').click(function() {
        var container = wym.selectedContainer();
        $(container).removeClass('text-left text-right text-justify text-center');
        $(container).addClass('text-right');
        return false;
    });
    box.find('li.wym_tools_alignment_justify a').click(function() {
        var container = wym.selectedContainer();
        $(container).removeClass('text-left text-right text-justify text-center');
        $(container).addClass('text-justify');
        return false;
    });
};

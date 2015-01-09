/*jslint evil: true */
/**
    WYMeditor.image_upload
    ====================

    A plugin to add an upload field to the image selector.


	Todo:
		-

	by Patabugen ( patabugen.co.uk )
*/

WYMeditor.editor.prototype.bootstrap = function() {
    var wym = this;

	wym._options.dialogLinkHtml = String() +
    '<form class="submitForm">' +
        '<input type="hidden" class="wym_dialog_type" ' +
            'value="' + WYMeditor.DIALOG_LINK + '" />' +
        '<div class="form-group">' +
            '<label for="link">{URL}</label>' +
            '<input id="link" type="text" class="form-control wym_href" value="" ' +
                'size="40" autofocus="autofocus" />' +
        '</div>' +
        '<div class="form-group">' +
            '<label for="title">{Title}</label>' +
            '<input id="title" type="text" class="form-control wym_title" value="" ' +
                'size="40" />' +
        '</div>' +
        '<div class="form-group">' +
            '<label for="relationship">{Relationship}</label>' +
            '<input id="relationship" type="text" class="form-control wym_rel" value="" ' +
                'size="40" />' +
        '</div>' +
    '</form>';

    wym._options.dialogTableHtml = String() +
    '<form class="submitForm">' +
        '<input type="hidden" class="wym_dialog_type" ' +
            'value="' + WYMeditor.DIALOG_TABLE + '" />' +
        '<div class="form-group">' +
            '<label for="caption">{Caption}</label>' +
            '<input id="caption" type="text" class="form-control wym_caption" value="" ' +
                'size="40" />' +
        '</div>' +
        '<div class="form-group">' +
            '<label for="summary">{Summary}</label>' +
            '<input id="summary" type="text" class="form-control wym_summary" value="" ' +
                'size="40" />' +
        '</div>' +
        '<div class="form-group">' +
            '<label for="rows">{Number_Of_Rows}</label>' +
            '<input id="rows" type="text" class="form-control wym_rows" value="3" size="3" />' +
        '</div>' +
        '<div class="form-group">' +
            '<label for="cols">{Number_Of_Cols}</label>' +
            '<input id="cols" type="text" class="form-control wym_cols" value="2" size="3" />' +
        '</div>' +
    '</form>';

    wym._options.dialogPasteHtml = String() +
    '<form class="submitForm">' +
        '<input type="hidden" class="wym_dialog_type" ' +
            'value="' + WYMeditor.DIALOG_PASTE + '" />' +
        '<div class="form-group">' +
            '<textarea class="form-control wym_text" rows="10" cols="50" ' +
                'autofocus="autofocus"></textarea>' +
        '</div>' +
    '</form>';

    wym._options.dialogPreviewHtml = String();
};

WYMeditor._initDialog = function (index) {
    var wym = WYMeditor.INSTANCES[index],
        selected = wym.selectedContainer(),
        dialogType = jQuery(wym._options.dialogTypeSelector).val(),
        sStamp = wym.uniqueStamp(),
        tableOnClick;

    jQuery(window).bind('beforeunload', function () {
        wym.focusOnDocument();
    });

    if (dialogType === WYMeditor.DIALOG_LINK) {
        // ensure that we select the link to populate the fields
        if (selected && selected.tagName &&
                selected.tagName.toLowerCase !== WYMeditor.A) {
            selected = jQuery(selected).parentsOrSelf(WYMeditor.A);
        }

        // fix MSIE selection if link image has been clicked
        if (!selected && wym._selectedImage) {
            selected = jQuery(wym._selectedImage).parentsOrSelf(WYMeditor.A);
        }
    }

    // pre-init functions
    if (jQuery.isFunction(wym._options.preInitDialog)) {
        wym._options.preInitDialog(wym, window);
    }

    // auto populate fields if selected container (e.g. A)
    if (selected) {
        jQuery(wym._options.hrefSelector).val(jQuery(selected).attr(WYMeditor.HREF));
        jQuery(wym._options.srcSelector).val(jQuery(selected).attr(WYMeditor.SRC));
        jQuery(wym._options.titleSelector).val(jQuery(selected).attr(WYMeditor.TITLE));
        jQuery(wym._options.relSelector).val(jQuery(selected).attr(WYMeditor.REL));
        jQuery(wym._options.altSelector).val(jQuery(selected).attr(WYMeditor.ALT));
    }

    // auto populate image fields if selected image
    if (wym._selectedImage) {
        jQuery(
            wym._options.dialogImageSelector + " " + wym._options.srcSelector
        ).val(jQuery(wym._selectedImage).attr(WYMeditor.SRC));
        jQuery(
            wym._options.dialogImageSelector + " " + wym._options.titleSelector
        ).val(jQuery(wym._selectedImage).attr(WYMeditor.TITLE));
        jQuery(
            wym._options.dialogImageSelector + " " + wym._options.altSelector
        ).val(jQuery(wym._selectedImage).attr(WYMeditor.ALT));
    }

    jQuery(wym._options.dialogLinkSelector + " " +
            wym._options.submitSelector).submit(function () {

        var sUrl = jQuery(wym._options.hrefSelector).val(),
            link;
        if (sUrl.length > 0) {

            if (selected[0] && selected[0].tagName.toLowerCase() === WYMeditor.A) {
                link = selected;
            } else {
                wym._exec(WYMeditor.CREATE_LINK, sStamp);
                link = jQuery("a[href=" + sStamp + "]", wym._doc.body);
            }

            link.attr(WYMeditor.HREF, sUrl);
            link.attr(WYMeditor.TITLE, jQuery(wym._options.titleSelector).val());
            link.attr(WYMeditor.REL, jQuery(wym._options.relSelector).val());
        }
        window.close();
    });

    jQuery(wym._options.dialogImageSelector + " " +
            wym._options.submitSelector).submit(function () {

        var sUrl = jQuery(wym._options.srcSelector).val(),
            $img;
        if (sUrl.length > 0) {

            wym._exec(WYMeditor.INSERT_IMAGE, sStamp);

            $img = jQuery("img[src$=" + sStamp + "]", wym._doc.body);
            $img.attr(WYMeditor.SRC, sUrl);
            $img.attr(WYMeditor.TITLE, jQuery(wym._options.titleSelector).val());
            $img.attr(WYMeditor.ALT, jQuery(wym._options.altSelector).val());
        }
        window.close();
    });

    tableOnClick = WYMeditor._makeTableOnclick(wym);
    jQuery(wym._options.dialogTableSelector + " " + wym._options.submitSelector)
        .submit(tableOnClick);

    jQuery(wym._options.dialogPasteSelector + " " +
            wym._options.submitSelector).submit(function () {

        var sText = jQuery(wym._options.textSelector).val();
        wym.paste(sText);
        window.close();
    });

    jQuery(wym._options.dialogPreviewSelector + " .modal-body").html(wym.html());

    //cancel button
    jQuery(wym._options.cancelSelector).mousedown(function () {
        window.close();
    });

    //pre-init functions
    if (jQuery.isFunction(wym._options.postInitDialog)) {
        wym._options.postInitDialog(wym, window);
    }
};

/**
    editor.dialog
    =============

    Open a dialog box
*/
WYMeditor.editor.prototype.dialog = function (dialogType, dialogFeatures, bodyHtml) {
    var wym = this,
        features = dialogFeatures || wym._options.dialogFeatures,
        sBodyHtml,
        dialogHtml,
        doc;

    switch (dialogType) {

        case (WYMeditor.DIALOG_LINK):
            sSelector = wym._options.dialogLinkSelector.replace('.','');
            sTitleHtml = '{Add} {Link}';
            sBodyHtml = wym._options.dialogLinkHtml;
            sButtons = '<button type="button" class="btn btn-success submitButton">{Submit}</button>' +
                '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>';
            break;
        case (WYMeditor.DIALOG_IMAGE):
            sSelector = wym._options.dialogImageSelector.replace('.','');
            sTitleHtml = '{Add} {Image}';
            sBodyHtml = wym._options.dialogImageHtml;
            sButtons = '<button type="button" class="btn btn-success submitButton">{Submit}</button>' +
                '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>';
            break;
        case (WYMeditor.DIALOG_TABLE):
            sSelector = wym._options.dialogTableSelector.replace('.','');
            sTitleHtml = '{Add} {Table}';
            sBodyHtml = wym._options.dialogTableHtml;
            sButtons = '<button type="button" class="btn btn-success submitButton">{Submit}</button>' +
                '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>';
            break;
        case (WYMeditor.DIALOG_PASTE):
            sSelector = wym._options.dialogPasteSelector.replace('.','');
            sTitleHtml = '{Paste_From_Word}';
            sBodyHtml = wym._options.dialogPasteHtml;
            sButtons = '<button type="button" class="btn btn-success submitButton">{Submit}</button>' +
                '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>';
            break;
        case (WYMeditor.PREVIEW):
            sSelector = wym._options.dialogPreviewSelector.replace('.','');
            sTitleHtml = '{Preview}';
            sBodyHtml = wym._options.dialogPreviewHtml;
            sButtons = '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>';
            break;
    }
    sBodyHtml = wym.replaceStrings(sBodyHtml);
    sTitleHtml = wym.replaceStrings(sTitleHtml);
    sButtons = wym.replaceStrings(sButtons);

    $(document.body).append(
    '<div class="modal fade ' + sSelector + '" id="myModal">' +
        '<div class="modal-dialog">' +
            '<div class="modal-content">' +
                '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title">' + sTitleHtml + '</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                    sBodyHtml +
                '</div>' +
               ' <div class="modal-footer">' +
                    sButtons +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>');
    $('#myModal').modal('show');
    $('#myModal').on('hidden.bs.modal', function () {
        $(this).remove();
    });
    $('.submitButton').click(function(){
        $('.submitForm').submit();
        $('#myModal').modal('hide');
        $('#myModal').remove();
    });

    WYMeditor._initDialog(0);
};

WYMeditor.STRINGS.en.Add = 'Add';
WYMeditor.STRINGS.en.Upload = 'Upload';
WYMeditor.STRINGS.en.Relationship = 'Rel';
WYMeditor.STRINGS.es.Add = 'Añadir';
WYMeditor.STRINGS.es.Upload = 'Subir';
WYMeditor.STRINGS.es.Relationship = 'Rel';

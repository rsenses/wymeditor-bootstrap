/*jslint evil: true */
/**
    WYMeditor.image_upload
    ====================

    A plugin to add an upload field to the image selector.


	Todo:
		-

	by Patabugen ( patabugen.co.uk )
*/

WYMeditor.editor.prototype.image_upload = function() {
    var wym = this;
        uploadUrl = wym._options.dialogImageUploadUrl;
    // Check the options
    if (uploadUrl === undefined) {
        WYMeditor.console.warn(
            "You should define the WYMeditor option dialogImageUploadUrl for the image_upload."
        );
        // With no upload URL we cannot upload files
        return;
    }


	// Write some JS to Ajaxify the form and put the response where we want it.
	var script = String() +
    '<script>' +
        // Variable to store your files
        'var files;' +
        // Add events
        '$("#uploadedfile").on("change", prepareUpload);' +
        // Grab the files and set them to our variable
        'function prepareUpload(event) {' +
            'files = event.target.files;' +
        '}' +
        '$(".submit").click(function(e) {' +
            'e.preventDefault();' +
            'var data = new FormData();' +
            '$.each(files, function(key, value) {' +
                'data.append(key, value);' +
            '});' +
            '$.ajax({' +
                'url: "' + uploadUrl + '",' +
                'type: "POST",' +
                'data: data,' +
                'cache: false,' +
                'dataType: "json",' +
                'processData: false,' +
                'contentType: false,' +
                'beforeSend: function() {' +
                    'jQuery("#image_upload_form .submit").html("Uploading…"); ' +
                '},' +
                'success: function (data) {' +
                    'jQuery(".wym_src").val(data.url); ' +
                    'jQuery(".wym_alt").val(data.filename); ' +
                    'jQuery("#image_upload_form .submit").val("Upload"); ' +
                '},' +
                'error: function (data) {' +
                    'alert(data.error);' +
                '}' +
            '});' +
            'return false;' +
        '});' +
    '</script>';

	// Put together the whole dialog script
	wym._options.dialogImageHtml = String() + script +
	// We have to put this in a new form, so we don't break the old one
    '<form id="image_upload_form" method="post" enctype="multipart/form-data" action="' + uploadUrl + '">' +
        '<fieldset>' +
            '<legend>{Upload} {Image}</legend>' +
            '<div class="form-group">' +
                '<label for="uploadedfile">{Upload}</label>' +
                '<input type="file" name="uploadedfile" id="uploadedfile">' +
            '</div>' +
            '<div class="form-group">' +
                // We use a hidden value here so we can get a proper translation
                '<input type="hidden" id="image_upload_uploading_label" value="Uploading">' +
                '<button type="submit" class="btn btn-success submit">{Upload}</button>' +
            '</div>' +
         '</fieldset>' +
    '</form>' +
    '<div class="clearfix"></div>' +
    '<form class="submitForm">' +
        '<fieldset>' +
            '<input type="hidden" class="wym_dialog_type" ' +
                'value="' + WYMeditor.DIALOG_IMAGE + '">' +
            '<legend>{Image}</legend>' +
            '<div class="form-group">' +
                '<label for="url">{URL}</label>' +
                '<input type="text" id="url" class="form-control wym_src" value="" ' +
                    'size="40" autofocus="autofocus">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="alt-text">{Alternative_Text}</label>' +
                '<input type="text" id="alt-text" class="form-control wym_alt" value="" size="40">' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="title">{Title}</label>' +
                '<input type="text" id="title" class="form-control wym_title" value="" size="40">' +
            '</div>' +
        '</fieldset>' +
    '</form>';
};

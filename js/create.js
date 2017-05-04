var fileExtentionRange = '.png .jpg .jpeg .bmp .gif .svg';

$(document).on('change', '.btn-file :file', function() {
    var input = $(this);
    var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    var numFiles = input.get(0).files ? input.get(0).files.length : 1;
    var size = input.get(0).files[0].size;

    // console.log(input, numFiles, label, size);

    $('#attachmentName').attr('name', 'attachmentName'); // allow upload.
    var postfix = label.substr(label.lastIndexOf('.'));
    if (fileExtentionRange.indexOf(postfix.toLowerCase()) > -1) {
        $('#_attachmentName').val(label);
        $('#_attachmentName').parent().removeClass("error");
    } else {
        $('#_attachmentName').val("please upload a supported image file (png, jpg, jpeg, bmp, gif, svg)");
        $('#_attachmentName').parent().addClass("error");
    }
});
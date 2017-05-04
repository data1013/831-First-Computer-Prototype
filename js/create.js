var fileExtentionRange = '.zip .rar .tar .pdf .doc .docx .xls .xlsx .ppt .pptx';
var MAX_SIZE = 30; // MB

$(document).on('change', '.btn-file :file', function() {
    var input = $(this);
    var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    var numFiles = input.get(0).files ? input.get(0).files.length : 1;
    var size = input.get(0).files[0].size;

    console.log(input, numFiles, label, size);

    $('#attachmentName').attr('name', 'attachmentName'); // allow upload.

    if (size > 1024 * 1024 * MAX_SIZE ) {
        alert('max size：<strong>' + MAX_SIZE + '</strong> MB.');

        $('#attachmentName').removeAttr('name'); // cancel upload file.
    } else {
        $('#_attachmentName').val(label);
    }
});
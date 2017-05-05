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

    cost_arr = ['cost-1','cost-2','cost-3','cost-4'];
    prep_arr = ['prep-1', 'prep-2', 'prep-3', 'prep-4'];
    dur_arr = ['dur-1', 'dur-2', 'dur-3', 'dur-4'];

    $(document).ready(function () {
        $('.ui.dropdown').dropdown();

        $(".user-filter").on("click",function(e){
            $(this).blur();
            var arr;
            e.preventDefault();
            var val = $(this).attr('id');
            if (val.includes('cost')){
                arr = cost_arr;
            }
            else if (val.includes('prep')){
                arr = prep_arr;
            }
            else{
                arr = dur_arr;
            }
            arr.forEach(function(entry){
                if (!(val === entry)){
                    if ($('#'+entry).hasClass('active')){
                        $('#'+entry).toggleClass('active');
                    }
                }
            });
        })

        $('.ui.form')
            .form({
                fields: {
                eventname: {
                    identifier: 'eventname',
                    rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter an event name'
                    }
                    ]
                },
                wing: {
                    identifier: 'wing',
                    rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please select a wing'
                    }
                    ]
                },
                description: {
                    identifier: 'description',
                    rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter a description'
                    }
                    ]
                },
                
            },  
            onSuccess: function(event, fields) {
                event.preventDefault();
                $('.small.modal').modal({
                    onHide: function(){
                        console.log('hidden');
                        location.reload();

                    }}).modal('show');
            }
        });
    });

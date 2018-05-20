$(document).ready( function(){
    $.ajax({ 
        type: 'GET', 
        url: 'https://rallycoding.herokuapp.com/api/music_albums', 
        dataType: 'json',
        success: function (data) { 

            //variable box_id to assign id to new album box
            var box_id = 1;

            //variable prev_box_id to store id of previou box to add new album box after previou box( .after function in JQuery)
            var prev_box_id = 0;

            $.each(data, function(index, element) {
                //adding new album box after previou one
                $('#'+prev_box_id).after($('<div>', {
                    class: 'card mx-auto mt-4',
                    id: '' + box_id,
                    width: '24rem'
                }));

                //album title css
                $('#' + box_id).append($('<h5>', {
                    class: "card-title mx-auto mt-2",
                    text: element.title,
                }));

                //album artist css
                $('#' + box_id).append($('<p>', {
                    class: "card-text mx-auto",
                    text: element.artist
                }));

                //album image css
                $('#' + box_id).append($('<img>', {
                    src: element.image,
                    class: "card-img-top",
                    alt: "Card image cap"
                }));

                //variable btn_id to assign id of new buttons
                //id of 'buy now' button is 1+id of box
                var btn_id = box_id + 1;

                //buy now buttton css
                $('#' + box_id).append($('<button>', {
                    type: "button",
                    class: "btn btn-outline-primary btn-lg btn-block",
                    text: 'Buy Now',
                    id: '' + btn_id,
                    href: element.url
                }));

                //incrementing btn_id to assign new id to 'remove' button
                btn_id = btn_id + 1;

                //remove button css
                $('#' + box_id).append($('<button>', {
                    type: "button",
                    class: "btn btn-outline-danger btn-lg btn-block",
                    text: 'Remove',
                    id: '' + btn_id
                }));

                //assigning prev_box_id with current id of box
                prev_box_id=box_id;

                //incrementing box_id witn +3 for next upcoming box
                box_id=box_id+3;
            });
        }
    });
});

//remove button script
$(document).ready(function(){
    var btn_id;
     for (btn_id = 3; btn_id < 30; btn_id+=3) {
        $(document.body).on('click', "#"+btn_id ,function(){
            $(this).parent().remove();
        });
    };
});

//'buy now' button script
//intialising click_count array to store counts of clicks for each 'buy now' button
var btn_id, click_count=[];

//intialising count of each button with zero
for (btn_id = 2; btn_id < 20; btn_id+=3) {
        click_count[''+btn_id]=0;
};

//script
$(document).ready(function(){
    var btn_id;
     for (btn_id = 2; btn_id < 20; btn_id+=3) {
        $(document.body).on('click', "#"+btn_id ,function(){

            //incrementing count of clicks for current button
            click_count[$(this).attr('id')]++;

            //css editing
            $(this).removeClass('btn-outline-primary');
            $(this).addClass('btn-outline-success');
            $(this).text("Confirm");

            //checking wether the current button click count is more than 2 or not
            //if yes than redirect to amazon page
            if(click_count[$(this).attr('id')]>=2) {
                window.location.href = $(this).attr('href');
            }
        });
    };
});

//Select2 - Adapter for SelectAll and UnselectAll
$.fn.select2.amd.define('select2/selectAllAdapter', [
    'select2/utils',
    'select2/dropdown',
    'select2/dropdown/attachBody'
], function (Utils, Dropdown, AttachBody) {

    function SelectAll() { }
    SelectAll.prototype.render = function (decorated) {
        var self = this,
            $rendered = decorated.call(this),
            $selectAll = $(
                '<button class="btn btn-xs btn-default jetl-margin-left-6px" type="button"><i class="fa fa-check-square-o"></i> Select All</button>'
            ),
            $unselectAll = $(
                '<button class="btn btn-xs btn-default jetl-margin-left-6px" type="button"><i class="fa fa-square-o"></i> Unselect All</button>'
            ),
            $btnContainer = $('<div class="jetl-margin-top-3px">').append($selectAll).append($unselectAll);
        if (!this.$element.prop("multiple")) {
            // this isn't a multi-select -> don't add the buttons!
            return $rendered;
        }
        $rendered.find('.select2-dropdown').prepend($btnContainer);
        $selectAll.on('click', function (e) {
            var $results = $rendered.find('.select2-results__option[aria-selected=false]');
            $results.each(function () {	
                //console.log('data...');
                //console.log($(this).data());				
                //console.log(Utils.GetData(this, 'data'));
                self.trigger('select', {
                    //data: $(this).data('data')
                    data: Utils.GetData(this, 'data')
                });
            });
            self.trigger('close');
        });
        $unselectAll.on('click', function (e) {
            var $results = $rendered.find('.select2-results__option[aria-selected=true]');
            $results.each(function () {
                self.trigger('unselect', {
                    data: Utils.GetData(this, 'data')
                });
            });
            self.trigger('close');
        });
        return $rendered;
    };

    return Utils.Decorate(
        Utils.Decorate(
            Dropdown,
            AttachBody
        ),
        SelectAll
    );

});
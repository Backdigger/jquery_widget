(function($) {
    $.widget( "custom.grid", {
        options: {
            src: 'js/main.json',
            style: 'classic'
        },
        _create: function() {
            self = this;
            this.element.addClass(this.options.style).html("<table class='table'></table>");

            //parsing json file into a table
            $.getJSON(this.options.src, function (data) {
                for (var arr = 0; arr < data.length; arr++) {
                    var $row = $("<tr>");
                    $(".table").append($row);
                    $.each(data[arr], function (key, val) {
                        if (val.type === "Header") {
                            $row.append($('<th>').gridCellHeader(Object.assign({},val,{
                                onSort: self.onSort.bind(this)
                            })));
                        }
                        else if (val.type === "Edit") {
                            $row.append($('<td>').gridCellEdit(val));
                        }
                        else if (val.type === "Label") {
                            $row.append($('<td>').gridCellLabel(val));
                        }
                        else if (val.type === "Date") {
                            $row.append($('<td>').gridCellDate(val));
                        }

                    })
                }

            })

        },

        onSort: function (cell, order) {

                //sorting columns A-Z
            if (order === "up") {
                var colIndex = cell.closest('tr').children().index(cell);
                var mylist = $('tbody');
                var listitems = $('tbody').find('tr').not($('tr:first-of-type'));
                listitems.sort(function (a, b) {
                    var $a = $(a).find("td:eq(" + colIndex + ")");
                    var $b =  $(b).find("td:eq(" + colIndex + ")");
                    var vc, vc1;

                    if ($a.attr('data-type') === 'Label') {
                        vc = $a.gridCellLabel("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }

                    }
                    else if ($a.attr('data-type') === 'Date') {
                        vc = $a.gridCellDate("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }

                    }
                    else if ($a.attr('data-type') === 'Edit') {
                        vc = $a.gridCellEdit("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }

                    }

                    var compA = vc;
                    var compB = vc1;
                    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;

                })
                $.each(listitems, function (idx, itm) {
                    mylist.append(itm);
                });

            }
                    //sorting columns Z-A
            else if (order === "down") {
                var colIndex = cell.closest('tr').children().index(cell);
                var mylist = $('tbody');
                var listitems = $('tbody').find('tr').not($('tr:first-of-type'));
                listitems.sort(function (a, b) {
                    var $a = $(a).find("td:eq(" + colIndex + ")");
                    var $b =  $(b).find("td:eq(" + colIndex + ")");
                    var vc, vc1;

                    if ($a.attr('data-type') === 'Label') {
                        vc = $a.gridCellLabel("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }

                    }
                    else if ($a.attr('data-type') === 'Date') {
                        vc = $a.gridCellDate("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }

                    }
                    else if ($a.attr('data-type') === 'Edit') {
                        vc = $a.gridCellEdit("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }

                    }



                    var compA = vc;
                    var compB = vc1;
                    return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;

                })
                $.each(listitems, function (idx, itm) {
                    mylist.append(itm);
                });
            }
        }
    });

    //editable cells

    $.widget( "custom.gridCell", {

        options: {
            type: null,
            value: '',
        },

        _create: function() {
            this.element.attr('data-type',this.options.type);
            this.refresh();
        },

        getValue: function() {
            return this.options.value;
        },

        setValue: function(newValue) {
            this.options.value = newValue;
            this.refresh();
        },

        refresh: function () {
            this.element.text(this.options.value);
        }

    });

    //LABEL

    $.widget( "custom.gridCellLabel", $.custom.gridCell,{
        options: {
            type: null,
            value: '',
        },
         _create: function() {
             return this._super();
         },
        refresh: function () {
            return this._super();
        }
    });

    //DATE

    $.widget( "custom.gridCellDate", $.custom.gridCell,{
        options: {
            type: null,
            value: '',
            typeView: "ISO",
        },
        _create: function() {
            return this._super();
        },
        refresh: function () {
            if (this.options.typeView === "string") {
                this.element.text((new Date(+this.options.value)).toString());
            }
            else if (this.options.typeView === "GMT") {
                this.element.text((new Date(+this.options.value)).toGMTString());
            }
            else if (this.options.typeView === "ISO") {
                this.element.text((new Date(+this.options.value)).toISOString());
            }
        }
    });

    //HEADER

    $.widget( "custom.gridCellHeader", $.custom.gridCell, {
        options: {
            onSort: null
        },
        _create: function() {
            var self = this;
            this.arrowUp = $("<a href='#' class='arrow-up'>&#8593;</a>");
            this.arrowDown = $("<a href='#' class='arrow-down'>&#8595;</a>");
            this.arrowUp.on('click', function(){
                if (typeof self.options.onSort === 'function') {
                    self.options.onSort(self.element,'up');
                }
            });

            this.arrowDown.on('click', function(){
                if (typeof self.options.onSort === 'function') {
                    self.options.onSort(self.element,'down');
                }
            });
            return this._super();
        },

        refresh: function() {
            this.element.text(this.options.value);
            this.element.append(this.arrowUp).append(this.arrowDown);
        }
    });

    //EDIT

    $.widget( "custom.gridCellEdit", $.custom.gridCell, {
        options: {
            onSort: null
        },

        _create: function() {
            this.element.addClass('edit');
            this.element.append("<a href='#' class='inputCell'>" + this.options.value + "</a>")
            this.input();
            this.element.attr('data-type',this.options.type);
        },
        input: function() {
            $(document).ajaxComplete(function() {
                $(".inputCell").each(function (index, element) {
                    var text;
                    $(this).on("click", function () {
                        text = $(this).parent().gridCellEdit('getValue');

                        $(this).html("<input type='text' placeholder= " + text + ">");

                        $(this).find('input').focus();
                        $(this).on('keyup', function () {
                            if ((event.keyCode === 13) && ($('input').val())) {
                                $(this).html($('input').val());
                            }
                            else if ($('input').val() == 0) {
                                $(this).html(text);
                            }
                        })
                        $('input').on('blur', function (e) {
                            if ($('input').val()) {
                                $(this).parent().html($('input').val());
                            }
                            else {
                                $(this).parent().html(text);
                            }
                        })
                    });
                });
            })
        },
        setValue: function(newValue) {
            this.element.children().text(newValue);
        }

    });

    $('div').grid();


})(jQuery);




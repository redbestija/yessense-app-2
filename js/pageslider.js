/* Notes:
 * - History management is currently done using window.location.hash.  This could easily be changed to use Push State instead.
 * - jQuery dependency for now. This could also be easily removed.
 */

function PageSlider(container) {

    var container = container,
        currentPage,
        stateHistory = [];

    // Use this function if you want PageSlider to automatically determine the sliding direction based on the state history
    this.slidePage = function(page) {

        var l = stateHistory.length,
            state = window.location.hash;

        if (l === 0) {
            stateHistory.push(state);
            this.slidePageFrom(page);
            return;
        }
        if (state === stateHistory[l-2]) {
            stateHistory.pop();
            this.slidePageFrom(page, 'left');
        } else {
            stateHistory.push(state);
            this.slidePageFrom(page, 'right');
        }

    }

    // var checkIfRemoved = false;
    // Use this function directly if you want to control the sliding direction outside PageSlider
    this.slidePageFrom = function(page, from) {

        container.append(page);

        if (!currentPage || !from) {
            page.attr("class", "page center");
            currentPage = page;
            return;
        }

        // checkIfRemoved = false;
        // Position the page at the starting position of the animation
        page.attr("class", "page " + from);

        currentPage.one('webkitTransitionEnd', function(e) {
            //checkIfRemoved = true;
            $(e.target).remove();
        });
        currentPage.one('transitionend', function(e) {
            //checkIfRemoved = true;
            $(e.target).remove();
        });
        // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
        container[0].offsetWidth;

        // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
        page.attr("class", "page transition center");
        
        var classNameToRemove = "page transition " + (from === "left" ? "right" : "left");
        currentPage.attr("class", classNameToRemove);
        // var myTimeout = setTimeout(function() {
        //     if (!checkIfRemoved){
        //         checkIfRemoved = true;
        //         $('#container').find('div').first().remove();
        //         // alert(": " + classNameToRemove + "!!!!!!" + container.first().html()) ;
        //         // alert($('.' + classNameToRemove).html());
        //         // alert($('.' + classNameToRemove).first().html());
        //      //   $('.' + classNameToRemove).first().remove();
        //     }
        // }, 1500);        

        currentPage = page;
    }

}
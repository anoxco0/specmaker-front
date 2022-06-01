const fun = function(e) {
        if ((e.ctrlKey && 
            (e.keyCode === 67 || 
             e.keyCode === 86 || 
             e.keyCode === 85 || 
             e.keyCode === 117)) || 
             (e.ctrlKey && e.shiftKey && 
            (e.keyCode === 74 ||
             e.keyCode === 73 ) )) {
            return false;
        } else {
            return true;
        }
    }
 export default fun;
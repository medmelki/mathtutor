const EMPTY_STRING = "";

let content = "";

function Operations() {

    function copy(s) {
        content = s.html();
    }

    function cut(s) {
        copy(s);
        s.html(EMPTY_STRING);
    }

    function paste(t) {
        t.html(content);
    }

    return {
        copy : copy,
        cut : cut,
        paste : paste
    }
}

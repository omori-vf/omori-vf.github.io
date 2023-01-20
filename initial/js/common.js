function execute_str_callback(str_callback) {
    const index = str_callback.indexOf("(");
    const fn = str_callback.substring(0, index);
    const parameters = str_callback.substring(index + 1, str_callback.length - 1);

    const regex = /(?<str>["'][^"']*["'])|,? ?(?<not_str>[^"',]+) ?,?/gm;
    let parsed_parameters = [];

    let match = regex.exec(parameters);
    do
        parsed_parameters.push(eval(match.groups.str !== undefined ? match.groups.str : match.groups.not_str));
    while ((match = regex.exec(parameters)) !== null);
    window[fn](parsed_parameters);
}

function redirect_to(url) {
    window.location.href = url;
}
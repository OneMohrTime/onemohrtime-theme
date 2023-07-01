// =============================================================================
// Utilities: Forms
// =============================================================================
// A collection of math related functions

// Serialize
// =============================================================================
// Calculates a number between two numbers at a specific increment
// @param  {Object} form  - form data
// @param  {Number} end    - ending value
// @param  {Number} amount - amount value
// @return {Number}        - resulting value
export function serializeForm(form) {

    // Setup our serialized data
    var serialized = {};

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {

        var field = form.elements[i];

        // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
        if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

        // If a multi-select, get all selections
        if (field.type === 'select-multiple') {
            for (var n = 0; n < field.options.length; n++) {
                if (!field.options[n].selected) continue;
                serialized[field.name] = field.options[n].value
            }
        }

            // Convert field data to a query string
        else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
            serialized[field.name] = field.value
        }
    }

    return serialized;
}
